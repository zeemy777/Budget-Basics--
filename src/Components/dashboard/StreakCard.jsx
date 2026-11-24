import { buildWeek, currentStreak } from '../../utils/streak';
import { formatNaira } from '../../utils/currency';
import './dashboard-extras.css';

function StreakCard({ dates, best, onCheckIn }) {
  const streak = currentStreak(dates);
  const week = buildWeek(dates);
  const todayChecked = week[week.length - 1]?.checked;
  const bestValue = Math.max(Number(best) || 0, streak);

  return (
    <article className="dash-card streak-card">
      <div className="dash-card-head">
        <div>
          <span className="dash-card-eyebrow">Saving streak</span>
          <h2>Small habit, real money</h2>
        </div>
        <span className="streak-best">Best {bestValue} {bestValue === 1 ? 'day' : 'days'}</span>
      </div>

      <div className="streak-main">
        <span className="streak-flame" aria-hidden="true">🔥</span>
        <div>
          <strong>{streak}</strong>
          <span>{streak === 1 ? 'day in a row' : 'days in a row'}</span>
        </div>
      </div>

      <div className="streak-week" aria-label="Last seven days">
        {week.map((day) => (
          <span
            key={day.key}
            className={`streak-day ${day.checked ? 'checked' : ''} ${day.today ? 'today' : ''}`}
            title={`${day.key}${day.checked ? ' — saved' : ''}`}
          >
            <small>{day.label}</small>
            <i aria-hidden="true">{day.checked ? '✓' : day.day}</i>
          </span>
        ))}
      </div>

      <button
        type="button"
        className="streak-btn"
        onClick={onCheckIn}
        disabled={todayChecked}
      >
        {todayChecked ? 'Checked in today ✓' : 'Log today’s saving'}
      </button>
      <p className="streak-hint">
        Put aside anything — even {formatNaira(500)} counts.
      </p>
    </article>
  );
}

export default StreakCard;
