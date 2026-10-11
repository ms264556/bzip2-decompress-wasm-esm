import Bzip2ModuleFactory from './bzip2-wasm-es.js';

const bzip2Module = await Bzip2ModuleFactory();

const BZ_OK = 0;
const BZ_STREAM_END = 4;

/**
 * Decompresses a Uint8Array of bzip2 compressed data.
 * @param {Uint8Array} compressedBytes The raw bytes of the compressed file.
 * @returns {Uint8Array} A new Uint8Array containing the decompressed data.
 * @throws {Error} Throws if decompression fails or input is invalid.
 */
function decompress(compressedBytes) {
    if (!(compressedBytes instanceof Uint8Array)) {
        throw new TypeError("Bzip2.decompress: Input must be a Uint8Array.");
    }

    if (compressedBytes.length === 0) {
        return new Uint8Array(0);
    }

    const bufferSize = bzip2Module.get_buffer_size();
    const inputPtr = bzip2Module.get_input_buffer();
    const outputPtr = bzip2Module.get_output_buffer();

    const chunks = [];
    let outputLength = 0;
    let inputOffset = 0;

    // The data is passed through the module a bufferful at a time, so the module never needs to hold all of it.
    // Each step is a separate call, which also lets the engine switch to optimized code along the way.
    let status = bzip2Module.begin();
    try {
        while (status === BZ_OK) {
            if (bzip2Module.needs_input()) {
                const inputChunk = compressedBytes.subarray(inputOffset, inputOffset + bufferSize);
                bzip2Module.HEAPU8.set(inputChunk, inputPtr);
                bzip2Module.supply_input(inputChunk.length);
                inputOffset += inputChunk.length;
            }
            status = bzip2Module.step();
            const chunkLength = bzip2Module.get_output_length();
            if (chunkLength > 0) {
                chunks.push(bzip2Module.HEAPU8.slice(outputPtr, outputPtr + chunkLength));
                outputLength += chunkLength;
            }
        }
    } finally {
        bzip2Module.end();
    }

    if (status !== BZ_STREAM_END) {
        throw new Error(`Bzip2 decompression failed: ${bzip2Module.describe_error(status)} (code: ${status})`);
    }

    if (chunks.length === 1) {
        return chunks[0];
    }
    const outputBytes = new Uint8Array(outputLength);
    let outputOffset = 0;
    for (const chunk of chunks) {
        outputBytes.set(chunk, outputOffset);
        outputOffset += chunk.length;
    }
    return outputBytes;
}

const Bzip2 = { decompress };

export default Bzip2;
