import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import TipsTicker from './TipsTicker';
import './Layout.css';

function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <TipsTicker />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default Layout;