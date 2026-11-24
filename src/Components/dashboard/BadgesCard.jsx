import './dashboard-extras.css';

function BadgesCard({ badges }) {
  const earned = badges.filter((badge) => badge.earned).length;

  return (
    <article className="dash-card badges-card">
      <div className="dash-card-head">
        <div>
          <span className="dash-card-eyebrow">Milestones</span>
          <h2>Badges</h2>
        </div>
        <span className="badge-count">{earned}/{badges.length}</span>
      </div>

      <div className="badge-grid">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`badge-tile ${badge.earned ? 'earned' : 'locked'}`}
            title={badge.description}
          >
            <span className="badge-icon" aria-hidden="true">{badge.icon}</span>
            <strong>{badge.name}</strong>
            <small>{badge.earned ? 'Earned' : badge.description}</small>
          </div>
        ))}
      </div>
    </article>
  );
}

export default BadgesCard;
