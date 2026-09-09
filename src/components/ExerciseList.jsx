import { motion } from "framer-motion";
import Exercise from "./Exercise";
import { exId, defaultExerciseState } from "../utils/exerciseState";

// Staggers each exercise card's entrance by a fraction of a second, so they
// appear one after another rather than all popping in at once.
const listAnimation = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function ExerciseList({
  topicIndex,
  exercises,
  exerciseState,
  onExerciseChange
}) {
  return (
    <div className="mt-9 border-t border-line pt-5">
      <h2 className="mb-1 font-mono text-[13px] tracking-wide text-muted">
        Try it yourself // {exercises.length} exercise{exercises.length === 1 ? "" : "s"}
      </h2>
      <p className="mb-4 text-[13px] text-muted2">
        Stuck? Every exercise has a hint button, and the solution is always one click away.
      </p>
      <motion.div initial="hidden" animate="visible" variants={listAnimation}>
        {exercises.map((exercise, exerciseIndex) => {
          const exerciseId = exId(topicIndex, exerciseIndex);
          const savedState =
            exerciseState[exerciseId] || defaultExerciseState(exercise);
          return (
            <motion.div key={exerciseId} variants={itemAnimation}>
              <Exercise
                ex={exercise}
                state={savedState}
                onChange={(patch) => onExerciseChange(exerciseId, patch)}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
