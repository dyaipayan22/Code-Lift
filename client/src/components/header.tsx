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

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
    navigate('/auth');
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
                    <Link to={'/upload'}>Add Project</Link>
                  </DropdownMenuItem>
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
            <Link to={'/auth'}>
              <Button variant={'secondary'}>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
