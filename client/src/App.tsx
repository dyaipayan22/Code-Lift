import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Layout from './components/layout';
import Upload from './pages/Upload';
import Auth from './components/auth';
import { useEffect } from 'react';
import axios from './config/axios';
import useAuth from './hooks/useAuth';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/auth',
        element: <SignUp />,
      },
      {
        path: '/dashboard',
        element: (
          <Auth>
            <Dashboard />
          </Auth>
        ),
      },
      {
        path: '/upload',
        element: (
          <Auth>
            <Upload />
          </Auth>
        ),
      },
    ],
  },
]);
function App() {
  const { setUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get('/auth/login/success');
      if (response.status === 200) {
        setUser(response.data.user);
      }
    };
    getUser();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
