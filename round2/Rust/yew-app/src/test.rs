use log::info;
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

#[function_component(Test)]
pub fn test() -> Html {
    let state: UseAsyncHandle<Vec<TodoStruct>, MyError> =
        use_async(
            async move { fetch("https://jsonplaceholder.typicode.com/todos".to_string()).await },
        );
    let my_use_state: UseStateHandle<Vec<TodoStruct>> = use_state(|| vec![]);
    /* let onclick = {
        let state = state.clone();
        Callback::from(move |_| state.run())
    }; */

    {
        let state = state.clone();
        use_effect_once(move || {
            state.run();
            || ()
        });
    }

    html! {
        <>
        /* <button {onclick}>{"click me"}</button> */
        <div>
            {
                state.data.as_ref().map_or_else(|| html! {}, |item| html! {
                <p>{&item[0].title}</p>
            })
            }
        </div>
            </>
    }
}
async fn fetch(url: String) -> Result<Vec<TodoStruct>, MyError> {
    let foo: Result<reqwest::Response, reqwest::Error> = reqwest::get(url).await;
    match foo {
        Ok(foo) => Ok(foo.json().await.unwrap()),
        Err(e) => Err(MyError::DeserializeError),
    }
}

#[derive(Clone, Debug, PartialEq, Copy)]
enum MyError {
    RequestError,
    DeserializeError,
}
