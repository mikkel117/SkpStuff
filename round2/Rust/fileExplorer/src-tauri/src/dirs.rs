/* use anyhow::Ok; */
//use byte_unit::{Byte, ByteUnit};
use chrono::prelude::*;
//use fs_extra::file;
//use fs_extra::dir::get_size;
//use std::collections::BTreeMap;

use std::convert::TryInto;
//use std::path::{Path, PathBuf};
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

#[derive(Debug, serde::Serialize, Eq, Ord, PartialEq, PartialOrd, serde::Deserialize)]
pub struct Times {
    pub day: u32,
    pub month: u32,
    pub hour: u32,
    pub minute: u32,
    pub seconds: u32,
    pub year: i32,
}
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
        //let entry = entry.unwrap();
        //let time = metadata.created()?;
        let format = "%d-%m-%Y %H:%M:%S";
        let path = entry.path();
        let name = path
            .file_name()
            .ok_or(io::Error::new(io::ErrorKind::NotFound, "you fked up"))?
            .to_string_lossy()
            .to_string();
        let metadata = fs::metadata(&path)?;
        /* println!("{:?}", fs::metadata("C:\\Users\\rumbo\\OneDrive\\Billeder\\myNewImage.png")?); */
        let created = metadata.created()?;
        let modified = metadata.modified()?;
        let created_date_time = DateTime::<Local>::from(created);
        let meta_date_time = DateTime::<Local>::from(modified);
        let created_format = created_date_time.format(format).to_string();
        let modified_format = meta_date_time.format(format).to_string();
        let len = metadata.len();
        let is_dir = metadata.is_dir();
        /* let extension = path.extension(); */
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

/* #[tauri::command]
//Vec<FileData>
pub fn s_get_files_in_dir(file_path: String) -> Vec<FileData> {
    let path = fs::read_dir(file_path).unwrap();

    let test = path.map(|e| e.unwrap().try_into().unwrap()).collect();
    test
} */
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
pub fn open_file(file_path: String) -> Result<String, String> {
    match open::that(file_path.clone()) {
        Ok(_) => Ok("opened file".to_string()),
        Err(_) => Err("failed to open file".to_string()),
    }
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
