import { motion } from "framer-motion";

export default function Topbar({
  courseTitle,
  doneCount,
  totalExercises,
  progressPct,
  onReset,
  onBack
}) {
  return (
    <header className="flex h-14 flex-none items-center justify-between border-b border-line bg-panel px-5">
      <div className="flex items-center gap-2.5 font-mono text-sm">
        <button
          className="flex items-center gap-1.5 font-mono text-xs text-muted2 hover:text-ink"
          onClick={onBack}
          title="All courses"
        >
          &larr; Courses
        </button>
        <span className="text-good">/</span>

        <span className="font-semibold tracking-tight text-ink">
          {courseTitle}
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="whitespace-nowrap font-mono text-xs text-muted">
          {doneCount} / {totalExercises} exercises
        </span>
        <div className="h-1.5 w-[140px] overflow-hidden rounded-full border border-line bg-panel2">
          {/* animate (rather than a plain style width) so the fill glides
              to its new width instead of jumping there instantly. */}
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-good"
            animate={{ width: progressPct + "%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <button
          className="font-mono text-[11px] text-muted2 underline decoration-1 underline-offset-2 hover:text-muted"
          onClick={onReset}
          title="Clear saved progress"
        >
          Reset progress
        </button>
      </div>
    </header>
  );
}
