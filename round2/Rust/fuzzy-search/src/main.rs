#[derive(Debug)]
struct SearchResult {
    word: String,
    value: u32,
}

type FuzzyRule = dyn Fn(&str, &str) -> i32;

/* struct FuzzyRuleTracker {
    count: usize,
}

impl FuzzyRuleTracker {
    fn new() -> Self {
        FuzzyRuleTracker { count: 0 }
    }

    fn increment(&mut self) {
        self.count += 1;
    }

    fn decrement(&mut self) {
        self.count -= 1;
    }

    fn get_count(&self) -> usize {
        self.count
    }
} */

fn main() {
    let array_of_words = vec![
        "string",
        "three_separated_words",
        "tswfoo",
        "a",
        "b",
        "burger",
        "cat",
        "dog",
        "s",
    ];
    let rules: Vec<Box<FuzzyRule>> = vec![
        Box::new(whole_word),
        Box::new(contains_word),
        Box::new(word_starts_with),
        Box::new(shortened_words),
    ];

    let mut sorted_array_of_words: Vec<SearchResult> = Vec::new();
    let search_word = "s";
    let mut score = 0;
    for item in array_of_words {
        for rule in rules.iter() {
            score += rule(item, search_word);
        }
        println!("{}: {}", score, item);
    }
    /* for item in sorted_array_of_words {
        println!("{:?}", item);
    } */
}

fn whole_word(item: &str, query: &str) -> i32 {
    if item == query {
        20
    } else {
        0
    }
}

fn contains_word(item: &str, query: &str) -> i32 {
    if item.contains(query) {
        5
    } else {
        0
    }
}

fn word_starts_with(item: &str, query: &str) -> i32 {
    if item.starts_with(query) {
        10
    } else {
        0
    }
}

fn shortened_words(item: &str, query: &str) -> i32 {
    let test = item.split("_");
    for foo in test {
        println!("{}", foo);
    }
    0
}
