import { Link } from 'react-router-dom';
import './CaseStudy.css';

const STATS = [
  { value: '7', label: 'interactive tools', note: 'calculators, planner, quiz, chatbot' },
  { value: '0', label: 'financial data sent to servers', note: 'everything stays in the browser' },
  { value: '1', label: 'Budget Health Score', note: '30 / 30 / 40 scoring model' },
  { value: 'PWA', label: 'installable & offline-ready', note: 'manifest + service worker shell' },
];

const PROBLEMS = [
  {
    icon: '💸',
    title: 'Advice without naira',
    body: 'Most student budgeting content talks in dollars and percentages. It never answers the real question: what does this mean for my ₦120,000?',
  },
  {
    icon: '🧠',
    title: 'Tools that forget you',
    body: 'A calculator tells you a split, then resets. There is no memory of your income, your goal, or the expenses you already tracked.',
  },
  {
    icon: '🔐',
    title: 'Sign-up walls for simple math',
    body: 'Basic planning tools ask for an account and send data to a server before they will show a single useful number.',
  },
];

const PRINCIPLES = [
  {
    icon: '₦',
    title: 'Naira-first by default',
    body: 'Every input, chart and result speaks in naira through a single Intl formatter — no conversion step, no dollar examples.',
  },
  {
    icon: '⚡',
    title: 'One next action',
    body: 'The dashboard does not lecture. It grades the plan and surfaces a single practical move that would raise the score.',
  },
  {
    icon: '🔒',
    title: 'Privacy as architecture',
    body: 'No backend exists. Accounts, expenses and goals are stored in localStorage, and passwords are salted and hashed before storage.',
  },
  {
    icon: '🔥',
    title: 'Momentum through play',
    body: 'Streaks, badges, a Money IQ quiz and one-click demo data turn a one-off calculation into a habit loop.',
  },
];

const FEATURES = [
  {
    image: '/showcase/home.png',
    tag: 'Home',
    title: 'A landing page that teaches while it sells',
    body: 'The homepage opens with a live budget visual, explains the 50-30-20 split in naira, and routes visitors into six focused tools instead of a wall of text.',
    points: ['Naira-formatted hero chart', 'Feature grid with real previews', 'Dashboard and quiz entry points'],
  },
  {
    image: '/showcase/dashboard.png',
    tag: 'Dashboard',
    title: 'A plan that scores itself',
    body: 'Logged-in students split real income with sliders, watch a Budget Health Score animate, and get one next action. Insights, a streak, badges and a what-if slider live on the same page.',
    points: ['30 / 30 / 40 scoring model', 'Donut + six-month trend charts', 'Onboarding wizard on first visit'],
  },
  {
    image: '/showcase/planner.png',
    tag: 'Expense Planner',
    title: 'Expenses that add up to insight',
    body: 'Category-aware expense tracking with delete controls, live remaining balance, and per-account persistence — the numbers feed the dashboard charts automatically.',
    points: ['Seven spending categories', 'Live remaining-balance bar', 'Shared state with the dashboard'],
  },
  {
    image: '/showcase/quiz.png',
    tag: 'Money IQ',
    title: 'Assessment as a feature',
    body: 'Six naira-based questions with instant explanations, an animated score ring and a review list. Best scores persist and unlock a badge on the dashboard.',
    points: ['Instant feedback per answer', 'Animated result ring', 'Copyable shareable result'],
  },
];

const PALETTE = [
  { name: 'Ink', hex: '#04100D', dark: true },
  { name: 'Mint', hex: '#34D399' },
  { name: 'Mint light', hex: '#A7F3D0', dark: true },
  { name: 'Deep mint', hex: '#059669' },
  { name: 'Amber', hex: '#FBBF24', dark: true },
  { name: 'Sky', hex: '#38BDF8', dark: true },
  { name: 'Rose', hex: '#FB7185', dark: true },
  { name: 'Surface', hex: '#F6FAF8' },
];

