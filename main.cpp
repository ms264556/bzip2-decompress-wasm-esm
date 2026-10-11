#include <emscripten/bind.h>
#include <string>
#include <bzlib.h>
#include <stdint.h>

// Decompression is driven from JavaScript (see wrapper.js), which feeds the compressed data through a fixed input buffer
// and collects the decompressed data from a fixed output buffer. So this module's memory stays small, however large the data.
//
// It also means decompression happens over many short calls, rather than one long one. WebAssembly engines (V8 in particular)
// only switch a function over to optimized code in between calls, so a single call would run unoptimized from start to finish.
static const unsigned int BUFFER_SIZE = 1024 * 1024;

static char input_buffer[BUFFER_SIZE];
static char output_buffer[BUFFER_SIZE];

static bz_stream stream;
static bool is_active = false;
static bool is_input_finished = false;
static unsigned int output_length = 0;

uintptr_t get_input_buffer() {
    return reinterpret_cast<uintptr_t>(input_buffer);
}

uintptr_t get_output_buffer() {
    return reinterpret_cast<uintptr_t>(output_buffer);
}

unsigned int get_buffer_size() {
    return BUFFER_SIZE;
}

void end() {
    if (is_active) BZ2_bzDecompressEnd(&stream);
    is_active = false;
}

int begin() {
    end();
    stream = {};
    is_input_finished = false;
    output_length = 0;

    int status = BZ2_bzDecompressInit(&stream, 0, 0);
    is_active = status == BZ_OK;
    return status;
}

bool needs_input() {
    return is_active && !is_input_finished && stream.avail_in == 0;
}

// Call this after placing more compressed data in the input buffer. A length of zero says that there's no more to come.
void supply_input(unsigned int length) {
    stream.next_in = input_buffer;
    stream.avail_in = length;
    if (length == 0) is_input_finished = true;
}

// Returns BZ_OK if there's more to do, BZ_STREAM_END once everything has been decompressed, or else an error.
// Whichever it is, get_output_length() then says how much decompressed data is waiting in the output buffer.
int step() {
    output_length = 0;
    if (!is_active) return BZ_SEQUENCE_ERROR;

    stream.next_out = output_buffer;
    stream.avail_out = BUFFER_SIZE;

    int status = BZ2_bzDecompress(&stream);
    output_length = BUFFER_SIZE - stream.avail_out;

    // If bzip2 still wants more, even though it has been given everything, then the data has been cut short
    if (status == BZ_OK && is_input_finished && stream.avail_in == 0 && stream.avail_out > 0) status = BZ_UNEXPECTED_EOF;

    return status;
}

unsigned int get_output_length() {
    return output_length;
}

std::string describe_error(int error) {
    switch (error) {
        case BZ_DATA_ERROR_MAGIC: return "Data magic error: Not a valid bzip2 file.";
        case BZ_DATA_ERROR: return "Data integrity error: The bzip2 data is corrupt.";
        case BZ_UNEXPECTED_EOF: return "Unexpected end of data: The bzip2 data is incomplete.";
        case BZ_MEM_ERROR: return "Failed to allocate memory.";
        default: return "An unknown error occurred during decompression.";
    }
}

EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::function("get_input_buffer", &get_input_buffer);
    emscripten::function("get_output_buffer", &get_output_buffer);
    emscripten::function("get_buffer_size", &get_buffer_size);
    emscripten::function("begin", &begin);
    emscripten::function("needs_input", &needs_input);
    emscripten::function("supply_input", &supply_input);
    emscripten::function("step", &step);
    emscripten::function("get_output_length", &get_output_length);
    emscripten::function("end", &end);
    emscripten::function("describe_error", &describe_error);
}
