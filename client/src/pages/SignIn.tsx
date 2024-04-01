import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

const SignIn = () => {
  const handleAuthentication = () => {
    window.open(import.meta.env.VITE_SERVER_URL + '/auth/github', '_self');
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-full">
      <h1 className="text-4xl font-medium text-center">
        Get started by connecting your Github Account
      </h1>
      <Button onClick={handleAuthentication}>
        <GitHubLogoIcon className="mr-2 w-5 h-5" />
        Continue with Github
      </Button>
    </div>
  );
};

export default SignIn;
