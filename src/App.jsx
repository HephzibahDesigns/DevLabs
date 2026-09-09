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

export default function App() {
  const [, setActiveCourseId] = usePersistentState("activeCourseId", null);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div>
              <Landing onGetStarted={() => navigate("/courses")} />
            </motion.div>
          }
        />
        <Route
          path="/courses"
          element={
            <motion.div>
              <CourseHome
                onSelect={(courseId) => setActiveCourseId(courseId)}
                onBackToLanding={() => navigate("/")}
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
