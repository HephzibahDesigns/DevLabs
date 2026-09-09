import { htmlCourse } from "./html";
import { cssCourse } from "./css";
import { javascriptCourse } from "./javascript";
import { typescriptCourse } from "./typescript";
import { reactCourse } from "./react";
import { nextjsCourse } from "./nextjs";
import { reactNativeCourse } from "./reactNative";
import { expoCourse } from "./expo";
import { nativewindCourse } from "./nativewind";
import { tailwindCourse } from "./tailwind";
import { shadcnCourse } from "./shadcn";
import { gitCourse } from "./git";
import { githubCourse } from "./github";
import { prismaCourse } from "./prisma";
import { postgresqlCourse } from "./postgresql";
import { comingSoonCourses } from "./comingSoon";

// Display order follows a natural learning path: core languages first,
// then frameworks/libraries, then backend & tooling — matching the
// grouping used in the course picker.
export const COURSES = [
  htmlCourse,
  cssCourse,
  javascriptCourse,
  typescriptCourse,
  reactCourse,
  nextjsCourse,
  reactNativeCourse,
  expoCourse,
  nativewindCourse,
  tailwindCourse,
  shadcnCourse,
  gitCourse,
  githubCourse,
  prismaCourse,
  postgresqlCourse,
  ...comingSoonCourses
];

export const CATEGORY_ORDER = ["Languages & Core", "Frameworks & Libraries", "Backend & Tools"];

// Finds a single course by its id, e.g. getCourse("react").
// Returns null instead of undefined so callers can safely check "no course".
export function getCourse(courseId) {
  return COURSES.find((course) => course.id === courseId) || null;
}

// Adds up the exercise count across every topic in a course, so the UI can
// show "12 exercises" without each caller re-implementing the sum.
export function totalExercisesFor(course) {
  return course.topics.reduce(
    (exerciseTotal, topic) => exerciseTotal + topic.exercises.length,
    0
  );
}
