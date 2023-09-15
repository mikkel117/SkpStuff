// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

//use chrono::{DateTime, Utc};
//use chrono::prelude::*;
//use std::process::Command;
use std::str;

mod dirs;
mod fuzzy_search;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            dirs::get_dir,
            dirs::list_of_dir,
            dirs::open_file,
            dirs::get_files_in_dir,
            dirs::get_dir_path,
            dirs::search_suggestion,
            fuzzy_search::fuzzy_finder
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

/* #[tauri::command]
fn my_shell_test() -> String {
    let mut log = String::new();

    let list_dir = Command::new("cmd")
        .args(&["/C", "cd"])
        .current_dir("/Users/rumbo/test")
        .output()
        .expect("fail");
    log.push_str(match str::from_utf8(&list_dir.stdout) {
        Ok(val) => val,
        Err(_) => panic!("got non UTF-8 data"),
    });
    /* println!("{}", log) */
    log
} */
