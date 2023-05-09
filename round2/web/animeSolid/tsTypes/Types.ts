type episodesType = {
  animeId: string;
  animeImg: string;
  animeTitle: string;
  episodeNum: string;
  episodeUrl: string;
  subOrDub: string;
};

type pagesType = {
  page: string;
};

export type AnimeDataType = {
  episodes: episodesType[];
  pages: pagesType[];
  aphList: [{ aph: string; value: string }];
};

export type genreType = {
  genres: [{ genre: string; value: string }];
};
