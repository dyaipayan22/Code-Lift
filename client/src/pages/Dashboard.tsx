import { useEffect } from 'react';
// import axios from '@/config/axios';
import ProjectCard from '@/components/project-card';

const Dashboard = () => {
  // const [deployments,setDeployments]=useState([])
  useEffect(() => {}, []);
  return (
    <div className="w-full flex justify-center">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />

        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default Dashboard;
