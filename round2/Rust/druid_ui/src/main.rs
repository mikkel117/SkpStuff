use druid::widget::{Button, Flex, Label};
use druid::{AppLauncher, Data, Env, Lens, LocalizedString, Widget, WindowDesc};

const VERTICAL_WIDGET_SPACING: f64 = 20.0;
const WINDOW_TITLE: LocalizedString<HelloState> = LocalizedString::new("Hello World!");

#[derive(Clone, Data, Lens)]
struct HelloState {
    count: i32,
}

fn main() {
    let main_window = WindowDesc::new(build_root_widget())
        .title(WINDOW_TITLE)
        .window_size((400.0, 400.0));
    let initial_state = HelloState { count: 0 };

    // start the application
    AppLauncher::with_window(main_window)
        .launch(initial_state)
        .expect("Failed to launch application");
}

fn build_root_widget() -> impl Widget<HelloState> {
    // a label that will show the current value of the counter
    let label = Label::new(|data: &HelloState, _env: &Env| format!("Count: {}", data.count));

    // a button that will increment the counter when clicked
    let button = Button::new("Increment").on_click(|_ctx, data, _env| data.count += 1);

    // arrange the two widgets vertically, with some padding
    let layout = Flex::column()
        .with_child(label)
        .with_spacer(VERTICAL_WIDGET_SPACING)
        .with_child(button);
}
