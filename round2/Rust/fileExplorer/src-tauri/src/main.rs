// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dirs;
use std::{
    error::Error,
    fs::{self, ReadDir},
    io,
    path::PathBuf,
};

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

//type MyResult<T> = Result<T, MyError>,

fn foo(path: std::path::PathBuf) -> io::Result<Vec<String>> {
    // println!("{}", format!("{}", path.display()));
    // let updated_path = path.join("test");
    // let entries = fs::read_dir(format!("{}", path.display()))

    let entries = fs::read_dir(format!("{}", path.display()))?
        .map(|res| res.map(|e| e.path().to_string_lossy().to_string()))
        .collect::<Result<Vec<_>, io::Error>>()?;
    Ok(entries)

    /* println!("{:#?}", &entries); */
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
fn get_dir(dir: Dirs) -> Option<Vec<String>> {
    let read_dir = match dir {
        Dirs::HomeDir => dirs::home_dir(),
        Dirs::PictureDir => dirs::picture_dir(),
        Dirs::DownloadDir => dirs::download_dir(),
        Dirs::DocumentDir => dirs::document_dir(),
        Dirs::DesktopDir => dirs::desktop_dir(),
        Dirs::VideoDir => dirs::video_dir(),
    }?;

    let test = fs::read_dir(format!("{}\\test", read_dir.display()))
        .ok()
        .unwrap()
        .map(|res| {
            res.map(|e| {
                e.metadata()
                    .unwrap()
                    .created()
                    .unwrap()
                    .elapsed()
                    .unwrap()
                    .as_secs()
            })
        })
        .collect::<Result<Vec<_>, io::Error>>()
        .ok();
    println!("{:#?}", test);

    fs::read_dir(format!("{}\\test", read_dir.display()))
        .ok()?
        .map(|res| res.map(|e| e.path().to_string_lossy().to_string()))
        .collect::<Result<Vec<_>, io::Error>>()
        .ok()
}
