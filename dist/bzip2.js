// bzip2-wasm-es.js
async function Bzip2Module(moduleArg = {}) {
  var Module = moduleArg;
  var ENVIRONMENT_IS_WEB = true;
  var ENVIRONMENT_IS_WORKER = false;
  var programArgs = [];
  var thisProgram = "./this.program";
  var quit_ = (status, toThrow) => {
    throw toThrow;
  };
  var _scriptName = import.meta.url;
  var scriptDirectory = "";
  var readAsync;
  if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    try {
      scriptDirectory = new URL(".", _scriptName).href;
    } catch {
    }
    {
      readAsync = async (url) => {
        var response = await fetch(url, { credentials: "same-origin" });
        if (response.ok) {
          return response.arrayBuffer();
        }
        throw new Error(response.status + " : " + response.url);
      };
    }
  } else {
  }
  var out = console.log.bind(console);
  var err = console.error.bind(console);
  var wasmBinary;
  var ABORT = false;
  var EXITSTATUS;
  class EmscriptenEH {
  }
  class EmscriptenSjLj extends EmscriptenEH {
  }
  function binaryDecode(bin) {
    for (var i = 0, l = bin.length, o = new Uint8Array(l), c; i < l; ++i) {
      c = bin.charCodeAt(i);
      o[i] = ~c >> 8 & c;
    }
    return o;
  }
  var runtimeInitialized = false;
  function getMemoryBuffer() {
    return wasmMemory.buffer;
  }
  function updateMemoryViews() {
    if (HEAP8?.buffer?.resizable) return;
    var b = getMemoryBuffer();
    HEAP8 = new Int8Array(b);
    HEAP16 = new Int16Array(b);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
    HEAPU16 = new Uint16Array(b);
    HEAP32 = new Int32Array(b);
    HEAPU32 = new Uint32Array(b);
    HEAPF32 = new Float32Array(b);
    HEAPF64 = new Float64Array(b);
    HEAP64 = new BigInt64Array(b);
    HEAPU64 = new BigUint64Array(b);
  }
  function preRun() {
    var preRun2 = Module["preRun"];
    if (preRun2) {
      if (typeof preRun2 == "function") preRun2 = [preRun2];
      onPreRuns.push(...preRun2);
    }
    callRuntimeCallbacks(onPreRuns);
  }
  function initRuntime() {
    runtimeInitialized = true;
    wasmExports["r"]();
  }
  function postRun() {
    var postRun2 = Module["postRun"];
    if (postRun2) {
      if (typeof postRun2 == "function") postRun2 = [postRun2];
      onPostRuns.push(...postRun2);
    }
    callRuntimeCallbacks(onPostRuns);
  }
  function abort(what) {
    Module["onAbort"]?.(what);
    what = `Aborted(${what})`;
    err(what);
    ABORT = true;
    what += ". Build with -sASSERTIONS for more info.";
    var e = new WebAssembly.RuntimeError(what);
    throw e;
  }
  var wasmBinaryFile;
  function findWasmBinary() {
    return binaryDecode('\0asm\0\0\0t`\x7F\x7F\x7F\x7F`\x7F\0`\x7F\x7F`\x7F\x7F\0`\0\0`\0\x7F`\x7F\x7F\x7F\0`\x7F\x7F\x7F\x7F\x7F\0`\x7F\x7F\x7F\x7F\0`\x7F\x7F\x7F\x7F\x7F\x7F\0`\x7F\x7F\x7F`\b\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\0`\x7F\x7F\x7F~~\0`\x7F\x7F\x7F\x7F\x7F`\x7F~\x7F\x7F\x7F`\x7F\x7F\x7F\x7F\x7F\x7F`\x7F~\x7F~aaa\0ab\0\vac\0\x07ad\0ae\0af\0\fag\0\rah\0ai\0aj\0\bak\0al\0am\0an\0ao\0ap\0;:\x07\0\b\n\0\n		\x07\x07\b\b\0\0\0\0\np\'\'\x07\xA2\x80\x80	\x7FA\xF0\xCC\x84\v\x07!\bq\0r\0Is\0Ht\0u\0v\0w\x000x\0/	,\0A\v&(<;6-,D+GFC.BE*A@?=>:98137245\f\n\x80\xA5:r\x7F#\0A\x80k"$\0@  L\r\0 A\x80\xC0q\r\0  k"A\x80 A\x80I"\x1B"@   \xFC\v\0\v E@@ \0 A\x80 A\x80k"A\xFFK\r\0\v\v \0  \v A\x80j$\0\vt\x7F E@ \0( (F\v \0 F@A\v ("-\0\0!@ \0("-\0\0"\0E\r\0 \0 G\r\0@ -\0! -\0"\0E\r Aj! Aj! \0 F\r\0\v\v \0 F\vX\x7F~@A\xDC\xC6\0(\0"\xAD \0\xADB\x07|B\xF8\xFF\xFF\xFF\x83|"B\xFF\xFF\xFF\xFFX@ \xA7"\0?\0AtM\r \0\n\r\vA\xB4\xC7\x80A06\0A\x7F\vA\xDC\xC6\0 \x006\0 \v\0 \0-\0\0A qE@   \0$\v\v=\x7FA \0 \0AM\x1B!@@ "\0\r\0A\xE0\xCC\x80(\0"E\r\0 \0\f\v\v \0E@"\0\v \0\v\xD1)\v\x7F#\0Ak"\n$\0@@@@@@@@@@@@ \0A\xF4M@A\xF0\xC8\x80(\0"A \0A\vjA\xF8q \0A\vI\x1B"Av"\0v"Aq@@ A\x7FsAq \0j"At"A\x98\xC9\x80j"\0 (\xA0\xC9\x80"(\b"F@A\xF0\xC8\x80 A~ wq6\0\f\v  \x006\f \0 6\b\v A\bj!\0  Ar6  j" (Ar6\f\r\v A\xF8\xC8\x80(\0"\bM\r @@A \0t"A\0 kr  \0tqh"At"A\x98\xC9\x80j" (\xA0\xC9\x80"\0(\b"F@A\xF0\xC8\x80 A~ wq"6\0\f\v  6\f  6\b\v \0 Ar6 \0 j"\x07  k"Ar6 \0 j 6\0 \b@ \bAxqA\x98\xC9\x80j!A\x84\xC9\x80(\0!\x7F A \bAvt"qE@A\xF0\xC8\x80  r6\0 \f\v (\b\v!  6\b  6\f  6\f  6\b\v \0A\bj!\0A\x84\xC9\x80 \x076\0A\xF8\xC8\x80 6\0\f\r\vA\xF4\xC8\x80(\0"\vE\r \vhAt(\xA0\xCB\x80"(Axq k! !@@ ("\0E@ ("\0E\r\v \0(Axq k"   I"\x1B! \0  \x1B! \0!\f\v\v (!	  (\f"\0G@ (\b" \x006\f \0 6\b\f\f\v ("\x7F Aj ("E\r Aj\v!@ !\x07 "\0Aj! \0("\r\0 \0Aj! \0("\r\0\v \x07A\x006\0\f\v\vA\x7F! \0A\xBF\x7FK\r\0 \0A\vj"Axq!A\xF4\xC8\x80(\0"\x07E\r\0A!\bA\0 k! \0A\xF4\xFF\xFF\x07M@ A& A\bvg"\0kvAq \0AtkA>j!\b\v@@@ \bAt(\xA0\xCB\x80"E@A\0!\0\f\vA\0!\0 A \bAvkA\0 \bAG\x1Bt!@@ (Axq k" O\r\0 ! "\r\0A\0! !\0\f\v \0 ("   AvAqj("F\x1B \0 \x1B!\0 At! \r\0\v\v \0 rE@A\0!A \bt"\0A\0 \0kr \x07q"\0E\r \0hAt(\xA0\xCB\x80!\0\v \0E\r\v@ \0(Axq k" I!   \x1B! \0  \x1B! \0("\x7F  \0(\v"\0\r\0\v\v E\r\0 A\xF8\xC8\x80(\0 kO\r\0 (!\b  (\f"\0G@ (\b" \x006\f \0 6\b\f\n\v ("\x7F Aj ("E\r Aj\v!@ ! "\0Aj! \0("\r\0 \0Aj! \0("\r\0\v A\x006\0\f	\v A\xF8\xC8\x80(\0"M@A\x84\xC9\x80(\0!\0@  k"AO@ \0 j" Ar6 \0 j 6\0 \0 Ar6\f\v \0 Ar6 \0 j" (Ar6A\0!A\0!\vA\xF8\xC8\x80 6\0A\x84\xC9\x80 6\0 \0A\bj!\0\f\v\v A\xFC\xC8\x80(\0"I@A\xFC\xC8\x80  k"6\0A\x88\xC9\x80A\x88\xC9\x80(\0"\0 j"6\0  Ar6 \0 Ar6 \0A\bj!\0\f\v\vA\0!\0 A/j"\x7FA\xC8\xCC\x80(\0@A\xD0\xCC\x80(\0\f\vA\xD4\xCC\x80B\x7F7\0A\xCC\xCC\x80B\x80\xA0\x80\x80\x80\x807\0A\xC8\xCC\x80 \nA\fjApqA\xD8\xAA\xD5\xAAs6\0A\xDC\xCC\x80A\x006\0A\xAC\xCC\x80A\x006\0A\x80 \v"j"A\0 k"\x07q" M\r\nA\xA8\xCC\x80(\0"@A\xA0\xCC\x80(\0"\b j"	 \bM\r\v  	I\r\v\vA\xAC\xCC\x80-\0\0Aq\r@@A\x88\xC9\x80(\0"@A\xB0\xCC\x80!\0@ \0(\0"\b M@  \b \0(jI\r\v \0(\b"\0\r\0\v\vA\0"A\x7FF\r !A\xCC\xCC\x80(\0"\0Ak" q@  k  jA\0 \0kqj!\v  M\rA\xA8\xCC\x80(\0"\0@A\xA0\xCC\x80(\0" j"\x07 M\r \0 \x07I\r\v "\0 G\r\f\x07\v  k \x07q"" \0(\0 \0(jF\r !\0\v@ \0A\x7FF\r\0  A0jO\r\0A\xD0\xCC\x80(\0"  kjA\0 kq"A\x7FF\r  j! \0!\f\v \0"A\x7FG\r\f\vA\0!\0\f\b\vA\0!\0\f\v A\x7FG\r\vA\xAC\xCC\x80A\xAC\xCC\x80(\0Ar6\0\v !A\0!\0 A\x7FF\r \0A\x7FF\r \0 M\r \0 k" A(jM\r\vA\xA0\xCC\x80A\xA0\xCC\x80(\0 j"\x006\0A\xA4\xCC\x80(\0 \0I@A\xA4\xCC\x80 \x006\0\v@@@A\x88\xC9\x80(\0"@A\xB0\xCC\x80!\0@  \0(\0" \0("jF\r \0(\b"\0\r\0\v\f\vA\x80\xC9\x80(\0"\0A\0 \0 M\x1BE@A\x80\xC9\x80 6\0\vA\0!\0A\xB4\xCC\x80 6\0A\xB0\xCC\x80 6\0A\x90\xC9\x80A\x7F6\0A\x94\xC9\x80A\xC8\xCC\x80(\x006\0A\xBC\xCC\x80A\x006\0@ \0At" A\x98\xC9\x80j"6\xA0\xC9\x80  6\xA4\xC9\x80 \0Aj"\0A G\r\0\vA\xFC\xC8\x80 A(k"\0A\0 kA\x07q"k"6\0A\x88\xC9\x80  j"6\0  Ar6 \0 jA(6A\x8C\xC9\x80A\xD8\xCC\x80(\x006\0\f\v  M\r\0  K\r\0 \0(\fA\bq\r\0 \0  j6A\x88\xC9\x80 A\0 kA\x07q"\0j"6\0A\xFC\xC8\x80A\xFC\xC8\x80(\0 j" \0k"\x006\0  \0Ar6  jA(6A\x8C\xC9\x80A\xD8\xCC\x80(\x006\0\f\vA\x80\xC9\x80(\0 K@A\x80\xC9\x80 6\0\v  j!A\xB0\xCC\x80!\0@@  \0(\0"G@ \0(\b"\0\r\f\v\v \0-\0\fA\bqE\r\vA\xB0\xCC\x80!\0@@ \0(\0" M@   \0(j"I\r\v \0(\b!\0\f\v\vA\xFC\xC8\x80 A(k"\0A\0 kA\x07q"k"\x076\0A\x88\xC9\x80  j"6\0  \x07Ar6 \0 jA(6A\x8C\xC9\x80A\xD8\xCC\x80(\x006\0  A\' kA\x07qjA/k"\0 \0 AjI\x1B"A\x1B6 A\xB8\xCC\x80)\x007 A\xB0\xCC\x80)\x007\bA\xB4\xCC\x80 6\0A\xB8\xCC\x80 A\bj6\0A\xB0\xCC\x80 6\0A\xBC\xCC\x80A\x006\0 Aj!\0@ \0A\x076 \0A\bj \0Aj!\0 I\r\0\v  F\r\0  (A~q6   k"Ar6  6\0\x7F A\xFFM@ A\xF8qA\x98\xC9\x80j!\0\x7FA\xF0\xC8\x80(\0"A Avt"qE@A\xF0\xC8\x80  r6\0 \0\f\v \0(\b\v! \0 6\b  6\fA\f!A\b\f\vA!\0 A\xFF\xFF\xFF\x07M@ A& A\bvg"\0kvAq \0AtrA>s!\0\v  \x006 B\x007 \0AtA\xA0\xCB\x80j!@@A\xF4\xC8\x80(\0"A \0t"qE@A\xF4\xC8\x80  r6\0  6\0\f\v A \0AvkA\0 \0AG\x1Bt!\0 (\0!@ "(Axq F\r \0Av! \0At!\0  Aqj"("\r\0\v  6\v  6A\b! "!\0A\f\f\v (\b"\0 6\f  6\b  \x006\bA\0!\0A!A\f\v j 6\0  j \x006\0\vA\xFC\xC8\x80(\0"\0 M\r\0A\xFC\xC8\x80 \0 k"6\0A\x88\xC9\x80A\x88\xC9\x80(\0"\0 j"6\0  Ar6 \0 Ar6 \0A\bj!\0\f\vA\xB4\xC7\x80A06\0A\0!\0\f\v \0 6\0 \0 \0( j6 A\0 kA\x07qj"\b Ar6 A\0 kA\x07qj"  \bj"k!\x07@A\x88\xC9\x80(\0 F@A\x88\xC9\x80 6\0A\xFC\xC8\x80A\xFC\xC8\x80(\0 \x07j"\x006\0  \0Ar6\f\vA\x84\xC9\x80(\0 F@A\x84\xC9\x80 6\0A\xF8\xC8\x80A\xF8\xC8\x80(\0 \x07j"\x006\0  \0Ar6 \0 j \x006\0\f\v ("\0AqAF@ \0Axq!	 (\f!@ \0A\xFFM@ (\b" F@A\xF0\xC8\x80A\xF0\xC8\x80(\0A~ \0Avwq6\0\f\v  6\f  6\b\f\v (!@  G@ (\b"\0 6\f  \x006\b\f\v@ ("\0\x7F Aj ("\0E\r Aj\v!@ ! \0"Aj! \0("\0\r\0 Aj! ("\0\r\0\v A\x006\0\f\vA\0!\v E\r\0@ ("\0At"(\xA0\xCB\x80 F@ A\xA0\xCB\x80j 6\0 \rA\xF4\xC8\x80A\xF4\xC8\x80(\0A~ \0wq6\0\f\v@  (F@  6\f\v  6\v E\r\v  6 ("\0@  \x006 \0 6\v ("\0E\r\0  \x006 \0 6\v \x07 	j!\x07  	j"(!\0\v  \0A~q6  \x07Ar6  \x07j \x076\0 \x07A\xFFM@ \x07A\xF8qA\x98\xC9\x80j!\0\x7FA\xF0\xC8\x80(\0"A \x07Avt"qE@A\xF0\xC8\x80  r6\0 \0\f\v \0(\b\v! \0 6\b  6\f  \x006\f  6\b\f\vA! \x07A\xFF\xFF\xFF\x07M@ \x07A& \x07A\bvg"\0kvAq \0AtrA>s!\v  6 B\x007 AtA\xA0\xCB\x80j!\0@@A\xF4\xC8\x80(\0"A t"qE@A\xF4\xC8\x80  r6\0 \0 6\0\f\v \x07A AvkA\0 AG\x1Bt! \0(\0!@ "\0(Axq \x07F\r Av! At! \0 Aqj"("\r\0\v  6\v  \x006  6\f  6\b\f\v \0(\b" 6\f \0 6\b A\x006  \x006\f  6\b\v \bA\bj!\0\f\v@ \bE\r\0@ ("At"(\xA0\xCB\x80 F@ A\xA0\xCB\x80j \x006\0 \0\rA\xF4\xC8\x80 \x07A~ wq"\x076\0\f\v@  \b(F@ \b \x006\f\v \b \x006\v \0E\r\v \0 \b6 ("@ \0 6  \x006\v ("E\r\0 \0 6  \x006\v@ AM@   j"\0Ar6 \0 j"\0 \0(Ar6\f\v  Ar6  j" Ar6  j 6\0 A\xFFM@ A\xF8qA\x98\xC9\x80j!\0\x7FA\xF0\xC8\x80(\0"A Avt"qE@A\xF0\xC8\x80  r6\0 \0\f\v \0(\b\v! \0 6\b  6\f  \x006\f  6\b\f\vA!\0 A\xFF\xFF\xFF\x07M@ A& A\bvg"\0kvAq \0AtrA>s!\0\v  \x006 B\x007 \0AtA\xA0\xCB\x80j!@@ \x07A \0t"qE@A\xF4\xC8\x80  \x07r6\0  6\0  6\f\v A \0AvkA\0 \0AG\x1Bt!\0 (\0!@ "(Axq F\r \0Av! \0At!\0  Aqj"\x07("\r\0\v \x07 6  6\v  6\f  6\b\f\v (\b"\0 6\f  6\b A\x006  6\f  \x006\b\v A\bj!\0\f\v@ 	E\r\0@ ("At"(\xA0\xCB\x80 F@ A\xA0\xCB\x80j \x006\0 \0\rA\xF4\xC8\x80 \vA~ wq6\0\f\v@  	(F@ 	 \x006\f\v 	 \x006\v \0E\r\v \0 	6 ("@ \0 6  \x006\v ("E\r\0 \0 6  \x006\v@ AM@   j"\0Ar6 \0 j"\0 \0(Ar6\f\v  Ar6  j" Ar6  j 6\0 \b@ \bAxqA\x98\xC9\x80j!\0A\x84\xC9\x80(\0!\x7FA \bAvt"\x07 qE@A\xF0\xC8\x80  \x07r6\0 \0\f\v \0(\b\v! \0 6\b  6\f  \x006\f  6\b\vA\x84\xC9\x80 6\0A\xF8\xC8\x80 6\0\v A\bj!\0\v \nAj$\0 \0\v\xA5\f\b\x7F@ \0E\r\0 \0A\bk" \0Ak(\0"Axq"\0j!@ Aq\r\0 AqE\r  (\0"k"A\x80\xC9\x80(\0I\r \0 j!\0@@@A\x84\xC9\x80(\0 G@ (\f! A\xFFM@  (\b"G\rA\xF0\xC8\x80A\xF0\xC8\x80(\0A~ Avwq6\0\f\v (!\x07  G@ (\b" 6\f  6\b\f\v ("\x7F Aj ("E\r Aj\v!@ ! "Aj! ("\r\0 Aj! ("\r\0\v A\x006\0\f\v ("AqAG\rA\xF8\xC8\x80 \x006\0  A~q6  \0Ar6  \x006\0\v  6\f  6\b\f\vA\0!\v \x07E\r\0@ ("At"(\xA0\xCB\x80 F@ A\xA0\xCB\x80j 6\0 \rA\xF4\xC8\x80A\xF4\xC8\x80(\0A~ wq6\0\f\v@  \x07(F@ \x07 6\f\v \x07 6\v E\r\v  \x076 ("@  6  6\v ("E\r\0  6  6\v  O\r\0 ("AqE\r\0@@@@ AqE@A\x88\xC9\x80(\0 F@A\x88\xC9\x80 6\0A\xFC\xC8\x80A\xFC\xC8\x80(\0 \0j"\x006\0  \0Ar6 A\x84\xC9\x80(\0G\rA\xF8\xC8\x80A\x006\0A\x84\xC9\x80A\x006\0\vA\x84\xC9\x80(\0"\x07 F@A\x84\xC9\x80 6\0A\xF8\xC8\x80A\xF8\xC8\x80(\0 \0j"\x006\0  \0Ar6 \0 j \x006\0\v Axq \0j!\0 (\f! A\xFFM@ (\b" F@A\xF0\xC8\x80A\xF0\xC8\x80(\0A~ Avwq6\0\f\v  6\f  6\b\f\v (!\b  G@ (\b" 6\f  6\b\f\v ("\x7F Aj ("E\r Aj\v!@ ! "Aj! ("\r\0 Aj! ("\r\0\v A\x006\0\f\v  A~q6  \0Ar6 \0 j \x006\0\f\vA\0!\v \bE\r\0@ ("At"(\xA0\xCB\x80 F@ A\xA0\xCB\x80j 6\0 \rA\xF4\xC8\x80A\xF4\xC8\x80(\0A~ wq6\0\f\v@  \b(F@ \b 6\f\v \b 6\v E\r\v  \b6 ("@  6  6\v ("E\r\0  6  6\v  \0Ar6 \0 j \x006\0  \x07G\r\0A\xF8\xC8\x80 \x006\0\v \0A\xFFM@ \0A\xF8qA\x98\xC9\x80j!\x7FA\xF0\xC8\x80(\0"A \0Avt"\0qE@A\xF0\xC8\x80 \0 r6\0 \f\v (\b\v!\0  6\b \0 6\f  6\f  \x006\b\vA! \0A\xFF\xFF\xFF\x07M@ \0A& \0A\bvg"kvAq AtrA>s!\v  6 B\x007 AtA\xA0\xCB\x80j!\x7F@\x7FA\xF4\xC8\x80(\0"A t"qE@A\xF4\xC8\x80  r6\0  6\0A!A\b\f\v \0A AvkA\0 AG\x1Bt! (\0!@ "(Axq \0F\r Av! At!  Aqj"("\r\0\v  6A! !A\b\v!\0 "\f\v (\b" 6\f  6\bA!\0A\b!A\0\v!  j 6\0  6\f \0 j 6\0A\x90\xC9\x80A\x90\xC9\x80(\0Ak"\0A\x7F \0\x1B6\0\v\v\x9D\x7F#\0Ak"$\0  6\f#\0A\xD0k"$\0  6\xCC A\xA0j"A\0A(\xFC\v\0  (\xCC6\xC8A\0  A\xC8j A\xD0\0j !A\0N@ \0 \0(\0"A_q6\0@@@ \0(0E@ \0A\xD0\x0060 \0A\x006 \0B\x007 \0(,! \0 6,\f\v \0(\r\v \0\r\v \0  A\xC8j A\xD0\0j A\xA0j!\v @ \0A\0A\0 \0($\0\0 \0A\x0060 \0 6, \0A\x006 \0( \0B\x007\v \0 \0(\0 A qr6\0\v A\xD0j$\0 Aj$\0\v\x07\0 \0\0\v\0 \0\vY\x7F \0 \0(H"Ak r6H \0(\0"A\bq@ \0 A r6\0A\x7F\v \0B\x007 \0 \0(,"6 \0 6 \0  \0(0j6A\0\v\x9A\0 \0A:\x005@  \0(G\r\0 \0A:\x004@ \0("E@ \0A6$ \0 6 \0 6 AG\r \0(0AF\r\f\v  F@ \0("AF@ \0 6 !\v \0(0AG\r AF\r\f\v \0 \0($Aj6$\v \0A:\x006\v\vv\x7F \0($"E@ \0 6 \0 6 \0A6$ \0 \0(86\v@@ \0( \0(8G\r\0 \0( G\r\0 \0(AG\r \0 6\v \0A:\x006 \0A6 \0 Aj6$\v\v\0\v\x9A\0 \0E@A\0\v\x7F@ \0\x7F A\xFF\0M\r@A\xD8\xC6\0(\0(\0E@ A\x80\x7FqA\x80\xBFF\r\f\v A\xFFM@ \0 A?qA\x80r:\0 \0 AvA\xC0r:\0\0A\f\v A\x80@qA\x80\xC0G A\x80\xB0OqE@ \0 A?qA\x80r:\0 \0 A\fvA\xE0r:\0\0 \0 AvA?qA\x80r:\0A\f\v A\x80\x80kA\xFF\xFF?M@ \0 A?qA\x80r:\0 \0 AvA\xF0r:\0\0 \0 AvA?qA\x80r:\0 \0 A\fvA?qA\x80r:\0A\f\v\vA\xB4\xC7\x80A6\0A\x7FA\v\f\v \0 :\0\0A\v\v\xB4\0@@@@@@@@@@@ A	k\0\b	\n\b	\n	\n\n\b	\x07\v  (\0"Aj6\0 \0 (\x006\0\v  (\0"Aj6\0 \0 2\x007\0\v  (\0"Aj6\0 \0 3\x007\0\v  (\0"Aj6\0 \0 0\0\x007\0\v  (\0"Aj6\0 \0 1\0\x007\0\v  (\0A\x07jAxq"A\bj6\0 \0 +\x009\0\v\0\v\v  (\0"Aj6\0 \0 4\x007\0\v  (\0"Aj6\0 \0 5\x007\0\v  (\0A\x07jAxq"A\bj6\0 \0 )\x007\0\vo\x7F \0(\0",\0\0A0k"A	K@A\0\v@A\x7F! A\xCC\x99\xB3\xE6\0M@A\x7F  A\nl"j  A\xFF\xFF\xFF\xFF\x07sK\x1B!\v \0 Aj"6\0 ,\0 ! !A0k"A\nI\r\0\v \v\x8D\x7F~#\0A@j"$\0  6< A)j! A\'j! A(j!@@@@@A\0!@  \vA\xFF\xFF\xFF\xFF\x07sJ\r  \vj!\v (<"\n!@@@@ \n-\0\0"\x07@@@@ \x07A\xFFq"E@ !\b\f\v A%G\r !\x07@ \x07-\0A%G@ \x07!\b\f\v Aj! \x07-\0 \x07Aj"\b!\x07A%F\r\0\v\v  \b6<  \nk" \vA\xFF\xFF\xFF\xFF\x07s"J\r	 \0@ \0 \n \v \r\x07 \bAj!A\x7F!@ \b,\0A0k"A	K\r\0 \b-\0A$G\r\0 \bAj!A! !\v  6<A\0!\f@ ,\0\0"\x07A k"\bAK@ !\f\v !A \bt"\bA\x89\xD1qE\r\0@  Aj"6< \b \fr!\f ,\0"\x07A k"\bA O\r !A \bt"\bA\x89\xD1q\r\0\v\v@ \x07A*F@\x7F@ ,\0A0k"A	K\r\0 -\0A$G\r\0\x7F \0E@  AtjA\n6\0A\0\f\v  Atj(\0\v!\r Aj!A\f\v \r Aj! \0E@  6<A\0!A\0!\r\f\v  (\0"Aj6\0 (\0!\rA\0\v!  6< \rA\0N\rA\0 \rk!\r \fA\x80\xC0\0r!\f\f\v A<j "\rA\0H\r\n (<!\vA\0!A\x7F!	\x7FA\0 -\0\0A.G\r\0 -\0A*F@\x7F@ ,\0A0k"\x07A	K\r\0 -\0A$G\r\0 Aj!\x7F \0E@  \x07AtjA\n6\0A\0\f\v  \x07Atj(\0\v\f\v \r Aj!A\0 \0E\r\0  (\0"\x07Aj6\0 \x07(\0\v!	  6< 	A\0N\f\v  Aj6< A<j !	 (<!A\v!@ !A!\b ",\0\0"A\xFB\0kAFI\r\v Aj! A:l jA\x9F%j-\0\0"AkA\xFFqA\bI\r\0\v  6<@ A\x1BG@ E\r\f A\0N@ \0E@  Atj 6\0\f\f\v   Atj)\x0070\f\v \0E\r\b A0j  \f\v A\0N\r\vA\0! \0E\r\b\v \0-\0\0A q\r\v \fA\xFF\xFF{q"\x07 \f \fA\x80\xC0\0q\x1B!A\0!\fA\xE4\b! !\b@@\x7F@@@@@@\x7F@@@@@@@ -\0\0"\xC0"ASq  AqAF\x1B  \x1B"A\xD8\0k!	\n\0\v@ A\xC1\0k\x07\v\0\v A\xD3\0F\r\v\f\v )0!A\xE4\b\f\vA\0!@@@@@@@ \b\0\v (0 \v6\0\f\x1B\v (0 \v6\0\f\v (0 \v\xAC7\0\f\v (0 \v;\0\f\v (0 \v:\0\0\f\v (0 \v6\0\f\v (0 \v\xAC7\0\f\vA\b 	 	A\bM\x1B!	 A\br!A\xF8\0!\v !\x07 )0""B\0R@ A q!\n@ \x07Ak"\x07 \xA7Aq-\0\xB0) \nr:\0\0 B\x88"B\0R\r\0\v\v \x07!\n P\r A\bqE\r AvA\xE4\bj!A!\f\f\v ! )0""B\0R@@ Ak" \xA7A\x07qA0r:\0\0 B\x88"B\0R\r\0\v\v !\n A\bqE\r 	  k"  	H\x1B!	\f\v )0"B\0S@ B\0 }"70A!\fA\xE4\b\f\v A\x80q@A!\fA\xE5\b\f\vA\xE6\bA\xE4\b Aq"\f\x1B\v! ! "B\x80\x80\x80\x80Z@@ Ak" " B\n\x80"B\n~}\xA7A0r:\0\0 B\xFF\xFF\xFF\xFF\x9FV\r\0\v\v \xA7!\x07 B\nZ@@ Ak" \x07"\n \x07A\nn"\x07A\nlkA0r:\0\0 \nA\xE3\0K\r\0\v\v \x07@ Ak" \x07A0r:\0\0\v !\n\v  	A\0Hq\r A\xFF\xFF{q  \x1B!@ B\0R\r\0 	\r\0 !\nA\0!	\f\v 	 P  \nkj"  	H\x1B!	\f\r\v -\x000!\f\v\v\x7FA\xFF\xFF\xFF\xFF\x07 	 	A\xFF\xFF\xFF\xFF\x07O\x1B""A\0G!\b@@@ (0"A\xE9 \x1B"\n"AqE\r\0 E\r\0@ -\0\0E\r Ak"A\0G!\b Aj"AqE\r \r\0\v\v \bE\r@ -\0\0E\r\0 AI\r\0@A\x80\x82\x84\b (\0"\bk \brA\x80\x81\x82\x84xqA\x80\x81\x82\x84xG\r Aj! Ak"AK\r\0\v\v E\r\v@  -\0\0E\r Aj! Ak"\r\0\v\vA\0\v" \nk  \x1B" \nj!\b 	A\0N@ \x07! !	\f\f\v \x07! !	 \b-\0\0\r\f\v\v )0"B\0R\rA\0!\f	\v 	@ (0\f\vA\0! \0A  \rA\0 \f\v A\x006\f  >\b  A\bj"60A\x7F!	 \v!\x07A\0!@@ \x07(\0"\nE\r\0 Aj \n"\nA\0H\r \n 	 kK\r\0 \x07Aj!\x07  \nj" 	I\r\v\vA=!\b A\0H\r\f \0A  \r   E@A\0!\f\vA\0!\b (0!\x07@ \x07(\0"\nE\r Aj"	 \n"\n \bj"\b K\r \0 	 \n \x07Aj!\x07  \bK\r\0\v\v \0A  \r  A\x80\xC0\0s \r   \rH\x1B!\f\b\v  	A\0Hq\r	A=!\b +0\0\v -\0!\x07 Aj!\f\0\v\0\v \0\r	 E\rA!@  Atj(\0"\0@  Atj \0 A!\v Aj"A\nG\r\f\v\v\v A\nO@A!\v\f\n\v@  Atj(\0\rA!\v Aj"A\nG\r\0\v\f	\vA!\b\f\v  :\0\'A!	 !\n \x07!\v 	 \b \nk" 	 J\x1B"	 \fA\xFF\xFF\xFF\xFF\x07sJ\rA=!\b \r 	 \fj"\x07 \x07 \rH\x1B" K\r \0A   \x07  \0  \f \0A0  \x07 A\x80\x80s \0A0 	 A\0 \0 \n  \0A   \x07 A\x80\xC0\0s\f\v\v\vA\0!\v\f\vA=!\b\vA\xB4\xC7\x80 \b6\0\vA\x7F!\v\v A@k$\0 \v\v\0\v\0\v\0  \0  $"\0F@\v \0 n\v\xC8\x7F@ ("\x7F  \r (\v ("k I@  \0  ($\0\0\v@@ (PA\0H\r\0 E\r\0 !@ \0 j"Ak-\0\0A\nG@ Ak"\r\f\v\v  \0  ($\0\0" I\r  k! (!\f\v \0!A\0!\v @   \xFC\n\0\0\v  ( j6  j!\v \v\x7F\x7F#\0Ak"$\0 A\xDD\0:\0@@ \0("\x7F  \0\r \0(\v \0("F\r\0 \0(PA\xDD\0F\r\0 \0 Aj6 A\xDD\0:\0\0\f\v \0 AjA \0($\0\0AG\r\0 -\0\v Aj$\0\v\xA6\x7F@A\x94\xC7\x80(\0"\0E\r\0 \0(\0A\xF4\xC6\x80G\r\0 \0(\xCC"@A\xA0\xC7\x80(\0 A\x9C\xC7\x80(\0\0\v \0(\xD0"@A\xA0\xC7\x80(\0 A\x9C\xC7\x80(\0\0\v \0(\xD4"\0@A\xA0\xC7\x80(\0 \0A\x9C\xC7\x80(\0\0\vA\xA0\xC7\x80(\0A\x94\xC7\x80(\0A\x9C\xC7\x80(\0\0A\x94\xC7\x80A\x006\0\v\v<\x7FA\x80!@  jAu"  \0  Atj(\0H"\x1B"   \x1B"kAG\r\0\v \v\xDA\0A\xF0*A\xCF\vA\xFC*A\xBE\nAA\0	A\x88+A\xEE	AA\x80\x7FA\xFF\0A\xA0+A\xE7	AA\x80\x7FA\xFF\0A\x94+A\xE5	AA\0A\xFFA\xAC+A\x90	AA\x80\x80~A\xFF\xFFA\xB8+A\x87	AA\0A\xFF\xFFA\xC4+A\x9F	AA\x80\x80\x80\x80xA\xFF\xFF\xFF\xFF\x07A\xD0+A\x96	AA\0A\x7FA\xDC+A\xF1\nAA\x80\x80\x80\x80xA\xFF\xFF\xFF\xFF\x07A\xE8+A\xE8\nAA\0A\x7FA\xF4+A\xDE\nA\bB\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0A\x80,A\xD5\nA\bB\0B\x7FA\x8C,A\xA3	AA\x98,A\xBD\vA\bA\x84%A\x83\v\bA\xE0AA\xF6\nA\xA8AA\x8F\vA\xF4AA\x9E\vA\x80\b\x07A\xC0 A\0A\xAB\0A\xE8 A\0A\xF0\0A\x90!AA\xC9\0A\xB8!AA\xF8\v\0A\xE0!AA\x97\f\0A\x88"AA\xBF\f\0A\xB0"AA\xDC\f\0A\xD8"AA\x95\0A\x80#AA\xB3\0A\xE8 A\0A\xC2\r\0A\x90!AA\xA1\r\0A\xB8!AA\x84\0A\xE0!AA\xE2\r\0A\x88"AA\x8A\0A\xB0"AA\xE8\0A\xA8#A\bA\xC7\0A\xD0#A	A\xA5\0A\xF8#AA\x82\r\0A\xA0$A\x07A\xDA\0\vC\x7F#\0Ak"$\0 A\xFA6  \x006\0A\xD0%(\0"A\xA5\x1B  \0A\xEF\x07F@A\x84A\xA0\b #\vA\0\v\xD4\0A\xD4	AA\xC8$A\xCC$AAA\0A\0A\xC2	AA\xC8$A\xCC$AAA\0A\0A\xAD\vAA\xD0$A\xD4$AAA\0A\0A\xB8\nAA\xD8$A\xDC$A\x07A\bA\0A\0A\xFB\bAA\xE0$A\xE4$A	A\nA\0A\0A\xEE\bAA\xE8$A\xF0$A\vA\fA\0A\0A\xB3\nAA\xD8$A\xDC$A\x07A\rA\0A\0A\xC3\nAA\xD0$A\xD4$AAA\0A\0A\xC4\vAA\xF4$A\xF8$AAA\0A\0A\xB3	AA\xFC$A\xCB%AAA\0A\0\v(\0A\xF8\xC6\x80 \x006\0A\xF4\xC6\x80A\xF0\xC6\x006\0 \0E@A\xA4\xC7\x80A:\0\0\v\v \0A\xF8\xC6\x80(\0EA\xF0\xC6\x80-\0\0A\xA4\xC7\x80-\0\0A\x7Fsqq\v\xB0\x7FA\xF0\xC6\x80-\0\0AF@&\vA\xF4\xC6\x80B\x007\0A\xFC\xC6\x80B\x007\0A\x84\xC7\x80B\x007\0A\x8C\xC7\x80B\x007\0A\x94\xC7\x80B\x007\0A\x9C\xC7\x80B\x007\0A\xF0\xC6\x80A\0:\0\0A\xA4\xC7\x80A\0:\0\0A\xA8\xC7\x80A\x006\0A\xF0\xC6\x80\x7FA\x98\xC7\x80(\0"\0E@A\x98\xC7\x80A6\0A!\0\vA\x9C\xC7\x80(\0E@A\x9C\xC7\x80A6\0\vA}A\xA0\xC7\x80(\0A\xF4\xF4A \0\0\0"\0E\r\0 \0A\xF4\xC6\x806\0A\x94\xC7\x80 \x006\0 \0A\n6 \0A\x006\xE4 \0B\x007A\x8C\xC7\x80B\x007\0A\xFC\xC6\x80B\x007\0 \0A\x006\xD4 \0A\0:\0( \0B\x007\xCC \0A\x0060 \0A\x006,A\0\v"\0E:\0\0 \0\v\0A\xF0\xC6\x80-\0\0AF@&\vA\xF0\xC6\x80A\0:\0\0\v\0#\0\v\0 \0$\0\v\0 \0 (\b @    \x1B\v\v7\0 \0 (\b @    \x1B\v \0(\b"\0      \0(\0(	\0\v\xA4\0@ \0 (\b @  (G\r (AF\r  6\v \0 (\0 E\r\0@ ( G@  (G\r\v AG\r A6 \v  6  6   ((Aj6(@ ($AG\r\0 (AG\r\0 A:\x006\v A6,\v\v\x88\0@ \0 (\b @  (G\r (AF\r  6\v \0 (\0 @@ ( G@  (G\r\v AG\r A6 \v  6 @ (,AF\r\0 A\0;4 \0(\b"\0   A  \0(\0(	\0 -\x005AF@ A6, -\x004E\r\f\v A6,\v  6  ((Aj6( ($AG\r (AG\r A:\x006\v \0(\b"\0     \0(\0(\x07\0\v\v4\0 \0( (\b(F@   \v \0(\b"\0    \0(\0(\b\0\v\x07\0A\x80\x80\xC0\0\v\x1B\0 \0( (\b(F@   \v\v\xCE\x7F#\0A\xD0\0k"$\0@\x7FA \0( (F\r\0#\0A@j"$\0  (\0"A\bk(\0"\x07j!@ Ak(\0"(A\xF4)(\0F@A\0  \x07\x1B!\f\v  N@ B\x007 A\x006 A\xF0)6\f  6\b  6 B\x007 B\x007$ B\x007, A\x006< B\x81\x80\x80\x80\x80\x80\x80\x8074  Aj  AA\0 (\0(	\0 (\r\v B\x007 A\x006 A\xC0)6\f  6\b A\xF0)6 B\x007 B\x007$ B\x007, B\x007\x003 A\x006< A:\0;  Aj AA\0 (\0(\x07\0A\0!@@ ((\0\v (A\0 ($AF\x1BA\0 ( AF\x1BA\0 (,AF\x1B!\f\v (AG@ (,\r ( AG\r ($AG\r\v (!\v A@k$\0A\0 E\r\0 (\0"E\r AjA\0A8\xFC\v\0 A:\0K A\x7F6   \x006  6 A6D  Aj A (\0(\b\0 (,"\0AF@  ($6\0\v \0AF\v A\xD0\0j$\0\v A\xD4\v6\b A\xE76 A\xF3	6\0"\0\v\r\0 \0( (F\v\0 \0\v\x07\0A\xF0\xC6\xC0\0\v\0A\xF0\xC6\0\v\x88\x07\x7F#\0A k"$\0  \0("6 \0(!  6  6   k"6  j!\x7F@@@ \0(< Aj"A\br   F"\x1B"AA \x1B"\x07 A\fj"\x7FA\xB4\xC7\x80 6\0A\x7FA\0\v@ !\f\v@  (\f"F\r A\0H@ !\f\v A\bA\0  ("\bK"	\x1Bj"  \bA\0 	\x1Bk"\b (\0j6\0 A\fA 	\x1Bj" (\0 \bk6\0  k! \0(< " \x07 	k"\x07 A\fj"\x7FA\xB4\xC7\x80 6\0A\x7FA\0\vE\r\0\v\v A\x7FG\r\v \0 \0(,"6 \0 6 \0  \0(0j6 \f\v \0A\x006 \0B\x007 \0 \0(\0A r6\0A\0 \x07AF\r\0  (k\v A j$\0\vL\x7F \0(<#\0Ak"\0$\0  A\xFFq \0A\bj\f"\x7FA\xB4\xC7\x80 6\0A\x7FA\0\v! \0)\b! \0Aj$\0B\x7F  \x1B\v\0 \0(<\r"\0\x7FA\xB4\xC7\x80 \x006\0A\x7FA\0\v\v\v\0 @ \v\v	\0  l\vv\x7F#\0Ak"$\0 Aj"  \0\0 (\b ,\0" A\0H"\x1B"\0Aj" \x006\0 (! \0@ Aj   \x1B \0\xFC\n\0\0\v A\0H@ (\f \v Aj$\0 \v\x07\0 \0\0\v	\0  \0\0\v\x95\0@@@@@ A\x07j\0\vA0! \0B\xA9\x80\x80\x80\x80\x86\x80\x80\x80\x7F7 \0 6\0 A\xE7-\0\0:\0( A\xDF)\0\x007\0  A\xD7)\0\x007\0 A\xCF)\0\x007\0 A\xC7)\0\x007\0\b A\xBF)\0\x007\0\0 A\0:\0)\vA8! \0B\xB0\x80\x80\x80\x80\x87\x80\x80\x80\x7F7 \0 6\0 A\xD0)\0\x007\0( A\xC8)\0\x007\0  A\xC0)\0\x007\0 A\xB8)\0\x007\0 A\xB0)\0\x007\0\b A\xA8)\0\x007\0\0 A\0:\x000\vA8! \0B\xB5\x80\x80\x80\x80\x87\x80\x80\x80\x7F7 \0 6\0 A\xB6)\0\x007\0- A\xB1)\0\x007\0( A\xA9)\0\x007\0  A\xA1)\0\x007\0 A\x99)\0\x007\0 A\x91)\0\x007\0\b A\x89)\0\x007\0\0 A\0:\x005\vA ! \0B\x9A\x80\x80\x80\x80\x84\x80\x80\x80\x7F7 \0 6\0 A\xA5/\0\0;\0 A\x9D)\0\x007\0 A\x95)\0\x007\0\b A\x8D)\0\x007\0\0 A\0:\0\vA0! \0B\xAF\x80\x80\x80\x80\x86\x80\x80\x80\x7F7 \0 6\0 A\x80)\0\x007\0\' A\xF9)\0\x007\0  A\xF1)\0\x007\0 A\xE9)\0\x007\0 A\xE1)\0\x007\0\b A\xD9)\0\x007\0\0 A\0:\0/\v\n\0A\xA8\xC7\x80(\0\v\xE7\xA8I\x7FA\xA8\xC7\x80A\x006\0A\xF0\xC6\x80-\0\0AF\x7FA\x88\xC7\x80A\x80\x80\xC0\x006\0A\x84\xC7\x80A\xF0\xC6\xC0\x006\0#\0A k"%$\0A~!@A\x94\xC7\x80(\0"\0E\r\0 \0(\0A\xF4\xC6\x80G\r\0 \0A\xC4\bj!A\xD0%(\0! \0("A\nH!\x7F@A\x7F!@@ Ak\0\vA\0\f\v \r\0\vA\v!	\x7F@@@ 	E@ \0-\0! \0-\0(E\r \0(\0"\n(!@ @ E\r \0(\fE!	\f\v E\r \0(\fE!	\f\v@ 	AqE@ \n( \0-\0\b":\0\0  \0(\xE0"AvsAt(\xC0-! \0 \0(\fAk"6\f \0  A\bts6\xE0 \0(\0"\n \n(Aj"6 \n \n(Ak"6 \n \n(Aj6 E@ \n \n(Aj6\v E\r E!	\f\v \0(\xC0\b" \0(\xC0\xF4"\rAj"F\rA|!  H\r \0A6\f \0 \0(<":\0\b \0(8" \0($A\xA0\x8Dl"O\rA\x80!A\0!	@ 	 jAu"\b    \bAtj(\0H"\x07\x1B" 	 \b \x07\x1B"	kAG\r\0\v \0 \0(\xD0"\b Atj/\0" \0(\xD4"\x07 Avj-\0\0 AtAqvAtA\x80\x80<qr"68 \0("E@ \0("AtA\xC05j(\0! \0 Aj"A\0 A\x80G\x1B6\v \0 Aj"6\xC0\b \0 Ak"6@  \rF\r\0  	A\xFFq AFs"G@ \0 6<\f\v \0A6\f  O\r\x07A\x80!A\0!	@ 	 jAu"    Atj(\0H"\x1B" 	  \x1B"	kAG\r\0\v \0 \b Atj/\0" \x07 Avj-\0\0 AtAqvAtA\x80\x80<qr"68 E@ \0("AtA\xC05j(\0! \0 Aj"A\0 A\x80G\x1B6\v \0 Aj"6\xC0\b \0 Ak"6 \r F\r\0  	A\xFFq AFs"G@ \0 6<\f\v \0A6\f  O\r\x07A\x80!A\0!	@ 	 jAu"    Atj(\0H"\x1B" 	  \x1B"	kAG\r\0\v \0 \b Atj/\0" \x07 Avj-\0\0 AtAqvAtA\x80\x80<qr"68 E@ \0("AtA\xC05j(\0! \0 Aj"A\0 A\x80G\x1B6\v \0 Aj6\xC0\b \0 Ak"6 \r F\r\0  	A\xFFq AFs"\rG@ \0 \r6<\f\v  O\r\x07A\x80!A\0!	@ 	 jAu"\r    \rAtj(\0H"\x1B" 	 \r \x1B"	kAG\r\0\v \0 \b Atj/\0"\r \x07 Avj-\0\0 AtAqvAtA\x80\x80<qr"68 E@ \0("AtA\xC05j(\0! \0 Aj"A\0 A\x80G\x1B6\v \0 Aj6\xC0\b \0 Ak"6 \0 	A\xFFq AFsAj6\f  O\r\x07A\x80!A\0!	@ 	 jAu"    Atj(\0H"\x1B" 	  \x1B"	kAG\r\0\v \0 	6< \0 \b Atj/\0 \x07 Avj-\0\0 \rAtAqvAtA\x80\x80<qr68 E@ \0("AtA\xC05j(\0! \0 Aj"A\0 A\x80G\x1B6\v \0 Aj6\xC0\b \0 Ak"6 \0 	 AFs6<\vA\0!	 \n(\r\0\v\f\vA\0!A\0!A\0!A\0!\x07A\0!\fA\0!A\0!\rA\0!	A\0!A\0!A\0!A\0!A\0!A\0!A\0!\x1BA\0!A\0!A\0!A\0!A\0!A\0! A\0!!A\0!"A\0!#A\0!&A\0!\'A\0!A\0!)#\0Ak"$$\0 \0A\x94\xF4j!* \0(\0!@@@@\x7F@\x7F@@@@\x7F@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ \0("A\nF@ \0A\x98\xF4j!+ *A\0A\xE0\0\xFC\v\0 \0A\xF0\xF4j!, \0A\xEC\xF4j!- \0A\xE8\xF4j!. \0A\xE4\xF4j!/ \0A\xE0\xF4j!0 \0A\xDC\xF4j!1 \0A\xD8\xF4j!2 \0A\xD4\xF4j!3 \0A\xD0\xF4j!4 \0A\xCC\xF4j!5 \0A\xC8\xF4j!6 \0A\xC4\xF4j!7 \0A\xC0\xF4j!8 \0A\xBC\xF4j!9 \0A\xB8\xF4j!: \0A\xB4\xF4j!; \0A\xB0\xF4j!< \0A\xAC\xF4j!= \0A\xA8\xF4j!> \0A\xA4\xF4j!? \0A\xA0\xF4j!@ \0A\x9C\xF4j!A \0( "A\x07L\r A\bk! \0(!\v\f#\v \0A\xF0\xF4j!, \0A\xEC\xF4j!- \0A\xE8\xF4j!. \0A\xE4\xF4j!/ \0A\xE0\xF4j!0 \0A\xDC\xF4j!1 \0A\xD8\xF4j!2 \0A\xD4\xF4j!3 \0A\xD0\xF4j!4 \0A\xCC\xF4j!5 \0A\xC8\xF4j!6 \0A\xC4\xF4j!7 \0A\xC0\xF4j!8 \0A\xBC\xF4j!9 \0A\xB8\xF4j!: \0A\xB4\xF4j!; \0A\xB0\xF4j!< \0A\xAC\xF4j!= \0A\xA8\xF4j!> \0A\xA4\xF4j!? \0A\xA0\xF4j!@ \0A\x9C\xF4j!A \0A\x98\xF4j!+ \0(\xF0\xF4!  \0(\xEC\xF4!! \0(\xE8\xF4!" \0(\xE4\xF4! \0(\xE0\xF4!# \0(\xDC\xF4!\' \0(\xD8\xF4! \0(\xD4\xF4! \0(\xD0\xF4!) \0(\xCC\xF4!& \0(\xC8\xF4! \0(\xC4\xF4! \0(\xC0\xF4! \0(\xBC\xF4! \0(\xB8\xF4!\n \0(\xB4\xF4! \0(\xB0\xF4! \0(\xAC\xF4!\b \0(\xA8\xF4!\r \0(\xA4\xF4!\x1B \0(\xA0\xF4! \0(\x9C\xF4!	 \0(\x98\xF4! \0(\x94\xF4!\x07@@@@ A\vk(\x07*\b	\n\v\f:\r!"D#$%H \0\x1B\v \0( !\f0\v \0( !A\0\fG\v \0( !\fG\v \0( !A!\fF\v (!@ E@A\0!\nA\0!\b\fH\v (\0"-\0\0!\b \0 A\bj"\n6  \0 \b \0(A\btr"\v6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! \n!E\r\0\v\f!\v \0( !\f!\v \0( !\f!\v \0( !\f!\v \0( !\f"\v \0( !\f,\v \0( !\f,\v \0( !\f,\v \0( !\f,\v \0( !\f-\v \0( !\f-\v \0( !\f-\v \0( !\f-\v \0( !\f-\v \0( !\f-\v \0( !\f-\v \0( !\f0\v \0( !\fA\f1\v \0( !\f\v \0( !\f\v \0( !\f\v \0( !\f\v \0( !\f\v \0( !\f\v \0( !\f\v \0( !\f\vA\xA1)A\xA2)\f,\vA!\f*\vA!\f)\vA\f \vA!\f \vA!\f"\vA\f"\vA\f!\v \0 6  \v vA\xFFqA\xC2\0F@A\0!\bA\0!\n\f\vA{!A\0!\nA\0!\b\f%\v \0A\v6@ A\bN@ A\bk! \0(!\f\v (!@ E\r% (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6   vA\xFFqA\xDA\0F\r\0A{!\f$\v \0A\f6@ A\bN@ A\bk! \0(!\f\v (!@ E\r$ (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6   vA\xFFqA\xE8\0F\r\0A{!\f#\v \0A\r6@ A\bN@ A\bk! \0(!\f\v (!@ E\r# (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \0  vA\xFFq"6$ A:kAwI@A{!\f#\v \0 A0k"6$ (,! ($! \0-\0(@ \0  A\xC0\x9A\flA \0\x006\xD0 \0 (, \0($A\xA0\x8DlAuA ($\0\0"6\xD4A}! \0(\xD0E\r# E\r#\f\v \0  A\x80\xB5lA \0\0"6\xCC \r\0A}!\f"\v \0A6@ \0( "A\bN@ A\bk! \0(!\f\v \0(\0"(!@ E\r" (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6   vA\xFFq"AF\r A1F\r\0A|!\f!\v \0A6 A\bN@ A\bk! \0(!\f\n\v \0(\0"(!@ E\r  (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\f	\v \0A*6@ A\bN@ A\bk! \0(!\f\f\v \0(\0"(!@ E\r  (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\f6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \f vA\xFFqA\xF2\0F\r\0A|!\f\v \0A+6@ A\bN@ A\bk! \0(!\f\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\f6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \f vA\xFFqA\xC5\0F\r\0A|!\f\v \0A,6@ A\bN@ A\bk! \0(!\f\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\f6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \f vA\xFFqA8F\r\0A|!\f\v \0A-6@ A\bN@ A\bk! \0(!\f\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\f6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \f vA\xFFqA\xD0\0F\r\0A|!\f\v \0A.6@ A\bN@ A\bk! \0(!\f\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\f6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \f vA\xFFqA\x90G@A|!\f\v \0A\x006\xDC\v \0A/6@ A\bN@ A\bk! \0(!\f\f\v \0(\0"(!@ E\r\x1B (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\f6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \0 \f vA\xFFq \0(\xDCA\btr6\xDC\v \0A06@ A\bN@ A\bk! \0(!\f\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\f6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \0 \f vA\xFFq \0(\xDCA\btr6\xDC\v \0A16@ A\bN@ A\bk! \0(!\f\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\f6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \0 \f vA\xFFq \0(\xDCA\btr6\xDC\v \0A26@ A\bN@ A\bk! \0(!\f\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\f6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \0A6 \0 \f vA\xFFq \0(\xDCA\btr6\xDCA!\f\v \0 6   vA\xFFqA\xC1\0F\r\0A|!\f\v \0A6@ A\bN@ A\bk! \0(!\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6   vA\xFFqA\xD9\0F\r\0A|!\f\v \0A6@ A\bN@ A\bk! \0(!\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6   vA\xFFqA&F\r\0A|!\f\v \0A6@ A\bN@ A\bk! \0(!\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6   vA\xFFqA\xD3\0F\r\0A|!\f\v \0A6@ A\bN@ A\bk! \0(!\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6   vA\xFFqA\xD9\0G@A|!\f\v \0 \0(,Aj"6, \0(0AN@ $ 6\0A\xD0%(\0A\xF0 $\v \0A\x006\xD8\v \0A6@ \0( "A\bN@ A\bk! \0(!\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \0  vA\xFFq \0(\xD8A\btr6\xD8\v \0A6@ A\bN@ A\bk! \0(!\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \0  vA\xFFq \0(\xD8A\btr6\xD8\v \0A6@ A\bN@ A\bk! \0(!\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \0  vA\xFFq \0(\xD8A\btr6\xD8\v \0A6@ A\bN@ A\bk! \0(!\f\v \0(\0"(!@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \0  vA\xFFq \0(\xD8A\btr6\xD8\v \0A6@ A\0J@ \0(!\v\f\v \0(\0"(! !@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\v6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v AxJ !E\r\0\v\v \0A\x0064 \0 Ak"6  \0 \v vAq:\0\v \0A6@ A\bN@ A\bk! \0(!\f\v \0(\0"(!@ E\r\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \0  vA\xFFq \0(4A\btr64\v \0A6@ A\bN@ A\bk! \0(!\f\v \0(\0"(!@ E\r\f (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \0  vA\xFFq \0(4A\btr64\v \0A\x1B6@ A\bN@ A\bk! \0(!\f\v \0(\0"(!@ E\r\v (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A\0N ! !E\r\0\v\v \0 6  \0 \0(4A\bt"  vA\xFFqr"64A\0!A|! A\0H\r\n  \0($A\xA0\x8DlA\nrJ\r\nA\0\v!@@@ E@ AN\r !\x07A!\f\v \0A6@ \0( "A\0J@ \0(!\v\f\v \0(\0"(! !@ E\r\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\v6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v AxJ !E\r\0\v\v \0 Ak"6  \0 \x07jA\xECj \v vAq:\0\0 \x07Aj!\f\vA\0!\x07 \0A\xECjA\0A\x80\xFC\v\0A\0!\f\vA\0!\f\0\v\0\v@@\x7F@@ E@ \x07AJ\r \0 \x07jA\xECj-\0\0E\rA\0\f\v \0A6 \0( "A\0J@ \0(!\v\f\v \0(\0"(! !@ E\r\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\v6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v AxJ !E\r\0\v\f\vA\0! \0A\x006\xE8 \0A\xFCj! \0A\xECj!A\0!@  j-\0\0@  j :\0\0 \0 \0(\xE8Aj"6\xE8\v  Ar"j-\0\0@  j :\0\0 \0 \0(\xE8Aj"6\xE8\v Aj"A\x80G\r\0\v E@A|!\f\r\v Aj!\f\v \0 Ak"6  \v vAq@ \0 \x07Atj jA\xECjA:\0\0\v Aj\v"AJ\r\0A!\f\v \x07Aj!\x07A\0!\f\0\v\0\v \0A6@ \0( "AN@ \0(!\v\f\v \0(\0"(! !@ E\r\b (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\v6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v AzJ !E\r\0\v\v \0 Ak"6  \v vA\x07q"\x1BAkAI\r\0A|!\f\x07\v \0A6@ AN@ \0(!\v\f\v \0(\0"(! !@ E\r\x07 (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\v6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v AJ !E\r\0\v\v \0 Ak"6 A\0!\r \v vA\xFF\xFFq"@A\0!\x07A\0!\f\vA|!\f\v@@ E@  \x07L\r !\rA\0!A!\f\v \0A 6@@ \0( "A\0J@ \0(!\v\f\v \0(\0"(! !@ E\r	 (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\v6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v AxJ !E\r\0\v\v \0 Ak"6  \v vAq@A|! Aj" \x1BH\r\f	\v\v \0 \x07jA\x8E\xCAj :\0\0 \x07Aj!\x07 \r!A\0!\f\v\v@ \x1BA\0L\r\0 \x1BA\x07q!\x07A\0!A\0! \x1BA\bO@ \x1BA\xF8\xFF\xFF\xFF\x07q!A\0!@ $A\nj" j :\0\0  Ar"	j 	:\0\0  Ar"	j 	:\0\0  Ar"	j 	:\0\0  Ar"	j 	:\0\0  Ar"	j 	:\0\0  Ar"	j 	:\0\0  A\x07r"	j 	:\0\0 A\bj! A\bj" G\r\0\v \x07E\r\v@ $A\nj j :\0\0 Aj! Aj" \x07G\r\0\v\vA\0!	A\0!\x07 A\0J@ \0A\xBC=j! \0A\x8E\xCAj!\x07 $A	j!A\0!@  \x07j-\0\0" $A\nj"\vj-\0\0! @ \v  AkA\xFFqk"j  j \xFC\n\0\0\v $ :\0\n  j :\0\0 Aj" G\r\0\v !\x07\vA\0\v!@@@@\x7F@@@@@@@ \0\v 	 \x1BN\r !\rA!\f\n\v \0A!6 \0( "AH\r \0(!\v\f\vA\0!	 \x1BA\0J@ A\xFC\xFF\xFF\xFF\x07q! Aq!\v \0A\xFC\xF3j! \0A\xCC\xC3j!B \0A\x9C\x93j!C \0A\xEC\xE2j!D \0A\xE0\xD6j!A\0! A\0L!E AI!F@@ E@A !A\0!\f\v  A\x82lj!A\0!\x07A !A\0!A\0!	A\0!A\0!A\0! FE@@   	j"-\0\0"  I\x1B" -\0"\b  \bI\x1B" -\0"\r  \rI\x1B" -\0"  K\x1B!    K\x1B" \b  \bK\x1B" \r  \rK\x1B"   I\x1B! 	Aj!	 Aj" G\r\0\v ! 	! \vE\r\v !@   j-\0\0"  K\x1B!    I\x1B! Aj! \x07Aj"\x07 \vG\r\0\v\v D A\x88\bl"j!  Cj!\x07  Bj!\f  A\x82lj!	A\0!\r@  "H"(\r\0 A\0L\r\0 A\xFE\xFF\xFF\xFF\x07q! Aq!G !@ !\bA\0!A\0!@ AG@@  	j-\0\0 \bF@ \f \rAtj 6\0 \rAj!\r\v 	 Ar"Hj-\0\0 \bF@ \f \rAtj H6\0 \rAj!\r\v Aj! Aj" G\r\0\v GE\r\v \b  	j-\0\0G\r\0 \f \rAtj 6\0 \rAj!\r\v \bAj!  \bG\r\0\v\v \x07A\0A\xDC\0\xFC\v\0@ A\0L\r\0 Aq!\fA\0! AO@ A\xFC\xFF\xFF\xFF\x07q!A\0!\b@ \x07  	j"\r-\0\0Atj" (Aj6 \x07 \r-\0Atj" (Aj6 \x07 \r-\0Atj" (Aj6 \x07 \r-\0Atj"\r \r(Aj6 Aj! \bAj"\b G\r\0\v \fE\r\vA\0!\r@ \x07  	j-\0\0Atj"\b \b(Aj6 Aj! \rAj"\r \fG\r\0\v\v \x07 \x07( \x07(\0j"6 \x07 \x07(\b j"6\b \x07 \x07(\f j"6\f \x07 \x07( j"6 \x07 \x07( j"6 \x07 \x07( j"6 \x07 \x07( j"6 \x07 \x07(  j"6  \x07 \x07($ j"6$ \x07 \x07(( j"6( \x07 \x07(, j"6, \x07 \x07(0 j"60 \x07 \x07(4 j"64 \x07 \x07(8 j"68 \x07 \x07(< j"6< \x07A@k"\b \b(\0 j"6\0 \x07 \x07(D j"6D \x07 \x07(H j"6H \x07 \x07(L j"6L \x07 \x07(P j"6P \x07 \x07(T j"6T \x07 \x07(X j6X A\0A\xDC\0\xFC\v\0@ (\r\0A\0!\b  "G@  kAj"\bAq \bA~q!A\0!\bA\0!\r@  At"	j \b \x07 	Aj"(j"(\0 \x07 	j(\0kj"\bAk6\0  (j \x07 Aj"Atj(\0 (\0k \bAtj"\bAk6\0 \bAt!\b \rAj"\r G\r\0\vE\r\v  At"j \b  \x07j"( (\0kjAk6\0\v@  L\r\0 Aj!  kAq@ \x07 Atj"\b  Atj(\0At \b(\0kAj6\0 !\v  F\r\0@ \x07 At"Aj"\bj"\r  j(\0At \r(\0kAj6\0 \x07 Aj"Atj"  \bj(\0At (\0kAj6\0  G\r\0\v\v  Atj 6\0 Aj" \x1BG\r\0\v \x1B!	\v \0($ \0(\xE8! \0A@kA\0A\x80\b\xFC\v\0 \0A\xFC<j! \0A\xFCj!\x07A\xFF!A!@  \x07j"\bAk "At"Ar:\0\0 \b Ar:\0\0 \bAk A\rr:\0\0 \bAk A\fr:\0\0 \bAk A\vr:\0\0 \bAk A\nr:\0\0 \bAk A	r:\0\0 \bA\x07k A\br:\0\0 \bA\bk A\x07r:\0\0 \bA	k Ar:\0\0 \bA\nk Ar:\0\0 \bA\vk Ar:\0\0 \bA\fk Ar:\0\0 \bA\rk Ar:\0\0 \bAk Ar:\0\0 \x07 Ak"\bj :\0\0  Atj \b6\0 Ak! Ak! \r\0\vA\xA0\x8Dl! Aj!\b A\0L@A|!A\x80!\x07A\0!A\0!A\0! !\r\f\v \0 \0-\0\xBC="#A\x88\blj"A\xEC\xE2j!" A\xCC\xC3j!  A\x9C\x93j!!A\x80!\x07A1!A\0! \0 #Atj(\xFC\xF3"!A\0! !\r\f	\v \0A#6@ \fA\0J@ \0(!\f\v \0(\0"(! \f!@ E\r\r (\0"-\0\0! \0 A\bj"\f6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v AxJ \f!E\r\0\v\v \0 \fAk"6 A\x7FA  vAq\x1B &j!&\f\v \0A"6@ \0( "A\0J@ \0(!\v\f\v \0(\0"(! !@ E\r\f (\0"-\0\0!\f \0 A\bj"6  \0 \f \0(A\btr"\v6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v AxJ !E\r\0\v\v \0 Ak"\f6  \v \fvAqE@ \0 	A\x82lj \x07jA\xE0\xD6j &:\0\0 \x07Aj\f\vA!\f\v \0(\0"(! !@ E\r\n (\0"-\0\0!\v \0 A\bj"6  \0 \v \0(A\btr"\v6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v A|J !E\r\0\v\v \0 Ak"6  \v vAq!&A\0\v"\x07 N\r\v &AkAlO\rA|!\f\x07\v 	Aj!	 \r!A\0!\f\vA!\f\0\v\0\v \0A$6@  \0( "L@ \0(!\f\f\vA\0! \0(\0"("E\r (\b! (\0!\v@ \v-\0\0! \0 A\bj"6  \0  \0(A\btr"\f6  Aj"6\b  Ak"6  \vAj"\v6\0 E@  (\fAj6\f\v  N\r \r\0\v\f\v \0  k"6 A\x7F tA\x7Fs \f vq!A\v!@@@@@@ E@ \0A%6 A\0L\r \0(!\v\f\vA|! AJ\r\b  " At"j(\0L\r Aj!\f\v \0(\0"(! !@ E\r\x07 (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"\v6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v AxJ !E\r\0\v\v \0 Ak"6  \v vAq"\' Atr!\f\v   !j(\0k"A\x81K\r   Atj(\0!\nA!\f\vA\0!\f\vA!\f\0\v\0\v@@@@@\x7F@\x7F@@@@@@@@@@@@ \0\x07\v \0A\'6 A\0L\r \0(!\f\v \0A)6 A\0L\r \0(!\f\x07\v \b \nF\r\x07A!A\x7F! \nAK\r\f\f\v \0A&6  \0( "L@ \0(!\f\f\n\vA\0! \0(\0"("\vE\r (\b! (\0!@ -\0\0! \0 A\bj"6  \0  \0(A\btr"\f6  Aj"6\b  \vAk"\v6  Aj"6\0 E@  (\fAj6\f\v  N\r\n \v\r\0\v\f\v \0(\0"(! !@ E\r (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v AxJ !E\r\0\v\v \0 Ak"6   vAq"\' Atr\f\b\vA|!  N\r \nAk!@ \nAM@ \0 \0(\xFC<j"A\xFCj" j"-\0\0!@@ \nAH@ !\f\v \nAk"AqE@ Ak Ak(\0\x006\0\0 !\v AK@ !@  j"Ak Ak(\0\x006\0\0 Ak Ak/\0\0;\0\0 A\x07k A\bk/\0\0;\0\0 A\bk"AK\r\0\v\v E\r\v E\r\0 A\xFDj  \xFC\n\0\0\v  :\0\0\f\v \0A\xFCj"\f \0A\xFC<j"\v Av"Atj"(\0" Aq"j"j-\0\0! @@  \fj" Ak-\0\0:\0\0 Ak" (\0"J\r\0\v\v  Aj6\0@ \v Atj" (\0Ak"6\0  \fj \f Ak(\0j-\0:\0\0 AK Ak!\r\0\v \v \v(\0Ak"6\0  \fj :\0\0 \v(\0\r\0A!A\xFF!@  \fj" \f \v "Atj"(\0j-\0:\0\0 Ak \f (\0j-\0:\0\0 Ak \f (\0j-\0\r:\0\0 Ak \f (\0j-\0\f:\0\0 Ak \f (\0j-\0\v:\0\0 Ak \f (\0j-\0\n:\0\0 Ak \f (\0j-\0	:\0\0 A\x07k \f (\0j-\0\b:\0\0 A\bk \f (\0j-\0\x07:\0\0 A	k \f (\0j-\0:\0\0 A\nk \f (\0j-\0:\0\0 A\vk \f (\0j-\0:\0\0 A\fk \f (\0j-\0:\0\0 A\rk \f (\0j-\0:\0\0 Ak \f (\0j-\0:\0\0 \f Ak"j \f (\0j-\0\0:\0\0  6\0 Ak! Ak! \r\0\v\v \0 \0 j-\0\xFC"Atj" (@Aj6@@ \0-\0(@ \0(\xD0 Atj ;\0\f\v \0(\xCC Atj 6\0\v Aj! E@ \r Aj"L@A\0!\f\v \0 \0 jA\xBC=j-\0\0"#A\x88\blj"A\x9C\x93j!! A\xCC\xC3j!  A\xEC\xE2j!"A2! \0 #Atj(\xFC\xF3!\v Ak! !A!\f\f\v \0A(6  \0( "L@ \0(!\f\f\vA\0! \0(\0"("\vE\r\r (\b! (\0!@ -\0\0! \0 A\bj"6  \0  \0(A\btr"\f6  Aj"6\b  \vAk"\v6  Aj"6\0 E@  (\fAj6\f\v  N\r \v\r\0\v\f\r\v \0(\0"(! !@ E\r\f (\0"-\0\0! \0 A\bj"6  \0  \0(A\btr"6  Ak"6  Aj6\0  (\bAj"6\b E@  (\fAj6\f\v AxJ !E\r\0\v\v \0 Ak"6   vAq"\' Atr\f\vA|! \0(4"A\0H@ \n!\b\f\v\v  N@ \n!\b\f\v\v \0A@k!A\0!\x07@@@@  \x07Atj(\0"A\0H@ \n!\b\f\v  J@ \n!\b\f\v  \x07Ar"Atj(\0"A\0H\r  J\r  \x07Ar"Atj(\0"A\0H\r  J\r  \x07Ar"Atj(\0"A\0H\r  J\r \x07Aj"\x07A\x80G\r\0\v \0A\x006\xC4\b \0A<j! \0A\xC4\bj!A!@  At"j  j(\x006\0  Aj"\bj  \bj(\x006\0  A\bj"\bj  \bj(\x006\0  A\fj"j  j(\x006\0 Aj"A\x81G\r\0\v (\0!A!@  Atj" (\0 j"\b6\0  ( \bj"\b6  (\b \bj"\b6\b  (\f \bj"6\f Aj"A\x81G\r\0\vA\0!\x07@@@  \x07Atj(\0"A\0H@ \n!\b\f\v  J@ \n!\b\f\v \x07A\x80F@A!\x07@  \x07Atj"Ak(\0 (\0"J@ \n!\b\f\v   \x07Aj"Atj(\0"\bJ@ \n!\b !\x07\f\v \b  \x07Aj"Atj(\0"J@ \n!\b !\x07\f\v  \x07Aj"Atj(\0 H@ \n!\b !\x07\f\v \x07Aj"\x07A\x81G\r\0\v \0A\x7F6\xE0 \0A\0:\0\b \0A\x006\f \0A6 \0(0AN@A\xC8\vAA\xD0%(\0#\v@@@@ \0-\0(@ \0A\xC8j!A\0!@  At"\bj  \bj(\x006\0 A\x80F\r  \bAr"\x07j  \x07j(\x006\0  \bA\br"\x07j  \x07j(\x006\0  \bA\fr"\bj  \bj(\x006\0 Aj!\f\0\v\0\v \0(\xCC!\x7FA\0 A\0L\r\0A\0! AG@ Aq!\b A\xFE\xFF\xFF\xFF\x07q!\x07A\0!@    Atj-\0\0Atj"(\0Atj" (\0 A\btr6\0  (\0Aj6\0    Ar"Atj-\0\0Atj"(\0Atj" (\0 A\btr6\0  (\0Aj6\0 Aj! Aj" \x07G\r\0\v  \bE\r\v    Atj-\0\0Atj"(\0Atj" (\0 A\btr6\0  (\0Aj6\0 \v!\x07  \0(4Atj(\0! \0A\x006\xC0\b \0 A\bv"68 \0-\0E\r \0B\x007  \0($A\xA0\x8DlI\rA!\f\v A\0J@A\0!@ \0(\xD0 Atj"  -\0\0Atj"(\0"\b;\0 \0(\xD4 Avj"-\0\0!\x07 \x7F AqE@ \x07Apq \bAvr\f\v \x07Aq \bA\fvA\xF0\xFF?qr\v:\0\0  (\0Aj6\0 Aj" G\r\0\v\v \0(\xD4 \0(4"Auj-\0\0 AtAqvAtA\x80\x80<q \0(\xD0 Atj/\0r!@ \0(\xD0 "\x07Atj"/\0 \0(\xD4 \x07Avj"-\0\0  ;\0 -\0\0! \x07AtAqvAtA\x80\x80<qr! \x7F \x07AqE@ Apq Avr\f\v Aq A\fvA\xF0\xFF?qr\v:\0\0 \x07" \0(4G\r\0\v \0A\x006\xC0\b \0 68 \0-\0@ \0B\x007 \0($A\xA0\x8Dl M@A!\f\v \0 \x07 \'"6< \0(\xD0 \0(8"Atj/\0! \0(\xD4 Avj-\0\0!\b \0 \0(\xC0\bAj6\xC0\b \0  \b AtAqvAtA\x80\x80<qr68 \0("E@ \0("AtA\xC05j(\0! \0 Aj"A\0 A\x80G\x1B6\v \0 Ak"6 \0  AFs6<\f\v \0($A\xA0\x8Dl \x07M@A!\f\v \0 \x07 \'6< \0(\xD0 \0(8"Atj/\0! \0(\xD4 Avj-\0\0! \0 \0(\xC0\bAj6\xC0\b \0   AtAqvAtA\x80\x80<qr68\f\v  Atj(\0! \0A6\xC0\b \0 A\bv68 \0 A\xFFq"6<A\0!A\xC05(\0! \0A6 \0 Ak"6 \0  AFs6< \n!\b\f\v \0($A\xA0\x8Dl M@A!\f\v  Atj(\0! \0A6\xC0\b \0 A\bv68 \0 A\xFFq6<\vA\0! \n!\b\f\v  \x07Ar"Atj(\0"A\0H\r  J\r  \x07Ar"Atj(\0"A\0H\r  J\r@  \x07Ar"Atj(\0"A\0H\r\0  J\r\0 \x07Aj!\x07\f\v\v \n!\b !\x07\f\v \n!\b !\x07\f\v \n!\b !\x07\f\r\v \n!\b !\x07\f\f\v \n!\b !\x07\f\v\v \n!\b !\x07\f\n\v \0  k"6 A\x7F tA\x7Fs \f vq\v!A|! AJ\r\b@ " At"j(\0 H@ Aj!\f\v   !j(\0k"A\x81K\r	   Atj(\0!\n\f\vA!\f\v \0  k"6 A\x7F tA\x7Fs \f vq\v!A|! AJ\r " At"j(\0 H@ Aj!\f\v   !j(\0k"A\x81K\r   Atj(\0"\nAO\r ! !\vA|! A\xFF\xFF\xFF\0J@ ! !\f\v At"  \n\x1B j! E@ \r Aj"L@A\0!\f\x07\v \0 \0 jA\xBC=j-\0\0"#A\x88\blj"A\x9C\x93j!! A\xCC\xC3j!  A\xEC\xE2j!"A2! \0 #Atj(\xFC\xF3!\v Ak! !A!\f\v \0 \0 \0 \0(\xFC<jA\xFCj-\0\0j-\0\xFC"Atj" Aj" (@j6@@@ \0-\0(@ A\0N\r !\f\v A\0N\r !\f\v    J\x1B!@  F@ ! !\f\x07\v \0(\xD0 Atj ;\0 Aj! AJ Ak"!\r\0\v\f\v    J\x1B!@  F@ ! !\f\v \0(\xCC Atj 6\0 Aj! AJ Ak"!\r\0\v\f\vA\0!\f\vA!\f\0\v\0\vA\0!\v * \x076\0 + 6\0 A 	6\0 @ 6\0 ? \x1B6\0 > \r6\0 = \b6\0 < 6\0 ; 6\0 : \n6\0 9 6\0 8 6\0 7 6\0 6 6\0 5 &6\0 4 )6\0 3 6\0 2 6\0 1 \'6\0 0 #6\0 / 6\0 . "6\0 - !6\0 ,  6\0\v $Aj$\0 "AF@ \0(0AN@ \0(\xDC! % \0(\xE46 % 6\0 A\xAD\b %\vAA| \0(\xE4 \0(\xDCF\x1B!\f\v \0(AG\rA\0!	\f\v @ \0(\0"(E\r \0(\f!	@ 	E!	@ 	AqE@ ( \0-\0\b":\0\0  \0(\xE0"AvsAt(\xC0-! \0 \0(\fAk"	6\f \0  A\bts6\xE0 \0(\0" (Aj"6  (Ak"6  (Aj6 E@  (Aj6\v E\r\f\v \0(\xC0\b" \0(\xC0\xF4"\bAj"F\rA|!  J\r \0A6\f \0 \0(<"\x07:\0\b \0(8" \0($A\xA0\x8Dl"O\r \0 \0(\xCC"\n Atj(\0"\rA\bv"68 \0("E@ \0("AtA\xC05j(\0! \0 Aj"A\0 A\x80G\x1B6\v \0 Aj"6\xC0\b \0 Ak"6@  \bF\r\0 \x07 \rA\xFFq AFs"\rG@ \0 \r6<\f\v \0A6\f  O\r\x07 \0 \n Atj(\0"\rA\bv"68 E@ \0("AtA\xC05j(\0! \0 Aj"A\0 A\x80G\x1B6\v \0 Aj"6\xC0\b \0 Ak"6 \b F\r\0 \x07 \rA\xFFq AFs"\rG@ \0 \r6<\f\v \0A6\f  O\r\x07 \0 \n Atj(\0"\rA\bv"68 E@ \0("AtA\xC05j(\0! \0 Aj"A\0 A\x80G\x1B6\v \0 Aj6\xC0\b \0 Ak"6  \bF\r\0 \x07 \rA\xFFq AFs"\bG@ \0 \b6<\f\v  O\r\x07 \0 \n Atj(\0"\x07A\bv"\b68 E@ \0("AtA\xC05j(\0! \0 Aj"A\0 A\x80G\x1B6\v \0 Aj6\xC0\b \0 Ak"6 \0 \x07A\xFFq AFsAj6\f  \bM\r\x07 \0 \n \bAtj(\0"A\bv68 \0 A\xFFq"6< E@ \0("\nAtA\xC05j(\0! \0 \nAj"\nA\0 \nA\x80G\x1B6\v \0 Aj6\xC0\b \0 Ak"6 \0  AFs6<\vA\0!	 (\r\0\v\v\f\v \0($A\xA0\x8Dl!\r \0(\xC0\xF4"Aj!\x07 \0(8! \0(\xCC! \0(<!\b \0(\xC0\b! \0(\f! \0-\0\b! \0(\xE0!	 \0(\0"(! ("!@@@\x7F@ A\0L@ !\n ! \b!\f\v E\r A\xFFq!@ AF@ !\n ! \b!A\0\f\v  :\0\0 	Av sAt(\xC0- 	A\bts!	 Aj! Ak! Ak"\r\0\v\f\vA\v!@ E@ E@A\0!A!\f\v  \n:\0\0 \nA\xFFq 	AvsAt(\xC0- 	A\bts!	 Ak! Aj!A!\f\vA|!  \x07J\r\x07  \x07F@A\0! \x07!\f\v \r M\r\x07 Aj!  Atj(\0"\nA\bv!@  \nA\xFFq"\bG@ !\n ! \b!\f\v  F@ !\n !\f\v \r M\r\bA!  Atj(\0"A\bv! !\b \x07" Aj"\nF\r \n! A\xFFq"\b G\r \r M\r\b  Atj(\0"A\bv!A! !\b \x07" Aj"\nF\r \n! A\xFFq"\b G\r \r M\r\b  Atj(\0"\nA\bv"\b \rO\r\b Aj! \nA\xFFqAj!  \bAtj(\0"A\bv! A\xFFq!\b\f\vA\0!\f\0\v\0\v\v !\n ! \b!A\0!\v \0(\0" ("\b  kj"\x076 \x07 \bI@  (Aj6\v \0 6\xC0\b \0 6\f \0 \n:\0\b \0 	6\xE0 \0 6\xCC \0 6< \0 68  6  6\f\v@ 	AqE@ \n( \0-\0\b":\0\0  \0(\xE0"AvsAt(\xC0-! \0 \0(\fAk"6\f \0  A\bts6\xE0 \0(\0"\n \n(Aj"6 \n \n(Ak"6 \n \n(Aj6 E@ \n \n(Aj6\v E\r E!	\f\v \0(\xC0\b" \0(\xC0\xF4"Aj"F\rA|!  J\r \0A6\f \0 \0(<"\r:\0\b \0(8" \0($A\xA0\x8Dl"O\rA\x80!A\0!	@ 	 jAu"\b    \bAtj(\0H"\x07\x1B" 	 \b \x07\x1B"	kAG\r\0\v \0(\xD0"\b Atj/\0! \0(\xD4"\x07 Avj-\0\0! \0 Aj"6\xC0\b \0   AtAqvAtA\x80\x80<qr"68@  F\r\0 \r 	A\xFFq"G@ \0 6<\f\v \0A6\f  O\rA\x80!A\0!	@ 	 jAu"    Atj(\0H"\x1B" 	  \x1B"	kAG\r\0\v \b Atj/\0! \x07 Avj-\0\0! \0 Aj"6\xC0\b \0   AtAqvAtA\x80\x80<qr"68  F\r\0 \r 	A\xFFq"G@ \0 6<\f\v \0A6\f  O\rA\x80!A\0!	@ 	 jAu"    Atj(\0H"\x1B" 	  \x1B"	kAG\r\0\v \b Atj/\0! \x07 Avj-\0\0! \0 Aj6\xC0\b \0   AtAqvAtA\x80\x80<qr"68  F\r\0 \r 	A\xFFq"G@ \0 6<\f\v  O\rA\x80!A\0!	@ 	 jAu"    Atj(\0H"\r\x1B" 	  \r\x1B"	kAG\r\0\v \b Atj/\0! \x07 Avj-\0\0! \0 Aj6\xC0\b \0 	A\xFFqAj6\f \0   AtAqvAtA\x80\x80<qr"68  O\rA\x80!A\0!	@ 	 jAu"    Atj(\0H"\x1B" 	  \x1B"	kAG\r\0\v \0 	6< \b Atj/\0! \x07 Avj-\0\0! \0 Aj6\xC0\b \0   AtAqvAtA\x80\x80<qr68\vA\0!	 \n(\r\0\v\vA\0! \0(\xC0\b \0(\xC0\xF4AjG\r \0(\f\r \0 \0(\xE0A\x7Fs"6\xE0 \0(0"AN\x7F \0(\xD8! % 6 % 6 A\x9B\b %Aj \0(0 \vAN@@@ (L"A\0N@ E\rA\x88\xC8\x80(\0 A\xFF\xFF\xFF\xFFqG\r\v@ (PA\xDD\0F\r\0 (" (F\r\0  Aj6 A\xDD\0:\0\0\f\v %\f\v  (L"A\xFF\xFF\xFF\xFF \x1B6L@@ (PA\xDD\0F\r\0 (" (F\r\0  Aj6 A\xDD\0:\0\0\f\v %\v (L A\x006L\v\v \0(\xE0" \0(\xD8G\x7FA| \0A6 \0 \0(\xE4Aw s6\xE4A!	\f\v\v!\v %A j$\0A\xA8\xC7\x80A\x80\x80\xC0\0A\x88\xC7\x80(\0"k6\0  Ay  \x1BA\xF8\xC6\x80(\0\x1B A\xA4\xC7\x80-\0\0Aq\x1B \x1BA\x7F\v\v\x91\x7F@ \0(""\0Aq@@ \0-\0\0E\r \0Aj"\0Aq\r\0\v\v@ \0"Aj!\0A\x80\x82\x84\b (\0"k rA\x80\x81\x82\x84xqA\x80\x81\x82\x84xF\r\0\v@ "\0Aj! \0-\0\0\r\0\v\v \0 kAj""\0\x7F @ \0  \xFC\n\0\0\v \0A\0\v\v\x92\0A\xE4\xC6\0A6\0A\xE8\xC6\0A\x006\0(A\xE8\xC6\0A\xE0\xC6\0(\x006\0A\xE0\xC6\0A\xE4\xC6\x006\0A\xAC\xC7\x80A6\0A\xB0\xC7\x80A\x006\0*A\xB0\xC7\x80A\xE0\xC6\0(\x006\0A\xE0\xC6\0A\xAC\xC7\x806\0A\xA0\xC8\x80A\xF0\xCC\x846\0A\x88\xC8\x80A*6\0A\xA4\xC8\x80A\x80\x806\0A\xA8\xC8\x80A\xC0\xC5\0(\x006\0\v\v\xE9<\0A\x80\b\v\xD2,\0\0\b\0\0N10emscripten3valE\0 {0x%08x, 0x%08x}\0\n    combined CRCs: stored = 0x%08x, computed = 0x%08x\0-+   0X0x\0supply_input\0needs_input\0unsigned short\0unsigned int\0float\0%s:%d: %s\0describe_error\0get_output_buffer\0get_input_buffer\0unsigned char\0/emsdk/emscripten/system/lib/libcxxabi/src/private_typeinfo.cpp\0step\0begin\0bool\0get_output_length\0unsigned long long\0unsigned long\0std::wstring\0std::string\0std::u16string\0std::u32string\0get_buffer_size\0double\0end\0rt+rld\0void\0catching a class without an object?\0emscripten::memory_view<short>\0emscripten::memory_view<unsigned short>\0emscripten::memory_view<int>\0emscripten::memory_view<unsigned int>\0emscripten::memory_view<float>\0emscripten::memory_view<uint8_t>\0emscripten::memory_view<int8_t>\0emscripten::memory_view<uint16_t>\0emscripten::memory_view<int16_t>\0emscripten::memory_view<uint64_t>\0emscripten::memory_view<int64_t>\0emscripten::memory_view<uint32_t>\0emscripten::memory_view<int32_t>\0emscripten::memory_view<char>\0emscripten::memory_view<unsigned char>\0emscripten::memory_view<signed char>\0emscripten::memory_view<long>\0emscripten::memory_view<unsigned long>\0emscripten::memory_view<double>\x001.0.6, 6-Sept-2010\0Failed to allocate memory.\0Data integrity error: The bzip2 data is corrupt.\0An unknown error occurred during decompression.\0Unexpected end of data: The bzip2 data is incomplete.\0Data magic error: Not a valid bzip2 file.\0(null)\0\n    [%d: huff+mtf \0\n*** A special note about internal error number 1007 ***\n\nExperience suggests that a common cause of i.e. 1007\nis unreliable memory or other hardware.  The 1007 assertion\njust happens to cross-check the results of huge numbers of\nmemory reads/writes, and so acts (unintendedly) as a stress\ntest of your memory system.\n\nI suggest the following: try compressing the file again,\npossibly monitoring progress in detail with the -vv flag.\n\n* If the error cannot be reproduced, and/or happens at different\n  points in compression, you may have a flaky memory system.\n  Try a memory-test program.  I have used Memtest86\n  (www.memtest86.com).  At the time of writing it is free (GPLd).\n  Memtest86 tests memory much more thorougly than your BIOSs\n  power-on test, and may find failures that the BIOS doesn\'t.\n\n* If the error can be repeatably reproduced, this is a bug in\n  bzip2, and I would very much like to hear about it.  Please\n  let me know, and, ideally, save a copy of the file causing the\n  problem -- without which I will be unable to investigate it.\n\n\0\n\nbzip2/libbzip2: internal error number %d.\nThis is a bug in bzip2/libbzip2, %s.\nPlease report it to me at: jseward@bzip.org.  If this happened\nwhen you were using some program which uses libbzip2 as a\ncomponent, you should also report this bug to the author(s)\nof that program.  Please make an effort to report this bug;\ntimely and accurate bug reports eventually lead to higher\nquality software.  Thanks.  Julian Seward, 10 December 2007.\n\n\0,\0\0h\0\0NSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEE\0\0,\0\0\xB0\0\0NSt3__212basic_stringIDsNS_11char_traitsIDsEENS_9allocatorIDsEEEE\0\0\0,\0\0\xFC\0\0NSt3__212basic_stringIDiNS_11char_traitsIDiEENS_9allocatorIDiEEEE\0\0\0,\0\0H\0\0N10emscripten11memory_viewIcEE\0\0,\0\0p\0\0N10emscripten11memory_viewIaEE\0\0,\0\0\x98\0\0N10emscripten11memory_viewIhEE\0\0,\0\0\xC0\0\0N10emscripten11memory_viewIsEE\0\0,\0\0\xE8\0\0N10emscripten11memory_viewItEE\0\0,\0\0\0\0N10emscripten11memory_viewIiEE\0\0,\0\x008\0\0N10emscripten11memory_viewIjEE\0\0,\0\0`\0\0N10emscripten11memory_viewIlEE\0\0,\0\0\x88\0\0N10emscripten11memory_viewImEE\0\0,\0\0\xB0\0\0N10emscripten11memory_viewIxEE\0\0,\0\0\xD8\0\0N10emscripten11memory_viewIyEE\0\0,\0\0\0\0\0N10emscripten11memory_viewIfEE\0\0,\0\0(\0\0N10emscripten11memory_viewIdEE\0\0\xE8\0\0ip\0\0\xD0\0\0ip\0\0\xC4\0\0ip\0\0|\0\0ip\0\0p\0\0\xD0\0\0vpi\0p\0\0vp\0\0\x84\0\0\xC4\0\0,\0\0\x8C\0\0NSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE\0ppi\0\0\xC8"\0A\xE0%\vA\0\v\0\0\0\0\0\0\0\0\0\0\0	\0\0\0\0\v\0\0\0\0\0\0\0\0\0\n\n\n\x07\0\0	\v\0\0	\v\0\0\v\0\0\0\0\0A\xB1&\v!\0\0\0\0\0\0\0\0\0\v\r\0\r\0\0\0	\0\0\0	\0\0\0\0A\xEB&\v\f\0A\xF7&\v\0\0\0\0\0\0\0\0	\f\0\0\0\0\0\f\0\0\f\0A\xA5\'\v\0A\xB1\'\v\0\0\0\0\0\0\0	\0\0\0\0\0\0\0\0A\xDF\'\v\0A\xEB\'\v\0\0\0\0\0\0\0\0	\0\0\0\0\0\0\0\0\0\0\0\0\0A\xA2(\v\0\0\0\0\0\0\0\0\0	\0A\xD3(\v\0A\xDF(\v\0\0\0\0\0\0\0\0	\0\0\0\0\0\0\0\0A\x8D)\v\0A\x99)\v\xA3\0\0\0\0\0\0\0\0	\0\0\0\0\0\0\0\0\x000123456789ABCDEFT\0\0\xCC\0\0\xA8\0\0N10__cxxabiv116__shim_type_infoE\0\0\0\0T\0\0\xFC\0\0\xC0\0\0N10__cxxabiv117__class_type_infoE\0\0\0\0\0\0\0<\0\0\0\0\0\0\0\0\x1B\0\0\0\0\0\0\0\0\0T\0\0H\0\0\xC0\0\0N10__cxxabiv123__fundamental_type_infoE\0(\0\0x\0\0v\0\0\0(\0\0\x84\0\0b\0\0\0(\0\0\x90\0\0c\0\0\0(\0\0\x9C\0\0h\0\0\0(\0\0\xA8\0\0a\0\0\0(\0\0\xB4\0\0s\0\0\0(\0\0\xC0\0\0t\0\0\0(\0\0\xCC\0\0i\0\0\0(\0\0\xD8\0\0j\0\0\0(\0\0\xE4\0\0l\0\0\0(\0\0\xF0\0\0m\0\0\0(\0\0\xFC\0\0x\0\0\0(\0\0\b\0\0y\0\0\0(\0\0\0\0f\0\0\0(\0\0 \0\0d\0\0\0\0\0\0\0\xF0\0\0\0\0\0\0\0\0\x1B\0\0\0\0\0\0\0\0\0 \0\0\0!\0\0\0"\0\0\0\0\0\0\0t\0\0\0\0\0#\0\0\0\x1B\0\0\0\0\0\0\0\0\0$\0\0\0%\0\0\0&\0\0\0T\0\0\x80\0\0\xF0\0\0N10__cxxabiv120__si_class_type_infoE\0\0\0\0,\0\0\xB0\0\0St9type_info\0A\xC4-\v\x85\xB7\xC1n;\x82	\xD9&C\r\xDCvkk\xC5\xB2M\x86PG\xB8\xED\b&\xF0\xC9"\xD6\xD6\x8A/a\xCBK+d\x9B\f5\xD3\x86\xCD1\n\xA0\x8E<\xBD\xBDO8p\xDBL\xC7\xC6\xD0H\xE0\x93E\xA9\xFDRA\xAC\xAD_\x1B\xB0\xD4[\xC2\x96\x97Vu\x8BVR\xC86j\x7F+\xD8n\xA6\r\x9BcZg@y\xA3]\xDC}z{\x9Fp\xCDf^t\xE0\xB6#\x98W\xAB\xE2\x9C\x8E\x8D\xA1\x919\x90`\x95<\xC0\'\x8B\x8B\xDD\xE6\x8FR\xFB\xA5\x82\xE5\xE6d\x86X[+\xBE\xEFF\xEA\xBA6`\xA9\xB7\x81}h\xB3\x84-/\xAD30\xEE\xA9\xEA\xAD\xA4]\vl\xA0\x90m2\xD4\'p\xF3\xD0\xFEV\xB0\xDDIKq\xD9L\x1B6\xC7\xFB\xF7\xC3" \xB4\xCE\x95=u\xCA(\x80:\xF2\x9F\x9D\xFB\xF6F\xBB\xB8\xFB\xF1\xA6y\xFF\xF4\xF6>\xE1C\xEB\xFF\xE5\x9A\xCD\xBC\xE8-\xD0}\xECwp\x864\xC0mG0K=\xAEV\xC59\xAB\x82\'\x1BC#\xC5=\0.r \xC1*\xCF\x9D\x8Ex\x80O\xA1\xA6\f\x1B\xBB\xCD\xEB\x8A\xA4\xF6K}\xD0\b\b\xCA\xCD\xC9\f\x07\xAB\x97x\xB0\xB6V|i\x90q\xDE\x8D\xD4u\xDB\xDD\x93kl\xC0Ro\xB5\xE6b\xFB\xD0f\xBFF\x9F^\b[^Z\xD1}Wf`\xDCSc0\x9BM\xD4-ZI\r\vD\xBA\xD8@\x97\xC6\xA5\xAC \xDBd\xA8\xF9\xFD\'\xA5N\xE0\xE6\xA1K\xB0\xA1\xBF\xFC\xAD`\xBB%\x8B#\xB6\x92\x96\xE2\xB2/+\xAD\x8A\x986l\x8EA/\x83\xF6\r\xEE\x87\xF3]\xA9\x99D@h\x9D\x9Df+\x90*{\xEA\x94\xE7\xB4\xE0P\0u\xE4\x89&6\xE9>;\xF7\xED;k\xB0\xF3\x8Cvq\xF7UP2\xFA\xE2M\xF3\xFE_\xF0\xBC\xC6\xE8\xED}\xC21\xCB>\xCF\x86\xD6\xFF\xCB\x83\x86\xB8\xD54\x9By\xD1\xED\xBD:\xDCZ\xA0\xFB\xD8\xEE\xE0\fiY\xFD\xCDm\x80\xDB\x8E`7\xC6Od2\x96\bz\x85\x8B\xC9~\\\xAD\x8As\xEB\xB0KwV\rO\xE1\xC5K86\x86F\x8F+GB\x8A{\0\\=f\xC1X\xE4@\x82US]CQ\x9E;%)&\xDC!\xF0\0\x9F,G^(BM6\xF5P\xD82,v\x9B?\x9BkZ;&\xD6\x91\xCB\xD4\x07H\xED\x97\n\xFF\xF0V\xFA\xA0M\xBD\xD0\x94\x9B\x93#\x86RV/\xF1\xB9K\xEE\xF5`m\xAD\xF8\xD7pl\xFC\xD2 +\xE2e=\xEA\xE6\xBC\x1B\xA9\xEB\vh\xEF\xB6\xBB\'\xD7\xA6\xE6\xD3\xD8\x80\xA5\xDEo\x9Dd\xDAj\xCD#\xC4\xDD\xD0\xE2\xC0\xF6\xA1\xCD\xB3\xEB`\xC9~\x8D>\xBD\xC9\x90\xFF\xB9\xB6\xBC\xB4\xA7\xAB}\xB0\xA2\xFB:\xAE\xE6\xFB\xAA\xCC\xC0\xB8\xA7{\xDDy\xA3\xC6`6\x9Bq}\xF7\x9F\xA8[\xB4\x92Fu\x962\x88\xAD\v\xF3\x8Ct-\xB0\x81\xC30q\x85\x99\x90\x8A].\x8DKY\xF7\xAB\bT@\xB6\xC9PE\xE6\x8EN\xF2\xFBOJ+\xDD\fG\x9C\xC0\xCDC!}\x82{\x96`C\x7FOF\0r\xF8[\xC1v\xFD\v\x86hJGl\x930a$-\xC5e\xE9K\x9B^VZ\x87p0m\xD85=\x9F\x82 ^[\v\xEC\x1B\xDCQ\xA6\x937\xE6\xBBR3?\x9D>\x88\x80\xD0:\x8D\xD0\x97$:\xCDV \xE3\xEB-T\xF6\xD4)y&\xA9\xC5\xCE;h\xC1+\xCC\xA0\0\xEA\xC8\xA5P\xAD\xD6Ml\xD2\xCBk/\xDF|v\xEE\xDB\xC1\xCB\xA1\xE3v\xD6`\xE7\xAF\xF0#\xEA\xED\xE2\xEE\xBD\xA5\xF0\xAA\xA0d\xF4s\x86\'\xF9\xC4\x9B\xE6\xFD	\xFD\xB8\x89\xBE\xE0y\x8Dg\xC6:\x80\xD0\xDB\xFB\x84\xD5\x8B\xBC\x9Ab\x96}\x9E\xBB\xB0>\x93\f\xAD\xFF\x97\xB1\xB0\xAF\rq\xAB\xDF+2\xA6h6\xF3\xA2mf\xB4\xBC\xDA{u\xB8]6\xB5\xB4@\xF7\xB1k\0\0\xD0\0\0\x7F\0\0\0\xE1\0\0\xA3\0\x000\0\0-\0\0\xE9\0\0\x006\0\0\xF7\0\0\0\xD9\0\0\xD4\0\0\xCD\0\0\0\xC6\0\0_\0\0\xEB\0\0\xE5\0\0\xF2\0\0\0\xB5\0\0\xD6\0\0\0\xDD\0\0[\0\0O\0\0\xC4\0\0m\0\0>\0\0I\0\0\0\x8E\0\0\xDA\0\0\xD8\0\0\xA3\0\0\xB4\0\0\0\0\xF0\0\0c\0\0\xD2\0\0\0\x8F\0\0\xA8\0\0\xE0\0\x003\0\0\0n\0\0\xD1\0\0+\0\0\xA9\0\0\0e\0\0\xA3\0\0c\0\0\xB9\0\0c\0\x001\0\0^\0\0\xAF\0\0\xFB\0\0\x1B\0\0\xE2\0\0\x81\0\0\0\'\0\0O\0\0\xDD\0\0o\0\0\x96\0\0\0\xEE\0\0\0;\0\0\0{\0\0\xAC\0\0m\0\0q\0\0\xA9\0\0\0\x83\0\0i\0\0\0\xAA\0\0\0_\0\0\b\0\0\xA4\0\0\xD7\0\0\xDC\0\0\xB5\0\0\xA9\0\0\xAE\0\0\0\x87\0\0I\0\0\0z\0\0\0O\0\0\0\0\xBA\0\0U\0\0\xB7\0\0\xF9\0\0\0\xBD\0\0\0\0\x8D\0\0!\0\0\xBF\0\0\x97\0\0j\0\0\xDA\0\0r\0\0\xF4\0\0R\0\0d\0\0\x81\0\0!\0\0\xDC\0\0\0\xA2\0\0\x003\0\0\xD8\0\0M\0\0\0\0\xEF\0\0\0\0\xA1\0\0\0\\\0\0\xBE\0\0\0\0\xDD\0\0\0\x90\0\0\x82\0\0c\0\0X\0\0\0\0~\0\0T\0\0\x9E\0\0\xAB\0\0\0\0\0w\0\0\xAA\0\0\xE5\0\0\x8F\0\0\0\0b\0\0\0)\0\0\xA3\0\0\0b\0\0\x9A\0\0\xA5\0\0\xA8\0\0U\0\0\0\0f\0\0\xE3\0\0\0\xDA\0\0\xDB\0\0\xBA\0\0\0\x07\0\0\x87\0\0\0\0\xAE\0\0X\0\0\xE0\0\0\0\xD5\0\0D\0\0\0\0\0\x97\0\0\xBE\0\0\0u\0\0&\0\x006\0\0(\0\0\xCE\0\0\0\xB8\0\0\0\xAF\0\0\x1B\0\0\x80\0\0\x7F\0\0\xCD\0\0\x94\0\0\xF6\0\0G\0\0w\0\0\xCB\0\0C\0\0\0j\0\0\0\0\xCC\0\0\0\x96\0\0i\0\0	\0\0\\\0\x000\0\0\xB7\0\0\xA0\0\0\0B\0\0\xD2\0\0O\0\0\0$\0\0`\0\0\0\x99\0\0\xC9\0\0\xAC\0\0\x8C\0\0\xA6\0\0\xCA\0\0\xBF\0\0>\0\0a\0\0[\0\0\xA0\0\0p\0\0\0\0\0\x85\0\0_\0\0#\0\0^\0\0\x8B\0\0\0]\0\0\0b\0\0c\0\0\x004\0\0\x8C\0\0a\0\0\0\0\x9A\0\0\0\0\0D\0\0\xB8\0\0\0O\0\0\0r\0\0v\0\0\xE6\0\0\x8D\0\0\0\0\xFA\0\0o\0\0\xA8\0\0Q\0\0\0\x9F\0\0r\0\0\0\0}\0\0\0\x9B\0\0	\0\0\xAA\0\0,\0\x005\0\0N\0\0\0W\0\0\xAF\0\0\0\x80\0\0\0\xFA\0\0\0\xAA\0\0\0\0\0\xCC\0\0\0\0\xE7\0\0\x7F\0\0\xEF\0\0N\0\0\0`\0\0~\0\0\0Y\0\0\xBC\0\0f\0\0k\0\0D\0\0|\0\0\0\xE1\0\0R\0\0\xBD\0\0d\0\0\x9D\0\0p\0\0\0\x86\0\0\0\xB6\0\0k\0\0\xE0\0\0)\0\0\xE7\0\0\xA8\0\0\0\xCE\0\0\xB0\0\0w\0\0\xEC\0\x004\0\0\0X\0\0\xEB\0\0\x82\0\0\xB6\0\0\0^\0\0Q\0\0\0X\0\0%\0\0\xDC\0\0\xE3\0\0\xFF\0\0\x8F\0\0.\0\0N\0\0\xF9\0\0\0\0\0\x81\0\0\xBB\0\0\x98\0\0\xD5\0\0\x89\0\0q\0\0\0\xCE\0\0\xCB\0\0}\0\0\xE4\0\0\0\xB1\0\0E\0\0)\0\0\f\0\0\x9E\0\0\xF0\0\0\0f\0\0\0\x8E\0\0\xCB\0\x003\0\0\0\xAE\0\0\xF2\0\0&\0\0\xF8\0\0\xED\0\0\x93\0\0\x9F\0\0\x8A\0\0\xAF\0\0\xBC\0\0\xB2\0\0\x9E\0\0\x90\0\0b\0\0\xE2\0\0\x88\0\0\xF8\0\0\0\0w\0\0\x8D\0\0\xD2\0\0A\0\0@\0\0i\0\0r\0\0\xF6\0\0~\0\0\xA7\0\0\xF3\0\0\0\xB8\0\0\xA8\0\0o\0\0\xC2\0\0\0<\0\0\x80\0\0\xD4\0\0\x9E\0\x008\0\0\0\xCC\0\0\0\xBC\0\0\xC3\0\0\x97\0\0\0\xC9\0\0\xC1\0\0\0\0\xC3\0\0\0\0\0.\0\0\xB1\0\0\xA7\0\0)\0\0;\0\0\0W\0\0\x008\0\0\xC9\0\0\x97\0\0\x9C\0\0\xB5\0\0V\0\0^\0\0\x86\0\0\0l\0\0\0;\0\0l\0\0w\0\0\xD4\0\0\0\xAE\0\0\0\x83\0\x000\0\0I\0\0W\0\0a\0\0\0\xAE\0\0\xEF\0\0\xF1\0\0:\0\0\xD7\0\0v\0\x006\0\0\xA0\0\0\x8C\0\0\0\xCE\0\0\0I\0\0\0\x07\0\0\xD4\0\0\xE0\0\0l\0\0\xDE\0\0\xAE\0\x001\0\0\xAA\0\0\0\0\0l\0\0\xB4\0\0=\0\0R\0\0\0W\0\0\xB9\0\0\xA4\0\0\xF6\0\0\0q\0\0\xCA\0\0&\0\0\xEE\0\0\'\0\0;\0\0\x96\0\0\0\0\0 \0\0\x9B\0\0$\0\0z\0\0\xD7\0\0\0<\0\0P\0\0\0\x005\0\0+\0\0\xC6\0\0R\0\0\0\x80\0\0?\0\0#\0\0\0\0\f\0\0\xCE\0\0%\0\0\xD1\0\0\xF6\0\x008\0\0\0\x95\0\x005\0\0\xD0\0\0\xDF\0\0\x92\0\0e\0\0\x89\0\0\xF6\0\0\xE9\0\0\xC1\0\0\0\0\0\0&\0\0`\0\0\xA5\0\0z\0\0\0\0\xD7\0\0\0\xD3\0\0\0\0\xC1\0\0=\0\0\0\xB0\0\0\0\0\x84\0\0\xDA\0\0\x93\0\0j\0\0\0n\0\0\x89\0\0\x84\0\0t\0\x007\0\0\xD2\0\0\xB2\0\0\x85\0\0\xD2\0\0\0\x85\0\0&\0\0\x97\0\0\x87\0\0\0\f\0\0\0\0{\0\0\x85\0\0\xC3\0\0d\0\0\0r\0\0\xBE\0\0\xA5\0\0\0\xF8\0\0\x98\0\0\xB0\0\0\0\xC1\0\0\0\xC9\0\0Y\0\0	\0\0\xCB\0\0\x002\0\0\0\x9C\0\0l\0\0\0\x85\0\0\xDE\0\0r\0\0\xC5\0\0\0\xFE\0\0e\0\0f\0\0R\0\0Z\0\0l\0\0\xA8\0\0~\0\0\0 \0\0\0\0\0\0\0A\xD4\xC5\0\v\0A\xEC\xC5\0\v\v\0\0\0\0\0\0p$ \0A\x84\xC6\0\v\0A\x94\xC6\0\v\b\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0A\xD8\xC6\0\v\x07\xD8# \0p&!');
  }
  function getBinarySync(file) {
    return file;
  }
  async function getWasmBinary(binaryFile) {
    return getBinarySync(binaryFile);
  }
  async function instantiateArrayBuffer(binaryFile, imports) {
    try {
      var binary = await getWasmBinary(binaryFile);
      var instance = await WebAssembly.instantiate(binary, imports);
      return instance;
    } catch (reason) {
      err(`failed to asynchronously prepare wasm: ${reason}`);
      abort(reason);
    }
  }
  async function instantiateAsync(binary, binaryFile, imports) {
    return instantiateArrayBuffer(binaryFile, imports);
  }
  function getWasmImports() {
    var imports = { a: wasmImports };
    return imports;
  }
  async function createWasm() {
    function receiveInstance(instance) {
      wasmExports = instance.exports;
      assignWasmExports(wasmExports);
      updateMemoryViews();
      return wasmExports;
    }
    function receiveInstantiationResult(result2) {
      return receiveInstance(result2["instance"]);
    }
    var info = getWasmImports();
    var instantiateWasm = Module["instantiateWasm"];
    if (instantiateWasm) {
      return new Promise((resolve) => {
        instantiateWasm(info, (inst) => resolve(receiveInstance(inst)));
      });
    }
    wasmBinaryFile ??= findWasmBinary();
    var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
    var exports = receiveInstantiationResult(result);
    return exports;
  }
  class ExitStatus {
    name = "ExitStatus";
    constructor(status) {
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
  }
  var HEAP8;
  var callRuntimeCallbacks = (callbacks) => {
    while (callbacks.length > 0) {
      callbacks.shift()(Module);
    }
  };
  var onPostRuns = [];
  var onPreRuns = [];
  var noExitRuntime = true;
  var stackRestore = (val) => __emscripten_stack_restore(val);
  var stackSave = () => _emscripten_stack_get_current();
  var __abort_js = () => abort("");
  var HEAPU8;
  var AsciiToString = (ptr) => {
    var str = "";
    while (1) {
      var ch = HEAPU8[ptr++];
      if (!ch) return str;
      str += String.fromCharCode(ch);
    }
  };
  var awaitingDependencies = {};
  var registeredTypes = {};
  var typeDependencies = {};
  class BindingError extends Error {
    constructor(message) {
      super(message);
      this.name = "BindingError";
    }
  }
  var throwBindingError = (message) => {
    throw new BindingError(message);
  };
  function sharedRegisterType(rawType, registeredInstance, options = {}) {
    var name = registeredInstance.name;
    if (!rawType) {
      throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
    }
    if (registeredTypes.hasOwnProperty(rawType)) {
      if (options.ignoreDuplicateRegistrations) {
        return;
      } else {
        throwBindingError(`Cannot register type '${name}' twice`);
      }
    }
    registeredTypes[rawType] = registeredInstance;
    delete typeDependencies[rawType];
    if (awaitingDependencies.hasOwnProperty(rawType)) {
      var callbacks = awaitingDependencies[rawType];
      delete awaitingDependencies[rawType];
      callbacks.forEach((cb) => cb());
    }
  }
  function registerType(rawType, registeredInstance, options = {}) {
    return sharedRegisterType(rawType, registeredInstance, options);
  }
  var HEAP16;
  var HEAPU16;
  var HEAP32;
  var HEAPU32;
  var HEAP64;
  var HEAPU64;
  var integerReadValueFromPointer = (name, width, signed) => {
    switch (width) {
      case 1:
        return signed ? (pointer) => HEAP8[pointer] : (pointer) => HEAPU8[pointer];
      case 2:
        return signed ? (pointer) => HEAP16[pointer >> 1] : (pointer) => HEAPU16[pointer >> 1];
      case 4:
        return signed ? (pointer) => HEAP32[pointer >> 2] : (pointer) => HEAPU32[pointer >> 2];
      case 8:
        return signed ? (pointer) => HEAP64[pointer >> 3] : (pointer) => HEAPU64[pointer >> 3];
      default:
        throw new TypeError(`invalid integer width (${width}): ${name}`);
    }
  };
  var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {
    name = AsciiToString(name);
    const isUnsignedType = minRange === 0n;
    let fromWireType = (value) => value;
    if (isUnsignedType) {
      const bitSize = size * 8;
      fromWireType = (value) => BigInt.asUintN(bitSize, value);
      maxRange = fromWireType(maxRange);
    }
    registerType(primitiveType, { name, fromWireType, toWireType: (destructors, value) => {
      if (typeof value == "number") {
        value = BigInt(value);
      }
      return value;
    }, readValueFromPointer: integerReadValueFromPointer(name, size, !isUnsignedType), destructorFunction: null });
  };
  var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
    name = AsciiToString(name);
    registerType(rawType, { name, fromWireType: function(wt) {
      return !!wt;
    }, toWireType: function(destructors, o) {
      return o ? trueValue : falseValue;
    }, readValueFromPointer: function(pointer) {
      return this.fromWireType(HEAPU8[pointer]);
    }, destructorFunction: null });
  };
  var emval_freelist = [];
  var emval_handles = [0, 1, , 1, null, 1, true, 1, false, 1];
  var __emval_decref = (handle) => {
    if (handle > 9 && 0 === --emval_handles[handle + 1]) {
      var value = emval_handles[handle];
      emval_handles[handle] = void 0;
      emval_freelist.push(handle);
    }
  };
  var Emval = { toValue: (handle) => {
    if (!handle) {
      throwBindingError(`Cannot use deleted val. handle = ${handle}`);
    }
    return emval_handles[handle];
  }, toHandle: (value) => {
    switch (value) {
      case void 0:
        return 2;
      case null:
        return 4;
      case true:
        return 6;
      case false:
        return 8;
      default: {
        const handle = emval_freelist.pop() || emval_handles.length;
        emval_handles[handle] = value;
        emval_handles[handle + 1] = 1;
        return handle;
      }
    }
  } };
  function readPointer(pointer) {
    return this.fromWireType(HEAPU32[pointer >> 2]);
  }
  var EmValType = { name: "emscripten::val", fromWireType: (handle) => {
    var rv = Emval.toValue(handle);
    __emval_decref(handle);
    return rv;
  }, toWireType: (destructors, value) => Emval.toHandle(value), readValueFromPointer: readPointer, destructorFunction: null };
  var __embind_register_emval = (rawType) => registerType(rawType, EmValType);
  var HEAPF32;
  var HEAPF64;
  var floatReadValueFromPointer = (name, width) => {
    switch (width) {
      case 4:
        return function(pointer) {
          return this.fromWireType(HEAPF32[pointer >> 2]);
        };
      case 8:
        return function(pointer) {
          return this.fromWireType(HEAPF64[pointer >> 3]);
        };
      default:
        throw new TypeError(`invalid float width (${width}): ${name}`);
    }
  };
  var __embind_register_float = (rawType, name, size) => {
    name = AsciiToString(name);
    registerType(rawType, { name, fromWireType: (value) => value, toWireType: (destructors, value) => value, readValueFromPointer: floatReadValueFromPointer(name, size), destructorFunction: null });
  };
  var createNamedFunction = (name, func) => Object.defineProperty(func, "name", { value: name });
  var runDestructors = (destructors) => {
    while (destructors.length) {
      var ptr = destructors.pop();
      var del = destructors.pop();
      del(ptr);
    }
  };
  function usesDestructorStack(argTypes) {
    for (var i = 1; i < argTypes.length; ++i) {
      if (argTypes[i] !== null && argTypes[i].destructorFunction === void 0) {
        return true;
      }
    }
    return false;
  }
  function argsUseStackAlloc(argTypes) {
    for (var i = 1; i < argTypes.length; ++i) {
      if (argTypes[i] !== null && argTypes[i].argStackAlloc) {
        return true;
      }
    }
    return false;
  }
  function createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync) {
    var needsDestructorStack = usesDestructorStack(argTypes);
    var argsNeedStack = argsUseStackAlloc(argTypes);
    var useStackFrame = argsNeedStack && !isAsync && !needsDestructorStack;
    if (argsNeedStack && !useStackFrame) {
      needsDestructorStack = true;
    }
    var argCount = argTypes.length - 2;
    var argsList = [];
    var argsListWired = ["fn"];
    if (isClassMethodFunc) {
      argsListWired.push("thisWired");
    }
    for (var i = 0; i < argCount; ++i) {
      argsList.push(`arg${i}`);
      argsListWired.push(`arg${i}Wired`);
    }
    argsList = argsList.join();
    argsListWired = argsListWired.join();
    var invokerFnBody = `return function (${argsList}) {
`;
    if (needsDestructorStack) {
      invokerFnBody += "var destructors = [];\n";
    }
    if (useStackFrame) {
      invokerFnBody += "var sp = stackSave();\ntry {\n";
    }
    var dtorStack = needsDestructorStack ? "destructors" : "null";
    var args1 = ["humanName", "throwBindingError", "invoker", "fn", "runDestructors", "fromRetWire", "toClassParamWire"];
    if (useStackFrame) {
      args1.push("stackSave", "stackRestore");
    }
    if (isClassMethodFunc) {
      invokerFnBody += `var thisWired = toClassParamWire(${dtorStack}, this);
`;
    }
    for (var i = 0; i < argCount; ++i) {
      var argName = `toArg${i}Wire`;
      invokerFnBody += `var arg${i}Wired = ${argName}(${dtorStack}, arg${i});
`;
      args1.push(argName);
    }
    invokerFnBody += (returns || isAsync ? "var rv = " : "") + `invoker(${argsListWired});
`;
    if (useStackFrame) {
      invokerFnBody += "} finally {\nstackRestore(sp);\n}\n";
    }
    if (needsDestructorStack) {
      invokerFnBody += "runDestructors(destructors);\n";
    } else {
      for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
        var paramName = i === 1 ? "thisWired" : `arg${i - 2}Wired`;
        if (argTypes[i].destructorFunction !== null) {
          invokerFnBody += `${paramName}_dtor(${paramName});
`;
          args1.push(`${paramName}_dtor`);
        }
      }
    }
    if (returns) {
      invokerFnBody += "var ret = fromRetWire(rv);\nreturn ret;\n";
    } else {
    }
    invokerFnBody += "}\n";
    return new Function(args1, invokerFnBody);
  }
  function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, isAsync) {
    var argCount = argTypes.length;
    if (argCount < 2) {
      throwBindingError("argTypes array size mismatch! Must at least get return value and receiver (this) types!");
    }
    var isClassMethodFunc = argTypes[1] !== null && classType !== null;
    var needsDestructorStack = usesDestructorStack(argTypes);
    var argsNeedStack = argsUseStackAlloc(argTypes);
    var useStackFrame = argsNeedStack && !isAsync && !needsDestructorStack;
    if (argsNeedStack && !useStackFrame) {
      needsDestructorStack = true;
    }
    var returns = !argTypes[0].isVoid;
    var retType = argTypes[0];
    var instType = argTypes[1];
    var closureArgs = [humanName, throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, retType.fromWireType.bind(retType), instType?.toWireType.bind(instType)];
    if (useStackFrame) {
      closureArgs.push(stackSave, stackRestore);
    }
    for (var i = 2; i < argCount; ++i) {
      var argType = argTypes[i];
      closureArgs.push(argType.toWireType.bind(argType));
    }
    if (!needsDestructorStack) {
      for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
        if (argTypes[i].destructorFunction !== null) {
          closureArgs.push(argTypes[i].destructorFunction);
        }
      }
    }
    let invokerFactory = createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync);
    var invokerFn = invokerFactory(...closureArgs);
    return createNamedFunction(humanName, invokerFn);
  }
  var ensureOverloadTable = (proto, methodName, humanName) => {
    if (void 0 === proto[methodName].overloadTable) {
      var prevFunc = proto[methodName];
      proto[methodName] = function(...args) {
        if (!proto[methodName].overloadTable.hasOwnProperty(args.length)) {
          throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`);
        }
        return proto[methodName].overloadTable[args.length].apply(this, args);
      };
      proto[methodName].overloadTable = [];
      proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
    }
  };
  var exposePublicSymbol = (name, value, numArguments) => {
    if (Module.hasOwnProperty(name)) {
      if (void 0 === numArguments || void 0 !== Module[name].overloadTable && void 0 !== Module[name].overloadTable[numArguments]) {
        throwBindingError(`Cannot register public name '${name}' twice`);
      }
      ensureOverloadTable(Module, name, name);
      if (Module[name].overloadTable.hasOwnProperty(numArguments)) {
        throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`);
      }
      Module[name].overloadTable[numArguments] = value;
    } else {
      Module[name] = value;
      Module[name].argCount = numArguments;
    }
  };
  var heap32VectorToArray = (count, firstElement) => {
    var array = [];
    for (var i = 0; i < count; i++) {
      array.push(HEAPU32[firstElement + i * 4 >> 2]);
    }
    return array;
  };
  class InternalError extends Error {
    constructor(message) {
      super(message);
      this.name = "InternalError";
    }
  }
  var throwInternalError = (message) => {
    throw new InternalError(message);
  };
  var replacePublicSymbol = (name, value, numArguments) => {
    if (!Module.hasOwnProperty(name)) {
      throwInternalError("Replacing nonexistent public symbol");
    }
    if (void 0 !== Module[name].overloadTable && void 0 !== numArguments) {
      Module[name].overloadTable[numArguments] = value;
    } else {
      Module[name] = value;
      Module[name].argCount = numArguments;
    }
  };
  var wasmTableMirror = [];
  var getWasmTableEntry = (funcPtr) => {
    var func = wasmTableMirror[funcPtr];
    if (!func) {
      wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
    }
    return func;
  };
  var embind__requireFunction = (signature, rawFunction, isAsync = false) => {
    signature = AsciiToString(signature);
    function makeDynCaller() {
      var rtn = getWasmTableEntry(rawFunction);
      return rtn;
    }
    var fp = makeDynCaller();
    if (typeof fp != "function") {
      throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`);
    }
    return fp;
  };
  class UnboundTypeError extends Error {
  }
  var getTypeName = (type) => {
    var ptr = ___getTypeName(type);
    var rv = AsciiToString(ptr);
    _free(ptr);
    return rv;
  };
  var throwUnboundTypeError = (message, types) => {
    var unboundTypes = [];
    var seen = {};
    function visit(type) {
      if (seen[type]) {
        return;
      }
      if (registeredTypes[type]) {
        return;
      }
      if (typeDependencies[type]) {
        typeDependencies[type].forEach(visit);
        return;
      }
      unboundTypes.push(type);
      seen[type] = true;
    }
    types.forEach(visit);
    throw new UnboundTypeError(`${message}: ` + unboundTypes.map(getTypeName).join([", "]));
  };
  var whenDependentTypesAreResolved = (myTypes, dependentTypes, getTypeConverters) => {
    myTypes.forEach((type) => typeDependencies[type] = dependentTypes);
    function onComplete(typeConverters2) {
      var myTypeConverters = getTypeConverters(typeConverters2);
      if (myTypeConverters.length !== myTypes.length) {
        throwInternalError("Mismatched type converter count");
      }
      for (var i = 0; i < myTypes.length; ++i) {
        registerType(myTypes[i], myTypeConverters[i]);
      }
    }
    var typeConverters = new Array(dependentTypes.length);
    var unregisteredTypes = [];
    var registered = 0;
    for (let [i, dt] of dependentTypes.entries()) {
      if (registeredTypes.hasOwnProperty(dt)) {
        typeConverters[i] = registeredTypes[dt];
      } else {
        unregisteredTypes.push(dt);
        if (!awaitingDependencies.hasOwnProperty(dt)) {
          awaitingDependencies[dt] = [];
        }
        awaitingDependencies[dt].push(() => {
          typeConverters[i] = registeredTypes[dt];
          ++registered;
          if (registered === unregisteredTypes.length) {
            onComplete(typeConverters);
          }
        });
      }
    }
    if (0 === unregisteredTypes.length) {
      onComplete(typeConverters);
    }
  };
  var getFunctionName = (signature) => {
    signature = signature.trim();
    const argsIndex = signature.indexOf("(");
    if (argsIndex === -1) return signature;
    return signature.slice(0, argsIndex);
  };
  var __embind_register_function = (name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync, isNonnullReturn) => {
    var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
    name = AsciiToString(name);
    name = getFunctionName(name);
    rawInvoker = embind__requireFunction(signature, rawInvoker, isAsync);
    exposePublicSymbol(name, function() {
      throwUnboundTypeError(`Cannot call ${name} due to unbound types`, argTypes);
    }, argCount - 1);
    whenDependentTypesAreResolved([], argTypes, (argTypes2) => {
      var invokerArgsArray = [argTypes2[0], null].concat(argTypes2.slice(1));
      replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn, isAsync), argCount - 1);
      return [];
    });
  };
  var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
    name = AsciiToString(name);
    const isUnsignedType = minRange === 0;
    let fromWireType = (value) => value;
    if (isUnsignedType) {
      var bitshift = 32 - 8 * size;
      fromWireType = (value) => value << bitshift >>> bitshift;
      maxRange = fromWireType(maxRange);
    }
    registerType(primitiveType, { name, fromWireType, toWireType: (destructors, value) => value, readValueFromPointer: integerReadValueFromPointer(name, size, minRange !== 0), destructorFunction: null });
  };
  var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
    var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array];
    var TA = typeMapping[dataTypeIndex];
    function decodeMemoryView(handle) {
      var size = HEAPU32[handle >> 2];
      var data = HEAPU32[handle + 4 >> 2];
      return new TA(HEAP8.buffer, data, size);
    }
    name = AsciiToString(name);
    registerType(rawType, { name, fromWireType: decodeMemoryView, readValueFromPointer: decodeMemoryView }, { ignoreDuplicateRegistrations: true });
  };
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
    if (!(maxBytesToWrite > 0)) return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i = 0; i < str.length; ++i) {
      var u = str.codePointAt(i);
      if (u <= 127) {
        if (outIdx >= endIdx) break;
        heap[outIdx++] = u;
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break;
        heap[outIdx++] = 192 | u >> 6;
        heap[outIdx++] = 128 | u & 63;
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break;
        heap[outIdx++] = 224 | u >> 12;
        heap[outIdx++] = 128 | u >> 6 & 63;
        heap[outIdx++] = 128 | u & 63;
      } else {
        if (outIdx + 3 >= endIdx) break;
        heap[outIdx++] = 240 | u >> 18;
        heap[outIdx++] = 128 | u >> 12 & 63;
        heap[outIdx++] = 128 | u >> 6 & 63;
        heap[outIdx++] = 128 | u & 63;
        i++;
      }
    }
    heap[outIdx] = 0;
    return outIdx - startIdx;
  };
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
  var lengthBytesUTF8 = (str) => {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
      var c = str.charCodeAt(i);
      if (c <= 127) {
        len++;
      } else if (c <= 2047) {
        len += 2;
      } else if (c >= 55296 && c <= 57343) {
        len += 4;
        ++i;
      } else {
        len += 3;
      }
    }
    return len;
  };
  var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
  var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
    var maxIdx = idx + maxBytesToRead;
    if (ignoreNul) return maxIdx;
    while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
    return idx;
  };
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
    var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
    if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
      return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
    }
    var str = "";
    while (idx < endPtr) {
      var u0 = heapOrArray[idx++];
      if (!(u0 & 128)) {
        str += String.fromCharCode(u0);
        continue;
      }
      var u1 = heapOrArray[idx++] & 63;
      if ((u0 & 224) == 192) {
        str += String.fromCharCode((u0 & 31) << 6 | u1);
        continue;
      }
      var u2 = heapOrArray[idx++] & 63;
      if ((u0 & 240) == 224) {
        u0 = (u0 & 15) << 12 | u1 << 6 | u2;
      } else {
        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
      }
      if (u0 < 65536) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 65536;
        str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
      }
    }
    return str;
  };
  var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : "";
  var __embind_register_std_string = (rawType, name) => {
    name = AsciiToString(name);
    var stdStringIsUTF8 = true;
    registerType(rawType, { name, fromWireType(value) {
      var length = HEAPU32[value >> 2];
      var payload = value + 4;
      var str;
      if (stdStringIsUTF8) {
        str = UTF8ToString(payload, length, true);
      } else {
        str = "";
        for (var i = 0; i < length; ++i) {
          str += String.fromCharCode(HEAPU8[payload + i]);
        }
      }
      _free(value);
      return str;
    }, toWireType(destructors, value) {
      if (value instanceof ArrayBuffer) {
        value = new Uint8Array(value);
      }
      var length;
      var valueIsOfTypeString = typeof value == "string";
      if (!(valueIsOfTypeString || ArrayBuffer.isView(value) && value.BYTES_PER_ELEMENT == 1)) {
        throwBindingError("Cannot pass non-string to std::string");
      }
      if (stdStringIsUTF8 && valueIsOfTypeString) {
        length = lengthBytesUTF8(value);
      } else {
        length = value.length;
      }
      var base = _malloc(4 + length + 1);
      var ptr = base + 4;
      HEAPU32[base >> 2] = length;
      if (valueIsOfTypeString) {
        if (stdStringIsUTF8) {
          stringToUTF8(value, ptr, length + 1);
        } else {
          for (var i = 0; i < length; ++i) {
            var charCode = value.charCodeAt(i);
            if (charCode > 255) {
              _free(base);
              throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
            }
            HEAPU8[ptr + i] = charCode;
          }
        }
      } else {
        HEAPU8.set(value, ptr);
      }
      if (destructors !== null) {
        destructors.push(_free, base);
      }
      return base;
    }, readValueFromPointer: readPointer, destructorFunction(ptr) {
      _free(ptr);
    } });
  };
  var UTF16Decoder = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0;
  var UTF16ToString = (ptr, maxBytesToRead, ignoreNul) => {
    var idx = ptr >> 1;
    var endIdx = findStringEnd(HEAPU16, idx, maxBytesToRead / 2, ignoreNul);
    if (endIdx - idx > 16 && UTF16Decoder) return UTF16Decoder.decode(HEAPU16.subarray(idx, endIdx));
    var str = "";
    for (var i = idx; i < endIdx; ++i) {
      var codeUnit = HEAPU16[i];
      str += String.fromCharCode(codeUnit);
    }
    return str;
  };
  var stringToUTF16 = (str, outPtr, maxBytesToWrite = 2147483647) => {
    if (maxBytesToWrite < 2) return 0;
    maxBytesToWrite -= 2;
    var startPtr = outPtr;
    var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
    for (var i = 0; i < numCharsToWrite; ++i) {
      var codeUnit = str.charCodeAt(i);
      HEAP16[outPtr >> 1] = codeUnit;
      outPtr += 2;
    }
    HEAP16[outPtr >> 1] = 0;
    return outPtr - startPtr;
  };
  var lengthBytesUTF16 = (str) => str.length * 2;
  var UTF32ToString = (ptr, maxBytesToRead, ignoreNul) => {
    var str = "";
    var startIdx = ptr >> 2;
    for (var i = 0; !(i >= maxBytesToRead / 4); i++) {
      var utf32 = HEAPU32[startIdx + i];
      if (!utf32 && !ignoreNul) break;
      str += String.fromCodePoint(utf32);
    }
    return str;
  };
  var stringToUTF32 = (str, outPtr, maxBytesToWrite = 2147483647) => {
    if (maxBytesToWrite < 4) return 0;
    var startPtr = outPtr;
    var endPtr = startPtr + maxBytesToWrite - 4;
    for (var i = 0; i < str.length; ++i) {
      var codePoint = str.codePointAt(i);
      if (codePoint > 65535) {
        i++;
      }
      HEAP32[outPtr >> 2] = codePoint;
      outPtr += 4;
      if (outPtr + 4 > endPtr) break;
    }
    HEAP32[outPtr >> 2] = 0;
    return outPtr - startPtr;
  };
  var lengthBytesUTF32 = (str) => {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
      var codePoint = str.codePointAt(i);
      if (codePoint > 65535) {
        i++;
      }
      len += 4;
    }
    return len;
  };
  var __embind_register_std_wstring = (rawType, charSize, name) => {
    name = AsciiToString(name);
    var decodeString, encodeString, lengthBytesUTF;
    if (charSize === 2) {
      decodeString = UTF16ToString;
      encodeString = stringToUTF16;
      lengthBytesUTF = lengthBytesUTF16;
    } else {
      decodeString = UTF32ToString;
      encodeString = stringToUTF32;
      lengthBytesUTF = lengthBytesUTF32;
    }
    registerType(rawType, { name, fromWireType: (value) => {
      var length = HEAPU32[value >> 2];
      var str = decodeString(value + 4, length * charSize, true);
      _free(value);
      return str;
    }, toWireType: (destructors, value) => {
      if (!(typeof value == "string")) {
        throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
      }
      var length = lengthBytesUTF(value);
      var ptr = _malloc(4 + length + charSize);
      HEAPU32[ptr >> 2] = length / charSize;
      encodeString(value, ptr + 4, length + charSize);
      if (destructors !== null) {
        destructors.push(_free, ptr);
      }
      return ptr;
    }, readValueFromPointer: readPointer, destructorFunction(ptr) {
      _free(ptr);
    } });
  };
  var __embind_register_void = (rawType, name) => {
    name = AsciiToString(name);
    registerType(rawType, { isVoid: true, name, fromWireType: () => void 0, toWireType: (destructors, o) => void 0 });
  };
  var getHeapMax = () => 2147483648;
  var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
  var growMemory = (size) => {
    var oldHeapSize = wasmMemory.buffer.byteLength;
    var pages = (size - oldHeapSize + 65535) / 65536 | 0;
    try {
      wasmMemory.grow(pages);
      updateMemoryViews();
      return 1;
    } catch (e) {
    }
  };
  var _emscripten_resize_heap = (requestedSize) => {
    var oldSize = HEAPU8.length;
    requestedSize >>>= 0;
    var maxHeapSize = getHeapMax();
    if (requestedSize > maxHeapSize) {
      return false;
    }
    for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
      var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
      overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
      var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
      var replacement = growMemory(newSize);
      if (replacement) {
        return true;
      }
    }
    return false;
  };
  var runtimeKeepaliveCounter = 0;
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  var _proc_exit = (code) => {
    EXITSTATUS = code;
    if (!keepRuntimeAlive()) {
      Module["onExit"]?.(code);
      ABORT = true;
    }
    quit_(code, new ExitStatus(code));
  };
  var exitJS = (status, implicit) => {
    EXITSTATUS = status;
    _proc_exit(status);
  };
  var _exit = exitJS;
  var _fd_close = (fd) => 52;
  var INT53_MAX = 9007199254740992;
  var INT53_MIN = -9007199254740992;
  var bigintToI53Checked = (num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
  function _fd_seek(fd, offset, whence, newOffset) {
    offset = bigintToI53Checked(offset);
    return 70;
  }
  var printCharBuffers = [null, [], []];
  var printChar = (stream, curr) => {
    var buffer = printCharBuffers[stream];
    if (!curr || curr === 10) {
      (stream === 1 ? out : err)(UTF8ArrayToString(buffer));
      buffer.length = 0;
    } else {
      buffer.push(curr);
    }
  };
  var _fd_write = (fd, iov, iovcnt, pnum) => {
    var num = 0;
    for (var i = 0; i < iovcnt; i++) {
      var ptr = HEAPU32[iov >> 2];
      var len = HEAPU32[iov + 4 >> 2];
      iov += 8;
      for (var j = 0; j < len; j++) {
        printChar(fd, HEAPU8[ptr + j]);
      }
      num += len;
    }
    HEAPU32[pnum >> 2] = num;
    return 0;
  };
  {
    if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
    if (Module["print"]) out = Module["print"];
    if (Module["printErr"]) err = Module["printErr"];
    if (Module["arguments"]) programArgs = Module["arguments"];
    if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
    var preInit = Module["preInit"];
    if (preInit) {
      if (typeof preInit == "function") Module["preInit"] = preInit = [preInit];
      while (preInit.length > 0) {
        preInit.shift()();
      }
    }
  }
  var ___getTypeName, _malloc, _free, __emscripten_stack_restore, _emscripten_stack_get_current, memory, __indirect_function_table, wasmMemory, wasmTable;
  function assignWasmExports(wasmExports2) {
    ___getTypeName = wasmExports2["s"];
    _malloc = Module["_malloc"] = wasmExports2["u"];
    _free = Module["_free"] = wasmExports2["v"];
    __emscripten_stack_restore = wasmExports2["w"];
    _emscripten_stack_get_current = wasmExports2["x"];
    memory = wasmMemory = wasmExports2["q"];
    __indirect_function_table = wasmTable = wasmExports2["t"];
  }
  var wasmImports = { l: __abort_js, f: __embind_register_bigint, j: __embind_register_bool, h: __embind_register_emval, e: __embind_register_float, b: __embind_register_function, c: __embind_register_integer, a: __embind_register_memory_view, i: __embind_register_std_string, d: __embind_register_std_wstring, p: __embind_register_void, k: _emscripten_resize_heap, o: _exit, n: _fd_close, m: _fd_seek, g: _fd_write };
  async function run() {
    preRun();
    var setStatus = Module["setStatus"];
    if (setStatus) {
      setStatus("Running...");
      await new Promise((resolve) => setTimeout(resolve, 1));
      setTimeout(setStatus, 1, "");
    }
    if (ABORT) return;
    initRuntime();
    Module["onRuntimeInitialized"]?.();
    postRun();
  }
  var wasmExports;
  wasmExports = await createWasm();
  await run();
  ;
  return Module;
}
var bzip2_wasm_es_default = Bzip2Module;

// wrapper.js
var bzip2Module = await bzip2_wasm_es_default();
var BZ_OK = 0;
var BZ_STREAM_END = 4;
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
var Bzip2 = { decompress };
var wrapper_default = Bzip2;
export {
  wrapper_default as default
};
