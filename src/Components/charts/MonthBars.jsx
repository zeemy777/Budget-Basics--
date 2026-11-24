import { formatNaira } from '../../utils/currency';
import './charts.css';

function MonthBars({ data }) {
  const max = Math.max(...data.map((month) => month.total), 1);
  const summary = data.map((month) => `${month.label} ${formatNaira(month.total)}`).join(', ');

  return (
    <div className="month-bars" role="img" aria-label={`Monthly spending: ${summary}`}>
      {data.map((month) => {
        const height = month.total ? Math.max((month.total / max) * 100, 7) : 3;
        return (
          <div className="month-bar" key={month.key}>
            <span className="month-bar-value">{month.total ? formatNaira(month.total) : '—'}</span>
            <div className="month-bar-track">
              <span
                className={`month-bar-fill ${month.total ? '' : 'empty'}`}
                style={{ height: `${height}%` }}
                title={`${month.label}: ${formatNaira(month.total)}`}
              ></span>
            </div>
            <span className="month-bar-label">{month.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default MonthBars;
