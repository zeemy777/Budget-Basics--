import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h3>BudgetBasics</h3>
          <p>Helping students build better money habits through simple education and interactive tools.</p>
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
          <h4>Support</h4>
          <ul>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        <div className="footer-disclaimer">
          <h4>Important Note</h4>
          <p>
            This is an <strong>educational website</strong> only.  
            It does not provide banking services, real financial advice, or store personal financial data.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} BudgetBasics • Built for educational purposes</p>
          <p className="privacy-note">Privacy: No personal or financial data is collected or stored permanently.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;