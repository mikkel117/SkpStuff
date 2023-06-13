use wasm_bindgen::prelude::*;

//#[derive(Debug)]
pub struct TodoStruct {
    
} 

#[wasm_bindgen(js_name = "vecTest")]
pub fn vec_test() -> js_sys::Array {
    let res = vec![1, 2, 3, 4, 5, 6, 7];
    
    res.into_iter().map(JsValue::from).collect()
}

#[wasm_bindgen]
pub fn add(a: usize, b: usize) -> usize {
    a + b
}

#[wasm_bindgen]
pub fn color(a: Car, color: usize) -> Car {
    Car {
        number: a.number,
        color,
    }
}

#[wasm_bindgen]
pub struct Car {
    pub number: usize,
    pub color: usize,
}

#[wasm_bindgen]
impl Car {
    pub fn new() -> Self {
        Car {
            number: 0,
            color: 0,
        }
    }

    /* pub fn duplicate(&self) -> Self {
        Self {
            number: self.number + 1,
            color: self.color,
        }
    }

    pub fn change_number(&mut self, number: usize) {
        self.number = number;
    } */
}
