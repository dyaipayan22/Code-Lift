import { Button } from '@/components/ui/button';
import axios from '@/config/axios';

const Home = () => {
  const handleClick = async () => {
    await axios.get('/users', { withCredentials: true });
  };
  return (
    <div>
      Deployments made easy
      <Button onClick={handleClick}> Get Details</Button>
    </div>
  );
};

export default Home;
