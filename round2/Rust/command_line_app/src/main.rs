#![allow(unused)]

use clap::Parser;
use std::fs;
use std::io::stdin;
use std::io::Read;
use std::path::PathBuf;

#[derive(Parser)]
struct Cli {
    path: std::path::PathBuf,
}

fn main() -> std::io::Result<()> {
    let args = Cli::parse();

    let mut user_chose = String::new();
    println!("do you want to see all todo(1), or write a new todo(2)? ");
    stdin().read_line(&mut user_chose).expect("failed to read");
    if user_chose.trim() == "1" {
        let foo: Vec<&str> = read(&args.path);
    } else if user_chose.trim() == "2" {
        write(&args.path);
    }

    //fs::write(&args.path, "hello world").expect("Failed to write to file");
    /*
    let mut test = Vec::new();
    for line in contents.lines() {
        test.push(line);
    }
    println!("{:?}", test); */
    //let mut f = fs::File::open(&args.path)?;
    Ok(())
}

fn read(args: &PathBuf) -> Vec<&str> {
    let mut data = vec![];
    let mut contents = fs::read_to_string(&args).expect("Failed to read from file");
    for line in contents.lines() {
        data.push(line);
    }
    return data;
}

fn write(args: &PathBuf) {
    let mut user_input = String::new();
    stdin().read_line(&mut user_input).expect("failed to read");
}
