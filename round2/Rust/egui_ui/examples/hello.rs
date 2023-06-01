use egui::Response;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct EpisodesStruct {
    #[serde(rename = "animeId")]
    anime_id: String,
    #[serde(rename = "animeImg")]
    anime_img: String,
    #[serde(rename = "animeTitle")]
    anime_title: String,
    #[serde(rename = "episodeNum")]
    episode_num: String,
    #[serde(rename = "episodeUrl")]
    episode_url: String,
    #[serde(rename = "subOrDub")]
    sub_or_dub: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct PageStruct {
    page: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Test {
    episodes: Vec<EpisodesStruct>,
    pages: Vec<PageStruct>,
}
#[tokio::main]
async fn main() {
    foo().await;
}

async fn foo() -> reqwest::Result<Test> {
    reqwest::Client::new()
        .get("https://gogo-anime-api-sand.vercel.app/api/anime-api/recent-release?type=1&page=1")
        .send()
        .await?
        .json()
        .await
}
