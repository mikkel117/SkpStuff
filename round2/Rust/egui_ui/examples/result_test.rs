
fn main() {
    println!("{}", foooo())
}
fn foooo() -> u64 {
    match div() {
        Err(e) => {
            println!("{}", e);
            0
        }
        Ok(div) => div,
    }
}

fn div() -> Result<u64, String> {
    let y = 10u64;
    let x = 2;
    //this does the same as the code below
    y.checked_div(x).ok_or("fk you".into())

    /* if x == 0.0 {
        Err(Box::from("can deviate"))
    } else {
        Ok(y / x)
    } */
}
