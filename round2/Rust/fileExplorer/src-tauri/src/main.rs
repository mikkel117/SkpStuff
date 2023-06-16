// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dirs;
use std::{fs, io};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_dir])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
//#[tauri::command]

fn foo(path: std::path::PathBuf) {
    println!("{}", format!("{}", path.display()));
    // let updated_path = path.join("test");
    // let entries = fs::read_dir(format!("{}", path.display()))

    let entries = fs::read_dir(format!("{}", path.display()))
        .unwrap()
        .map(|res| res.map(|e| e.path()))
        .collect::<Result<Vec<_>, io::Error>>();
    println!("{:#?}", &entries);
}
#[derive(serde::Deserialize, serde::Serialize)]
enum Dirs {
    HomeDir,
    PictureDir,
    DownloadDir,
    DocumentDir,
    DesktopDir,
    VideoDir,
}
#[tauri::command]
fn get_dir(dir: Dirs) {
    let path = match dir {
        Dirs::HomeDir => dirs::home_dir(),
        Dirs::PictureDir => dirs::picture_dir(),
        Dirs::DownloadDir => dirs::download_dir(),
        Dirs::DocumentDir => dirs::document_dir(),
        Dirs::DesktopDir => dirs::desktop_dir(),
        Dirs::VideoDir => dirs::video_dir(),
    };
    match path {
        Some(new_path) => foo(new_path),
        None => println!("could not find the directory"),
    }
}
