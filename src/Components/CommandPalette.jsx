import { useCallback, useEffect, useMemo, useRef, useState, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { toggleTheme } from '../utils/theme';
import './CommandPalette.css';

const PAGES = [
  { label: 'Home', path: '/', hint: 'Overview and tools', keywords: 'start landing' },
  { label: 'Dashboard', path: '/dashboard', hint: 'Your money workspace', keywords: 'plan score account private' },
  { label: 'Budgeting Basics', path: '/budgeting-basics', hint: 'Core money concepts', keywords: 'learn guide income' },
  { label: 'Needs vs Wants', path: '/needs-vs-wants', hint: 'Classifier quiz', keywords: 'quiz classify' },
  { label: '50-30-20 Rule', path: '/50-30-20', hint: 'Split calculator', keywords: 'budget rule calculator' },
  { label: 'Savings Goals', path: '/savings-goals', hint: 'Goal planner', keywords: 'target save laptop' },
  { label: 'Expense Planner', path: '/expense-planner', hint: 'Track spending', keywords: 'log expenses tracker' },
  { label: 'Money Mistakes', path: '/money-mistakes', hint: 'Common traps', keywords: 'errors habits' },
  { label: 'Infographics', path: '/infographics', hint: 'Visual gallery', keywords: 'visual gallery charts' },
  { label: 'AI Chatbot', path: '/chatbot', hint: 'Ask money questions', keywords: 'assistant help ask' },
  { label: 'Money IQ Quiz', path: '/money-iq', hint: 'Test your skills', keywords: 'quiz test score iq' },
  { label: 'Project Case Study', path: '/case-study', hint: 'How it was built', keywords: 'portfolio about project' },
  { label: 'About', path: '/about', hint: 'Why it exists', keywords: 'mission story' },
  { label: 'Sitemap', path: '/sitemap', hint: 'Every page', keywords: 'index all pages' },
  { label: 'Feedback', path: '/feedback', hint: 'Share thoughts', keywords: 'review form' },
  { label: 'Contact', path: '/contact', hint: 'Reach the project', keywords: 'email phone' },
  { label: 'Log in', path: '/login', hint: 'Account access', keywords: 'signin account' },
  { label: 'Create account', path: '/signup', hint: 'Free and local', keywords: 'signup register join' },
];

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery('');
    setActive(0);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (open) close();
        else openPalette();
      }
    };
    const handleOpen = () => openPalette();
    window.addEventListener('keydown', handleKey);
    window.addEventListener('bb:open-command', handleOpen);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('bb:open-command', handleOpen);
    };
  }, [open, close, openPalette]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const items = useMemo(() => {
    const term = query.trim().toLowerCase();
    const pages = PAGES.filter((page) =>
      !term || `${page.label} ${page.hint} ${page.keywords}`.toLowerCase().includes(term)
    ).map((page) => ({
      id: `page-${page.path}`,
      label: page.label,
      hint: page.hint,
      type: 'page',
      run: () => {
        navigate(page.path);
        close();
      },
    }));

    const actions = [
      {
        id: 'theme',
        label: 'Toggle light / dark mode',
        hint: 'Appearance',
        type: 'action',
        run: () => {
          toggleTheme();
          close();
        },
      },
      user
        ? {
            id: 'logout',
            label: 'Log out',
            hint: 'Account',
            type: 'action',
            run: () => {
              close();
              startTransition(() => {
                logout();
                navigate('/');
              });
            },
          }
        : {
            id: 'login',
            label: 'Log in',
            hint: 'Account',
            type: 'action',
            run: () => {
              navigate('/login');
              close();
            },
          },
    ].filter((action) => !term || action.label.toLowerCase().includes(term));

    return [...pages, ...actions];
  }, [query, user, navigate, close, logout]);

  const activeIndex = items.length ? Math.min(active, items.length - 1) : 0;

  useEffect(() => {
    if (!open) return;
    const node = document.querySelector('.command-item.active');
    node?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  const handleInputKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(Math.min(activeIndex + 1, Math.max(0, items.length - 1)));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(Math.max(0, activeIndex - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      items[activeIndex]?.run();
    } else if (event.key === 'Escape') {
      close();
    }
  };

  if (!open) return null;

  return (
    <div className="command-backdrop" onClick={close}>
      <div
        className="command-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Search pages and actions"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="command-search">
          <span className="command-search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.6-3.6" />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            placeholder="Search pages and actions…"
            aria-label="Search pages and actions"
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={handleInputKeyDown}
          />
          <kbd>Esc</kbd>
        </div>

        <div className="command-list" role="listbox" aria-label="Results">
          {items.length === 0 && (
            <p className="command-empty">No matches. Try “savings”, “quiz”, or “theme”.</p>
          )}
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              className={`command-item ${index === activeIndex ? 'active' : ''}`}
              onMouseEnter={() => setActive(index)}
              onClick={item.run}
            >
              <span className="command-item-mark" aria-hidden="true">
                {item.type === 'action' ? '⚡' : '↗'}
              </span>
              <span className="command-item-text">
                <strong>{item.label}</strong>
                <small>{item.hint}</small>
              </span>
              <span className={`command-type ${item.type}`}>{item.type === 'action' ? 'Action' : 'Page'}</span>
            </button>
          ))}
        </div>

        <div className="command-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
