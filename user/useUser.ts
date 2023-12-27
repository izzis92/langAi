import { useContext } from 'react';
import UserContext from './userContext';

const useUser = () => {
  const [user, setUser] = useContext(UserContext);
  const isAdmin = user === 'admin';
  return { user, isAdmin, setUser };
};

export default useUser;
