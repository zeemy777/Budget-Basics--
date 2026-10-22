import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>
              Take Control of Your Money with <span>BudgetBasics</span>
            </h1>
            <p className="hero-subtitle">
              A simple, student-friendly website to learn budgeting, saving, 
              and smart money habits — through clear guides, calculators, and interactive tools.
            </p>
            <div className="hero-buttons">
              <Link to="/budgeting-basics" className="btn-primary">
                Start Learning
              </Link>
              <Link to="/50-30-20" className="btn-secondary">
                Try the Calculator
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <span className="hero-icon">💰</span>
              <h3>Learn</h3>
              <p>Budgeting basics made simple</p>
            </div>
            <div className="hero-card">
              <span className="hero-icon">📊</span>
              <h3>Practice</h3>
              <p>Interactive tools & planners</p>
            </div>
            <div className="hero-card">
              <span className="hero-icon">🎯</span>
              <h3>Improve</h3>
              <p>Build better money habits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">What You Can Do Here</h2>
          <div className="features-grid">
            <Link to="/budgeting-basics" className="feature-card">
              <span className="feature-icon">📚</span>
              <h3>Budgeting Basics</h3>
              <p>Understand income, expenses, needs, wants, and savings.</p>
            </Link>

            <Link to="/needs-vs-wants" className="feature-card">
              <span className="feature-icon">⚖️</span>
              <h3>Needs vs Wants</h3>
              <p>Learn to tell the difference and make smarter choices.</p>
            </Link>

            <Link to="/50-30-20" className="feature-card">
              <span className="feature-icon">🧮</span>
              <h3>50-30-20 Rule</h3>
              <p>Use a simple calculator to split your monthly income.</p>
            </Link>

            <Link to="/savings-goals" className="feature-card">
              <span className="feature-icon">🎯</span>
              <h3>Savings Goals</h3>
              <p>Set a goal and see how long it will take to achieve it.</p>
            </Link>

            <Link to="/expense-planner" className="feature-card">
              <span className="feature-icon">📝</span>
              <h3>Expense Planner</h3>
              <p>Track sample expenses and watch your balance change.</p>
            </Link>

            <Link to="/chatbot" className="feature-card">
              <span className="feature-icon">🤖</span>
              <h3>AI Chatbot</h3>
              <p>Ask basic questions about money and get instant answers.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="tips-section">
        <div className="container">
          <h2 className="section-title">Quick Money Tips for Students</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-number">01</span>
              <h3>Track Every Expense</h3>
              <p>Even small daily spends add up. Write them down for one week.</p>
            </div>
            <div className="tip-card">
              <span className="tip-number">02</span>
              <h3>Use the 24-Hour Rule</h3>
              <p>Wait one full day before buying anything that is not essential.</p>
            </div>
            <div className="tip-card">
              <span className="tip-number">03</span>
              <h3>Pay Yourself First</h3>
              <p>Save a small amount as soon as you receive money — before spending.</p>
            </div>
            <div className="tip-card">
              <span className="tip-number">04</span>
              <h3>Cancel Unused Subscriptions</h3>
              <p>Review all subscriptions monthly and remove what you don’t use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2>Ready to Build Better Money Habits?</h2>
          <p>
            Start with the basics or jump straight into the interactive tools. 
            Everything is designed for students — simple, practical, and educational.
          </p>
          <div className="cta-buttons">
            <Link to="/budgeting-basics" className="btn-primary">
              Explore Budgeting Basics
            </Link>
            <Link to="/sitemap" className="btn-outline">
              View Full Sitemap
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;