import { motion } from "framer-motion";
import { exId, isExerciseSolved } from "../utils/exerciseState";

export default function Sidebar({ topics, current, exerciseState, onSelect }) {
  return (
    <nav className="w-[180px] flex-none overflow-y-auto border-r border-line bg-panel py-2.5 sm:w-60">
      {topics.map((topic, topicIndex) => {
        const doneExerciseCount = topic.exercises.filter((exercise, exerciseIndex) =>
          isExerciseSolved(exercise, exerciseState[exId(topicIndex, exerciseIndex)])
        ).length;
        const progressLabel =
          doneExerciseCount === topic.exercises.length
            ? "done"
            : `${doneExerciseCount}/${topic.exercises.length}`;
        const isActive = topicIndex === current;
        return (
          <motion.div
            key={topic.id}
            // Slide the row's left accent bar into view whenever it becomes
            // the active topic, instead of it just snapping into place.
            animate={{ x: isActive ? 2 : 0 }}
            transition={{ duration: 0.15 }}
            whileHover={{ x: 2 }}
            className={
              "flex cursor-pointer select-none items-center gap-2.5 border-l-2 px-4 py-[9px] text-[13.5px] " +
              (isActive
                ? "border-l-accent bg-panel2 text-ink"
                : "border-l-transparent text-muted hover:bg-panel2 hover:text-ink")
            }
            onClick={() => onSelect(topicIndex)}
          >
            <span
              className={
                "w-5 flex-none font-mono text-[11px] " +
                (isActive ? "text-accent" : "text-muted2")
              }
            >
              {String(topicIndex + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {topic.title}
            </span>
            <span className="w-[26px] flex-none text-right font-mono text-[11px] text-good">
              {progressLabel}
            </span>
          </motion.div>
        );
      })}
    </nav>
  );
}
