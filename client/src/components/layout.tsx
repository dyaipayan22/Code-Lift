import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
