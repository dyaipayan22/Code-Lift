import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Repositories } from '@/pages/Upload';
import { Button } from './ui/button';

const Repositories = ({ repositories }: { repositories: Repositories[] }) => {
  const navigate = useNavigate();

  const handleImport = (repoId: number, url: string) => {
    navigate(`/deploy/${repoId}`, { state: { cloneUrl: url } });
  };

  return (
    <div className="rounded-lg overflow-hidden">
      {repositories?.map((repository) => (
        <div
          key={repository.clone_url}
          className="flex items-center py-2 lg:py-3 px-4 lg:px-6 border bg-secondary/25 justify-between hover:bg-secondary/60"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3">
            <span>{repository.name}</span>
            <span className="text-sm capitalize text-primary/20">
              {formatDistanceToNow(new Date(repository.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>
          <Button
            onClick={() => handleImport(repository.id, repository.clone_url)}
          >
            Import
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Repositories;
