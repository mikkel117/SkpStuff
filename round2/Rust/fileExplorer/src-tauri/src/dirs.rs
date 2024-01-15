/* use anyhow::Ok; */
use chrono::prelude::*;
use fs_extra::dir::get_size;
use std::convert::TryInto;
use std::{
    fs::{self, DirEntry},
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

/* #[derive(Debug, serde::Serialize, Eq, Ord, PartialEq, PartialOrd, serde::Deserialize)]
pub struct Times {
    pub day: u32,
    pub month: u32,
    pub hour: u32,
    pub minute: u32,
    pub seconds: u32,
    pub year: i32,
} */
#[derive(Debug, serde::Serialize, Eq, Ord, PartialEq, PartialOrd, serde::Deserialize)]
pub struct FileData {
    pub name: String,
    pub path: String,
    pub file_extension: String,
    pub created: String,
    pub modified: String,
    pub len: u64,
    pub is_dir: bool,
}

impl TryFrom<DirEntry> for FileData {
    type Error = std::io::Error;
    fn try_from(entry: DirEntry) -> Result<Self, Self::Error> {
        let format = "%d-%m-%Y %H:%M:%S";
        let path = entry.path();
        let name = path
            .file_name()
            .ok_or(io::Error::new(io::ErrorKind::NotFound, "you fked up"))?
            .to_string_lossy()
            .to_string();
        let metadata = fs::metadata(&path)?;
        let created = metadata.created()?;
        let modified = metadata.modified()?;
        let created_date_time = DateTime::<Local>::from(created);
        let meta_date_time = DateTime::<Local>::from(modified);
        let created_format = created_date_time.format(format).to_string();
        let modified_format = meta_date_time.format(format).to_string();
        let len: u64;
        let is_dir = metadata.is_dir();
        if is_dir {
            len = 0;
        } else {
            len = metadata.len();
        }
        let file_extension: String;
        if path.extension() == None {
            file_extension = "None".to_string();
        } else {
            file_extension = path
                .extension()
                .ok_or(io::Error::new(io::ErrorKind::NotFound, "you fked up"))?
                .to_string_lossy()
                .to_string();
        }
        Ok(Self {
            name,
            path: path.to_string_lossy().to_string(),
            file_extension,
            created: created_format,
            modified: modified_format,
            len,
            is_dir,
        })
    }
}
//gets the files in the standard dirs
#[tauri::command]
pub fn get_standard_dir_files(dir: Dirs) -> Vec<FileData> {
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
//gets the files in the dir
#[tauri::command]
pub fn get_files_in_dir(file_path: &str) -> Result<Vec<FileData>, String> {
    let mut file_data_list = Vec::new();

    let dir = match fs::read_dir(&file_path) {
        Ok(dir) => dir,
        Err(e) => return Err(e.to_string()),
    };

    for entry in dir {
        let entry = match entry {
            Ok(entry) => entry,
            Err(e) => return Err(e.to_string()),
        };
        let file_data = FileData::try_from(entry).map_err(|e| e.to_string())?;
        file_data_list.push(file_data);
    }
    Ok(file_data_list)
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
    let path = match read_dir.into_os_string().into_string() {
        Ok(path) => path,
        Err(_) => "".to_string(),
    };
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
#[derive(Debug, serde::Serialize, Eq, Ord, PartialEq, PartialOrd, serde::Deserialize)]
pub struct DirSize {
    size: String,
    unit: String,
    file_path: String,
}

#[tauri::command(async)]
pub fn get_dir_size(file_path: String) -> Result<DirSize, String> {
    let folder_size = match get_size(&file_path) {
        Ok(folder_size) => folder_size,
        Err(e) => return Err(e.to_string()),
    };
    println!("{:?}", folder_size);
    let kilobytes = folder_size as f64 / 1024.0;
    let megabytes = kilobytes / 1024.0;
    let gigabytes = megabytes / 1024.0;
    let mut return_value: DirSize = DirSize {
        size: "0".to_string(),
        unit: "KB".to_string(),
        file_path: "".to_string(),
    };

    match gigabytes >= 1.0 {
        true => {
            return_value.size = format!("{:.2}", gigabytes);
            return_value.unit = "GB".to_string();
        }
        false => match megabytes >= 1.0 {
            true => {
                return_value.size = format!("{:.2}", megabytes);
                return_value.unit = "MB".to_string();
            }
            false => match kilobytes >= 1.0 {
                true => {
                    return_value.size = format!("{:.2}", kilobytes);
                    return_value.unit = "KB".to_string();
                }
                false => {
                    return_value.size = format!("{:.2}", folder_size);
                    return_value.unit = "B".to_string();
                }
            },
        },
    }
    return_value.file_path = file_path;
    Ok(return_value)
}

#[tauri::command]
pub fn open_file(file_path: String) -> Result<String, String> {
    match open::that(file_path.clone()) {
        Ok(_) => Ok("opened file".to_string()),
        Err(_) => Err("failed to open file".to_string()),
    }
}
#[tauri::command]
pub fn remove_file(path: String) {
    fs::remove_file(path).unwrap();
}

/* #[test]
fn test_get_dir_path_get_home() {
    let dir_path = get_dir_path(Dirs::HomeDir);
    assert_eq!(dir_path, "C:\\Users\\rumbo".to_string());
}

#[test]
fn test_open_file_file_opens() {
    let result = open_file("C:\\Users\\rumbo\\test\\foo1.txt".to_string()).unwrap();
    assert_eq!(result, "opened file");
} */
