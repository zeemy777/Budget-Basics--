import { useState } from 'react';
import { formatNaira } from '../../utils/currency';
import './dashboard-extras.css';

const STYLES = [
  { id: 'balanced', label: 'Balanced', needs: 50, wants: 30, note: 'Classic 50 · 30 · 20' },
  { id: 'essentials', label: 'Essentials first', needs: 60, wants: 20, note: 'Steady 60 · 20 · 20' },
  { id: 'saver', label: 'Super saver', needs: 70, wants: 20, note: 'Bold 70 · 20 · 10' },
];

function OnboardingWizard({ defaultIncome, onFinish, onSkip, onDemo }) {
  const [step, setStep] = useState(0);
  const [income, setIncome] = useState(String(Math.max(Number(defaultIncome) || 0, 0) || 120000));
  const [styleId, setStyleId] = useState('balanced');
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalMonthly, setGoalMonthly] = useState('');

  const style = STYLES.find((item) => item.id === styleId) || STYLES[0];
  const incomeValue = Math.max(0, Number(income) || 0);
  const styleSavings = 100 - style.needs - style.wants;

  const finish = () => {
    const target = Math.max(0, Number(goalTarget) || 0);
    const monthly = Math.max(0, Number(goalMonthly) || 0);
    let goal = null;

    if (goalName.trim() && target > 0 && monthly > 0) {
      goal = {
        goalName: goalName.trim(),
        target,
        current: 0,
        monthly,
        remaining: target,
        monthsNeeded: Math.ceil(target / monthly),
        progressPercent: 0,
      };
    }

    onFinish({
      income: incomeValue,
      needs: style.needs,
      wants: style.wants,
      style: style.note,
      goal,
    });
  };

  return (
    <div className="onboarding-backdrop">
      <div className="onboarding-card" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
        <div className="onboarding-top">
          <div className="onboarding-steps" aria-label={`Step ${step + 1} of 3`}>
            {[0, 1, 2].map((index) => (
              <span key={index} className={`onboarding-step ${index <= step ? 'done' : ''}`}></span>
            ))}
          </div>
          <button type="button" className="onboarding-skip" onClick={onSkip}>
            Skip setup
          </button>
        </div>

        {step === 0 && (
          <div className="onboarding-body">
            <span className="onboarding-eyebrow">Welcome to your dashboard</span>
            <h2 id="onboarding-title">Let’s start with your income</h2>
            <p>Use your allowance, stipend, or part-time earnings. Everything stays in this browser.</p>

            <label className="onboarding-field" htmlFor="onboarding-income">
              <span>Monthly income</span>
              <div className="onboarding-money">
                <span aria-hidden="true">₦</span>
                <input
                  id="onboarding-income"
                  type="number"
                  min="0"
                  step="1000"
                  value={income}
                  onChange={(event) => setIncome(event.target.value)}
                  autoFocus
                />
              </div>
            </label>

            <div className="onboarding-tip">
              <span aria-hidden="true">💡</span>
              <p>No fixed income yet? Start with {formatNaira(120000)} as a practice number — you can change it anytime.</p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="onboarding-body">
            <span className="onboarding-eyebrow">Choose a starting split</span>
            <h2 id="onboarding-title">What fits your life right now?</h2>
            <p>You can fine-tune every percentage later. Pick the closest match.</p>

            <div className="onboarding-styles">
              {STYLES.map((item) => {
                const savings = 100 - item.needs - item.wants;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`onboarding-style ${styleId === item.id ? 'active' : ''}`}
                    onClick={() => setStyleId(item.id)}
                  >
                    <strong>{item.label}</strong>
                    <small>{item.note}</small>
                    <span className="style-bar" aria-hidden="true">
                      <i style={{ width: `${item.needs}%` }} className="needs"></i>
                      <i style={{ width: `${item.wants}%` }} className="wants"></i>
                      <i style={{ width: `${savings}%` }} className="savings"></i>
                    </span>
                    <em>
                      {formatNaira((incomeValue * item.needs) / 100)} needs ·{' '}
                      {formatNaira((incomeValue * savings) / 100)} saved
                    </em>
                  </button>
                );
              })}
            </div>

            <p className="onboarding-note">
              This split saves {formatNaira((incomeValue * styleSavings) / 100)} every month.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-body">
            <span className="onboarding-eyebrow">Optional: name a goal</span>
            <h2 id="onboarding-title">What are you saving toward?</h2>
            <p>Give your savings a job — a laptop, a trip, or an emergency fund.</p>

            <div className="onboarding-goal-grid">
              <label className="onboarding-field" htmlFor="onboarding-goal-name">
                <span>Goal name</span>
                <input
                  id="onboarding-goal-name"
                  type="text"
                  placeholder="e.g. New laptop"
                  value={goalName}
                  onChange={(event) => setGoalName(event.target.value)}
                />
              </label>
              <label className="onboarding-field" htmlFor="onboarding-goal-target">
                <span>Target (₦)</span>
                <input
                  id="onboarding-goal-target"
                  type="number"
                  min="0"
                  placeholder="250000"
                  value={goalTarget}
                  onChange={(event) => setGoalTarget(event.target.value)}
                />
              </label>
              <label className="onboarding-field" htmlFor="onboarding-goal-monthly">
                <span>Monthly saving (₦)</span>
                <input
                  id="onboarding-goal-monthly"
                  type="number"
                  min="0"
                  placeholder="15000"
                  value={goalMonthly}
                  onChange={(event) => setGoalMonthly(event.target.value)}
                />
              </label>
            </div>

            <p className="onboarding-note">Not ready? Skip this step — your plan still works without a goal.</p>
          </div>
        )}

        <div className="onboarding-actions">
          <button type="button" className="onboarding-demo" onClick={onDemo}>
            Explore with demo data
          </button>
          <div className="onboarding-nav">
            {step > 0 && (
              <button type="button" className="onboarding-back" onClick={() => setStep((current) => current - 1)}>
                Back
              </button>
            )}
            {step < 2 ? (
              <button type="button" className="onboarding-next" onClick={() => setStep((current) => current + 1)}>
                Continue
              </button>
            ) : (
              <button type="button" className="onboarding-next" onClick={finish}>
                Finish setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingWizard;
