#[derive(Debug, PartialEq)]
struct SearchResult {
    word: String,
    value: usize,
}

type FuzzyRule = dyn Fn(String, String) -> usize;

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
    let foo = fuzzy_finder("tsw", array_of_words);
    for item in foo {
        println!("{:?}", item);
    }
}

fn fuzzy_finder(search_word: &str, array_of_words: Vec<&str>) -> Vec<SearchResult> {
    let rules: Vec<Box<FuzzyRule>> = vec![
        Box::new(whole_word),
        Box::new(contains_word),
        Box::new(word_starts_with),
        Box::new(shortened_words),
        Box::new(match_chars),
    ];

    let mut sorted_array_of_words: Vec<SearchResult> = Vec::new();
    for item in array_of_words {
        let mut score = 0;
        for rule in rules.iter() {
            score += rule(item.to_lowercase(), search_word.to_lowercase());
        }
        if score > 0 {
            let sorted_array_of_words_item = SearchResult {
                word: item.to_string(),
                value: score,
            };
            sorted_array_of_words.push(sorted_array_of_words_item);
        }
    }
    if search_word == "" {
        sorted_array_of_words.sort_by(|a, b| a.word.cmp(&b.word));
    } else {
        sorted_array_of_words.sort_by(|a, b| b.value.cmp(&a.value));
    }
    sorted_array_of_words
}

fn whole_word(item: String, query: String) -> usize {
    if item == query {
        20
    } else {
        0
    }
}

fn contains_word(item: String, query: String) -> usize {
    if item.contains(&query) {
        5
    } else {
        0
    }
}

fn word_starts_with(item: String, query: String) -> usize {
    if item.starts_with(&query) {
        10
    } else {
        0
    }
}

fn shortened_words(item: String, query: String) -> usize {
    let test: String = item.split("_").flat_map(|s| s.chars().nth(0)).collect();
    if test == query {
        15
    } else if item.starts_with(&query) {
        16
    } else {
        0
    }
}

fn match_chars(item: String, query: String) -> usize {
    let mut score = 0;
    let mut query_chars = query.chars().peekable();
    for item_char in item.chars() {
        if let Some(&query_char) = query_chars.peek() {
            if item_char == query_char {
                score += 1;
                query_chars.next();
            }
        }
    }
    if score > 1 {
        score
    } else {
        0
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_fuzzy_finder_shortened_word() {
        let result_array: Vec<SearchResult> = vec![
            SearchResult {
                word: "tswfoo".to_string(),
                value: 34,
            },
            SearchResult {
                word: "three_separated_words".to_string(),
                value: 18,
            },
        ];
        let result = fuzzy_finder("tsw", vec!["string", "three_separated_words", "tswfoo"]);
        assert_eq!(result, result_array);
    }
    #[test]
    fn test_fuzzy_finder_partial_match() {
        let result_array: Vec<SearchResult> = vec![
            SearchResult {
                word: "apple".to_string(),
                value: 30,
            },
            SearchResult {
                word: "banana".to_string(),
                value: 5,
            },
        ];
        let result = fuzzy_finder("a", vec!["apple", "banana", "cherry"]);
        assert_eq!(result, result_array);
    }

    #[test]
    fn test_fuzzy_finder_case_insensitive() {
        let result_array: Vec<SearchResult> = vec![SearchResult {
            word: "Banana".to_string(),
            value: 30,
        }];
        let result = fuzzy_finder("b", vec!["apple", "Banana", "cherry"]);
        assert_eq!(result, result_array);
    }

    #[test]
    fn test_fuzzy_finder_no_match() {
        let result = fuzzy_finder("xyz", vec!["apple", "banana", "cherry"]);
        assert_eq!(result, Vec::<SearchResult>::new());
    }
    #[test]
    fn test_fuzzy_finder_multiple_matches() {
        let result_array: Vec<SearchResult> = vec![
            SearchResult {
                word: "apple".to_string(),
                value: 33,
            },
            SearchResult {
                word: "apricot".to_string(),
                value: 33,
            },
        ];
        let result = fuzzy_finder("ap", vec!["apple", "banana", "cherry", "apricot"]);
        assert_eq!(result, result_array)
    }
    #[test]
    fn test_fuzzy_finder_misspelling() {
        let result_array: Vec<SearchResult> = vec![
            SearchResult {
                word: "banna".to_string(),
                value: 56,
            },
            SearchResult {
                word: "banana".to_string(),
                value: 5,
            },
        ];
        let result = fuzzy_finder("banna", vec!["apple", "banana", "cherry", "banna"]);
        assert_eq!(result, result_array)
    }

    #[test]
    fn tes_fuzzy_finder_empty_input() {
        let result_array = vec![
            SearchResult {
                word: "apple".to_string(),
                value: 31,
            },
            SearchResult {
                word: "banana".to_string(),
                value: 31,
            },
            SearchResult {
                word: "cherry".to_string(),
                value: 31,
            },
        ];
        let result = fuzzy_finder("", vec!["apple", "banana", "cherry"]);
        assert_eq!(result, result_array);
    }
}
