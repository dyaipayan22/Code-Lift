import useAuth from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const Auth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const user = useAuth();

  return user ? (
    children
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default Auth;
