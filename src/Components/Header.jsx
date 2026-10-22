import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Visitor counter (simple demo using localStorage)
  useEffect(() => {
    const count = parseInt(localStorage.getItem('bb_visitors') || '0', 10) + 1;
    localStorage.setItem('bb_visitors', count);
    setVisitorCount(count);
  }, []);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dark mode
  useEffect(() => {
    const saved = localStorage.getItem('bb_theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('bb_theme', newTheme ? 'dark' : 'light');
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-top-inner">
          <div className="visitor-clock">
            <span>👥 Visitors: <strong>{visitorCount}</strong></span>
            <span className="divider">|</span>
            <span>
              {currentTime.toLocaleDateString('en-IN', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}{' '}
              {currentTime.toLocaleTimeString('en-IN')}
            </span>
          </div>

          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-main-inner">
          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="logo-icon">💰</span>
            <div>
              <h1>BudgetBasics</h1>
              <p className="tagline">Smart Money Habits for Students</p>
            </div>
          </Link>

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

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
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
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;