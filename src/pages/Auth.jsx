import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import './Auth.css';

function Auth({ mode }) {
  const isSignup = mode === 'signup';
  const { user, login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/dashboard';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (isSignup && confirmPassword !== password) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      if (isSignup) {
        await signup({ name, email, password });
      } else {
        await login({ email, password });
      }
      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      setError(submitError.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-shell">
        <section className="auth-card">
          <aside className="auth-aside">
            <div className="auth-aside-glow" aria-hidden="true"></div>

            <Link to="/" className="auth-brand">
              <span className="auth-brand-mark" aria-hidden="true">₦</span>
              <span>BudgetBasics</span>
            </Link>

            <h2>
              Know exactly where
              <span className="auth-gradient"> every naira goes.</span>
            </h2>
            <p className="auth-aside-sub">
              Your own money workspace — a budget score, saved expenses, and goal tracking
              in one calm place.
            </p>

            <ul className="auth-benefits">
              <li>
                <span aria-hidden="true">📊</span>
                A Budget Health Score that grades your income split
              </li>
              <li>
                <span aria-hidden="true">💾</span>
                Your plan, expenses and goals stay saved in this browser
              </li>
              <li>
                <span aria-hidden="true">🔒</span>
                No server, no bank connection, no data sent anywhere
              </li>
            </ul>

            <div className="auth-preview">
              <div className="auth-preview-score">
                <svg viewBox="0 0 120 120" role="img" aria-label="Example budget score of 82 out of 100">
                  <circle className="auth-ring-track" cx="60" cy="60" r="50" />
                  <circle
                    className="auth-ring-value"
                    cx="60"
                    cy="60"
                    r="50"
                    strokeDasharray="314"
                    strokeDashoffset="56"
                  />
                </svg>
                <div className="auth-preview-number">
                  <strong>82</strong>
                  <span>Strong</span>
                </div>
              </div>
              <div className="auth-preview-copy">
                <small>Example member dashboard</small>
                <strong>Ada’s monthly plan</strong>
                <p>₦120,000 income · ₦24,000 saved</p>
                <div className="auth-preview-bars" aria-hidden="true">
                  <span className="bar-needs"></span>
                  <span className="bar-wants"></span>
                  <span className="bar-savings"></span>
                </div>
              </div>
            </div>
          </aside>

          <div className="auth-panel">
            <span className="auth-eyebrow">{isSignup ? 'Free account' : 'Welcome back'}</span>
            <h1>{isSignup ? 'Create your money workspace' : 'Log in to your dashboard'}</h1>
            <p className="auth-lead">
              {isSignup
                ? 'Two minutes to set up. No card, no fees, no bank details.'
                : 'Pick up where you left off — your plan is saved on this device.'}
            </p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {isSignup && (
                <div className="auth-field">
                  <label htmlFor="auth-name">Full name</label>
                  <input
                    id="auth-name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Ada Okafor"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email">Email address</label>
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="auth-password">Password</label>
                <div className="auth-input-wrap">
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isSignup ? 'new-password' : 'current-password'}
                    placeholder={isSignup ? 'At least 6 characters' : 'Your password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="auth-reveal"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {isSignup && (
                <div className="auth-field">
                  <label htmlFor="auth-confirm">Confirm password</label>
                  <input
                    id="auth-confirm"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                  />
                </div>
              )}

              {error && (
                <p className="auth-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="auth-submit" disabled={submitting}>
                {submitting
                  ? 'Please wait…'
                  : isSignup
                    ? 'Create free account'
                    : 'Log in'}
                <span aria-hidden="true">{submitting ? '' : '→'}</span>
              </button>
            </form>

            <p className="auth-switch">
              {isSignup ? 'Already have an account?' : 'New to BudgetBasics?'}{' '}
              <Link to={isSignup ? '/login' : '/signup'} state={location.state}>
                {isSignup ? 'Log in' : 'Create one free'}
              </Link>
            </p>

            <div className="auth-demo-note">
              <strong>Demo accounts.</strong> This project has no server. Your account lives only in
              this browser and your password is salted and hashed before it is stored.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Auth;
