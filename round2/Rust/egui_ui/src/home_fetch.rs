use eframe::egui;
use egui::Widget;

use crate::anime_fetch;

//use serde::{Deserialize, Serialize};
pub struct MyNewLabel {
   pub data: Option<anime_fetch::AnimeStruct>,
}

impl MyNewLabel {
   pub fn new(data: anime_fetch::AnimeStruct) -> Self {
        Self { data: None }
    }
}

impl Widget for MyNewLabel {
    fn ui(mut self, ui: &mut egui::Ui) -> egui::Response {
        if self.data.is_none() {
            self.data = anime_fetch::fetch().ok();
            ui.label("laoding data");
        }

        ui.label(format!("{}", "hello world".to_string()))
    }
}
