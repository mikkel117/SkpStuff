type episodesType = {
  animeId: string;
  animeImg: string;
  animeTitle: string;
  episodeNum: string;
  episodeUrl: string;
  subOrDub: string;
};

export type AnimeDataType = {
  episodes: episodesType[];
  pages: [{ page: string }];
  aphList: [{ aph: string; value: string }];
};

export type genreType = {
  genres: [{ genre: string; value: string }];
};
