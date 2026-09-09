# Dev Courses — an interactive, offline course library

A self-contained, interactive course platform built with React + Vite —
one shell, many courses, each with explanations and hands-on exercises.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## What's here

**Ready now, with full content:**
- HTML
- CSS
- JavaScript
- TypeScript

**Scaffolded, coming soon** (they already show up in the course picker,
grouped correctly, ready to have real content dropped in):
- React.js, Next.js, React Native, Expo, NativeWind, Tailwind CSS, Shadcn/ui
- Git, GitHub, Prisma, PostgreSQL

## Progress is saved automatically, per course

Which course you were last in, which topic you're on within it, every
multiple-choice answer, every bit of code you've typed into an exercise,
and every exercise you've solved — all saved to the browser's
`localStorage` as you go, separately for each course. Refreshing the page,
or closing and reopening the tab, picks up exactly where you left off,
in whichever course you left off in.

Each course has its own **Reset progress** link in its top bar, so
resetting one course never touches another.

## Adding a new course

Every course is a plain object with this shape:

```js
export const someCourse = {
  id: "unique-id",
  title: "Display Name",
  category: "Languages & Core" | "Frameworks & Libraries" | "Backend & Tools",
  summary: "One line shown on the course card.",
  comingSoon: false,
  topics: [
    {
      id: "topic-id",
      title: "Topic title",
      tagline: "One line shown under the title.",
      blocks: [
        { h: "Section heading", p: "Explanation text.", tip: "Optional plain-English aside.", code: "optional code snippet" }
      ],
      exercises: [
        { type: "mcq", q: "Question?", options: ["a", "b"], correct: 0, explain: "Why." },
        { type: "code", q: "Prompt", starter: "", checks: [/regex the answer must match/], hint: "...", solution: "example answer", explain: "Why." }
      ]
    }
  ]
};
```

Drop the new file in `src/courses/`, add it to the `COURSES` array in
`src/courses/index.js` (or move it out of `comingSoon.js` if it already
has a stub entry there), and it appears in the course picker automatically
— no other file needs to change.

## Project structure

```
src/
  courses/
    html.js, css.js, javascript.js, typescript.js  # full course content
    comingSoon.js       # placeholder entries for planned courses
    index.js             # the COURSES registry + category ordering
  utils/
    highlightCode.jsx   # tiny regex-based syntax highlighter for code snippets
    exerciseState.js    # exId(), default/solved-state logic for one exercise
    persistence.js       # safe localStorage get/set/remove wrappers
  hooks/
    usePersistentState.js # useState that reads/writes localStorage automatically
  components/
    CourseHome.jsx        # course picker grid, grouped by category, with progress
    CoursePlayer.jsx      # one course's sidebar + content + exercises + progress
    Topbar.jsx             # top bar: course title, back link, progress, reset
    Sidebar.jsx             # left-hand topic navigation list for the active course
    TopicContent.jsx        # renders the active topic's blocks + exercises + footer nav
    ContentBlock.jsx        # a single explanation block (heading, text, tip, code)
    ExerciseList.jsx        # renders the list of exercises for a topic
    Exercise.jsx             # a single exercise (multiple-choice or code-check)
    StatusFooter.jsx        # bottom status bar
  App.jsx                # top-level switch between the course picker and the active course
  App.css                # all app styling
  main.jsx                # React entry point
  index.css               # minimal global reset
index.html
```
