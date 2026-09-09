# DevLabs — an interactive, offline course library

A self-contained, interactive course platform built with **React + Vite** —
one shell, many courses, each with explanations, code samples, and
hands-on exercises. Progress is saved automatically in the browser, and
the UI is animated throughout with **Framer Motion**.

## Tech stack

- **React 18** — UI components
- **React Router 6** — client-side routing (`/`, `/courses`, `/courses/:courseId`)
- **Framer Motion** — page transitions, staggered lists, hover/tap effects, animated feedback
- **Tailwind CSS** — styling
- **Vite** — dev server and production build

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

> `framer-motion` is listed in `package.json` — running `npm install`
> will fetch it along with everything else.

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

## Animation overview

Framer Motion is used throughout for feedback and continuity rather than
decoration — every animation is meant to make a state change easier to
follow:

| Where | What happens |
|---|---|
| `App.jsx` | Landing → course picker fades between pages (`AnimatePresence`) |
| `Landing.jsx` | Hero text and stat counters fade/rise in, staggered; feature cards lift on hover |
| `CourseHome.jsx` | Course cards fade/rise in, staggered by category; lift slightly on hover |
| `TopicContent.jsx` | The active topic slides/fades when you move to a different one |
| `ContentBlock.jsx` | Each explanation block fades in as you scroll to it |
| `ExerciseList.jsx` | Exercises stagger in one after another |
| `Exercise.jsx` | Hints, solutions, and correct/incorrect feedback animate in and out instead of popping |
| `Topbar.jsx` | The progress bar glides to its new width instead of jumping |
| `Sidebar.jsx` | The active topic row shifts slightly on select/hover |
| `Logo.jsx` / `StatusFooter.jsx` | Small hover wobble on the mark; a gentle pulse while "compiling…" |

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
    react.js, nextjs.js, reactNative.js, expo.js,
    nativewind.js, tailwind.js, shadcn.js,
    git.js, github.js, prisma.js, postgresql.js     # scaffolded/coming-soon courses
    comingSoon.js        # placeholder entries for planned courses
    index.js              # the COURSES registry, category ordering, getCourse(), totalExercisesFor()
  utils/
    highlightCode.jsx    # tiny regex-based syntax highlighter for code snippets
    exerciseState.js     # exId(), default/solved-state logic for one exercise
    persistence.js        # safe localStorage get/set/remove wrappers
  hooks/
    usePersistentState.js # useState that reads/writes localStorage automatically
  components/
    Landing.jsx             # marketing hero page shown on first visit
    CourseHome.jsx          # course picker grid, grouped by category, with progress
    CoursePlayer.jsx        # one course's sidebar + content + exercises + progress
    Topbar.jsx               # top bar: course title, back link, progress, reset
    Sidebar.jsx               # left-hand topic navigation list for the active course
    TopicContent.jsx          # renders the active topic's blocks + exercises + footer nav
    ContentBlock.jsx          # a single explanation block (heading, text, tip, code)
    ExerciseList.jsx          # renders the list of exercises for a topic
    Exercise.jsx               # a single exercise (multiple-choice or code-check)
    StatusFooter.jsx          # bottom status bar
    Logo.jsx                   # DevLabs mark + wordmark
  App.jsx                  # top-level routes: landing, course picker, active course
  index.css                 # Tailwind entry + minimal global reset
  main.jsx                  # React entry point, wraps App in BrowserRouter
index.html
tailwind.config.js
vite.config.js
```

## Code style notes

- Variable and parameter names are written out in full (`topicIndex`,
  `exerciseIndex`, `optionIndex`, `checkPattern`, etc.) rather than single
  letters, so the data flowing through each function is clear at a glance.
- Non-obvious logic (why a component is remounted with a `key`, why
  `localStorage` calls are wrapped in `try/catch`, why an animation uses
  `AnimatePresence`) is explained with a short comment above it.
