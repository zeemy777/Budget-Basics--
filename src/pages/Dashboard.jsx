import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { readUserState, useUserState } from '../hooks/useUserState';
import { formatNaira } from '../utils/currency';
import {
  DEFAULT_PLAN,
  PLAN_PRESETS,
  calculateHealthScore,
  getNextAction,
  getSavingsPercent,
  getScoreBand,
  getScoreBreakdown,
} from '../utils/budgetScore';
import './Dashboard.css';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function Dashboard() {
  const { user } = useAuth();
  const [plan, setPlan] = useUserState('plan', DEFAULT_PLAN, user.id);
  const expenses = readUserState('expenses', [], user.id);
  const savedGoal = readUserState('savingsGoal', null, user.id);

  const income = Math.max(0, Number(plan?.income) || 0);
  const needs = clamp(Number(plan?.needs) || 0, 0, 100);
  const wants = clamp(Number(plan?.wants) || 0, 0, 100 - needs);
  const savings = getSavingsPercent({ needs, wants });

  const needsAmount = (income * needs) / 100;
  const wantsAmount = (income * wants) / 100;
  const savingsAmount = (income * savings) / 100;

  const score = calculateHealthScore({ needs, wants, savings });
  const band = getScoreBand(score);
  const breakdown = getScoreBreakdown({ needs, wants, savings });
  const nextAction = getNextAction({ needs, wants, savings });

  const ringRadius = 54;
  const ringLength = 2 * Math.PI * ringRadius;

  const expenseList = Array.isArray(expenses) ? expenses : [];
  const totalExpenses = expenseList.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const spentShare = income > 0 ? Math.min(100, (totalExpenses / income) * 100) : 0;

  const goal = savedGoal && typeof savedGoal === 'object' ? savedGoal : null;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user.name.split(' ')[0];

  const updateIncome = (value) => {
    setPlan((current) => ({
      ...current,
      income: clamp(Number(value) || 0, 0, 100000000),
    }));
  };

  const updateNeeds = (value) => {
    const nextNeeds = clamp(Number(value) || 0, 0, 100 - wants);
    setPlan((current) => ({ ...current, needs: nextNeeds }));
  };

  const updateWants = (value) => {
    const nextWants = clamp(Number(value) || 0, 0, 100 - needs);
    setPlan((current) => ({ ...current, wants: nextWants }));
  };

  const applyPreset = (preset) => {
    setPlan((current) => ({ ...current, needs: preset.needs, wants: preset.wants }));
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <header className="dash-hero">
          <div className="dash-hero-copy">
            <span className="dash-eyebrow">Personal dashboard</span>
            <h1>
              {greeting}, <span className="dash-gradient">{firstName}.</span>
            </h1>
            <p>
              This is your money workspace. Adjust the split, watch your score move, and keep
              everything saved in this browser.
            </p>
          </div>

          <div className="dash-identity">
            <span className="dash-avatar" aria-hidden="true">
              {user.name
                .split(' ')
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase())
                .join('')}
            </span>
            <div>
              <strong>{user.name}</strong>
              <small>{user.email}</small>
            </div>
          </div>
        </header>

        <div className="dash-grid">
          <section className="dash-card plan-card">
            <div className="dash-card-head">
              <div>
                <span className="dash-card-eyebrow">Monthly plan</span>
                <h2>Split your income</h2>
              </div>
              <span className="autosave-pill">
                <span className="autosave-dot" aria-hidden="true"></span>
                Auto-saved
              </span>
            </div>

            <div className="income-field">
              <label htmlFor="monthly-income">Monthly income</label>
              <div className="income-input">
                <span aria-hidden="true">₦</span>
                <input
                  id="monthly-income"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="1000"
                  value={plan?.income ?? 0}
                  onChange={(event) => updateIncome(event.target.value)}
                />
              </div>
              <small>Use your allowance, stipend, or part-time income.</small>
            </div>

            <div className="preset-row" role="group" aria-label="Budget presets">
              {PLAN_PRESETS.map((preset) => {
                const isActive = needs === preset.needs && wants === preset.wants;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    className={`preset-btn ${isActive ? 'active' : ''}`}
                    onClick={() => applyPreset(preset)}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            <div className="slider-group">
              <div className="slider-head">
                <span className="slider-label">
                  <span className="slider-dot needs" aria-hidden="true"></span>
                  Needs
                </span>
                <strong>{needs}% · {formatNaira(needsAmount)}</strong>
              </div>
              <input
                className="allocation-slider needs"
                type="range"
                min="0"
                max={100 - wants}
                step="1"
                value={needs}
                onChange={(event) => updateNeeds(event.target.value)}
                aria-label="Needs percentage of income"
              />
              <small className="slider-hint">Rent, food, transport, data, school costs.</small>
            </div>

            <div className="slider-group">
              <div className="slider-head">
                <span className="slider-label">
                  <span className="slider-dot wants" aria-hidden="true"></span>
                  Wants
                </span>
                <strong>{wants}% · {formatNaira(wantsAmount)}</strong>
              </div>
              <input
                className="allocation-slider wants"
                type="range"
                min="0"
                max={100 - needs}
                step="1"
                value={wants}
                onChange={(event) => updateWants(event.target.value)}
                aria-label="Wants percentage of income"
              />
              <small className="slider-hint">Eating out, streaming, fashion, upgrades.</small>
            </div>

            <div className="savings-readout">
              <span className="savings-icon" aria-hidden="true">💰</span>
              <div>
                <small>Savings — whatever is left</small>
                <strong>{savings}% · {formatNaira(savingsAmount)} per month</strong>
              </div>
              <Link to="/savings-goals" className="readout-link">
                Set a goal
              </Link>
            </div>
          </section>

          <aside className={`dash-card score-card tone-${band.tone}`}>
            <div className="dash-card-head">
              <div>
                <span className="dash-card-eyebrow">Budget health</span>
                <h2>Your score</h2>
              </div>
              <span className={`score-band tone-${band.tone}`}>{band.label}</span>
            </div>

            <div className="score-ring-wrap">
              <svg className="score-ring" viewBox="0 0 140 140" role="img" aria-label={`Budget health score ${score} out of 100`}>
                <circle className="score-ring-track" cx="70" cy="70" r={ringRadius} />
                <circle
                  className="score-ring-value"
                  cx="70"
                  cy="70"
                  r={ringRadius}
                  strokeDasharray={ringLength}
                  strokeDashoffset={ringLength * (1 - score / 100)}
                />
              </svg>
              <div className="score-ring-number">
                <strong>{score}</strong>
                <span>of 100</span>
              </div>
            </div>

            <p className="score-message">{band.message}</p>

            <div className="score-breakdown">
              <div className="breakdown-row">
                <span>Savings</span>
                <div className="breakdown-track">
                  <span className="breakdown-fill savings" style={{ width: `${(breakdown.savings / 40) * 100}%` }}></span>
                </div>
                <strong>{breakdown.savings}/40</strong>
              </div>
              <div className="breakdown-row">
                <span>Needs</span>
                <div className="breakdown-track">
                  <span className="breakdown-fill needs" style={{ width: `${(breakdown.needs / 30) * 100}%` }}></span>
                </div>
                <strong>{breakdown.needs}/30</strong>
              </div>
              <div className="breakdown-row">
                <span>Wants</span>
                <div className="breakdown-track">
                  <span className="breakdown-fill wants" style={{ width: `${(breakdown.wants / 30) * 100}%` }}></span>
                </div>
                <strong>{breakdown.wants}/30</strong>
              </div>
            </div>

            <div className="next-action">
              <span className="next-action-icon" aria-hidden="true">⚡</span>
              <div>
                <small>Next best action</small>
                <p>{nextAction}</p>
              </div>
            </div>
          </aside>
        </div>

        <section className="dash-activity">
          <div className="dash-section-head">
            <div>
              <span className="dash-card-eyebrow">Your activity</span>
              <h2>Saved in this browser</h2>
            </div>
            <Link to="/sitemap" className="dash-section-link">All tools →</Link>
          </div>

          <div className="activity-grid">
            <article className="activity-card">
              <div className="activity-top">
                <span className="activity-icon" aria-hidden="true">📝</span>
                <span className="activity-tag">{expenseList.length} logged</span>
              </div>
              <h3>Tracked expenses</h3>
              <strong className="activity-value">{formatNaira(totalExpenses)}</strong>
              <div className="activity-track">
                <span style={{ width: `${spentShare}%` }}></span>
              </div>
              <p>
                {expenseList.length === 0
                  ? 'Nothing logged yet. Add one expense to see your real spending.'
                  : `${spentShare.toFixed(0)}% of your planned income is already tracked.`}
              </p>
              <Link to="/expense-planner" className="activity-link">
                {expenseList.length === 0 ? 'Log your first expense' : 'Open planner'} <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className="activity-card">
              <div className="activity-top">
                <span className="activity-icon" aria-hidden="true">🎯</span>
                <span className="activity-tag">
                  {goal ? `${Math.round(goal.progressPercent || 0)}%` : 'No goal'}
                </span>
              </div>
              <h3>{goal?.goalName || 'Savings goal'}</h3>
              <strong className="activity-value">
                {goal ? formatNaira(goal.current || 0) : formatNaira(0)}
              </strong>
              <div className="activity-track goal">
                <span style={{ width: `${goal ? Math.min(100, goal.progressPercent || 0) : 0}%` }}></span>
              </div>
              <p>
                {goal
                  ? `${formatNaira(goal.target || 0)} target · ${goal.monthsNeeded || 0} ${
                      goal.monthsNeeded === 1 ? 'month' : 'months'
                    } to go.`
                  : 'Turn a laptop, trip, or emergency fund into a monthly plan.'}
              </p>
              <Link to="/savings-goals" className="activity-link">
                {goal ? 'Update goal' : 'Plan a goal'} <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className="activity-card activity-highlight">
              <div className="activity-top">
                <span className="activity-icon" aria-hidden="true">📈</span>
                <span className="activity-tag">Projection</span>
              </div>
              <h3>If you keep this split</h3>
              <strong className="activity-value">{formatNaira(savingsAmount * 12)}</strong>
              <div className="activity-track highlight">
                <span style={{ width: `${savings}%` }}></span>
              </div>
              <p>
                That is {formatNaira(savingsAmount)} saved every month. Even a small automatic
                transfer counts.
              </p>
              <Link to="/50-30-20" className="activity-link">
                Compare with 50-30-20 <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>
        </section>

        <div className="dash-footnote">
          <span aria-hidden="true">🔒</span>
          <p>
            This dashboard is a demo. Your plan, expenses, and goal are stored only in this browser —
            nothing is sent to a server. Logging out keeps your data on this device for next time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
