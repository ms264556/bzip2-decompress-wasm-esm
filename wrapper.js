import Bzip2ModuleFactory from './bzip2-wasm-es.js';

const bzip2Module = await Bzip2ModuleFactory();

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

    let inputPtr = 0;
    let result = null;

    try {
        inputPtr = bzip2Module._malloc(compressedBytes.length);
        if (inputPtr === 0) {
            throw new Error("Bzip2: Failed to allocate memory for input buffer.");
        }
        bzip2Module.HEAPU8.set(compressedBytes, inputPtr);
        result = bzip2Module.decompress(inputPtr, compressedBytes.length);
        if (result.error !== 0) {
            throw new Error(`Bzip2 decompression failed: ${result.errorMsg} (code: ${result.error})`);
        }
        const outputBytes = bzip2Module.HEAPU8.slice(result.outputPtr, result.outputPtr + result.outputLen);
        return outputBytes;
    } finally {
        if (inputPtr) {
            bzip2Module._free(inputPtr);
        }
        if (result) {
            if (result.outputPtr) {
                bzip2Module.free_result_memory(result.outputPtr);
            }
            result.delete();
        }
    }
}

const Bzip2 = { decompress };

export default Bzip2;