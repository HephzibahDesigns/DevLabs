import { motion } from "framer-motion";

export default function Topbar({
  courseTitle,
  doneCount,
  totalExercises,
  progressPct,
  onReset,
  onBack,
  onToggleSidebar
}) {
  return (
    // Two stacked rows on mobile (title row, then progress row); a single
    // row on sm+ screens, matching the original desktop layout exactly.
    <header className="flex flex-col gap-2.5 border-b border-line bg-panel px-4 py-3 sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-5 sm:py-0">
      <div className="flex items-center gap-2.5 font-mono text-sm">
        {/* Opens the topic drawer — only rendered/usable below the sm
            breakpoint, since the sidebar is always visible above it. */}
        <button
          className="flex flex-none items-center justify-center rounded-md border border-line px-2 py-1 text-[13px] text-muted2 hover:text-ink sm:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle topic list"
        >
          ☰
        </button>
        <button
          className="flex items-center gap-1.5 font-mono text-xs text-muted2 hover:text-ink"
          onClick={onBack}
          title="All courses"
        >
          &larr; Courses
        </button>
        <span className="text-good">/</span>

        <span className="truncate font-semibold tracking-tight text-ink">
          {courseTitle}
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="whitespace-nowrap font-mono text-xs text-muted">
          {doneCount} / {totalExercises} exercises
        </span>
        <div className="h-1.5 w-full max-w-[140px] flex-1 overflow-hidden rounded-full border border-line bg-panel2 sm:w-[140px] sm:flex-none">
          {/* animate (rather than a plain style width) so the fill glides
              to its new width instead of jumping there instantly. */}
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-good"
            animate={{ width: progressPct + "%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <button
          className="flex-none whitespace-nowrap font-mono text-[11px] text-muted2 underline decoration-1 underline-offset-2 hover:text-muted"
          onClick={onReset}
          title="Clear saved progress"
        >
          Reset progress
        </button>
      </div>
    </header>
  );
}
