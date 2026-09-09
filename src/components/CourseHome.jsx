import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { COURSES, CATEGORY_ORDER, totalExercisesFor } from "../courses";
import { isExerciseSolved, exId } from "../utils/exerciseState";
import { loadState } from "../utils/persistence";
import Logo from "./Logo";

// Staggers the cards inside one category group so they animate in
// one-after-another instead of all at once.
const cardGroupAnimation = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// Individual course card: fades and rises into place.
const cardAnimation = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

// Works out how many of a course's exercises are already solved, by
// reading that course's saved exercise state from localStorage.
function progressFor(course) {
  if (course.comingSoon) return null;
  const totalExerciseCount = totalExercisesFor(course);
  if (totalExerciseCount === 0) return { done: 0, total: 0 };

  const savedExerciseState = loadState(`exerciseState:${course.id}`, {});
  const doneCount = course.topics.reduce(
    (runningDone, topic, topicIndex) =>
      runningDone +
      topic.exercises.filter((exercise, exerciseIndex) =>
        isExerciseSolved(
          exercise,
          savedExerciseState[exId(topicIndex, exerciseIndex)]
        )
      ).length,
    0
  );
  return { done: doneCount, total: totalExerciseCount };
}

export default function CourseHome({ onSelect, onBackToLanding }) {
  const navigate = useNavigate();

  const goToCourse = (courseId) => {
    onSelect(courseId);
    navigate(`/courses/${courseId}`);
  };

  const backToLanding = () => {
    onBackToLanding();
    navigate("/");
  };

  // Group courses by category so each section header only shows up if it
  // actually has courses under it.
  const categoryGroups = CATEGORY_ORDER.map((categoryName) => ({
    category: categoryName,
    courses: COURSES.filter((course) => course.category === categoryName),
  })).filter((group) => group.courses.length > 0);

  return (
    <div className="min-h-screen bg-bg px-5 pb-14 pt-6 font-sans text-ink antialiased sm:px-11 sm:pt-10">
      <div className="mb-8">
        {onBackToLanding && (
          <button
            className="mb-3.5 flex items-center gap-1.5 font-mono text-xs text-muted2 hover:text-ink"
            onClick={backToLanding}
          >
            &larr; Back
          </button>
        )}
        <Link to="/">
          <Logo size={36} textSize="text-2xl" className="mb-4" />
        </Link>

        <p className="max-w-[70ch] text-[15px] leading-relaxed text-muted">
          A self-contained, offline course library — languages first, then the
          frameworks and tools you'll use to actually ship projects. Pick a
          course to jump in; your progress in each one is saved automatically.
        </p>
      </div>

      {categoryGroups.map((group) => (
        <div className="mb-8" key={group.category}>
          <h2 className="mb-3.5 font-mono text-xs uppercase tracking-wide text-muted">
            {group.category}
          </h2>
          <motion.div
            className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]"
            initial="hidden"
            animate="visible"
            variants={cardGroupAnimation}
          >
            {group.courses.map((course) => {
              const progress = progressFor(course);
              const isComplete =
                progress &&
                progress.total > 0 &&
                progress.done === progress.total;
              return (
                <motion.div
                  key={course.id}
                  variants={cardAnimation}
                  // A gentle lift-and-scale on hover, only for clickable cards.
                  whileHover={
                    course.comingSoon ? undefined : { y: -3, scale: 1.015 }
                  }
                  whileTap={course.comingSoon ? undefined : { scale: 0.985 }}
                  transition={{ duration: 0.15 }}
                  className={
                    "relative flex min-h-[108px] flex-col gap-2 rounded-[10px] border p-[18px] transition-colors " +
                    (course.comingSoon
                      ? "cursor-not-allowed border-line opacity-50"
                      : "cursor-pointer border-line hover:border-accent")
                  }
                  onClick={() => !course.comingSoon && goToCourse(course.id)}
                >
                  <span
                    className={
                      "absolute right-4 top-4 whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[10px] " +
                      (isComplete
                        ? "border-goodDim text-good"
                        : "border-line text-muted2")
                    }
                  >
                    {course.comingSoon
                      ? "Coming soon"
                      : `${progress.total} exercise${
                          progress.total === 1 ? "" : "s"
                        }`}
                  </span>
                  <h3 className="pr-[70px] text-[15.5px] font-semibold text-ink">
                    {course.title}
                  </h3>
                  <p className="text-[13px] leading-snug text-muted">
                    {course.summary}
                  </p>
                  {progress && progress.total > 0 && (
                    <span className="mt-auto font-mono text-[11px] text-good">
                      {isComplete
                        ? "✓ complete"
                        : `${progress.done} / ${progress.total} done`}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
