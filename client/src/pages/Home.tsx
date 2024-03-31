import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    if (user) {
      navigate('/upload');
    }
  }
  //Go to sign in if not authenticated
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-6xl">Deploy Frontend Applications with a click</h1>
      <Button onClick={handleClick}>Get Started</Button>
    </div>
  );
};

export default Home;
