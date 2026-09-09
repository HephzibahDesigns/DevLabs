import { useState } from "react";
import { usePersistentState } from "../hooks/usePersistentState";
import { exId, isExerciseSolved } from "../utils/exerciseState";
import { clearState } from "../utils/persistence";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import TopicContent from "./TopicContent";
import StatusFooter from "./StatusFooter";

// Mounted with key={course.id} by App, so switching courses gives this a
// fresh component instance — its usePersistentState calls naturally load
// that course's own saved progress instead of carrying over the last one.
export default function CoursePlayer({ course, onBack }) {
  const totalExerciseCount = course.topics.reduce(
    (runningTotal, topic) => runningTotal + topic.exercises.length,
    0
  );

  // `currentTopicIndex` is which topic is on screen; `exerciseState` holds
  // every exercise's saved answer/progress, keyed by exId(topicIndex, exerciseIndex).
  const [currentTopicIndex, setCurrentTopicIndex] = usePersistentState(
    `current:${course.id}`,
    0
  );
  const [exerciseState, setExerciseState] = usePersistentState(
    `exerciseState:${course.id}`,
    {}
  );

  // Whether the mobile topic drawer is open. Not persisted — it's a
  // transient bit of UI state, not something worth restoring across visits.
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Merges a partial update (e.g. { checked: true }) into one exercise's
  // saved state, keyed by its exId, without touching any other exercise.
  const handleExerciseChange = (exerciseId, patch) => {
    setExerciseState((previousState) => ({
      ...previousState,
      [exerciseId]: { ...previousState[exerciseId], ...patch }
    }));
  };

  // Wipes this course's saved progress after the user confirms, both in
  // React state (so the UI updates immediately) and in localStorage.
  const handleReset = () => {
    if (!window.confirm(`Clear saved progress for ${course.title}? This can't be undone.`)) return;
    setCurrentTopicIndex(0);
    setExerciseState({});
    clearState(`current:${course.id}`);
    clearState(`exerciseState:${course.id}`);
  };

  const goToTopic = (topicIndex) => setCurrentTopicIndex(topicIndex);

  const activeTopic = course.topics[currentTopicIndex];

  const doneExerciseCount = course.topics.reduce(
    (runningDone, topic, topicIndex) =>
      runningDone +
      topic.exercises.filter((exercise, exerciseIndex) =>
        isExerciseSolved(exercise, exerciseState[exId(topicIndex, exerciseIndex)])
      ).length,
    0
  );
  const progressPercent = totalExerciseCount
    ? (doneExerciseCount / totalExerciseCount) * 100
    : 0;

  return (
    <div className="flex h-screen flex-col bg-bg font-sans text-ink antialiased">
      <Topbar
        courseTitle={course.title}
        doneCount={doneExerciseCount}
        totalExercises={totalExerciseCount}
        progressPct={progressPercent}
        onReset={handleReset}
        onBack={onBack}
        onToggleSidebar={() => setIsMobileSidebarOpen((open) => !open)}
      />

      <div className="flex min-h-0 flex-1">
        <Sidebar
          topics={course.topics}
          current={currentTopicIndex}
          exerciseState={exerciseState}
          onSelect={goToTopic}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        <TopicContent
          topics={course.topics}
          current={currentTopicIndex}
          topic={activeTopic}
          exerciseState={exerciseState}
          onExerciseChange={handleExerciseChange}
          onGoTo={goToTopic}
        />
      </div>

      <StatusFooter allDone={totalExerciseCount > 0 && doneExerciseCount === totalExerciseCount} />
    </div>
  );
}
