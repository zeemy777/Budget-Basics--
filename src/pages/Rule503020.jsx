import { useState } from 'react';
import './Rule503020.css';

function Rule503020() {
  const [income, setIncome] = useState('');
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    // Validation
    if (!income.trim()) {
      setError('Please enter your monthly income.');
      setResults(null);
      return;
    }

    const value = parseFloat(income);

    if (isNaN(value)) {
      setError('Please enter a valid number.');
      setResults(null);
      return;
    }

    if (value <= 0) {
      setError('Income must be greater than zero.');
      setResults(null);
      return;
    }

    // Clear error and calculate
    setError('');
    const needs = value * 0.5;
    const wants = value * 0.3;
    const savings = value * 0.2;

    setResults({
      income: value,
      needs,
      wants,
      savings,
    });
  };

  const handleReset = () => {
    setIncome('');
    setError('');
    setResults(null);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="rule-503020">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>50-30-20 Budget Rule</h1>
          <p className="subtitle">
            A simple and popular guideline to divide your monthly income into Needs, Wants, and Savings.
          </p>
        </div>

        {/* Explanation Cards */}
        <section className="explanation-section">
          <div className="rule-cards">
            <div className="rule-card needs">
              <div className="percentage">50%</div>
              <h3>Needs</h3>
              <p>Essential expenses you must pay to live and study.</p>
              <ul>
                <li>Rent / Hostel</li>
                <li>Food</li>
                <li>Transport</li>
                <li>Utilities</li>
                <li>Study materials</li>
              </ul>
            </div>

            <div className="rule-card wants">
              <div className="percentage">30%</div>
              <h3>Wants</h3>
              <p>Things that improve your lifestyle but are optional.</p>
              <ul>
                <li>Entertainment</li>
                <li>Eating out</li>
                <li>Subscriptions</li>
                <li>Shopping</li>
                <li>Hobbies</li>
              </ul>
            </div>

            <div className="rule-card savings">
              <div className="percentage">20%</div>
              <h3>Savings</h3>
              <p>Money set aside for future goals and emergencies.</p>
              <ul>
                <li>Emergency fund</li>
                <li>Future goals</li>
                <li>Investments</li>
                <li>Debt repayment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="calculator-section">
          <h2>50-30-20 Calculator</h2>
          <p className="section-desc">
            Enter your monthly income to see how much you could allocate to each category.
          </p>

          <form className="calculator-form" onSubmit={handleCalculate}>
            <div className="input-group">
              <label htmlFor="income">Monthly Income (₹)</label>
              <input
                type="number"
                id="income"
                placeholder="e.g. 12000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                min="0"
                step="100"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                Calculate
              </button>
              <button type="button" className="secondary-btn" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>

          {/* Results */}
          {results && (
            <div className="results-box">
              <h3>Your Suggested Budget</h3>
              <p className="income-display">
                Based on monthly income of <strong>{formatCurrency(results.income)}</strong>
              </p>

              <div className="results-grid">
                <div className="result-card needs-result">
                  <div className="result-label">Needs (50%)</div>
                  <div className="result-amount">{formatCurrency(results.needs)}</div>
                  <div className="progress-bar">
                    <div className="progress-fill needs-fill" style={{ width: '50%' }}></div>
                  </div>
                </div>

                <div className="result-card wants-result">
                  <div className="result-label">Wants (30%)</div>
                  <div className="result-amount">{formatCurrency(results.wants)}</div>
                  <div className="progress-bar">
                    <div className="progress-fill wants-fill" style={{ width: '30%' }}></div>
                  </div>
                </div>

                <div className="result-card savings-result">
                  <div className="result-label">Savings (20%)</div>
                  <div className="result-amount">{formatCurrency(results.savings)}</div>
                  <div className="progress-bar">
                    <div className="progress-fill savings-fill" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>

              {/* Visual Bar */}
              <div className="visual-bar-container">
                <div className="visual-bar">
                  <div className="bar-segment needs-seg" style={{ width: '50%' }}>
                    50% Needs
                  </div>
                  <div className="bar-segment wants-seg" style={{ width: '30%' }}>
                    30% Wants
                  </div>
                  <div className="bar-segment savings-seg" style={{ width: '20%' }}>
                    20% Savings
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Educational Note */}
        <div className="educational-note">
          <h3>Important Educational Note</h3>
          <p>
            The 50-30-20 rule is only a <strong>guideline for learning purposes</strong>. 
            It is not a strict rule. Your actual situation may require different percentages 
            depending on your city, rent, family support, or goals.
          </p>
          <p>
            Use this calculator to understand the idea — then adjust the numbers to fit your real life.
          </p>
        </div>

        {/* Bottom Tip */}
        <div className="bottom-tip">
          <strong>Pro Tip:</strong> If your Needs are higher than 50% (common for students in big cities), 
          reduce Wants first and still try to save at least 10–15%.
        </div>
      </div>
    </div>
  );
}

export default Rule503020;