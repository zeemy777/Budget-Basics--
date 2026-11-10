import { useEffect, useState } from 'react';

function storageKeyFor(key, userId) {
  return userId ? `bb_${key}_${userId}` : null;
}

export function readUserState(key, fallback, userId) {
  const storageKey = storageKeyFor(key, userId);
  if (!storageKey) return fallback;

  try {
    const raw = localStorage.getItem(storageKey);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function useUserState(key, initialValue, userId) {
  const storageKey = storageKeyFor(key, userId);

  const [value, setValue] = useState(() => readUserState(key, initialValue, userId));

  useEffect(() => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // Storage can be unavailable (private mode or full quota).
    }
  }, [storageKey, value]);

  return [value, setValue];
}
