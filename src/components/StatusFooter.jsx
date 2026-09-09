import { motion } from "framer-motion";

export default function StatusFooter({ allDone }) {
  return (
    <footer className="flex flex-none justify-between border-t border-line bg-panel px-5 py-2 font-mono text-[11.5px] text-muted2">
      {/* Gently pulses while still "compiling", to hint that it's a live
          status rather than static text. Stops pulsing once everything is done. */}
      <motion.span
        animate={allDone ? { opacity: 1 } : { opacity: [1, 0.5, 1] }}
        transition={allDone ? { duration: 0 } : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {allDone ? "all checks passed" : "compiling…"}
      </motion.span>
      <span>tsc --strict</span>
    </footer>
  );
}
