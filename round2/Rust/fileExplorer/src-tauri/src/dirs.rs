//use byte_unit::{Byte, ByteUnit};
use chrono::prelude::*;
//use fs_extra::dir::get_size;
use std::collections::BTreeMap;

use std::path::{Path, PathBuf};
use std::{
    fs::{self, DirEntry, File},
    io,
};

use open;

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub enum Dirs {
    HomeDir,
    PictureDir,
    DownloadDir,
    DocumentDir,
    DesktopDir,
    VideoDir,
}

#[derive(Debug, serde::Serialize, Eq, Ord, PartialEq, PartialOrd, serde::Deserialize)]
pub struct Times {
    day: u32,
    month: u32,
    hour: u32,
    minute: u32,
    seconds: u32,
    year: i32,
}
#[derive(Debug, serde::Serialize, Eq, Ord, PartialEq, PartialOrd, serde::Deserialize)]
pub struct FileData {
    name: String,
    path: String,
    file_extension: String,
    created: Times,
    modified: Times,
    //: chrono::format::DelayedFormat<chrono::format::StrftimeItems<'a>>,
    len: u64,
    is_dir: bool,
}
/* #[derive(serde::Deserialize, Debug, Eq, Ord, PartialEq, PartialOrd, Clone)]
pub struct foo {
    name: String,
    path: String,
    is_dir: bool,
} */

impl TryFrom<DirEntry> for FileData {
    type Error = std::io::Error;
    fn try_from(entry: DirEntry) -> Result<Self, Self::Error> {
        //let entry = entry.unwrap();
        //let time = metadata.created()?;
        let path = entry.path();
        let name = path
            .file_name()
            .ok_or(io::Error::new(io::ErrorKind::NotFound, "you fked up"))?
            .to_string_lossy()
            .to_string();
        let metadata = fs::metadata(&path)?;
        let created = metadata.created()?;
        let created_date_time = DateTime::<Local>::from(created);
        let len = metadata.len();
        let modified = metadata.modified()?;
        let meta_date_time = DateTime::<Local>::from(modified);
        let is_dir = metadata.is_dir();
        let binding = entry.path();
        let extension = binding.extension();
        let file_extension: String;
        if extension == None {
            file_extension = "None".to_string();
        } else {
            file_extension = extension
                .ok_or(io::Error::new(io::ErrorKind::NotFound, "you fked up"))?
                .to_string_lossy()
                .to_string();
        }

        /* let byte = Byte::from_bytes(len.into());

        let adjusted_byte = byte.get_adjusted_unit(ByteUnit::MB); */
        /* if is_dir {
            let folder_size = get_size(&path);
            println!("{}: {:?}", name, folder_size);
        } */
        Ok(Self {
            name,
            path: path.to_string_lossy().to_string(),
            file_extension,
            created: Times {
                day: created_date_time.day(),
                month: created_date_time.month(),
                hour: created_date_time.hour(),
                minute: created_date_time.minute(),
                seconds: created_date_time.second(),
                year: created_date_time.year(),
            },
            //modified: DateTime::<Local>::from(modified),
            modified: Times {
                day: meta_date_time.day(),
                month: meta_date_time.month(),
                hour: meta_date_time.hour(),
                minute: meta_date_time.minute(),
                seconds: meta_date_time.second(),
                year: meta_date_time.year(),
            },
            len,
            is_dir,
        })
    }
}

#[tauri::command]
//Option<Vec<String>>
pub fn get_dir(dir: Dirs) -> Vec<FileData> {
    let read_dir = match dir {
        Dirs::HomeDir => dirs::home_dir(),
        Dirs::PictureDir => dirs::picture_dir(), // ToDO sort Download and check if the others also needs to be sorted,
        Dirs::DownloadDir => dirs::download_dir(),
        Dirs::DocumentDir => dirs::document_dir(),
        Dirs::DesktopDir => dirs::desktop_dir(),
        Dirs::VideoDir => dirs::video_dir(),
    }
    .unwrap();
    let path = fs::read_dir(format!("{}", read_dir.display())).unwrap();
    path.map(|e| e.unwrap().try_into().unwrap()).collect()
}

#[tauri::command]
pub fn get_files_in_dir(file_path: String) -> Vec<FileData> {
    let path = fs::read_dir(file_path).unwrap();

    path.map(|e| e.unwrap().try_into().unwrap()).collect()
}

#[tauri::command]
pub fn get_dir_path(dir_path: Dirs) -> String {
    let read_dir = match dir_path {
        Dirs::HomeDir => dirs::home_dir(),
        Dirs::PictureDir => dirs::picture_dir(),
        Dirs::DownloadDir => dirs::download_dir(),
        Dirs::DocumentDir => dirs::document_dir(),
        Dirs::DesktopDir => dirs::desktop_dir(),
        Dirs::VideoDir => dirs::video_dir(),
    }
    .unwrap();
    let path: String = read_dir.into_os_string().into_string().unwrap();
    path
}

#[tauri::command]
pub fn list_of_dir() -> Vec<Dirs> {
    vec![
        Dirs::HomeDir,
        Dirs::PictureDir,
        Dirs::DownloadDir,
        Dirs::DocumentDir,
        Dirs::DesktopDir,
        Dirs::VideoDir,
    ]
}
#[tauri::command]
pub fn open_file(file_path: String) {
    open::that(file_path).unwrap();
}

#[tauri::command]
pub fn search_suggestion(mut data: Vec<FileData>, key_word: String) {
    //let mut paths: Vec<PathBuf> = data.iter().map(|d| d.path.clone().into()).collect();
    /* let suggestions: Vec<foo>;
    for item in data.iter() {
        if item.is_dir {
            println!("{:?}", item.path.split("\\"));
        }
    } */
    let search: Vec<&str> = key_word.split("\\").flat_map(|s| s.split("/")).collect();
    /* let mut v = vec!["aps", "aba", "abp", "apa", "www", "a"];
    let user_input = search[search.len() - 1];
    v.sort_by(|a, b| {
        if a.contains(user_input) && !b.contains(user_input) {
            std::cmp::Ordering::Less
        } else if !a.contains(user_input) && b.contains(user_input) {
            std::cmp::Ordering::Greater
        } else {
            a.cmp(b)
        }
    });
    println!("{:?}", v); */

    //let mut v = vec!["aps", "aba", "abp", "apa", "www", "a"];
    //let user_input = search[search.len() - 1];
    let user_input = search[search.len() - 1];
    data.sort_by(|a, b| {
        if a.name.to_lowercase().contains(user_input) && !b.name.to_lowercase().contains(user_input)
        {
            std::cmp::Ordering::Less
        } else if !a.name.to_lowercase().contains(user_input)
            && b.name.to_lowercase().contains(user_input)
        {
            std::cmp::Ordering::Greater
        } else {
            a.name.cmp(&b.name)
        }
    });
    for item in data {
        println!("{:?}", item.name);
    }
    println!("{:?}", user_input);
    //println!("{:?}", v[v.len() - 1]);
    println!(" ");
}
