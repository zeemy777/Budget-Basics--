import { Link } from 'react-router-dom';
import './Sitemap.css';

function Sitemap() {
  return (
    <div className="sitemap-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Sitemap</h1>
          <p className="subtitle">
            Complete overview of all pages and sections available on BudgetBasics.
          </p>
        </div>

        <div className="sitemap-grid">
          {/* Main Sections */}
          <div className="sitemap-card">
            <h2>Main Sections</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/budgeting-basics">Budgeting Basics</Link></li>
              <li><Link to="/needs-vs-wants">Needs vs Wants</Link></li>
              <li><Link to="/50-30-20">50-30-20 Rule</Link></li>
              <li><Link to="/savings-goals">Savings Goals</Link></li>
              <li><Link to="/expense-planner">Expense Planner</Link></li>
              <li><Link to="/money-mistakes">Money Mistakes</Link></li>
              <li><Link to="/infographics">Infographics & Gallery</Link></li>
              <li><Link to="/chatbot">AI Chatbot Assistant</Link></li>
            </ul>
          </div>

          {/* Support Pages */}
          <div className="sitemap-card">
            <h2>Support & Information</h2>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
            </ul>
          </div>

          {/* Learning Tools */}
          <div className="sitemap-card">
            <h2>Interactive Tools</h2>
            <ul>
              <li><Link to="/50-30-20">50-30-20 Calculator</Link></li>
              <li><Link to="/savings-goals">Savings Goal Planner</Link></li>
              <li><Link to="/expense-planner">Expense Tracker (Demo)</Link></li>
              <li><Link to="/needs-vs-wants">Needs vs Wants Classifier</Link></li>
              <li><Link to="/chatbot">AI Chatbot</Link></li>
            </ul>
          </div>

          {/* Educational Content */}
          <div className="sitemap-card">
            <h2>Educational Content</h2>
            <ul>
              <li><Link to="/budgeting-basics">Income, Expenses & Savings</Link></li>
              <li><Link to="/needs-vs-wants">Needs vs Wants Guide</Link></li>
              <li><Link to="/money-mistakes">Common Money Mistakes</Link></li>
              <li><Link to="/infographics">Visual Learning Gallery</Link></li>
            </ul>
          </div>
        </div>

        {/* Note */}
        <div className="sitemap-note">
          <p>
            <strong>Note:</strong> BudgetBasics is an educational website. 
            All tools and calculators are for learning purposes only and do not provide real financial services.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sitemap;