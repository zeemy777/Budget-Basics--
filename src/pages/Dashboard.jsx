import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useToast } from '../context/toast-context';
import { readUserState, useUserState } from '../hooks/useUserState';
import { useCountUp } from '../hooks/useCountUp';
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
import { BADGES, evaluateBadges } from '../utils/badges';
import { buildDemoData } from '../utils/demoData';
import { currentStreak, dateKey } from '../utils/streak';
import { getMonthlyTotals, getSpendingInsights } from '../utils/insights';
import CategoryDonut from '../Components/charts/CategoryDonut';
import MonthBars from '../Components/charts/MonthBars';
import OnboardingWizard from '../Components/dashboard/OnboardingWizard';
import StreakCard from '../Components/dashboard/StreakCard';
import BadgesCard from '../Components/dashboard/BadgesCard';
import WhatsIfCard from '../Components/dashboard/WhatsIfCard';
import DataToolsCard from '../Components/dashboard/DataToolsCard';
import '../Components/dashboard/dashboard-extras.css';
import './Dashboard.css';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeExpenses(input) {
  if (!Array.isArray(input)) return [];
  return input
    .slice(0, 500)
    .map((item, index) => {
      if (!item || typeof item !== 'object') return null;
      const amount = Number(item.amount);
      if (!Number.isFinite(amount) || amount <= 0) return null;
      return {
        id: item.id ?? Date.now() + index,
        date: typeof item.date === 'string' && item.date ? item.date : dateKey(new Date()),
        category: typeof item.category === 'string' && item.category ? item.category : 'Miscellaneous',
        description: String(item.description || 'Expense').slice(0, 120),
        amount,
      };
    })
    .filter(Boolean);
}

function normalizeGoal(input) {
  if (!input || typeof input !== 'object') return null;
  const target = Number(input.target) || 0;
  const current = Math.max(0, Number(input.current) || 0);
  if (target <= 0) return null;
  const monthly = Math.max(0, Number(input.monthly) || 0);
  const remaining = Math.max(0, target - current);
  return {
    goalName: String(input.goalName || 'Savings goal').slice(0, 60),
    target,
    current,
    monthly,
    remaining,
    monthsNeeded: monthly > 0 ? Math.ceil(remaining / monthly) : 0,
    progressPercent: Math.min(100, (current / target) * 100),
  };
}

