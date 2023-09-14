// React Router
import { Outlet } from 'react-router-dom';

// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Layout() {
  return (
    <div className="Layout">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
