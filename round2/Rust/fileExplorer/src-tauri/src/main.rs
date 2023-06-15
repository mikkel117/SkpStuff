// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dirs;
use std::{fs, io};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, foo_bar])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
//#[tauri::command]

fn foo(path: std::path::PathBuf) {
    println!("{}", format!("{}\\test", path.display()));
    // let updated_path = path.join("test");
    let entries = fs::read_dir(format!("{}\\test", path.display()))
        .unwrap()
        .map(|res| res.map(|e| e.path()))
        .collect::<Result<Vec<_>, io::Error>>();
    println!("{:#?}", &entries);
}

#[tauri::command]
fn foo_bar() {
    match dirs::home_dir() {
        Some(path) => {
            println!("path is {}", path.display());
            foo(path)
        }
        None => println!("error"),
    }
}
