use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, RequestMode, Response};

#[wasm_bindgen(js_name = "getAllPokemon")]
pub async fn get_all_pokemon() -> std::result::Result<JsValue, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("GET");
    opts.mode(RequestMode::Cors);

    let url = "https://pokeapi.co/api/v2/pokemon";

    let request = Request::new_with_str_and_init(&url, &opts)?;

    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;

    assert!(resp_value.is_instance_of::<Response>());
    let resp: Response = resp_value.dyn_into().unwrap();

    let json = JsFuture::from(resp.json()?).await?;

    Ok(json)
}

#[wasm_bindgen(js_name = "switchPage")]
pub async fn switch_page(url: String) -> std::result::Result<JsValue, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("GET");
    opts.mode(RequestMode::Cors);

    let url = url;

    let request = Request::new_with_str_and_init(&url, &opts)?;

    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;

    assert!(resp_value.is_instance_of::<Response>());
    let resp: Response = resp_value.dyn_into().unwrap();

    let json = JsFuture::from(resp.json()?).await?;

    Ok(json)
}

#[wasm_bindgen(js_name = "getPokemon")]
pub async fn get_pokemon(url: String) -> std::result::Result<JsValue, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("GET");
    opts.mode(RequestMode::Cors);

    let url = url;

    let request = Request::new_with_str_and_init(&url, &opts)?;

    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;

    assert!(resp_value.is_instance_of::<Response>());
    let resp: Response = resp_value.dyn_into().unwrap();

    let json = JsFuture::from(resp.json()?).await?;

    Ok(json)
}

/* #[wasm_bindgen(js_name = "vecTest")]
pub  fn vec_test() -> js_sys::Array {
    let res = vec![1, 2, 3, 4, 5, 6, 7];

    res.into_iter().map(JsValue::from).collect()
} */

/* #[wasm_bindgen]
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
} */

/* #[wasm_bindgen]
impl Car {
    pub fn new() -> Self {
        Car {
            number: 0,
            color: 0,
        }
    } */

/* pub fn duplicate(&self) -> Self {
    Self {
        number: self.number + 1,
        color: self.color,
    }
}

pub fn change_number(&mut self, number: usize) {
    self.number = number;
} */
/* } */
