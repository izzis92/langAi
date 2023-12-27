import { MenuItem } from '../data/types';

type MainStackParams = {
  Home: undefined;
  Menu: undefined;
  SubMenu: { parent: MenuItem };
  MenuItem: { item: MenuItem };
};

export type { MainStackParams };
