import { useCallback, useMemo, useState } from 'react';
import { AuthContext } from './auth-context';
import { createAccount, endSession, getCurrentUser, signIn } from '../utils/auth';

function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser);

  const login = useCallback(async (credentials) => {
    const nextUser = await signIn(credentials);
    setUser(nextUser);
    return nextUser;
  }, []);

  const signup = useCallback(async (details) => {
    const nextUser = await createAccount(details);
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(() => {
    endSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, signup, logout }),
    [user, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
