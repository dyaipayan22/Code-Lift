import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ModeToggle } from './ui/mode-toggle';
import useAuth from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from '@/config/axios';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
    navigate('/auth');
  };

  const handleGithubAuthentication = () => {
    window.open('http://localhost:8000/auth/github', '_self');
  };

  return (
    <div className="border-b">
      <div className="container mx-auto w-full flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">
          <Link to={'/'}>Code Lift</Link>
        </h1>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user.image} alt="image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 mt-2.5 mr-4">
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to={'/dashboard'}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant={'secondary'}
                onClick={handleGithubAuthentication}
                className="hidden md:block w-full"
              >
                <div className="flex items-center">
                  <GitHubLogoIcon className="mr-2 w-5 h-5" />
                  Sign In with Github
                </div>
              </Button>
              <Button size={'icon'} variant={'secondary'} className="md:hidden">
                <GitHubLogoIcon className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
