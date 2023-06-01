#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")] // hide console window on Windows in release
mod anime_fetch;
mod home_fetch;

use eframe::egui;
use egui::vec2;
use egui_extras::RetainedImage;

fn main() -> Result<(), eframe::Error> {
    let options = eframe::NativeOptions {
        initial_window_size: Some(egui::vec2(320.0, 240.0)),
        ..Default::default()
    };
    eframe::run_native(
        "My egui App",
        options,
        Box::new(|_cc| Box::<MyApp>::default()),
    )
}

struct MyApp {
    foo_bar: Vec<String>,
    data: Option<anime_fetch::AnimeStruct>,
}

impl Default for MyApp {
    fn default() -> Self {
        Self {
            foo_bar: vec!["foo".to_string(), "bar".to_string(), "foobar".to_string()],
            data: None,
        }
    }
}

/* fn foo(age: &mut i32) {
    *age += 1;
} */

impl eframe::App for MyApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        egui::TopBottomPanel::top("my_panel").show(ctx, |ui| {
            ui.label("top panel");
        });

        egui::CentralPanel::default().show(ctx, |ui| {
            let image_bytes = include_bytes!("rust-logo-256x256.png");
            let image_data = RetainedImage::from_image_bytes("foo", image_bytes);
            ui.with_layout(egui::Layout::top_down(egui::Align::Center), |ui| {
                /* ui.label(format!("Hello '{}', age {}", self.name, self.age));
                if ui.button(format!("{}", self.age)).clicked() {
                    foo(&mut self.age)
                } */
                //ui.add(home_fetch::MyNewLabel)
                /* ui.add(home_fetch::MyNewLabel); */
                match &self.data {
                    Some(data) => {
                        home_fetch::MyNewLabel::new(data.clone());
                    }
                    None => {
                        ui.spinner();
                    }
                }

                egui::Grid::new("my_grid").show(ui, |ui| {
                    for h in &self.foo_bar {
                        ui.label(h);
                    }

                    ui.end_row();
                    image_data.unwrap().show_max_size(ui, vec2(50.0, 50.0))
                    /* ui.image(texture, texture.size_vec2()); */
                });
            })
        });
    }
}

/* struct MyNewLabel {
    text: String,
}

impl MyNewLabel {
    pub fn new(text: String) -> Self {
        MyNewLabel { text }
    }
}

impl Widget for MyNewLabel {
    fn ui(self, ui: &mut egui::Ui) -> egui::Response {
        ui.label(format!("{}", self.text))
    }
} */

/* struct MyFancyButton {
    color: i32,
}

impl MyFancyButton {
    pub fn new(color: i32) -> Self {
        MyFancyButton { color: 32 }
    }
}

impl Widget for MyFancyButton {
    fn ui(self, ui: &mut egui::Ui) -> egui::Response {
        ui.label(format!("{}", self.color))
    }
} */

/* eframe::run_simple_native("My egui App", options, move |ctx, _frame| {
    egui::TopBottomPanel::top("my_panel").show(ctx, |ui| {
        ui.label("top panel");
    });

    egui::CentralPanel::default().show(ctx, |ui| {
        ui.with_layout(egui::Layout::top_down(egui::Align::Center), |ui| {
            ui.button(" am becoming wider as needed");
        })
    });
}) */
