use std::fmt::Result;

use js_sys::Array;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, RequestMode, Response};

/* #[derive(Serialize, Deserialize, Debug, Clone)]
struct TodoStruct {
    #[serde(rename = "userId")]
    user_id: i32,
    id: i32,
    title: String,
    completed: bool,
} */

#[wasm_bindgen(js_name = "vecTest")]
pub async fn vec_test() ->  {
    let opts = RequestInit::new();
    opts.method("GET");
    opts.mode(RequestMode::Cors);

    let url = "https://jsonplaceholder.typicode.com/todos";

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

/* async fn fetch() -> reqwest::Result<TodoStruct> {
    reqwest::Client::new()
        .get("https://jsonplaceholder.typicode.com/todos")
        .send()
        .await?
        .json()
        .await
} */

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
