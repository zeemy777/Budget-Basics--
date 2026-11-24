import { formatNaira } from '../../utils/currency';
import './charts.css';

function CategoryDonut({ items, total, centerLabel = 'Tracked', size = 176, thickness = 24 }) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const { segments } = items.reduce(
    (acc, item) => {
      const length = item.share * circumference;
      const visible = Math.max(length - 3, 0);
      acc.segments.push(
        <circle
          key={item.category}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={item.color}
          strokeWidth={thickness}
          strokeDasharray={`${visible} ${circumference - visible}`}
          strokeDashoffset={-acc.offset}
        />
      );
      acc.offset += length;
      return acc;
    },
    { segments: [], offset: 0 }
  );

  return (
    <div className="donut-wrap">
      <div className="donut-visual" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={`Spending by category, total ${formatNaira(total)}`}
        >
          <circle
            className="donut-track"
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={thickness}
          />
          <g transform={`rotate(-90 ${center} ${center})`}>{segments}</g>
        </svg>
        <div className="donut-center">
          <small>{centerLabel}</small>
          <strong>{formatNaira(total)}</strong>
        </div>
      </div>

      <ul className="donut-legend">
        {items.map((item) => (
          <li key={item.category}>
            <span className="legend-dot" style={{ background: item.color }} aria-hidden="true"></span>
            <span className="legend-name">{item.category}</span>
            <span className="legend-share">{Math.round(item.share * 100)}%</span>
            <span className="legend-amount">{formatNaira(item.total)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryDonut;
