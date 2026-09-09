import { useEffect, useRef, useState } from "react";
import { loadState, saveState } from "../utils/persistence";

/**
 * Drop-in replacement for useState that reads its initial value from
 * localStorage (if present) and writes back on every change, so the value
 * survives a page refresh or the tab being closed and reopened.
 *
 * `key` should be unique per piece of state. `initialValue` is used the
 * first time the app runs, or whenever nothing is stored yet.
 */
export function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => loadState(key, initialValue));
  const first = useRef(true);

  useEffect(() => {
    // Skip the write on first mount — we just read this value, no need to
    // immediately re-write the exact same thing back.
    if (first.current) {
      first.current = false;
      return;
    }
    saveState(key, value);
  }, [key, value]);

  return [value, setValue];
}