const LAYERS = [
  {
    step: '01',
    title: 'Presentation',
    body: 'React 19 + React Router 7 with a nested layout route. Every page is a lazy-friendly module; route changes animate through a keyed wrapper.',
  },
  {
    step: '02',
    title: 'State',
    body: 'Context providers for auth and toasts, plus small hooks like useUserState and useCountUp. No global store to untangle.',
  },
  {
    step: '03',
    title: 'Scoring engine',
    body: 'Pure functions score needs (30), wants (30) and savings (40). The same function powers the dashboard ring, the what-if preview and badge checks.',
  },
  {
    step: '04',
    title: 'Persistence',
    body: 'Every account gets namespaced localStorage keys (bb_plan_<id>, bb_expenses_<id>, …). Backups export the same shape as JSON.',
  },
  {
    step: '05',
    title: 'Security & delivery',
    body: 'Passwords use salted SHA-256 via crypto.subtle. A service worker precaches the app shell for installable, offline-first visits.',
  },
];

const DECISIONS = [
  {
    title: 'Client-only auth, stated honestly',
    body: 'Instead of faking a backend, the account system is labelled as a demo everywhere it appears. The tradeoff — no cross-device sync — buys zero data collection and full offline use.',
  },
  {
    title: 'A transparent score beats a clever one',
    body: 'The 30 / 30 / 40 formula is shown in the UI as progress rows. Students can see exactly why the number moved, which makes the advice feel fair.',
  },
  {
    title: 'Demo data as onboarding',
    body: 'A new account can load a realistic month in one click. It teaches the dashboard faster than an empty state ever could, and it is reversible.',
  },
  {
    title: 'CSS custom properties over a UI kit',
    body: 'One token file drives light and dark themes. The result is a small bundle, consistent spacing, and no fighting a component library’s opinions.',
  },
];

const NEXT = [
  'Optional backend sync with end-to-end encryption for multi-device plans',
  'Receipt capture with local OCR to speed up expense logging',
  'Hausa, Yoruba and Nigerian Pidgin copy for wider reach',
  'Classroom mode: teachers create shared budgets and track group progress',
];

