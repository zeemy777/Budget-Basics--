import { useRef, useState } from 'react';
import ConfirmDialog from '../ConfirmDialog';
import { useToast } from '../../context/toast-context';
import './dashboard-extras.css';

function DataToolsCard({ onExport, onImport, onDemo, onReset, onRunSetup }) {
  const fileRef = useRef(null);
  const [pending, setPending] = useState(null);
  const { notify } = useToast();

  const closeConfirm = () => setPending(null);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    try {
      const parsed = JSON.parse(await file.text());
      if (parsed?.app !== 'BudgetBasics' || !parsed.data || typeof parsed.data !== 'object') {
        throw new Error('invalid');
      }
      setPending({
        title: 'Restore this backup?',
        message: `This replaces your current plan, expenses, goal and streak with the data in ${file.name}.`,
        confirmLabel: 'Restore backup',
        tone: 'default',
        action: () => onImport(parsed.data),
      });
    } catch {
      notify('That file is not a valid BudgetBasics backup.', 'warning');
    }
  };

  const runConfirmed = () => {
    const action = pending?.action;
    closeConfirm();
    action?.();
  };

  return (
    <article className="dash-card data-card">
      <div className="dash-card-head">
        <div>
          <span className="dash-card-eyebrow">Your data</span>
          <h2>Backup & explore</h2>
        </div>
        <span className="autosave-pill">
          <span className="autosave-dot" aria-hidden="true"></span>
          Local only
        </span>
      </div>

      <div className="data-actions">
        <div className="data-action">
          <span className="data-icon" aria-hidden="true">📦</span>
          <div>
            <strong>Export a backup</strong>
            <small>Download this account’s plan, expenses, goal, streak and badges as JSON.</small>
          </div>
          <button type="button" className="data-btn" onClick={onExport}>
            Export
          </button>
        </div>

        <div className="data-action">
          <span className="data-icon" aria-hidden="true">📥</span>
          <div>
            <strong>Restore a backup</strong>
            <small>Bring back a JSON backup into this account on this browser.</small>
          </div>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={handleFile} />
          <button type="button" className="data-btn" onClick={() => fileRef.current?.click()}>
            Import
          </button>
        </div>

        <div className="data-action">
          <span className="data-icon" aria-hidden="true">✨</span>
          <div>
            <strong>Load demo data</strong>
            <small>See a realistic student month with 10 expenses and a laptop goal.</small>
          </div>
          <button
            type="button"
            className="data-btn"
            onClick={() =>
              setPending({
                title: 'Load demo data?',
                message:
                  'This replaces what is currently saved in this account with a sample plan, expenses, streak and savings goal.',
                confirmLabel: 'Load demo',
                tone: 'default',
                action: onDemo,
              })
            }
          >
            Load demo
          </button>
        </div>

        <div className="data-action">
          <span className="data-icon" aria-hidden="true">🧹</span>
          <div>
            <strong>Start over</strong>
            <small>Clear this account’s plan, expenses, goal, streak and badges.</small>
          </div>
          <button
            type="button"
            className="data-btn danger"
            onClick={() =>
              setPending({
                title: 'Clear this account’s data?',
                message:
                  'Your plan resets to 50 · 30 · 20 and all expenses, goal progress, streak and badges are removed from this browser. Your login stays.',
                confirmLabel: 'Reset data',
                tone: 'danger',
                action: onReset,
              })
            }
          >
            Reset
          </button>
        </div>
      </div>

      <button type="button" className="data-setup-link" onClick={onRunSetup}>
        Run the setup wizard again →
      </button>

      <p className="data-note">
        🔒 Backups are downloaded locally. Nothing here is uploaded, and files only contain demo
        data from this browser.
      </p>

      <ConfirmDialog
        open={Boolean(pending)}
        title={pending?.title || ''}
        message={pending?.message || ''}
        confirmLabel={pending?.confirmLabel}
        tone={pending?.tone}
        onConfirm={runConfirmed}
        onCancel={closeConfirm}
      />
    </article>
  );
}

export default DataToolsCard;
