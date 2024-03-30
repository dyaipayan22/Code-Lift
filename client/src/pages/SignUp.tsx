import Form from '@/components/forms/Form';
import SignUpForm from '@/components/forms/SignUpForm';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

const SignUp = () => {
  const handleGithubAuthentication = () => {
    window.open('http://localhost:8000/auth/github', '_self');
  };

  return (
    <div>
      <Form
        title="Create Your Deployment Account"
        body={<SignUpForm />}
        footer={
          <Button
            variant={'secondary'}
            className="w-full"
            onClick={handleGithubAuthentication}
          >
            <GitHubLogoIcon className="mr-2 w-5 h-5" /> Continue with Github
          </Button>
        }
      />
    </div>
  );
};

export default SignUp;
