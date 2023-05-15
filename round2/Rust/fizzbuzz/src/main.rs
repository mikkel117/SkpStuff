//use std::io::stdin;

fn main() {
    /* for i in 0..=100 {
        if i % 3 == 0 && i % 5 == 0 {
            println!("FizzBuzz")
        } else if i % 3 == 0 {
            println!("Fizz");
        } else if i % 5 == 0 {
            println!("Buzz")
        } else {
            println!("{}", i);
        }
    } */

    /* let mut fizz_buzz_len = String::new();
    let fizz_buzz: i32;
    stdin()
        .read_line(&mut fizz_buzz_len)
        .ok()
        .expect("failed to read");
    fizz_buzz = fizz_buzz_len.parse().unwrap();
    println!("{}", fizz_buzz + 2); */

    for i in 0..=100 {
        match (i % 3, i % 5) {
            (0, 0) => println!("FizzBuzz"),
            (0, _) => println!("Fizz"),
            (_, 0) => println!("Buzz"),
            _ => println!("{}", i),
        }
    }
}
