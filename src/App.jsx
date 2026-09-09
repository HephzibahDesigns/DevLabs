import { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getCourse } from "./courses";
import { usePersistentState } from "./hooks/usePersistentState";
import Landing from "./components/Landing";
import CourseHome from "./components/CourseHome";
import CoursePlayer from "./components/CoursePlayer";

// Simple fade used when switching between top-level pages (landing /
// course picker). CoursePlayer manages its own internal topic transitions,
// // so it deliberately isn't wrapped again here.
// const pageFade = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 },
//   transition: { duration: 0.15 }
// };

export default function App() {
  // Remembers which course you were last in, so reopening the app drops
  // you right back into it instead of the course picker every time.
  const [activeCourseId, setActiveCourseId] = usePersistentState(
    "activeCourseId",
    null
  );

  // The marketing landing page is only shown before a visitor's first time
  // clicking through — after that, "back to courses" always means the
  // course picker, not the hero page again.
  const [hasEnteredApp, setHasEnteredApp] = usePersistentState(
    "hasEnteredApp",
    false
  );

  const location = useLocation();

  return (
    // `mode="wait"` lets the outgoing page finish its exit animation before
    // the incoming one starts, so they never overlap mid-transition.
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <RootRoute
              activeCourseId={activeCourseId}
              hasEnteredApp={hasEnteredApp}
              onGetStarted={() => setHasEnteredApp(true)}
            />
          }
        />
        <Route
          path="/courses"
          element={
            <motion.div>
              <CourseHome
                onSelect={(courseId) => setActiveCourseId(courseId)}
                onBackToLanding={() => setHasEnteredApp(false)}
              />
            </motion.div>
          }
        />
        <Route
          path="/courses/:courseId"
          element={<CoursePlayerRoute onActivate={setActiveCourseId} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

// Sends visitors either straight back into their last course, to the
// course picker, or to the landing page, depending on what they've done
// before — matches the original pre-router "which screen first" logic.
function RootRoute({ activeCourseId, hasEnteredApp, onGetStarted }) {
  const navigate = useNavigate();
  const activeCourse = activeCourseId ? getCourse(activeCourseId) : null;

  if (activeCourse && !activeCourse.comingSoon) {
    return <Navigate to={`/courses/${activeCourse.id}`} replace />;
  }

  if (!hasEnteredApp) {
    return (
      <motion.div>
        <Landing
          onGetStarted={() => {
            onGetStarted();
            navigate("/courses");
          }}
        />
      </motion.div>
    );
  }

  return <Navigate to="/courses" replace />;
}

function CoursePlayerRoute({ onActivate }) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = getCourse(courseId);

  useEffect(() => {
    if (course && !course.comingSoon) {
      onActivate(course.id);
    }
  }, [course, onActivate]);

  if (!course || course.comingSoon) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <CoursePlayer
      key={course.id}
      course={course}
      onBack={() => {
        onActivate(null);
        navigate("/courses");
      }}
    />
  );
}
