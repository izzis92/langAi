type Option = {
  name: string;
  options: string[];
};

type MenuItem = {
  id: string;
  name: string;
  image: string;
  options?: Option[];
};

type DocumentData = {
  [key: string]: any;
};

export type { MenuItem, DocumentData };
