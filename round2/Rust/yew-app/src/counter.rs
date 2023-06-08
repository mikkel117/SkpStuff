use stylist::yew::use_style;
use yew::{function_component, html, use_state, Callback, Html};

#[function_component(Counter)]
pub fn counter() -> Html {
    let counter = use_state(|| 0);

    let onclick = {
        let counter = counter.clone();
        Callback::from(move |_| counter.set(*counter + 1))
    };

    let foo = use_style!({
        background: red;
        display: flex;
        padding: 20px;
        justify-content: center;
    });

    html! {
        <div class={foo}>
            <button {onclick}>
            { *counter }
            </button>
        </div>
    }
}
