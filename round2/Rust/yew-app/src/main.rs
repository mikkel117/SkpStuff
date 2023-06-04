//https://yew.rs/docs/tutorial

use yew::prelude::*;

#[function_component(App)]
fn app() -> Html {
    html! {
        <>
        <h1>{ "hello world" }</h1>
        <p>{"hey"}</p>
        </>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}
