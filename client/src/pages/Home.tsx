import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    if (user) {
      navigate('/upload');
    } else {
      navigate('/auth');
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-4/5 border min-h-full">
        <h1 className="text-4xl grow">
          Code Lift is the Frontend Cloud. Build and secure, a faster
          personalized web.
        </h1>
      </div>
      <Button onClick={handleClick}>Get Started</Button>
    </div>
  );
};

export default Home;
