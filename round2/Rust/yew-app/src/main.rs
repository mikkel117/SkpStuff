use yew::prelude::*;

#[function_component(App)]
fn app() -> Html {
    html! {
        <h1>{ "hello world" }</h1>
    }
}

fn main() {
    println!("Hello, world!");
}
