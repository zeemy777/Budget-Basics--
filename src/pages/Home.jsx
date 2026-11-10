import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import './Home.css';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-orb hero-orb-1" aria-hidden="true"></div>
        <div className="hero-orb hero-orb-2" aria-hidden="true"></div>
        <div className="hero-grid" aria-hidden="true"></div>

        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-eyebrow">
              <span className="eyebrow-dot" aria-hidden="true"></span>
              Free · Naira-first · Private by default
            </span>

            <h1>
              Money skills that
              <span className="hero-gradient"> actually stick.</span>
            </h1>

            <p className="hero-subtitle">
              Learn budgeting, saving, and smart spending through clear guides,
              interactive calculators, and a friendly money assistant.
            </p>

            <div className="hero-buttons">
              {user ? (
                <Link to="/dashboard" className="btn-primary">
                  Open my dashboard <span aria-hidden="true">→</span>
                </Link>
              ) : (
                <Link to="/signup" className="btn-primary">
                  Create a free account <span aria-hidden="true">→</span>
                </Link>
              )}
              <Link to="/budgeting-basics" className="btn-secondary">
                Start learning
              </Link>
            </div>

            <ul className="hero-meta">
              <li>12 plain-English guides</li>
              <li>6 interactive tools</li>
              <li>Your data stays in your browser</li>
            </ul>
          </div>

          <div className="hero-visual">
            <div className="budget-glow" aria-hidden="true"></div>

            <div className="budget-card">
              <div className="budget-card-top">
                <div>
                  <span className="budget-label">This month</span>
                  <strong className="budget-amount">₦240,000</strong>
                </div>
                <span className="budget-delta">▲ 12% saved</span>
              </div>

              <div className="budget-split" aria-hidden="true">
                <span className="split-needs"></span>
                <span className="split-wants"></span>
                <span className="split-savings"></span>
              </div>

              <div className="budget-legend">
                <div className="legend-row">
                  <span className="legend-dot needs" aria-hidden="true"></span>
                  <span className="legend-name">Needs · 50%</span>
                  <strong>₦120,000</strong>
                </div>
                <div className="legend-row">
                  <span className="legend-dot wants" aria-hidden="true"></span>
                  <span className="legend-name">Wants · 30%</span>
                  <strong>₦72,000</strong>
                </div>
                <div className="legend-row">
                  <span className="legend-dot savings" aria-hidden="true"></span>
                  <span className="legend-name">Savings · 20%</span>
                  <strong>₦48,000</strong>
                </div>
              </div>

              <div className="budget-foot">
                <span className="budget-status">On track</span>
                <span className="budget-plan">50 · 30 · 20 plan</span>
              </div>
            </div>

            <div className="float-chip chip-save">
              <span className="chip-icon" aria-hidden="true">💰</span>
              <div>
                <strong>₦48,000</strong>
                <small>saved this month</small>
              </div>
            </div>

            <div className="float-chip chip-goal">
              <span className="chip-icon" aria-hidden="true">🎯</span>
              <div>
                <strong>Goal 68%</strong>
                <small>laptop fund</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="stats-section" aria-label="Site statistics">
        <div className="container">
          <div className="stats-band">
            <div className="stat">
              <strong>12</strong>
              <span>Learning guides</span>
            </div>
            <div className="stat">
              <strong>6</strong>
              <span>Interactive tools</span>
            </div>
            <div className="stat">
              <strong>1</strong>
              <span>Personal dashboard</span>
            </div>
            <div className="stat">
              <strong>0</strong>
              <span>Data sent to servers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">One place, everything you need</span>
            <h2 className="section-title">Learn it. Try it. Master it.</h2>
            <p className="section-sub">
              Six focused ways to go from money-curious to money-confident.
            </p>
          </div>

          <div className="features-grid">
            <Link to="/budgeting-basics" className="feature-card feature-large feature-learn">
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">📚</span>
                <span className="feature-tag">Start here</span>
              </div>
              <h3>Budgeting Basics</h3>
              <p>
                Income, expenses, needs, wants, and savings — explained without the jargon,
                with a sample monthly budget and a quick quiz.
              </p>
              <div className="feature-tags">
                <span>Income</span>
                <span>Expenses</span>
                <span>Savings</span>
              </div>
              <span className="feature-link">Explore the guide <span aria-hidden="true">→</span></span>
            </Link>

            <Link to="/chatbot" className="feature-card feature-large feature-chat">
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">🤖</span>
                <span className="feature-tag feature-tag-live">Always on</span>
              </div>
              <h3>Ask the money assistant</h3>
              <p>
                Get instant, beginner-friendly answers about budgeting and saving —
                no judgement, no sales pitch, just clear explanations.
              </p>
              <div className="chat-preview" aria-hidden="true">
                <span className="chat-line chat-line-user">How do I start saving?</span>
                <span className="chat-line chat-line-bot">Try paying yourself first — even ₦2,000 counts.</span>
              </div>
              <span className="feature-link">Open the chatbot <span aria-hidden="true">→</span></span>
            </Link>

            <Link to="/needs-vs-wants" className="feature-card">
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">⚖️</span>
              </div>
              <h3>Needs vs Wants</h3>
              <p>Sort everyday purchases with a quick classifier and decision guide.</p>
              <span className="feature-link">Practice sorting <span aria-hidden="true">→</span></span>
            </Link>

            <Link to="/50-30-20" className="feature-card">
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">🧮</span>
              </div>
              <h3>50-30-20 Rule</h3>
              <p>Split any monthly income into needs, wants, and savings in seconds.</p>
              <span className="feature-link">Open calculator <span aria-hidden="true">→</span></span>
            </Link>

            <Link to="/savings-goals" className="feature-card">
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">🎯</span>
              </div>
              <h3>Savings Goals</h3>
              <p>Turn a goal into a monthly plan and see exactly when you will hit it.</p>
              <span className="feature-link">Plan a goal <span aria-hidden="true">→</span></span>
            </Link>

            <Link to="/expense-planner" className="feature-card">
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">📝</span>
              </div>
              <h3>Expense Planner</h3>
              <p>Log sample expenses and watch your remaining balance update live.</p>
              <span className="feature-link">Track expenses <span aria-hidden="true">→</span></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Personal dashboard teaser */}
      <section className="dash-teaser-section">
        <div className="container">
          <div className="dash-teaser">
            <div className="dash-teaser-copy">
              <span className="section-eyebrow">New · Personal dashboard</span>
              <h2 className="section-title">A money score you can actually act on.</h2>
              <p className="section-sub">
                Create a free account to split your real income, get a Budget Health Score,
                and keep your expenses and goals saved in your own browser.
              </p>

              <ul className="teaser-list">
                <li>
                  <span className="teaser-list-icon" aria-hidden="true">📊</span>
                  <div>
                    <strong>Budget Health Score</strong>
                    <p>Needs, wants, and savings graded out of 100 after every change.</p>
                  </div>
                </li>
                <li>
                  <span className="teaser-list-icon" aria-hidden="true">💾</span>
                  <div>
                    <strong>Your tools remember</strong>
                    <p>Expenses and savings goals stay saved to your account in this browser.</p>
                  </div>
                </li>
                <li>
                  <span className="teaser-list-icon" aria-hidden="true">⚡</span>
                  <div>
                    <strong>One next action</strong>
                    <p>A single practical move to improve your plan, never a lecture.</p>
                  </div>
                </li>
              </ul>

              <div className="hero-buttons">
                <Link to={user ? '/dashboard' : '/signup'} className="btn-primary">
                  {user ? 'Open my dashboard' : 'Create free account'}
                </Link>
                {!user && (
                  <Link to="/login" className="btn-secondary">
                    I already have an account
                  </Link>
                )}
              </div>
            </div>

            <div className="dash-teaser-visual">
              <div className="teaser-glow" aria-hidden="true"></div>
              <div className="teaser-card">
                <div className="teaser-card-head">
                  <span>Budget health</span>
                  <span className="teaser-band">Strong</span>
                </div>

                <div className="teaser-ring">
                  <svg viewBox="0 0 140 140" aria-hidden="true">
                    <circle className="teaser-ring-track" cx="70" cy="70" r="54" />
                    <circle
                      className="teaser-ring-value"
                      cx="70"
                      cy="70"
                      r="54"
                      strokeDasharray="339.3"
                      strokeDashoffset="61"
                    />
                  </svg>
                  <div className="teaser-score">
                    <strong>82</strong>
                    <span>of 100</span>
                  </div>
                </div>

                <p className="teaser-message">A solid structure with room to optimise.</p>

                <div className="teaser-breakdown">
                  <div className="teaser-row">
                    <span>Needs · 50%</span>
                    <div className="teaser-track"><span className="t-needs"></span></div>
                    <strong>₦60,000</strong>
                  </div>
                  <div className="teaser-row">
                    <span>Wants · 28%</span>
                    <div className="teaser-track"><span className="t-wants"></span></div>
                    <strong>₦33,600</strong>
                  </div>
                  <div className="teaser-row">
                    <span>Savings · 22%</span>
                    <div className="teaser-track"><span className="t-savings"></span></div>
                    <strong>₦26,400</strong>
                  </div>
                </div>

                <div className="teaser-next">
                  <span aria-hidden="true">⚡</span>
                  Keep this split and you build ₦316,800 in a year.
                </div>
              </div>

              <div className="teaser-chip">
                <span aria-hidden="true">🔒</span>
                <div>
                  <strong>Browser-only</strong>
                  <small>no server or bank link</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="tips-section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Habits, not hacks</span>
            <h2 className="section-title">Four money habits that pay off</h2>
            <p className="section-sub">Small and repeatable beats complicated and forgotten.</p>
          </div>

          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-number">01</span>
              <h3>Track every expense</h3>
              <p>Even small daily spends add up. Write them down for one week.</p>
            </div>
            <div className="tip-card">
              <span className="tip-number">02</span>
              <h3>Use the 24-hour rule</h3>
              <p>Wait one full day before buying anything that is not essential.</p>
            </div>
            <div className="tip-card">
              <span className="tip-number">03</span>
              <h3>Pay yourself first</h3>
              <p>Save a small amount as soon as you receive money — before spending.</p>
            </div>
            <div className="tip-card">
              <span className="tip-number">04</span>
              <h3>Cancel unused subscriptions</h3>
              <p>Review all subscriptions monthly and remove what you don’t use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-panel">
            <div className="cta-orb" aria-hidden="true"></div>
            <span className="cta-eyebrow">Your next step</span>
            <h2>Ready to build better money habits?</h2>
            <p>
              Start with the basics or jump straight into the interactive tools.
              Everything is designed for students — simple, practical, and private.
            </p>
            <div className="cta-buttons">
              <Link to={user ? '/dashboard' : '/signup'} className="btn-primary">
                {user ? 'Open my dashboard' : 'Create your free account'}
              </Link>
              <Link to="/budgeting-basics" className="btn-outline">
                Explore budgeting basics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
