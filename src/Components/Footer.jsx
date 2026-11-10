import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import './Footer.css';

function Footer() {
  const { user } = useAuth();

  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true"></div>

      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-mark" aria-hidden="true">₦</span>
            <span>BudgetBasics</span>
          </Link>
          <p>
            Naira-first money education for students — simple guides, interactive tools,
            and a personal plan that stays in your browser.
          </p>
          <div className="footer-badges">
            <span>100% free</span>
            <span>Naira-first</span>
            <span>Browser-only data</span>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/budgeting-basics">Budgeting Basics</Link></li>
            <li><Link to="/savings-goals">Savings Goals</Link></li>
            <li><Link to="/chatbot">AI Chatbot</Link></li>
            <li><Link to="/sitemap">Sitemap</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Account</h4>
          <ul>
            {user ? (
              <>
                <li><Link to="/dashboard">My dashboard</Link></li>
                <li><Link to="/expense-planner">My expenses</Link></li>
                <li><Link to="/feedback">Feedback</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/signup">Create free account</Link></li>
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/feedback">Feedback</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </>
            )}
          </ul>
        </div>

        <div className="footer-disclaimer">
          <h4>Important Note</h4>
          <p>
            This is an <strong>educational website</strong> only. It does not provide banking
            services, connect to your bank, or send financial data to a server. Accounts and plans
            are stored only in this browser.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} BudgetBasics • Naira-first money education</p>
          <p className="privacy-note">
            Privacy: account and plan data live in this browser. Clear site data to remove them.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
