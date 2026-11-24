import { useState } from 'react';
import { calculateHealthScore } from '../../utils/budgetScore';
import { formatNaira } from '../../utils/currency';
import './dashboard-extras.css';

function WhatsIfCard({ income, needs, wants, savings, score }) {
  const [shift, setShift] = useState(0);
  const maxShift = Math.max(0, Math.min(20, wants));
  const nextWants = wants - shift;
  const nextSavings = savings + shift;
  const nextScore = calculateHealthScore({ needs, wants: nextWants, savings: nextSavings });
  const extraMonthly = (income * shift) / 100;
  const delta = nextScore - score;

  return (
    <article className="dash-card whatif-card">
      <div className="dash-card-head">
        <div>
          <span className="dash-card-eyebrow">What if…</span>
          <h2>Move a little to savings</h2>
        </div>
        <span className="whatif-score">
          {score} <span aria-hidden="true">→</span> <strong>{nextScore}</strong>
        </span>
      </div>

      <p className="whatif-copy">
        Shift part of your wants into savings and preview the score and yearly impact before you
        commit to it.
      </p>

      <div className="whatif-slider-row">
        <input
          className="whatif-slider"
          type="range"
          min="0"
          max={maxShift}
          step="1"
          value={Math.min(shift, maxShift)}
          onChange={(event) => setShift(Number(event.target.value))}
          aria-label="Percentage of income to move from wants to savings"
          disabled={maxShift === 0}
        />
        <span className="whatif-shift">{Math.min(shift, maxShift)}%</span>
      </div>

      <div className="whatif-results">
        <div>
          <small>Extra every month</small>
          <strong>{formatNaira(extraMonthly)}</strong>
        </div>
        <div>
          <small>Extra in a year</small>
          <strong>{formatNaira(extraMonthly * 12)}</strong>
        </div>
        <div>
          <small>Score change</small>
          <strong className={delta > 0 ? 'positive' : delta < 0 ? 'negative' : ''}>
            {delta > 0 ? `+${delta}` : delta}
          </strong>
        </div>
      </div>

      <p className="whatif-note">
        {maxShift === 0
          ? 'Your wants are already at zero in this plan — nothing to shift.'
          : shift === 0
            ? 'Slide to see what happens. Nothing changes until you edit your plan.'
            : `This is a preview only. To keep it, set wants to ${nextWants}% in your monthly plan.`}
      </p>
    </article>
  );
}

export default WhatsIfCard;
