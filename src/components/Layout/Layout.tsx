// React Router
import { Outlet } from 'react-router-dom';

// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MessageIndication from '../Toast/MessageIndication';

function Layout() {
  return (
    <div className="Layout">
      <Header />
      <MessageIndication />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
