import { Repositories } from '@/pages/Upload';
import { Button } from './ui/button';
import { LockClosedIcon } from '@radix-ui/react-icons';

const Repositories = ({ repositories }: { repositories: Repositories[] }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      {repositories?.map((repository) => (
        <div
          key={repository.clone_url}
          className="flex items-center p-3 border bg-secondary/25 justify-between"
        >
          <div className="flex items-center gap-4">
            <span>{repository.name}</span>
            <span className="text-sm capitalize text-primary/20">
              {repository.created_at.toLocaleString()}
            </span>
            {repository.visibility === 'private' && <LockClosedIcon />}
          </div>
          <Button>Import</Button>
        </div>
      ))}
    </div>
  );
};

export default Repositories;
