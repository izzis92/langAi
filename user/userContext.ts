import { createContext } from 'react';

export type UserContextType = {
  user: string;
  updateUser: (user: string) => void;
};

const UserContext = createContext<UserContextType | string>('');

export default UserContext;
