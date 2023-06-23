use chrono::prelude::*;
use std::{
    fs::{self, DirEntry},
    io,
};

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub enum Dirs {
    HomeDir,
    PictureDir,
    DownloadDir,
    DocumentDir,
    DesktopDir,
    VideoDir,
}

#[derive(Debug, serde::Serialize)]
pub struct Times {
    day: u32,
    hour: u32,
    minute: u32,
    seconds: u32,
    year: i32,
}
#[derive(Debug, serde::Serialize)]
pub struct FileData {
    name: String,
    path: String,
    created: Times,
    modified: Times,
    //: chrono::format::DelayedFormat<chrono::format::StrftimeItems<'a>>,
    len: u64,
    is_dir: bool,
}

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
        Ok(Self {
            name,
            path: path.to_string_lossy().to_string(),
            created: Times {
                day: created_date_time.day(),
                hour: created_date_time.hour(),
                minute: created_date_time.minute(),
                seconds: created_date_time.second(),
                year: created_date_time.year(),
            },
            //modified: DateTime::<Local>::from(modified),
            modified: Times {
                day: meta_date_time.day(),
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
        Dirs::PictureDir => dirs::picture_dir(),
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
