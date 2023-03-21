import { createContext, useState } from 'react';
import { getToken } from '../services/auth';

const UserContext = createContext();

const token = !!getToken();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(token);
  console.log('userToken in Context', user);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
