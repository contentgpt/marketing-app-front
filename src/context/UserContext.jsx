import { createContext, useState } from 'react';
import { getUser, getToken } from '../services/auth';

const UserContext = createContext();

const token = !!getToken();

const UserProvider = ({ children }) => {
  //const currentUser = getUser();
  const [user, setUser] = useState(token);
  console.log('user', user);
  // setUser(currentUser);
  //console.log('currentUser in context', currentUser);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
