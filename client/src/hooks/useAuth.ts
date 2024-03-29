import { AuthContext, AuthContextType } from '@/context/auth.context';
import { useContext } from 'react';

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext) as AuthContextType;

  return { user, setUser };
};

export default useAuth;
