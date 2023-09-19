// React Router
import { Outlet } from 'react-router-dom';

// Components
import Header from '../Header/Header';
// import MessageIndication from '../Toast/MessageIndication';
import Footer from '../Footer/Footer';

function Layout() {
  return (
    <div className="Layout">
      <Header />
      {/* <MessageIndication /> */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
