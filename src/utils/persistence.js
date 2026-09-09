const PREFIX = "tstut:v1:";

// localStorage can throw (private browsing, disabled storage, etc.) so every
// call is wrapped — a failed read/write should never crash the app, it should
// just silently fall back to in-memory state for that session.

export function loadState(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveState(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — progress just won't persist this session
  }
}

export function clearState(key) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // ignore
  }
}
