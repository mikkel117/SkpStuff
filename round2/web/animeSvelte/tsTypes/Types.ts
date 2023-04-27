type episodesType = {
  animeId: string;
  animeImg: string;
  animeTitle: string;
  episodeNum: string;
  episodeUrl: string;
  subOrDub: string;
};

type pagesType = {
  pages: string;
};

export type AnimeDataType = {
  episodes: episodesType[];
  pages: pagesType[];
};

export type genreType = {
  genre: string;
  value: string;
};
