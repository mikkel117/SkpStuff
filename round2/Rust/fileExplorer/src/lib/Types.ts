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

export type DirSizeType = {
  size: string;
  unit: string;
};
