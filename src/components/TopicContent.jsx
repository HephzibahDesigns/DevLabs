import { motion, AnimatePresence } from "framer-motion";
import ContentBlock from "./ContentBlock";
import ExerciseList from "./ExerciseList";

export default function TopicContent({
  topics,
  current,
  topic,
  exerciseState,
  onExerciseChange,
  onGoTo
}) {
  return (
    <main className="max-w-[820px] flex-1 overflow-y-auto px-5 pb-[70px] pt-6 sm:px-11 sm:pt-9">
      {/* AnimatePresence + the `key={current}` below makes the whole topic
          fade/slide out and the new one fade/slide in whenever the user
          moves to a different topic (via sidebar or prev/next buttons). */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="mb-[26px]">
            <div className="mb-1.5 font-mono text-xs text-accent">
              {String(current + 1).padStart(2, "0")} / {String(topics.length).padStart(2, "0")}
            </div>
            <h1 className="mb-2 text-2xl font-semibold tracking-tight sm:text-[26px]">
              {topic.title}
            </h1>
            <p className="max-w-[70ch] text-[15px] leading-relaxed text-muted">
              {topic.tagline}
            </p>
          </div>

          {topic.blocks.map((block, blockIndex) => (
            <ContentBlock block={block} key={blockIndex} />
          ))}

          <ExerciseList
            topicIndex={current}
            exercises={topic.exercises}
            exerciseState={exerciseState}
            onExerciseChange={onExerciseChange}
          />

          <div className="mt-10 flex justify-between gap-3 border-t border-line pt-5">
            {current > 0 ? (
              <motion.button
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.97 }}
                className="max-w-[48%] whitespace-normal rounded-md border border-line bg-panel2 px-3.5 py-[7px] text-left text-[13px] font-semibold text-ink hover:border-accent"
                onClick={() => onGoTo(current - 1)}
              >
                &larr; {topics[current - 1].title}
              </motion.button>
            ) : (
              <span />
            )}
            {current < topics.length - 1 ? (
              <motion.button
                whileHover={{ x: 2, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.97 }}
                className="max-w-[48%] whitespace-normal rounded-md bg-accent px-3.5 py-[7px] text-left text-[13px] font-semibold text-white"
                onClick={() => onGoTo(current + 1)}
              >
                {topics[current + 1].title} &rarr;
              </motion.button>
            ) : (
              <span />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
