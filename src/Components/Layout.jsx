import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import TipsTicker from './TipsTicker';
import CommandPalette from './CommandPalette';
import './Layout.css';

function Layout() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="app-layout">
      <Header />
      <TipsTicker />
      <main className="main-content">
        <div className="route-view" key={`${location.pathname}-${user?.id ?? 'guest'}`}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette />
    </div>
  );
}

export default Layout;
