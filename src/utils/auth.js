const ACCOUNTS_KEY = 'bb_accounts';
const SESSION_KEY = 'bb_session';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode or full quota).
  }
}

function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage failures.
  }
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function makeId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

function makeSalt() {
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  return toHex(bytes.buffer);
}

async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Secure hashing is not available in this browser.');
  }
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return toHex(digest);
}

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function readAccounts() {
  const accounts = readJson(ACCOUNTS_KEY, []);
  return Array.isArray(accounts) ? accounts : [];
}

function toPublicUser(account) {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    createdAt: account.createdAt,
  };
}

function startSession(account) {
  writeJson(SESSION_KEY, { userId: account.id, startedAt: Date.now() });
}

export function getCurrentUser() {
  const session = readJson(SESSION_KEY, null);
  if (!session?.userId) return null;

  const account = readAccounts().find((item) => item.id === session.userId);
  if (!account) {
    removeKey(SESSION_KEY);
    return null;
  }
  return toPublicUser(account);
}

export async function createAccount({ name, email, password }) {
  const cleanName = String(name || '').trim().replace(/\s+/g, ' ');
  const cleanEmail = normalizeEmail(email);

  if (cleanName.length < 2) {
    throw new Error('Please enter your full name (at least 2 characters).');
  }
  if (!EMAIL_PATTERN.test(cleanEmail)) {
    throw new Error('Please enter a valid email address.');
  }
  if (String(password || '').length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  const accounts = readAccounts();
  if (accounts.some((account) => account.email === cleanEmail)) {
    throw new Error('An account with this email already exists. Try logging in.');
  }

  const salt = makeSalt();
  const account = {
    id: makeId(),
    name: cleanName,
    email: cleanEmail,
    salt,
    passwordHash: await hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  };

  writeJson(ACCOUNTS_KEY, [...accounts, account]);
  startSession(account);
  return toPublicUser(account);
}

export async function signIn({ email, password }) {
  const cleanEmail = normalizeEmail(email);
  const account = readAccounts().find((item) => item.email === cleanEmail);

  if (!account) {
    throw new Error('Email or password is incorrect.');
  }

  const candidateHash = await hashPassword(password, account.salt);
  if (candidateHash !== account.passwordHash) {
    throw new Error('Email or password is incorrect.');
  }

  startSession(account);
  return toPublicUser(account);
}

export function endSession() {
  removeKey(SESSION_KEY);
}

export function getInitials(name) {
  return String(name || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}
