type timeTypes = {
    day: number;
    month: number;
    hour: number;
    minute: number;
    second: number;
    year: number;
  };
  export type dirsTypes = {
    len: Number;
    modified: timeTypes;
    is_dir: boolean;
    name: string;
    path: string;
    created: timeTypes;
    file_extension: string;
  };