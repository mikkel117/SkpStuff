use yew::prelude::*;
use yew_router::*;

#[function_component(Router)]
pub fn app() -> Html {
    wasm_logger::init(wasm_logger::Config::default());
    html! {
        <>
        <p>{ "router" }</p>
        </>
    }
}
