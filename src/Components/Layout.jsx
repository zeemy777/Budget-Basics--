import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import TipsTicker from './TipsTicker';
import './Layout.css';

function Layout() {
  const { user } = useAuth();

  return (
    <div className="app-layout">
      <Header />
      <TipsTicker />
      <main className="main-content">
        <Outlet key={user?.id ?? 'guest'} />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default Layout;
