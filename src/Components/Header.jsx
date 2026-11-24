import { useState, useEffect, startTransition } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { getInitials } from '../utils/auth';
import { THEME_EVENT, setTheme } from '../utils/theme';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('bb_theme') === 'dark');
  const [visitorCount, setVisitorCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Visitor counter (simple demo using localStorage)
  useEffect(() => {
    const count = parseInt(localStorage.getItem('bb_visitors') || '0', 10) + 1;
    localStorage.setItem('bb_visitors', count);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time demo counter read from localStorage
    setVisitorCount(count);
  }, []);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Keep the document attribute in sync with the theme state
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Follow theme changes triggered elsewhere (command palette)
  useEffect(() => {
    const syncTheme = () => setIsDark(document.documentElement.dataset.theme === 'dark');
    window.addEventListener(THEME_EVENT, syncTheme);
    return () => window.removeEventListener(THEME_EVENT, syncTheme);
  }, []);

  useEffect(() => {
    if (!isAccountOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!event.target.closest('.account-menu')) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isAccountOpen]);

  const toggleDarkMode = () => {
    const next = !isDark;
    setTheme(next);
    setIsDark(next);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    setIsAccountOpen(false);
    closeMenu();
    // Route changes are transitions in React Router 7; keep the auth change in
    // the same transition so the protected-route guard does not race the redirect.
    startTransition(() => {
      logout();
      navigate('/');
    });
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-top-inner">
          <div className="header-status">
            <span className="status-dot" aria-hidden="true"></span>
            <span className="status-live">Live demo</span>
            <span className="status-divider" aria-hidden="true"></span>
            <span>{visitorCount} visitors</span>
            <span className="status-divider status-clock-divider" aria-hidden="true"></span>
            <span className="status-clock">
              {currentTime.toLocaleDateString('en-NG', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}{' '}
              · {currentTime.toLocaleTimeString('en-NG')}
            </span>
          </div>

          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
            <span className="theme-toggle-label">{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-main-inner">
          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="logo-mark" aria-hidden="true">₦</span>
            <span className="logo-text">
              <strong>BudgetBasics</strong>
              <small>Money skills for students</small>
            </span>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/budgeting-basics" onClick={closeMenu}>
              Budgeting Basics
            </NavLink>
            <NavLink to="/needs-vs-wants" onClick={closeMenu}>
              Needs vs Wants
            </NavLink>
            <NavLink to="/50-30-20" onClick={closeMenu}>
              50-30-20 Rule
            </NavLink>
            <NavLink to="/savings-goals" onClick={closeMenu}>
              Savings Goals
            </NavLink>
            <NavLink to="/expense-planner" onClick={closeMenu}>
              Expense Planner
            </NavLink>
            <NavLink to="/money-mistakes" onClick={closeMenu}>
              Money Mistakes
            </NavLink>
            <NavLink to="/infographics" onClick={closeMenu}>
              Infographics
            </NavLink>
            <NavLink to="/chatbot" onClick={closeMenu}>
              AI Chatbot
            </NavLink>
            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>
            <button
              type="button"
              className="nav-search"
              onClick={() => {
                closeMenu();
                window.dispatchEvent(new Event('bb:open-command'));
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.6-3.6" />
              </svg>
              Search pages
            </button>
          </nav>

          <button
            type="button"
            className="header-search"
            onClick={() => window.dispatchEvent(new Event('bb:open-command'))}
            aria-label="Search pages and actions (Ctrl K)"
            title="Search (Ctrl K)"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.6-3.6" />
            </svg>
            <kbd>Ctrl K</kbd>
          </button>

          <div className="header-account">
            {user ? (
              <div className="account-menu">
                <button
                  type="button"
                  className="account-trigger"
                  onClick={() => setIsAccountOpen((open) => !open)}
                  aria-expanded={isAccountOpen}
                  aria-haspopup="menu"
                >
                  <span className="account-avatar" aria-hidden="true">
                    {getInitials(user.name)}
                  </span>
                  <span className="account-name">{user.name.split(' ')[0]}</span>
                  <span className="account-caret" aria-hidden="true">▾</span>
                </button>

                {isAccountOpen && (
                  <div className="account-dropdown" role="menu">
                    <div className="account-identity">
                      <strong>{user.name}</strong>
                      <small>{user.email}</small>
                    </div>
                    <NavLink to="/dashboard" onClick={() => { setIsAccountOpen(false); closeMenu(); }} role="menuitem">
                      Dashboard
                    </NavLink>
                    <NavLink to="/expense-planner" onClick={() => { setIsAccountOpen(false); closeMenu(); }} role="menuitem">
                      My expenses
                    </NavLink>
                    <button type="button" onClick={handleLogout} role="menuitem">
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-actions">
                <Link to="/login" className="header-login">Log in</Link>
                <Link to="/signup" className="header-signup">Sign up</Link>
              </div>
            )}
          </div>

          <button
            className="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
