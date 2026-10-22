import { useState } from 'react';
import './SavingsGoals.css';

function SavingsGoals() {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    // Validation
    if (!goalName.trim()) {
      setError('Please enter a goal name.');
      setResult(null);
      return;
    }

    const target = parseFloat(targetAmount);
    const current = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);

    if (isNaN(target) || isNaN(current) || isNaN(monthly)) {
      setError('Please enter valid numbers for all amount fields.');
      setResult(null);
      return;
    }

    if (target <= 0) {
      setError('Target amount must be greater than zero.');
      setResult(null);
      return;
    }

    if (current < 0 || monthly < 0) {
      setError('Current savings and monthly contribution cannot be negative.');
      setResult(null);
      return;
    }

    if (current >= target) {
      setError('You have already reached or exceeded your target!');
      setResult(null);
      return;
    }

    if (monthly === 0) {
      setError('Monthly contribution must be greater than zero to calculate time.');
      setResult(null);
      return;
    }

    // Calculations
    const remaining = target - current;
    const monthsNeeded = Math.ceil(remaining / monthly);
    const progressPercent = Math.min((current / target) * 100, 100);

    setError('');
    setResult({
      goalName: goalName.trim(),
      target,
      current,
      monthly,
      remaining,
      monthsNeeded,
      progressPercent,
    });
  };

  const handleReset = () => {
    setGoalName('');
    setTargetAmount('');
    setCurrentSavings('');
    setMonthlyContribution('');
    setError('');
    setResult(null);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Encouraging tips based on progress
  const getTip = (percent) => {
    if (percent === 0) return "Every big goal starts with the first step. Start saving today!";
    if (percent < 25) return "Great start! Consistency is more important than speed.";
    if (percent < 50) return "You're making solid progress. Keep going!";
    if (percent < 75) return "More than halfway there! Your future self will thank you.";
    if (percent < 100) return "So close! Stay focused — the finish line is near.";
    return "Congratulations! You've reached your goal!";
  };

  return (
    <div className="savings-goals">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Savings Goals</h1>
          <p className="subtitle">
            Set a clear savings goal and see how long it will take to achieve it with consistent monthly contributions.
          </p>
        </div>

        {/* Calculator Form */}
        <section className="form-section">
          <div className="form-card">
            <h2>Plan Your Goal</h2>

            <form onSubmit={handleCalculate}>
              <div className="form-group">
                <label htmlFor="goalName">Goal Name</label>
                <input
                  type="text"
                  id="goalName"
                  placeholder="e.g. New Laptop, Emergency Fund, Trip"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="targetAmount">Target Amount (₹)</label>
                  <input
                    type="number"
                    id="targetAmount"
                    placeholder="e.g. 50000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="currentSavings">Current Savings (₹)</label>
                  <input
                    type="number"
                    id="currentSavings"
                    placeholder="e.g. 8000"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="monthlyContribution">Monthly Contribution (₹)</label>
                <input
                  type="number"
                  id="monthlyContribution"
                  placeholder="e.g. 2000"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  min="0"
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="form-actions">
                <button type="submit" className="primary-btn">
                  Calculate Goal
                </button>
                <button type="button" className="secondary-btn" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Results */}
        {result && (
          <section className="results-section">
            <div className="results-card">
              <h2>Your Savings Plan: {result.goalName}</h2>

              {/* Progress Bar */}
              <div className="progress-container">
                <div className="progress-header">
                  <span>Progress</span>
                  <span className="progress-percent">{result.progressPercent.toFixed(1)}%</span>
                </div>
                <div className="progress-bar-large">
                  <div
                    className="progress-fill-large"
                    style={{ width: `${result.progressPercent}%` }}
                  ></div>
                </div>
                <div className="progress-labels">
                  <span>{formatCurrency(result.current)} saved</span>
                  <span>{formatCurrency(result.target)} goal</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-label">Remaining</div>
                  <div className="stat-value remaining">{formatCurrency(result.remaining)}</div>
                </div>

                <div className="stat-box">
                  <div className="stat-label">Monthly Saving</div>
                  <div className="stat-value">{formatCurrency(result.monthly)}</div>
                </div>

                <div className="stat-box highlight">
                  <div className="stat-label">Estimated Time</div>
                  <div className="stat-value time">
                    {result.monthsNeeded} {result.monthsNeeded === 1 ? 'month' : 'months'}
                  </div>
                </div>
              </div>

              {/* Encouraging Tip */}
              <div className="encouragement">
                <span className="tip-icon">💡</span>
                <p>{getTip(result.progressPercent)}</p>
              </div>
            </div>
          </section>
        )}

        {/* Educational Note */}
        <div className="educational-note">
          <h3>Educational Note</h3>
          <p>
            This calculator gives an <strong>estimate for learning purposes only</strong>. 
            Real savings can grow faster with interest or slower if you miss contributions. 
            The most important habit is to save consistently every month.
          </p>
        </div>

        {/* Bottom Tip */}
        <div className="bottom-tip">
          <strong>Pro Tip:</strong> Automate your savings. Transfer the monthly amount to a separate 
          account as soon as you receive money — treat it like a non-negotiable bill.
        </div>
      </div>
    </div>
  );
}

export default SavingsGoals;