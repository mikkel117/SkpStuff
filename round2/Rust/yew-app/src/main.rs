//https://yew.rs/docs/tutorial
use yew::prelude::*;
use yew_router::components::Link;
use yew_router::*;
mod counter;
/* #[path = "./components/list_of_pokemon.rs"]
mod list_of_pokemon; */
mod anyhow_test;
mod test;
mod test_component;
#[derive(Clone, Routable, PartialEq)]
enum Route {
    #[at("/")]
    Home,
    #[at("/about")]
    About,
    #[at("/news/:id")]
    News { id: u8 },
    #[not_found]
    #[at("/404")]
    NotFound,
}

#[function_component(About)]
fn about() -> Html {
    html! {
        <>
        <p>
            {"about"}
        </p>
        <Link<Route> to={Route::Home}>{ "click here to go home" }</Link<Route>>
        </>
    }
}

fn switch(routes: Route) -> Html {
    match routes {
        Route::Home => html! { <test::Test /> },
        Route::About => html! { <About/> },
        Route::News { id } => html! { format!("news {}", id) },
        Route::NotFound => html! { <div>{" not found "}</div> },
    }
}

#[function_component(App)]
fn app() -> Html {
    wasm_logger::init(wasm_logger::Config::default());
    html! {
        /* <test_component::RenderedAt time={"test".to_string()} />
        <test_component::RenderedAt time={"20".to_string()} />
        <counter::Counter /> */
        <>
        <BrowserRouter>
            <Switch<Route> render={switch} />
        </BrowserRouter>
        </>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}
