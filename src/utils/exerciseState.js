// Builds the storage key for one exercise from its position in the course,
// e.g. topicIndex=2, exerciseIndex=0 -> "2-0".
export function exId(topicIndex, exerciseIndex) {
  return topicIndex + "-" + exerciseIndex;
}

// The persisted record for a single exercise. Every field is optional —
// an exercise the user hasn't touched yet simply has no entry.
export function defaultExerciseState(exercise) {
  return {
    mcqAnswered: null, // index of the option they picked, for mcq exercises
    codeInput: exercise.type === "code" ? exercise.starter || "" : undefined,
    checked: false, // whether they've clicked "Check" at least once
    showSolution: false,
    hintShown: false
  };
}

// Whether an exercise counts as solved, given its persisted state.
export function isExerciseSolved(exercise, exerciseState) {
  if (!exerciseState) return false;
  if (exercise.type === "mcq") {
    return (
      exerciseState.mcqAnswered != null &&
      exerciseState.mcqAnswered === exercise.correct
    );
  }
  const currentCode = exerciseState.codeInput ?? exercise.starter ?? "";
  return (
    !!exerciseState.checked &&
    exercise.checks.every((checkPattern) => checkPattern.test(currentCode))
  );
}
