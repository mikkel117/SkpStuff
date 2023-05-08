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

type aphType = {
  aph: string;
  value: string;
};

export type AnimeDataType = {
  episodes: episodesType[];
  pages: pagesType[];
  aphList: aphType[];
};

export type genreType = {
  genre: string;
  value: string;
};
