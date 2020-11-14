#[macro_use]
extern crate serde_derive;
extern crate js_sys;

use wasm_bindgen::prelude::*;

//////////////////////////////////////////////////////////////////////////////
// Traits

pub trait Urn {
    fn update(&mut self);
    fn compensated_update(&mut self);
    fn ratio(&self) -> f64;
}

//////////////////////////////////////////////////////////////////////////////
// Structs that cross the JS-Rust border

#[derive(Serialize, Deserialize, Clone)]
pub struct SimplePolyaUrn {
    update_matrix: (u32, u32, u32, u32),
    state: (u32, u32),
    timestamp: u32
}

#[derive(Serialize, Deserialize)]
pub struct UrnTrace {
    trace: Vec<f64>
}

#[derive(Serialize, Deserialize, Clone)]
pub struct UrnHeatmap {
    heatmap: Vec<Vec<u32>>,
    size: u32,
    n_steps: u32
}

//////////////////////////////////////////////////////////////////////////////
// Trait impls

impl Urn for SimplePolyaUrn {
    fn update(&mut self) {
        if rand_float() < self.ratio() {
            self.state.0 += self.update_matrix.0;
            self.state.1 += self.update_matrix.1;
        } else {
            self.state.0 += self.update_matrix.2;
            self.state.1 += self.update_matrix.3;
        }
        self.timestamp += 1
    }

    fn compensated_update(&mut self) {
        if rand_float() < self.ratio() {
            if rand_float() >= self.ratio() {
                self.state.0 += self.update_matrix.0;
                self.state.1 += self.update_matrix.1;
            }
        } else {
            if rand_float() < self.ratio() {
                self.state.0 += self.update_matrix.2;
                self.state.1 += self.update_matrix.3;
            }
        }
    }

    fn ratio(&self) -> f64 {
        f64::from(self.state.0) / f64::from(self.state.0 + self.state.1)
    }
}

//////////////////////////////////////////////////////////////////////////////

fn rand_float() -> f64 {
    // a sacrifice to the wasm-unknown-unknown target deities
    js_sys::Math::random()
}

fn make_simple_urn(r: u32, b: u32) -> SimplePolyaUrn {
    SimplePolyaUrn {
        update_matrix: (1, 0, 0, 1),
        state: (r, b),
        timestamp: 0
    }
}

//////////////////////////////////////////////////////////////////////////////
// wasm-*

#[wasm_bindgen]
pub fn make_polya_urn(a: u32, b: u32, c: u32, d: u32,
                      red: u32, black: u32) -> JsValue {
    JsValue::from_serde(&(SimplePolyaUrn {
        update_matrix: (a, b, c, d),
        state: (red, black),
        timestamp: 0
    })).unwrap()
}

#[wasm_bindgen]
pub fn make_heatmap(size: u32, n_steps: u32) -> JsValue {
    let result = UrnHeatmap {
        heatmap: vec![vec![0; size as usize]; size as usize],
        size,
        n_steps
    };
    JsValue::from_serde(&result).unwrap()
}

//////////////////////////////////////////////////////////////////////////////

fn parametric_update_urn_heatmap<F>(
    js_heatmap: &JsValue, js_urn: &JsValue, n_runs: u32,
    f: F) -> JsValue where
    F: Fn(&mut SimplePolyaUrn)
{
    let urn: SimplePolyaUrn = js_urn.into_serde().unwrap();
    let mut urn_heatmap: UrnHeatmap = js_heatmap.into_serde().unwrap();
    for _ in 0..n_runs {
        let mut urn = urn.clone(); // make_simple_urn(r, b);
        for ix in 0..urn_heatmap.n_steps {
            // jy, jx: jitter
            let jy = (rand_float() - 0.5) / f64::from(urn_heatmap.n_steps);
            let jx = (rand_float() - 0.5) / f64::from(urn_heatmap.n_steps);
            let y = (jy + urn.ratio() * f64::from(urn_heatmap.size)) as isize;
            let x = (jx + f64::from(ix) / f64::from(urn_heatmap.n_steps) * f64::from(urn_heatmap.size)) as isize;
            let sz = (urn_heatmap.size - 1) as isize;
            let cy = if y < 0 { 0 } else if y > sz { sz as usize } else { y as usize };
            let cx = if x < 0 { 0 } else if x > sz { sz as usize } else { x as usize };
            urn_heatmap.heatmap[cy][cx] += 1;
            f(&mut urn); // urn.update();
        }
    }
    JsValue::from_serde(&urn_heatmap).unwrap()
}

pub fn parametric_run_urn<F>(f: F) -> JsValue where
    F: Fn(&mut SimplePolyaUrn)
{
    let mut urn = make_simple_urn(1, 1);
    for _ in 0..100 {
        f(&mut urn); // urn.update();
    }
    JsValue::from_serde(&urn).unwrap()
}

pub fn parametric_trace_urn<F>(urn: &JsValue, n: u32, f: F) -> JsValue where
    F: Fn(&mut SimplePolyaUrn)
{
    let mut urn: SimplePolyaUrn = urn.into_serde().unwrap();
    let mut result = Vec::new();
    for _ in 0..n {
        f(&mut urn); // urn.update();
        result.push(urn.ratio());
    }
    JsValue::from_serde(&(UrnTrace { trace: result })).unwrap()
}

//////////////////////////////////////////////////////////////////////////////
// main calls

#[wasm_bindgen]
pub fn update_urn_heatmap(js_heatmap: &JsValue, js_urn: &JsValue, n_runs: u32) -> JsValue {
    parametric_update_urn_heatmap(js_heatmap, js_urn, n_runs, |urn| urn.update())
}

#[wasm_bindgen]
pub fn update_compensated_urn_heatmap(js_heatmap: &JsValue, js_urn: &JsValue, n_runs: u32) -> JsValue {
    parametric_update_urn_heatmap(js_heatmap, js_urn, n_runs, |urn| urn.compensated_update())
}

#[wasm_bindgen]
pub fn run_urn() -> JsValue {
    parametric_run_urn(|urn| urn.update())
}

#[wasm_bindgen]
pub fn run_compensated_urn() -> JsValue {
    parametric_run_urn(|urn| urn.compensated_update())
}

#[wasm_bindgen]
pub fn trace_urn(urn: &JsValue, n: u32) -> JsValue {
    parametric_trace_urn(urn, n, |urn| urn.update())
}

#[wasm_bindgen]
pub fn trace_compensated_urn(urn: &JsValue, n: u32) -> JsValue {
    parametric_trace_urn(urn, n, |urn| urn.compensated_update())
}
