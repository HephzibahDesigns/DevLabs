import { motion, AnimatePresence } from "framer-motion";
import { exId, isExerciseSolved } from "../utils/exerciseState";

// One clickable topic row. Shared between the always-visible desktop
// sidebar and the mobile slide-in drawer so both stay in sync.
function TopicRow({ topic, topicIndex, isActive, exerciseState, onClick }) {
  const doneExerciseCount = topic.exercises.filter((exercise, exerciseIndex) =>
    isExerciseSolved(exercise, exerciseState[exId(topicIndex, exerciseIndex)])
  ).length;
  const progressLabel =
    doneExerciseCount === topic.exercises.length
      ? "done"
      : `${doneExerciseCount}/${topic.exercises.length}`;

  return (
    <motion.div
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
      onClick={onClick}
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
}

// `isOpen`/`onClose` control the mobile drawer only — on larger screens the
// sidebar is always visible and those two props are simply unused.
export default function Sidebar({
  topics,
  current,
  exerciseState,
  onSelect,
  isOpen,
  onClose
}) {
  // Selecting a topic always changes the active one; on mobile it should
  // also close the drawer so the reader lands straight on the content.
  const handleSelect = (topicIndex) => {
    onSelect(topicIndex);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Desktop / tablet: a normal, always-visible column. */}
      <nav className="hidden w-60 flex-none overflow-y-auto border-r border-line bg-panel py-2.5 sm:block">
        {topics.map((topic, topicIndex) => (
          <TopicRow
            key={topic.id}
            topic={topic}
            topicIndex={topicIndex}
            isActive={topicIndex === current}
            exerciseState={exerciseState}
            onClick={() => handleSelect(topicIndex)}
          />
        ))}
      </nav>

      {/* Mobile: an off-canvas drawer, opened from the Topbar's topic
          button. A tap on the dark backdrop closes it without picking a
          topic, same as tapping outside any other overlay. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar-backdrop"
            className="fixed inset-0 z-40 bg-black/50 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="sidebar-drawer"
            className="fixed inset-y-0 left-0 z-50 w-[240px] max-w-[80vw] overflow-y-auto border-r border-line bg-panel py-2.5 sm:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
          >
            {topics.map((topic, topicIndex) => (
              <TopicRow
                key={topic.id}
                topic={topic}
                topicIndex={topicIndex}
                isActive={topicIndex === current}
                exerciseState={exerciseState}
                onClick={() => handleSelect(topicIndex)}
              />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
