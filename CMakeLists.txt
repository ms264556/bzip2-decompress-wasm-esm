cmake_minimum_required(VERSION 3.12)
project(bzip2-wasm-es)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3")

include(ExternalProject)

ExternalProject_Add(bzip2
        GIT_REPOSITORY https://salsa.debian.org/debian/bzip2.git
        GIT_TAG 0c9335755bcd9519bfc36cf57eb987603b013f46
        CONFIGURE_COMMAND ""
        BUILD_COMMAND $(MAKE) libbz2.a CC=${CMAKE_C_COMPILER}
        BUILD_IN_SOURCE 1
        BUILD_BYPRODUCTS <SOURCE_DIR>/libbz2.a
        INSTALL_COMMAND "" # Explicitly disable install
        )

add_library(libbz2 STATIC IMPORTED GLOBAL)
set_target_properties(libbz2
        PROPERTIES
        IMPORTED_LOCATION ${CMAKE_CURRENT_BINARY_DIR}/bzip2-prefix/src/bzip2/libbz2.a
        )
add_dependencies(libbz2 bzip2)

add_executable(bzip2-wasm-es main.cpp)
add_dependencies(bzip2-wasm-es libbz2)
target_link_libraries(bzip2-wasm-es libbz2)

target_include_directories(bzip2-wasm-es PUBLIC
        ${CMAKE_CURRENT_BINARY_DIR}/bzip2-prefix/src/bzip2
)

set_target_properties(bzip2-wasm-es
        PROPERTIES
        OUTPUT_NAME "bzip2-wasm-es"
        SUFFIX ".js"
        LINK_FLAGS "--bind -s ALLOW_MEMORY_GROWTH=1 -s MODULARIZE=1 -s SINGLE_FILE=1 -s ENVIRONMENT='web' -s EXPORT_ES6=1 -s EXPORT_NAME='Bzip2Module' -s EXPORTED_FUNCTIONS=['_malloc','_free'] -s EXPORTED_RUNTIME_METHODS=['HEAPU8']"
)

find_program(
    ESBUILD_EXECUTABLE esbuild
    HINTS ${CMAKE_CURRENT_SOURCE_DIR}/node_modules/.bin
)

if(NOT ESBUILD_EXECUTABLE)
    message(FATAL_ERROR "esbuild not found. Please run 'npm install' in the project root.")
endif()

set(DIST_DIR ${CMAKE_CURRENT_SOURCE_DIR}/dist)
set(FINAL_OUTPUT_JS ${DIST_DIR}/bzip2.js)

configure_file(
    ${CMAKE_CURRENT_SOURCE_DIR}/wrapper.js
    ${CMAKE_CURRENT_BINARY_DIR}/wrapper.js
    COPYONLY
)

add_custom_command(
        OUTPUT ${FINAL_OUTPUT_JS}
        COMMAND ${ESBUILD_EXECUTABLE} ${CMAKE_CURRENT_BINARY_DIR}/wrapper.js
                --bundle
                --format=esm
                --outfile=${FINAL_OUTPUT_JS}
        DEPENDS bzip2-wasm-es ${CMAKE_CURRENT_BINARY_DIR}/wrapper.js
        WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}
        COMMENT "Bundling final, self-contained JavaScript module with esbuild..."
)

add_custom_target(bundle ALL
        DEPENDS ${FINAL_OUTPUT_JS}
)