function Dashboard() {
  const { user } = useAuth();
  const { notify } = useToast();

  const [plan, setPlan] = useUserState('plan', DEFAULT_PLAN, user.id);
  const [expenses, setExpenses] = useUserState('expenses', [], user.id);
  const [savedGoal, setSavedGoal] = useUserState('savingsGoal', null, user.id);
  const [streak, setStreak] = useUserState('streak', { dates: [], best: 0 }, user.id);
  const [onboarding, setOnboarding] = useUserState('onboarding', { done: false }, user.id);

  const income = Math.max(0, Number(plan?.income) || 0);
  const needs = clamp(Number(plan?.needs) || 0, 0, 100);
  const wants = clamp(Number(plan?.wants) || 0, 0, 100 - needs);
  const savings = getSavingsPercent({ needs, wants });

  const needsAmount = (income * needs) / 100;
  const wantsAmount = (income * wants) / 100;
  const savingsAmount = (income * savings) / 100;

  const score = calculateHealthScore({ needs, wants, savings });
  const animatedScore = useCountUp(score);
  const band = getScoreBand(score);
  const breakdown = getScoreBreakdown({ needs, wants, savings });
  const nextAction = getNextAction({ needs, wants, savings });

  const ringRadius = 54;
  const ringLength = 2 * Math.PI * ringRadius;

  const expenseList = Array.isArray(expenses) ? expenses : [];
  const totalExpenses = expenseList.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const spentShare = income > 0 ? Math.min(100, (totalExpenses / income) * 100) : 0;

  const goal = normalizeGoal(savedGoal);
  const streakDates = Array.isArray(streak?.dates) ? streak.dates : [];
  const streakBest = Math.max(0, Number(streak?.best) || 0);
  const streakCount = currentStreak(streakDates);

  const quizBest = Number(readUserState('moneyIq', null, user.id)?.best) || 0;
  const earnedMap = readUserState('badges', {}, user.id);
  const badges = evaluateBadges(
    { expenseCount: expenseList.length, goal, score, streak: streakCount, quizBest },
    earnedMap
  );

  useEffect(() => {
    const stored = readUserState('badges', {}, user.id);
    const next = { ...stored };
    const unlocked = [];

    for (const badge of BADGES) {
      if (
        !next[badge.id] &&
        badge.check({ expenseCount: expenseList.length, goal, score, streak: streakCount, quizBest })
      ) {
        next[badge.id] = new Date().toISOString();
        unlocked.push(badge.name);
      }
    }

    if (unlocked.length === 0) return;
    try {
      localStorage.setItem(`bb_badges_${user.id}`, JSON.stringify(next));
    } catch {
      // Storage can be unavailable; badges simply stay session-based.
    }
    notify(
      unlocked.length === 1
        ? `Badge unlocked: ${unlocked[0]}.`
        : `Badges unlocked: ${unlocked.join(', ')}.`,
      'success'
    );
  }, [user.id, expenseList.length, goal, score, streakCount, quizBest, notify]);

  const insights = getSpendingInsights(expenseList);
  const monthly = getMonthlyTotals(expenseList, 6);

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

  const handleCheckIn = () => {
    const today = dateKey(new Date());
    if (streakDates.includes(today)) {
      notify('You already checked in today.', 'info');
      return;
    }

    const nextDates = [...streakDates, today];
    const nextCount = currentStreak(nextDates);
    setStreak({ dates: nextDates, best: Math.max(streakBest, nextCount) });
    notify(
      nextCount >= 7
        ? `🔥 ${nextCount}-day streak. That is a real habit now.`
        : 'Streak extended. Keep it going!',
      'success'
    );
  };

  const finishOnboarding = (setup) => {
    setPlan({ income: setup.income, needs: setup.needs, wants: setup.wants });
    if (setup.goal) setSavedGoal(setup.goal);
    setOnboarding({ done: true, style: setup.style });
    notify('Your plan is ready. Fine-tune it anytime.', 'success');
  };

  const skipOnboarding = () => {
    setOnboarding({ done: true, skipped: true });
    notify('You can run setup later from Backup & explore.', 'info');
  };

  const handleExport = () => {
    const payload = {
      app: 'BudgetBasics',
      version: 1,
      exportedAt: new Date().toISOString(),
      account: { name: user.name, email: user.email },
      data: {
        plan,
        expenses: expenseList,
        savingsGoal: goal,
        streak: { dates: streakDates, best: streakBest },
        onboarding,
        badges: readUserState('badges', {}, user.id),
      },
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `budgetbasics-backup-${dateKey(new Date())}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    notify('Backup downloaded. Keep it somewhere safe.', 'success');
  };

  const handleImport = (data) => {
    const nextNeeds = clamp(Number(data?.plan?.needs) || 0, 0, 100);
    const nextWants = clamp(Number(data?.plan?.wants) || 0, 0, 100 - nextNeeds);
    const nextIncome = clamp(Number(data?.plan?.income) || 0, 0, 100000000);

    setPlan({ income: nextIncome, needs: nextNeeds, wants: nextWants });
    setExpenses(normalizeExpenses(data?.expenses));
    setSavedGoal(normalizeGoal(data?.savingsGoal ?? data?.goal));
    setStreak({
      dates: Array.isArray(data?.streak?.dates)
        ? data.streak.dates.filter((entry) => typeof entry === 'string').slice(-400)
        : [],
      best: Math.max(0, Number(data?.streak?.best) || 0),
    });
    setOnboarding({ done: true });

    try {
      localStorage.setItem(
        `bb_badges_${user.id}`,
        JSON.stringify(data?.badges && typeof data.badges === 'object' ? data.badges : {})
      );
    } catch {
      // Ignore storage failures on import.
    }

    notify('Backup restored into this account.', 'success');
  };

  const handleDemo = () => {
    const demo = buildDemoData();
    setPlan(demo.plan);
    setExpenses(demo.expenses);
    setSavedGoal(demo.goal);
    setStreak(demo.streak);
    setOnboarding(demo.onboarding);
    notify('Demo data loaded. Explore away!', 'success');
  };

  const handleReset = () => {
    setPlan({ ...DEFAULT_PLAN });
    setExpenses([]);
    setSavedGoal(null);
    setStreak({ dates: [], best: 0 });
    setOnboarding({ done: true });
    try {
      localStorage.removeItem(`bb_badges_${user.id}`);
    } catch {
      // Ignore storage failures on reset.
    }
    notify('This account is back to a clean slate.', 'success');
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
                <strong>{animatedScore}</strong>
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

        <section className="dash-insights">
          <div className="dash-section-head">
            <div>
              <span className="dash-card-eyebrow">Spending insights</span>
              <h2>Where your money goes</h2>
            </div>
            <Link to="/expense-planner" className="dash-section-link">Open planner →</Link>
          </div>

          {expenseList.length > 0 ? (
            <div className="insight-grid">
              <article className="dash-card chart-card">
                <div className="chart-head">
                  <h3>By category</h3>
                  <span className="activity-tag">{insights.count} tracked</span>
                </div>
                <CategoryDonut items={insights.categories} total={insights.total} centerLabel="Spent" />
              </article>

              <article className="dash-card chart-card">
                <div className="chart-head">
                  <h3>Last 6 months</h3>
                  <span className="activity-tag">{formatNaira(insights.total)}</span>
                </div>
                <MonthBars data={monthly} />
                <ul className="insight-notes">
                  {insights.top && (
                    <li>
                      <span aria-hidden="true">🥇</span>
                      {insights.top.category} takes {Math.round(insights.top.share * 100)}% of your
                      tracked spending ({formatNaira(insights.top.total)}).
                    </li>
                  )}
                  <li>
                    <span aria-hidden="true">📅</span>
                    You spend {formatNaira(insights.averagePerActiveDay)} on an average spending
                    day, across {insights.activeDays} {insights.activeDays === 1 ? 'day' : 'days'}.
                  </li>
                  {insights.biggest && (
                    <li>
                      <span aria-hidden="true">🔎</span>
                      Biggest single expense: {insights.biggest.description} —{' '}
                      {formatNaira(insights.biggest.amount)}.
                    </li>
                  )}
                </ul>
              </article>
            </div>
          ) : (
            <div className="insight-empty">
              <h3>Your insights appear after your first expense</h3>
              <p>
                Log what you spend and this dashboard becomes a live picture of your habits —
                categories, a six-month trend, and your biggest money leaks.
              </p>
              <div className="insight-empty-actions">
                <Link to="/expense-planner" className="btn-primary">Log an expense</Link>
                <button type="button" className="btn-secondary" onClick={handleDemo}>
                  Load demo data
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="dash-momentum">
          <div className="dash-section-head">
            <div>
              <span className="dash-card-eyebrow">Habits & milestones</span>
              <h2>Keep the momentum</h2>
            </div>
            <Link to="/money-iq" className="dash-section-link">Test your Money IQ →</Link>
          </div>

          <div className="momentum-grid">
            <StreakCard dates={streakDates} best={streakBest} onCheckIn={handleCheckIn} />
            <BadgesCard badges={badges} />
          </div>
        </section>

        <div className="dash-tools-grid">
          <WhatsIfCard
            income={income}
            needs={needs}
            wants={wants}
            savings={savings}
            score={score}
          />
          <DataToolsCard
            onExport={handleExport}
            onImport={handleImport}
            onDemo={handleDemo}
            onReset={handleReset}
            onRunSetup={() => setOnboarding({ done: false })}
          />
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

      {!onboarding?.done && (
        <OnboardingWizard
          defaultIncome={plan?.income}
          onFinish={finishOnboarding}
          onSkip={skipOnboarding}
          onDemo={handleDemo}
        />
      )}
    </div>
  );
}

export default Dashboard;
