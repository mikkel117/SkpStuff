type timeType = {
  day: number;
  month: number;
  hour: number;
  minute: number;
  seconds: number;
  year: number;
};
export type dirsType = {
  len: Number;
  modified: string;
  is_dir: boolean;
  name: string;
  path: string;
  created: string;
  file_extension: string;
};

export type SearchSuggestionType = {
  path: string;
  value: number;
  word: string;
};
