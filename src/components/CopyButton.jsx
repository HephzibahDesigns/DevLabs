import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// A small "copy to clipboard" button, meant to sit in the corner of a
// code block. Swaps its icon to a checkmark for a moment after a
// successful copy, then reverts back to the copy icon on its own.
export default function CopyButton({ text, className = "" }) {
  const [justCopied, setJustCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // The Clipboard API can fail (insecure context, permission denied,
      // unsupported browser) — there's nothing useful to recover into,
      // so just skip the "copied" confirmation and leave the button as-is.
      return;
    }
    setJustCopied(true);
    // Revert back to the plain copy icon after a short pause.
    setTimeout(() => setJustCopied(false), 1500);
  };

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileTap={{ scale: 0.9 }}
      className={
        "flex items-center justify-center rounded-md border border-lineSoft bg-panel2 p-1.5 text-muted2 hover:text-ink " +
        className
      }
      aria-label={justCopied ? "Copied" : "Copy code"}
      title={justCopied ? "Copied!" : "Copy"}
    >
      {/* AnimatePresence crossfades between the two icons instead of
          swapping them instantly. */}
      <AnimatePresence mode="wait" initial={false}>
        {justCopied ? (
          <motion.svg
            key="check"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-good"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        ) : (
          <motion.svg
            key="copy"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