function CaseStudy() {
  return (
    <article className="case-page">
      <div className="container">
        <header className="case-hero">
          <div className="case-hero-copy">
            <span className="case-eyebrow">Case study · 2026</span>
            <h1>
              BudgetBasics: money lessons turned into a product students actually use.
            </h1>
            <p>
              A Naira-first learning platform that pairs short guides with calculators, a scored
              personal dashboard, and a money quiz — built entirely in the browser, with no
              data-collecting backend.
            </p>

            <dl className="case-meta">
              <div>
                <dt>Role</dt>
                <dd>Product design, front-end, content</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>React 19 · Vite · plain CSS</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Live demo · PWA</dd>
              </div>
            </dl>

            <div className="case-hero-actions">
              <Link to="/" className="case-btn primary">Open the live site</Link>
              <Link to="/money-iq" className="case-btn ghost">Try the Money IQ test</Link>
            </div>
          </div>

          <div className="case-hero-visual" aria-hidden="true">
            <div className="case-mock-card">
              <div className="case-mock-head">
                <span>Budget health</span>
                <span className="case-mock-pill">Strong</span>
              </div>
              <div className="case-mock-score">
                <strong>86</strong>
                <span>of 100</span>
              </div>
              <div className="case-mock-bars">
                <span style={{ width: '40%' }}></span>
                <span style={{ width: '30%' }}></span>
                <span style={{ width: '16%' }}></span>
              </div>
              <div className="case-mock-next">
                <small>Next best action</small>
                <p>Move 4% of income into savings on payday.</p>
              </div>
            </div>
            <div className="case-mock-chip case-mock-chip-a">₦120,000 / month</div>
            <div className="case-mock-chip case-mock-chip-b">🔒 Stored in this browser</div>
          </div>
        </header>

        <section className="case-stats" aria-label="Project at a glance">
          {STATS.map((stat) => (
            <div className="case-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <small>{stat.note}</small>
            </div>
          ))}
        </section>

        <section className="case-section">
          <div className="case-section-head">
            <span className="case-kicker">01 · The problem</span>
            <h2>Students are told to budget, not shown how it feels with their own money.</h2>
            <p>
              The gap was not information — it was translation. Existing tools spoke in theory,
              forgot the student between visits, and asked for trust before proving value.
            </p>
          </div>
          <div className="case-grid three">
            {PROBLEMS.map((item) => (
              <div className="case-card" key={item.title}>
                <span className="case-card-icon" aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-head">
            <span className="case-kicker">02 · Product principles</span>
            <h2>Four rules shaped every screen.</h2>
          </div>
          <div className="case-grid two">
            {PRINCIPLES.map((item) => (
              <div className="case-card principle" key={item.title}>
                <span className="case-principle-mark" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-head">
            <span className="case-kicker">03 · Feature tour</span>
            <h2>The product, screen by screen.</h2>
          </div>

          <div className="case-features">
            {FEATURES.map((feature, index) => (
              <div
                className={`case-feature ${index % 2 === 1 ? 'reverse' : ''}`}
                key={feature.title}
              >
                <figure className="case-shot">
                  <img src={feature.image} alt={`BudgetBasics ${feature.tag} screen`} loading="lazy" />
                </figure>
                <div className="case-feature-copy">
                  <span className="case-tag">{feature.tag}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                  <ul>
                    {feature.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-head">
            <span className="case-kicker">04 · Design system</span>
            <h2>A small token set with a big point of view.</h2>
            <p>
              Ink and mint carry the brand; amber, sky and rose are reserved for data. Sora sets
              headings, Inter handles UI copy, and CSS custom properties swap the whole palette for
              dark mode.
            </p>
          </div>

          <div className="case-design">
            <div className="case-card">
              <h3>Colour</h3>
              <div className="case-swatches">
                {PALETTE.map((color) => (
                  <div className="case-swatch" key={color.name}>
                    <span
                      className="case-swatch-chip"
                      style={{ background: color.hex }}
                      aria-hidden="true"
                    ></span>
                    <strong>{color.name}</strong>
                    <small>{color.hex}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="case-card">
              <h3>Type & surface</h3>
              <div className="case-type">
                <div>
                  <span className="case-type-sample display">Aa</span>
                  <p><strong>Sora</strong> · display / headings</p>
                </div>
                <div>
                  <span className="case-type-sample body">Aa</span>
                  <p><strong>Inter</strong> · body / controls</p>
                </div>
              </div>
              <div className="case-component-row">
                <span className="case-btn primary sample">Primary</span>
                <span className="case-chip">Chip</span>
                <span className="case-chip accent">₦20,000 saved</span>
              </div>
              <p className="case-design-note">
                Cards use a 24px radius, 1px borders and layered shadows; motion is limited to
                0.2–0.35s and disabled under prefers-reduced-motion.
              </p>
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-head">
            <span className="case-kicker">05 · Under the hood</span>
            <h2>Five layers, no backend.</h2>
          </div>

          <div className="case-layers">
            {LAYERS.map((layer) => (
              <div className="case-layer" key={layer.step}>
                <span className="case-layer-step">{layer.step}</span>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
              </div>
            ))}
          </div>

          <div className="case-flow" aria-label="Data flow">
            <span>Income + expenses</span>
            <span aria-hidden="true">→</span>
            <span>Plan state</span>
            <span aria-hidden="true">→</span>
            <span>Score engine</span>
            <span aria-hidden="true">→</span>
            <span>UI + localStorage</span>
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-head">
            <span className="case-kicker">06 · Decisions & tradeoffs</span>
            <h2>What I chose, and what it cost.</h2>
          </div>
          <div className="case-grid two">
            {DECISIONS.map((item) => (
              <div className="case-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-head">
            <span className="case-kicker">07 · Next</span>
            <h2>Where this would go with more time.</h2>
          </div>
          <ul className="case-next">
            {NEXT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="case-cta">
          <div>
            <h2>Try the product, not just the write-up.</h2>
            <p>
              Create a free demo account, run the setup wizard, and see the dashboard score your
              plan. Everything stays on your device.
            </p>
          </div>
          <div className="case-cta-actions">
            <Link to="/signup" className="case-btn primary">Create a free account</Link>
            <Link to="/sitemap" className="case-btn ghost">Browse every page</Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CaseStudy;
