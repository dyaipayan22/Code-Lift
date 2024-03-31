import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/layout';
import Upload from './pages/Upload';
import Auth from './components/auth';
import { useEffect } from 'react';
import axios from './config/axios';
import useAuth from './hooks/useAuth';
import Dashboard from './pages/Dashboard';
import Deploy from './pages/Deploy';

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
      {
        path: '/deploy/:repoId',
        element: (
          <Auth>
            <Deploy />
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
  }, [setUser]);

  return <RouterProvider router={router} />;
}

export default App;
