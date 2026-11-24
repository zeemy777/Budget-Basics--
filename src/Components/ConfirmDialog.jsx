import { useEffect } from 'react';
import './ConfirmDialog.css';

function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', tone = 'default', onConfirm, onCancel }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="confirm-backdrop" onClick={onCancel}>
      <div
        className={`confirm-card tone-${tone}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <span className="confirm-badge" aria-hidden="true">{tone === 'danger' ? '⚠' : '✓'}</span>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="confirm-actions">
          <button type="button" className="confirm-cancel" onClick={onCancel} autoFocus>
            Cancel
          </button>
          <button type="button" className={`confirm-apply ${tone === 'danger' ? 'danger' : ''}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
