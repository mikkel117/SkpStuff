use crate::dirs::{get_files_in_dir, FileData};

#[derive(Debug, PartialEq, serde::Serialize, serde::Deserialize)]
pub struct SearchResult {
    word: String,
    value: usize,
    path: String,
}

type FuzzyRule = dyn Fn(String, String) -> usize;

#[derive(serde::Serialize, Debug)]
struct ListFilesResponse {
    files: Vec<FileData>,
}

#[tauri::command]
pub fn new_fuzzy_finder_test(full_path: String, path: String) -> Vec<SearchResult> {
    let rules: Vec<Box<FuzzyRule>> = vec![
        Box::new(whole_word),
        Box::new(contains_word),
        Box::new(word_starts_with),
        Box::new(shortened_words),
        Box::new(match_chars),
    ];

    let mut splitted_search_word: Vec<&str> =
        full_path.split("\\").flat_map(|s| s.split("/")).collect();
    let mut search_query: &str = "";
    let mut array_of_words: Vec<FileData> = Vec::new();
    let mut sorted_array_of_words: Vec<SearchResult> = Vec::new();
    /* let test = full_path.split_whitespace(); */
    match get_files_in_dir(&full_path) {
        Ok(files) => {
            let response = ListFilesResponse { files };
            /* for item in response.files {
                println!("{:?}", item.name);

            } */
            for item in response.files {
                if item.is_dir {
                    let sorted_array_of_words_item = SearchResult {
                        word: item.name.to_string(),
                        value: 0,
                        path: item.path,
                    };
                    sorted_array_of_words.push(sorted_array_of_words_item);
                }
            }

            sorted_array_of_words.sort_by(|a, b| a.word.cmp(&b.word));
        }
        Err(e) => {
            let last_index = splitted_search_word.len() - 1;
            search_query = splitted_search_word[last_index];
            splitted_search_word.remove(last_index);
            let joined = splitted_search_word.join("/");
            match get_files_in_dir(&joined) {
                Ok(files) => {
                    let response = ListFilesResponse { files };
                    sorted_array_of_words = test(response.files, search_query, rules);

                    sorted_array_of_words.sort_by(|a, b| b.value.cmp(&a.value));
                }
                Err(e) => println!("{}", e),
            }
            //println!("error {}", e);
        }
    }
    sorted_array_of_words
}

fn test(
    array_of_words: Vec<FileData>,
    search_query: &str,
    rules: Vec<Box<FuzzyRule>>,
) -> Vec<SearchResult> {
    let mut sorted_array_of_words: Vec<SearchResult> = Vec::new();
    for item in array_of_words {
        if item.is_dir {
            let mut score = 0;
            for rule in rules.iter() {
                score += rule(item.name.to_lowercase(), search_query.to_lowercase());
            }
            if score > 0 {
                let sorted_array_of_words_item = SearchResult {
                    word: item.name.to_string(),
                    value: score,
                    path: item.path,
                };
                sorted_array_of_words.push(sorted_array_of_words_item);
            }
        }
    }
    sorted_array_of_words
}

#[tauri::command]
pub fn fuzzy_finder(
    search_word: String,
    array_of_words: Vec<FileData>,
    path: String,
) -> Vec<SearchResult> {
    let rules: Vec<Box<FuzzyRule>> = vec![
        Box::new(whole_word),
        Box::new(contains_word),
        Box::new(word_starts_with),
        Box::new(shortened_words),
        Box::new(match_chars),
    ];
    let search: Vec<&str> = search_word.split("\\").flat_map(|s| s.split("/")).collect();
    println!("{:?}", search);
    let user_input = search[search.len() - 1];
    println!("{}", user_input);
    let mut sorted_array_of_words: Vec<SearchResult> = Vec::new();
    for item in array_of_words {
        if item.is_dir {
            let mut score = 0;
            for rule in rules.iter() {
                score += rule(item.name.to_lowercase(), user_input.to_lowercase());
            }
            if score > 0 {
                let sorted_array_of_words_item = SearchResult {
                    word: item.name.to_string(),
                    value: score,
                    path: item.path,
                };
                sorted_array_of_words.push(sorted_array_of_words_item);
            }
        }
    }
    if search_word == ""
        || path == "HomeDir"
        || path == "PictureDir"
        || path == "DownloadDir"
        || path == "DocumentDir"
        || path == "DesktopDir"
        || path == "VideoDir"
    {
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
