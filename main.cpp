#include <emscripten/bind.h>
#include <vector>
#include <string>
#include <bzlib.h>
#include <stdlib.h>

struct BZ2Result {
    int error;
    std::string error_msg;
    uintptr_t output_ptr; 
    unsigned int output_len;
};

BZ2Result decompress(uintptr_t input_ptr, unsigned int input_len) {
    BZ2Result resp;
    resp.output_ptr = 0;
    resp.output_len = 0;

    char* input_buffer = reinterpret_cast<char*>(input_ptr);
    
    if (input_len == 0) {
        resp.error = BZ_OK;
        return resp;
    }

    unsigned int decompressed_size = input_len * 4;
    std::vector<unsigned char> output_vec;
    if (decompressed_size < 4096) decompressed_size = 4096;
    output_vec.resize(decompressed_size);

    while (true) {
        resp.error = BZ2_bzBuffToBuffDecompress(
            (char*)output_vec.data(),
            &decompressed_size,
            input_buffer,
            input_len,
            0, 0
        );

        if (resp.error == BZ_OK) {
            resp.output_len = decompressed_size;
            resp.output_ptr = reinterpret_cast<uintptr_t>(malloc(decompressed_size));
            if (resp.output_ptr) {
                memcpy(reinterpret_cast<void*>(resp.output_ptr), output_vec.data(), decompressed_size);
            } else {
                resp.error = BZ_MEM_ERROR;
                resp.error_msg = "Failed to allocate memory for the output buffer.";
            }
            break;
        } else if (resp.error == BZ_OUTBUFF_FULL) {
            if (output_vec.size() > 100 * 1024 * 1024) { 
                 resp.error_msg = "The decompressed data exceeds the 100MB safety limit.";
                 break;
            }
            decompressed_size = output_vec.size() * 2;
            output_vec.resize(decompressed_size);
        } else {
            switch (resp.error) {
                case BZ_DATA_ERROR_MAGIC: resp.error_msg = "Data magic error: Not a valid bzip2 file."; break;
                default: resp.error_msg = "An unknown error occurred during decompression."; break;
            }
            break;
        }
    }
    return resp;
}

void free_result_memory(uintptr_t ptr) {
    free(reinterpret_cast<void*>(ptr));
}

EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::class_<BZ2Result>("BZ2Result")
        .property("error", &BZ2Result::error)
        .property("errorMsg", &BZ2Result::error_msg)
        .property("outputPtr", &BZ2Result::output_ptr)
        .property("outputLen", &BZ2Result::output_len);

    emscripten::function("decompress", &decompress, emscripten::allow_raw_pointers());
    emscripten::function("free_result_memory", &free_result_memory, emscripten::allow_raw_pointers());
}