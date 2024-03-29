import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ModeToggle } from './ui/mode-toggle';
import useAuth from '@/hooks/useAuth';

const Header = () => {
  const { user } = useAuth();
  console.log('User', user);
  return (
    <div className="w-full flex items-center justify-between px-6  py-2 border-b">
      <h1>Logo</h1>
      <div className="flex items-center gap-4">
        <ModeToggle />
        {user ? (
          <span>{user.displayName}</span>
        ) : (
          <Link to={'/auth'}>
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
