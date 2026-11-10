import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import './NotFound.css';

function NotFound() {
  const { user } = useAuth();

  return (
    <div className="not-found-page">
      <div className="container nf-shell">
        <div className="nf-card">
          <div className="nf-code" aria-hidden="true">
            <span>4</span>
            <span className="nf-zero">₦</span>
            <span>4</span>
          </div>

          <span className="nf-eyebrow">Page not found</span>
          <h1>This page wandered off the budget.</h1>
          <p>
            The link may be old or mistyped. Pick a useful place to land instead — your money
            lessons are still waiting.
          </p>

          <div className="nf-actions">
            <Link to="/" className="primary-btn">Back home</Link>
            <Link to={user ? '/dashboard' : '/sitemap'} className="secondary-btn">
              {user ? 'Go to dashboard' : 'View sitemap'}
            </Link>
          </div>

          <div className="nf-links">
            <Link to="/budgeting-basics">Budgeting Basics</Link>
            <Link to="/50-30-20">50-30-20 calculator</Link>
            <Link to="/expense-planner">Expense Planner</Link>
            <Link to="/chatbot">Money assistant</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
