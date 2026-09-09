import { motion } from "framer-motion";
import { COURSES, CATEGORY_ORDER, totalExercisesFor } from "../courses";
// import Logo from "../assets/devlabs_logo.png";
import Logo from "./Logo";

// Fade-and-rise animation used for the hero text/stats as the page loads.
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

// Wraps the three "feature" cards and the stat numbers so their children
// animate in one after another instead of all at once.
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function Landing({ onGetStarted }) {
  const courseCount = COURSES.length;
  const exerciseCount = COURSES.reduce(
    (runningTotal, course) => runningTotal + totalExercisesFor(course),
    0
  );
  const topicCount = COURSES.reduce(
    (runningTotal, course) => runningTotal + course.topics.length,
    0
  );

  // Group courses by category (Languages & Core, Frameworks & Libraries, ...)
  // so each section header only renders if it actually has courses under it.
  const categoryGroups = CATEGORY_ORDER.map((categoryName) => ({
    category: categoryName,
    courses: COURSES.filter((course) => course.category === categoryName),
  })).filter((group) => group.courses.length > 0);

  return (
    <div className="min-h-screen bg-bg text-ink font-sans antialiased">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-12 pt-16 text-center sm:pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Logo size={44} textSize="text-2xl" className="mb-6" />
        </motion.div>

        <motion.span
          className="mb-5 font-mono text-xs tracking-wide text-accent"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          offline &middot; interactive &middot; self-paced
        </motion.span>

        <motion.h1
          className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-[38px]"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2, duration: 0.45 }}
        >
          Learn to build real software, one topic at a time.
        </motion.h1>

        <motion.p
          className="mb-8 max-w-[62ch] text-base leading-relaxed text-muted"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.3, duration: 0.45 }}
        >
          A self-contained course library covering the languages, frameworks,
          and tools behind modern web and mobile apps — from your first line of
          HTML all the way to querying a production database. Every lesson comes
          with hands-on exercises, hints, and worked solutions, and your
          progress is saved automatically as you go.
        </motion.p>

        {/* Stat counters (courses / topics / exercises) fade + rise in,
            one after another, thanks to staggerContainer + fadeUp. */}
        <motion.div
          className="mt-11 flex gap-9 sm:gap-9"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            className="flex flex-col items-center gap-0.5"
            variants={fadeUp}
          >
            <strong className="text-xl font-bold text-ink sm:text-[22px]">
              {courseCount}
            </strong>
            <span className="font-mono text-[11px] uppercase tracking-wide text-muted2">
              courses
            </span>
          </motion.div>
          <motion.div
            className="flex flex-col items-center gap-0.5"
            variants={fadeUp}
          >
            <strong className="text-xl font-bold text-ink sm:text-[22px]">
              {topicCount}
            </strong>
            <span className="font-mono text-[11px] uppercase tracking-wide text-muted2">
              topics
            </span>
          </motion.div>
          <motion.div
            className="flex flex-col items-center gap-0.5"
            variants={fadeUp}
          >
            <strong className="text-xl font-bold text-ink sm:text-[22px]">
              {exerciseCount}
            </strong>
            <span className="font-mono text-[11px] uppercase tracking-wide text-muted2">
              exercises
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature cards animate in together, staggered, once as the section
          mounts — whileInView triggers this when the user scrolls to it. */}
      <motion.div
        className="mx-auto grid max-w-[900px] gap-5 px-5 pb-11 sm:px-6 sm:pb-16 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div
          className="rounded-[10px] border border-line bg-panel p-[22px]"
          variants={fadeUp}
          whileHover={{ y: -4, borderColor: "var(--color-accent, #3d8bde)" }}
          transition={{ duration: 0.2 }}
        >
          <span className="mb-2.5 block text-[22px]" aria-hidden="true">
            📚
          </span>
          <h3 className="mb-2 text-[15px] font-semibold text-ink">
            Structured, ground-up lessons
          </h3>
          <p className="text-[13px] leading-relaxed text-muted">
            Every course starts from "what even is this?" and builds up — no
            assumed background required.
          </p>
        </motion.div>
        <motion.div
          className="rounded-[10px] border border-line bg-panel p-[22px]"
          variants={fadeUp}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <span className="mb-2.5 block text-[22px]" aria-hidden="true">
            🛠️
          </span>
          <h3 className="mb-2 text-[15px] font-semibold text-ink">
            Learn by doing
          </h3>
          <p className="text-[13px] leading-relaxed text-muted">
            Multiple-choice and hands-on code exercises after every topic, each
            with a hint and a full solution.
          </p>
        </motion.div>
        <motion.div
          className="rounded-[10px] border border-line bg-panel p-[22px]"
          variants={fadeUp}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <span className="mb-2.5 block text-[22px]" aria-hidden="true">
            💾
          </span>
          <h3 className="mb-2 text-[15px] font-semibold text-ink">
            Picks up where you left off
          </h3>
          <p className="text-[13px] leading-relaxed text-muted">
            Your progress through every course is saved automatically, right in
            your browser.
          </p>
        </motion.div>
      </motion.div>

      {categoryGroups.map((group) => (
        <div
          className="mx-auto max-w-[900px] px-5 pb-6 sm:px-6"
          key={group.category}
        >
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-muted">
            {group.category}
          </h2>
          <motion.div
            className="flex flex-wrap gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={staggerContainer}
          >
            {group.courses.map((course) => (
              <motion.span
                key={course.id}
                variants={fadeUp}
                className="rounded-full border border-line bg-panel2 px-3.5 py-1.5 text-[12.5px] text-muted"
              >
                {course.title}
              </motion.span>
            ))}
          </motion.div>
        </div>
      ))}

      <div className="flex justify-center gap-3 py-10">
        <motion.button
          className="rounded-lg bg-accent px-6 py-3 text-[15px] font-semibold text-white"
          onClick={onGetStarted}
          whileHover={{ scale: 1.04, filter: "brightness(1.1)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          Browse all courses &rarr;
        </motion.button>
      </div>
    </div>
  );
}
