use anyhow::{Context, Error, Ok, Result};
use reqwest;
use serde::{Deserialize, Serialize};
use yew::prelude::*;

use yew_hooks::prelude::*;

#[derive(Serialize, Deserialize, Debug, Clone)]
struct TodoStruct {
    #[serde(rename = "userId")]
    user_id: i32,
    id: i32,
    title: String,
    completed: bool,
}

#[function_component(AnyhowTest)]
pub fn anyhow_test() -> Html {
    /* let state =
        use_async(
            async move { fetch("https://jsonplaceholder.typicode.com/todos".to_string()).await },
        );
    let onclick = {
        let state = state.clone();
        Callback::from(move |_| state.run())
    }; */

    let counter = use_state(|| 0);
    let onclick = {
        let counter = counter.clone();
        Callback::from(move |_| counter.set(*counter + 1))
    };
    html! {
    <>
     <button {onclick}>{*counter}</button>
            </>
        }
}

/* async fn fetch(url: String) -> anyhow::Result<Vec<TodoStruct>>{
    let foo = reqwest::get(url).await?;
    Ok(foo.json().await?)
} */
