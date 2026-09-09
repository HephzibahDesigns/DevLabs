import { motion, AnimatePresence } from "framer-motion";
import { isExerciseSolved } from "../utils/exerciseState";

// Feedback boxes (hint / correct / incorrect / check result) all use this
// same fade-and-rise-in animation so they feel consistent.
const feedbackAnimation = {
  initial: { opacity: 0, y: -6, height: 0 },
  animate: { opacity: 1, y: 0, height: "auto" },
  exit: { opacity: 0, y: -6, height: 0 },
  transition: { duration: 0.2 }
};

export default function Exercise({ ex: exercise, state: exerciseState, onChange }) {
  const isSolved = isExerciseSolved(exercise, exerciseState);

  // Records which multiple-choice option the user picked. Locked once
  // they've answered — you can't change your answer after picking one.
  const handleMcqOptionClick = (optionIndex) => {
    if (exerciseState.mcqAnswered != null) return;
    onChange({ mcqAnswered: optionIndex });
  };

  const handleCheckClick = () => {
    onChange({ checked: true });
  };

  const handleHintClick = () => onChange({ hintShown: true });

  const currentCodeValue = exerciseState.codeInput ?? exercise.starter ?? "";
  const codeCheckPassed =
    exercise.type === "code" &&
    exercise.checks.every((checkPattern) => checkPattern.test(currentCodeValue));

  return (
    <div
      className={
        "mb-4 rounded-lg border bg-panel p-[18px] sm:p-5 " +
        (isSolved ? "border-goodDim" : "border-line")
      }
    >
      <div className="mb-3 flex items-start justify-between gap-2.5">
        <div className="text-[14.5px] leading-relaxed text-ink">{exercise.q}</div>
        <div
          className={
            "whitespace-nowrap pt-0.5 font-mono text-[11px] " +
            (isSolved ? "text-good" : "text-muted2")
          }
        >
          {isSolved ? "✓ solved" : "unsolved"}
        </div>
      </div>

      {exercise.type === "mcq" ? (
        <div className="flex flex-col gap-2">
          {exercise.options.map((optionText, optionIndex) => {
            let optionClassName =
              "rounded-md border px-3 py-[9px] text-left font-sans text-[13.5px] text-ink ";
            if (exerciseState.mcqAnswered != null) {
              if (optionIndex === exercise.correct) {
                optionClassName += "border-good bg-goodDim";
              } else if (optionIndex === exerciseState.mcqAnswered) {
                optionClassName += "border-bad bg-badDim";
              } else {
                optionClassName += "border-line bg-panel2";
              }
            } else {
              optionClassName += "border-line bg-panel2 hover:border-muted2";
            }
            return (
              <motion.button
                key={optionIndex}
                whileHover={exerciseState.mcqAnswered == null ? { scale: 1.01 } : undefined}
                whileTap={exerciseState.mcqAnswered == null ? { scale: 0.98 } : undefined}
                className={
                  optionClassName +
                  (exerciseState.mcqAnswered != null ? " cursor-default" : " cursor-pointer")
                }
                disabled={exerciseState.mcqAnswered != null}
                onClick={() => handleMcqOptionClick(optionIndex)}
              >
                {optionText}
              </motion.button>
            );
          })}
        </div>
      ) : (
        <>
          <div className="-mt-1 mb-2.5 text-[12.5px] text-muted2">
            Edit the code below, then click Check.
          </div>
          <textarea
            className="min-h-[88px] w-full resize-y rounded-md border border-lineSoft bg-bg px-3.5 py-3 font-mono text-[13px] leading-relaxed text-ink outline-none focus:border-accent"
            spellCheck={false}
            value={currentCodeValue}
            onChange={(event) => onChange({ codeInput: event.target.value })}
          />
          <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
            <motion.button
              whileHover={{ filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.96 }}
              className="rounded-md border border-accent bg-accent px-3.5 py-[7px] font-sans text-[13px] font-semibold text-white"
              onClick={handleCheckClick}
            >
              Check
            </motion.button>
            <motion.button
              whileHover={{ borderColor: "var(--color-accent, #3d8bde)" }}
              whileTap={{ scale: 0.96 }}
              className="rounded-md border border-line bg-transparent px-3.5 py-[7px] font-sans text-[13px] font-semibold text-ink"
              onClick={handleHintClick}
            >
              Hint
            </motion.button>
            <motion.button
              whileHover={{ borderColor: "var(--color-accent, #3d8bde)" }}
              whileTap={{ scale: 0.96 }}
              className="rounded-md border border-line bg-transparent px-3.5 py-[7px] font-sans text-[13px] font-semibold text-ink"
              onClick={() => onChange({ showSolution: !exerciseState.showSolution })}
            >
              Show solution
            </motion.button>
          </div>
          <AnimatePresence>
            {exerciseState.showSolution && (
              <motion.div
                key="solution"
                {...feedbackAnimation}
                className="mt-2.5 overflow-hidden whitespace-pre-wrap rounded-md border border-dashed border-lineSoft bg-bg px-3.5 py-2.5 font-mono text-[12.5px] text-muted"
              >
                {exercise.solution}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Hint box — only shown while the exercise hasn't been answered/checked yet. */}
      <AnimatePresence>
        {exerciseState.hintShown &&
          !(exerciseState.mcqAnswered != null || exerciseState.checked) && (
            <motion.div
              key="hint"
              {...feedbackAnimation}
              className="mt-2.5 overflow-hidden rounded-md border border-bad bg-badDim px-3 py-2.5 text-[13.5px] leading-relaxed text-badText"
            >
              Hint: {exercise.hint}
            </motion.div>
          )}
      </AnimatePresence>

      {/* Multiple-choice result — correct vs. incorrect styling and message. */}
      <AnimatePresence>
        {exerciseState.mcqAnswered != null && (
          <motion.div
            key="mcq-result"
            {...feedbackAnimation}
            className={
              "mt-2.5 overflow-hidden rounded-md border px-3 py-2.5 text-[13.5px] leading-relaxed " +
              (exerciseState.mcqAnswered === exercise.correct
                ? "border-good bg-goodDim text-goodText"
                : "border-bad bg-badDim text-badText")
            }
          >
            {exerciseState.mcqAnswered === exercise.correct ? "Correct." : "Not quite."}
            <span
              className={
                "mt-1.5 block " +
                (exerciseState.mcqAnswered === exercise.correct
                  ? "text-goodTextDim"
                  : "text-muted")
              }
            >
              {exercise.explain}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Code-exercise result — shown once the user clicks "Check". */}
      <AnimatePresence>
        {exercise.type === "code" && exerciseState.checked && (
          <motion.div
            key="code-result"
            {...feedbackAnimation}
            className={
              "mt-2.5 overflow-hidden rounded-md border px-3 py-2.5 text-[13.5px] leading-relaxed " +
              (codeCheckPassed
                ? "border-good bg-goodDim text-goodText"
                : "border-bad bg-badDim text-badText")
            }
          >
            {codeCheckPassed
              ? "That checks out."
              : "Not quite there yet — try the hint, or peek at the solution."}
            <span className={"mt-1.5 block " + (codeCheckPassed ? "text-goodTextDim" : "text-muted")}>
              {exercise.explain}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
