async function loadModule(path, wasmBindGen) {
    // this will be useful in the future when we load multiple different wasm_bindgen modules.
    wasmBindGen = wasmBindGen || wasm_bindgen;
    await wasmBindGen(path);
    
    let result = {};
    Object.keys(wasmBindGen.wasm).forEach(k => {
        // this might bite us later if wasm_bindgen changes their internal name conventions
        if (k === 'memory' || k.startsWith("__w"))
            return;
        result[k] = wasmBindGen[k];
    });
    return result;
}
