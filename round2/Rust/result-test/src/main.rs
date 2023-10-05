use std::{
    fs::{self, DirEntry, File},
    io,
};

#[derive(Debug, Eq, Ord, PartialEq, PartialOrd)]
pub struct Times {
    day: u32,
    month: u32,
    hour: u32,
    minute: u32,
    seconds: u32,
    year: i32,
}
#[derive(Debug, Eq, Ord, PartialEq, PartialOrd)]
pub struct FileData {
    name: String,
    path: String,
    file_extension: String,
    created: Times,
    modified: Times,
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

fn read_file_contents() -> Result<(), io::Error> {
    /* let mut file = File::open("C:\\Users\\rumbo\\skole")?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?; */

    Ok(())
}

fn main() {
    /* match read_file_contents() {
        Ok(contents) => println!("File contents: {}", contents),
        Err(error) => match error.kind() {
            io::ErrorKind::NotFound => println!("File not found!"),
            io::ErrorKind::PermissionDenied => println!("you dont have permission"),
            _ => println!("Error reading file: {}", error),
        },
    } */
    let test = read_file_contents();
}
