// React.js course — full content.
export const reactCourse = {
  id: "react",
  title: "React.js",
  category: "Frameworks & Libraries",
  summary: "Build interactive UIs out of reusable components.",
  comingSoon: false,
  topics: [
  {
    id: "components", title: "Components & JSX",
    tagline: "React apps are built from small, reusable pieces called components. Here's what one looks like.",
    blocks: [
      { h: "A component is just a function that returns UI", p: "In React, a component is a JavaScript function whose job is to describe what should appear on screen. Instead of returning a number or a string, it returns a description of some UI — and React takes care of turning that description into real elements in the browser.",
        code: "function Greeting() {\n  return <h1>Hello, world!</h1>;\n}" },
      { h: "JSX: writing HTML-like syntax inside JavaScript", p: "That `<h1>Hello, world!</h1>` isn't a string — it's JSX, a syntax extension that lets you write HTML-like markup directly inside JavaScript. Under the hood, a build tool translates it into plain function calls, but you almost never need to think about that layer.",
        tip: "JSX looks like HTML but it's really JavaScript. That's why you'll see small differences — like className instead of class — since class is a reserved word in JavaScript.",
        code: "function Card() {\n  return (\n    <div className=\"card\">\n      <p>Some text</p>\n    </div>\n  );\n}" },
      { h: "Embedding JavaScript values with curly braces", p: "Inside JSX, curly braces `{}` let you drop back into plain JavaScript — to insert a variable, do a calculation, or call a function. Anything that evaluates to a value can go inside the braces.",
        code: "function Total() {\n  const price = 20;\n  const tax = price * 0.1;\n  return <p>Total: {price + tax}</p>;\n}" },
      { h: "A component must return one root element", p: "JSX requires everything you return to be wrapped in a single parent. If you don't want an extra wrapper `<div>` in your actual HTML, React provides a Fragment — written as empty angle brackets `<>...</>` — which groups elements without adding one.",
        code: "function Pair() {\n  return (\n    <>\n      <p>First</p>\n      <p>Second</p>\n    </>\n  );\n}" }
    ],
    exercises: [
      { type: "mcq", q: "What does a React component actually return?", options: ["Raw HTML text", "A description of UI (JSX), which React turns into real elements", "A CSS stylesheet", "A database query"], correct: 1, explain: "A component is a function returning JSX — a lightweight description of what the UI should look like. React reads that description and updates the actual browser DOM to match." },
      { type: "code", q: "Write a component named Welcome that returns an <h1> containing the text \"Welcome!\"", starter: "function Welcome() {\n\n}", checks: [/function\s+Welcome\s*\(\s*\)\s*\{[\s\S]*return[\s\S]*<h1>\s*Welcome!\s*<\/h1>/], hint: "Inside the function body, write `return <h1>Welcome!</h1>;`", solution: "function Welcome() {\n  return <h1>Welcome!</h1>;\n}", explain: "A component's whole job is to return JSX describing what should render — here, one heading element." }
    ]
  },
  {
    id: "props", title: "Props",
    tagline: "How to pass data into a component from the outside, the way you'd pass arguments into a function.",
    blocks: [
      { h: "Props are a component's input", p: "Just like a function can take parameters, a component can take props (short for 'properties') — values passed in from whoever is using it. Props arrive bundled together as a single object, which you typically destructure in the function's parameter list.",
        code: "function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\n// used like:\n<Greeting name=\"Ada\" />" },
      { h: "Props are read-only", p: "A component should never modify the props it receives — think of them as a one-way delivery from parent to child. If a component needs data that changes over time, that's what state (covered next) is for.",
        code: "function Price({ amount }) {\n  // amount = amount + 1; // don't do this — props are read-only\n  return <p>${amount}</p>;\n}" },
      { h: "Passing multiple props, including functions", p: "You can pass as many props as you like, of any type — strings, numbers, objects, arrays, even functions. Passing a function as a prop is how a child component can notify its parent that something happened.",
        code: "function Button({ label, onClick }) {\n  return <button onClick={onClick}>{label}</button>;\n}\n\n<Button label=\"Save\" onClick={() => console.log(\"saved!\")} />" }
    ],
    exercises: [
      { type: "code", q: "Write a component named Badge that takes a prop named text and renders it inside a <span>.", starter: "function Badge({ text }) {\n\n}", checks: [/function\s+Badge\s*\(\s*\{\s*text\s*\}\s*\)\s*\{[\s\S]*return[\s\S]*<span>\s*\{\s*text\s*\}\s*<\/span>/], hint: "Return `<span>{text}</span>` — the curly braces insert the text prop's value.", solution: "function Badge({ text }) {\n  return <span>{text}</span>;\n}", explain: "Destructuring `{ text }` in the parameter list pulls the `text` prop straight out of the props object, so you can use it directly in the JSX." },
      { type: "mcq", q: "Which statement about props is correct?", options: ["A component is allowed to reassign its own props", "Props flow from parent to child, and a component should treat them as read-only", "Props can only ever be strings", "A component can only receive one prop at a time"], correct: 1, explain: "Props are how a parent configures a child. The child receives them but never modifies them directly — data flows one way, down the component tree." }
    ]
  },
  {
    id: "state", title: "State with useState",
    tagline: "How a component remembers information and updates the screen when that information changes.",
    blocks: [
      { h: "Why props alone aren't enough", p: "Props are great for data handed down from a parent, but a component often needs to track something that changes because of its own actions — like a counter going up when a button is clicked. That's what state is for: values a component owns and can update itself.",
        tip: "Think of state as a component's own private memory. Every time that memory changes, React re-runs the component to reflect the new value on screen." },
      { h: "Declaring state with useState", p: "The useState function, called a Hook, gives you a piece of state and a function to update it. It returns an array with exactly two items: the current value, and a setter function — commonly grabbed together with array destructuring.",
        code: "import { useState } from \"react\";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </button>\n  );\n}" },
      { h: "Never mutate state directly", p: "Always update state through its setter function — never by changing the variable directly. Calling the setter is what tells React to re-render the component with the new value; just reassigning the variable does nothing visible.",
        code: "// wrong — React never finds out\ncount = count + 1;\n\n// right — this triggers a re-render\nsetCount(count + 1);" }
    ],
    exercises: [
      { type: "mcq", q: "What does useState() return?", options: ["A single value", "An array with the current state and a setter function", "A promise", "Nothing — it just updates a variable in place"], correct: 1, explain: "useState returns a two-item array: the current state value, and a function used to update it. Destructuring, e.g. `const [count, setCount] = useState(0)`, is the standard way to grab both." },
      { type: "code", q: "Complete this component: declare a piece of state named isOpen starting at false, using useState.", starter: "function Panel() {\n  const [isOpen, setIsOpen] = \n  return <div>{isOpen ? \"Open\" : \"Closed\"}</div>;\n}", checks: [/const\s*\[\s*isOpen\s*,\s*setIsOpen\s*\]\s*=\s*useState\s*\(\s*false\s*\)/], hint: "Write `useState(false)` after the equals sign.", solution: "function Panel() {\n  const [isOpen, setIsOpen] = useState(false);\n  return <div>{isOpen ? \"Open\" : \"Closed\"}</div>;\n}", explain: "useState(false) creates a piece of state that starts out as false, paired with setIsOpen to update it later." }
    ]
  },
  {
    id: "events-forms", title: "Handling events & forms",
    tagline: "Responding to clicks, typing, and form submissions — and keeping form inputs in sync with state.",
    blocks: [
      { h: "Listening for events", p: "React event handlers look like their HTML counterparts, but camelCased and passed as functions — onClick instead of onclick, onChange instead of onchange. You attach a function, and React calls it when that event happens.",
        code: "function Alert() {\n  function handleClick() {\n    alert(\"Clicked!\");\n  }\n  return <button onClick={handleClick}>Click me</button>;\n}" },
      { h: "Controlled inputs: syncing an input with state", p: "A 'controlled' input ties its displayed value directly to a piece of state, and updates that state on every keystroke via onChange. This keeps state as the single source of truth for what's in the box.",
        code: "function NameField() {\n  const [name, setName] = useState(\"\");\n  return (\n    <input\n      value={name}\n      onChange={(e) => setName(e.target.value)}\n    />\n  );\n}" },
      { h: "Handling form submission", p: "The submit event fires when a form is submitted — for example by pressing Enter or clicking a submit button. Calling `event.preventDefault()` stops the browser's default full-page reload, which is almost always what you want in a React app.",
        code: "function SearchForm() {\n  const [query, setQuery] = useState(\"\");\n  function handleSubmit(e) {\n    e.preventDefault();\n    console.log(\"Searching for:\", query);\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} />\n      <button type=\"submit\">Search</button>\n    </form>\n  );\n}" }
    ],
    exercises: [
      { type: "mcq", q: "Why do React form submit handlers usually call event.preventDefault()?", options: ["To stop the browser's default full-page reload on submit", "To clear the form fields automatically", "It's required for onChange to work", "To make the component re-render"], correct: 0, explain: "Without preventDefault(), submitting a form triggers the browser's normal navigation/reload behavior, which would wipe out your React app's state. Calling it lets you handle the submission entirely in JavaScript." },
      { type: "code", q: "Wire up this input so typing updates the `query` state — set the value and add an onChange handler.", starter: "function Search() {\n  const [query, setQuery] = useState(\"\");\n  return <input />;\n}", checks: [/value\s*=\s*\{\s*query\s*\}/, /onChange\s*=\s*\{[^}]*setQuery\s*\([^)]*\.target\.value[^)]*\)/], hint: "Add `value={query}` and `onChange={(e) => setQuery(e.target.value)}` as attributes on the <input>.", solution: "function Search() {\n  const [query, setQuery] = useState(\"\");\n  return (\n    <input value={query} onChange={(e) => setQuery(e.target.value)} />\n  );\n}", explain: "`value={query}` makes the input display the current state, and the onChange handler updates that state on every keystroke — that pairing is what makes it a controlled input." }
    ]
  },
  {
    id: "lists-conditionals", title: "Lists, keys & conditional rendering",
    tagline: "Rendering an array of items on screen, and showing or hiding UI based on a condition.",
    blocks: [
      { h: "Rendering a list with map", p: "To turn an array of data into an array of JSX elements, use the regular JavaScript .map() method — no special React syntax required. Each item in the array becomes one element in the output.",
        code: "function FruitList({ fruits }) {\n  return (\n    <ul>\n      {fruits.map((fruit) => (\n        <li key={fruit}>{fruit}</li>\n      ))}\n    </ul>\n  );\n}" },
      { h: "Why keys matter", p: "Each item produced by .map() needs a unique key prop. Keys let React tell items apart between renders, so it can correctly figure out which ones moved, changed, or were added or removed — without it, list updates can behave unpredictably.",
        tip: "A good key is something stable and unique to that item, like a database id. Using the array index as a key works in a pinch for lists that never reorder, but it's best avoided when items can be added, removed, or reordered." },
      { h: "Conditional rendering", p: "Since JSX is just JavaScript, you can use everyday tools like if statements, the ternary operator, or the && operator to decide what to render.",
        code: "function Status({ isLoggedIn }) {\n  return (\n    <div>\n      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}\n      {isLoggedIn && <button>Log out</button>}\n    </div>\n  );\n}" }
    ],
    exercises: [
      { type: "mcq", q: "Why does React want a unique key on each item in a rendered list?", options: ["It's purely cosmetic and has no functional effect", "So React can tell items apart between renders and update the list correctly", "Keys are required by JSX syntax, like closing tags", "To automatically sort the list"], correct: 1, explain: "Keys give React a stable identity for each list item across renders, so it can correctly match up old and new items instead of guessing — which avoids bugs when items are added, removed, or reordered." },
      { type: "code", q: "Render an unordered list of `items` (an array of strings), giving each <li> a key equal to the item itself.", starter: "function List({ items }) {\n  return (\n    <ul>\n\n    </ul>\n  );\n}", checks: [/items\.map\(\s*\(?\s*\w+\s*\)?\s*=>[\s\S]*<li\s+key\s*=\s*\{\s*\w+\s*\}\s*>\s*\{\s*\w+\s*\}\s*<\/li>/], hint: "Use `{items.map((item) => <li key={item}>{item}</li>)}` inside the <ul>.", solution: "function List({ items }) {\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item}>{item}</li>\n      ))}\n    </ul>\n  );\n}", explain: ".map() transforms the array of strings into an array of <li> elements, and the key prop gives each one a stable identity." }
    ]
  },
  {
    id: "effects", title: "Side effects with useEffect",
    tagline: "How to run code in response to a component appearing on screen or a value changing — like fetching data.",
    blocks: [
      { h: "What counts as a 'side effect'", p: "Rendering should just describe what the UI looks like — but sometimes a component needs to reach outside itself: fetching data from a server, setting up a subscription, or manually touching the DOM. These are called side effects, and useEffect is the Hook for running them.",
        code: "import { useEffect, useState } from \"react\";\n\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n\n  useEffect(() => {\n    fetch(\"/api/users/\" + userId)\n      .then((res) => res.json())\n      .then((data) => setUser(data));\n  }, [userId]);\n\n  return <p>{user ? user.name : \"Loading...\"}</p>;\n}" },
      { h: "The dependency array", p: "The second argument to useEffect is a dependency array. React re-runs the effect whenever any value in that array changes since the last render. An empty array `[]` means 'run once, when the component first appears' — leaving the array out entirely means 'run after every render'.",
        tip: "A common beginner mistake is forgetting a dependency. If your effect uses a prop or piece of state, it almost always belongs in the array." },
      { h: "Cleaning up after an effect", p: "If an effect sets something up — like a timer or a subscription — it can return a cleanup function. React calls that cleanup before running the effect again, and when the component is removed from the screen, to prevent leaks.",
        code: "useEffect(() => {\n  const id = setInterval(() => console.log(\"tick\"), 1000);\n  return () => clearInterval(id); // cleanup\n}, []);" }
    ],
    exercises: [
      { type: "mcq", q: "An effect is declared with `useEffect(() => { ... }, [])`. When does it run?", options: ["After every single render, no matter what", "Only once, right after the component first renders", "Never — an empty array disables it", "Only when the component is removed from the screen"], correct: 1, explain: "An empty dependency array tells React there's nothing to watch for changes on, so the effect only runs once, right after the component's first render — commonly used for one-time setup like an initial data fetch." },
      { type: "code", q: "Add a dependency array to this effect so it re-runs only when `userId` changes.", starter: "useEffect(() => {\n  fetchUser(userId);\n});", checks: [/useEffect\s*\(\s*\(\)\s*=>\s*\{[\s\S]*\}\s*,\s*\[\s*userId\s*\]\s*\)/], hint: "Add a comma after the closing brace of the function, then `[userId]`.", solution: "useEffect(() => {\n  fetchUser(userId);\n}, [userId]);", explain: "Listing userId in the dependency array tells React to only re-run this effect when userId actually changes, instead of after every render." }
    ]
  },
  {
    id: "refs", title: "Refs with useRef",
    tagline: "Accessing a DOM node directly, or holding a mutable value that doesn't trigger a re-render.",
    blocks: [
      { h: "What useRef gives you", p: "useRef returns a mutable object with a single `current` property that persists across renders. Unlike state, changing a ref's `current` value does not cause the component to re-render — which makes it useful for values you need to keep around without affecting what's on screen.",
        code: "import { useRef } from \"react\";\n\nfunction Timer() {\n  const countRef = useRef(0);\n  countRef.current += 1; // updates silently, no re-render\n  return null;\n}" },
      { h: "Accessing a DOM element", p: "The most common use of refs is reaching into the actual DOM — for example, focusing an input. Pass the ref to an element's `ref` attribute, and React fills in `current` with that real DOM node once it's mounted.",
        code: "function SearchBox() {\n  const inputRef = useRef(null);\n  function focusInput() {\n    inputRef.current.focus();\n  }\n  return (\n    <>\n      <input ref={inputRef} />\n      <button onClick={focusInput}>Focus</button>\n    </>\n  );\n}" },
      { h: "Refs vs. state", p: "Reach for state when a value's change should be reflected on screen. Reach for a ref when you need to remember something — a DOM node, a timer id, a previous value — without causing (or needing) a re-render.",
        tip: "A common mistake is reading or writing `ref.current` during rendering itself. Refs are meant for event handlers and effects, not for values that drive what gets rendered." }
    ],
    exercises: [
      { type: "mcq", q: "What is the key difference between updating a ref's `current` value and updating state?", options: ["There is no difference", "Updating a ref does not trigger a re-render; updating state does", "Refs can only hold numbers", "Refs are shared between all components"], correct: 1, explain: "Because refs sit outside React's rendering cycle, changing ref.current is silent — it doesn't cause the component to re-render, unlike calling a state setter." },
      { type: "code", q: "Create a ref named boxRef using useRef, and attach it to the div's ref attribute.", starter: "function Box() {\n  return <div></div>;\n}", checks: [/const\s+boxRef\s*=\s*useRef\s*\(/, /<div\s+ref\s*=\s*\{\s*boxRef\s*\}/], hint: "Add `const boxRef = useRef(null);` above the return, then `<div ref={boxRef}></div>`.", solution: "function Box() {\n  const boxRef = useRef(null);\n  return <div ref={boxRef}></div>;\n}", explain: "Passing a ref to an element's `ref` prop tells React to store that DOM node in the ref's `current` property once it mounts." }
    ]
  },
  {
    id: "context", title: "Sharing state with Context",
    tagline: "Passing data through the component tree without threading props down manually through every level.",
    blocks: [
      { h: "The problem: prop drilling", p: "Sometimes a deeply nested component needs a value — like the current user or a theme — that lives many levels up. Passing it down through every intermediate component as a prop, even ones that don't use it themselves, is called prop drilling, and it gets messy fast.",
        tip: "Context isn't meant to replace props everywhere — it's best for values that many components across an app genuinely need, like theme, locale, or the logged-in user." },
      { h: "Creating and providing context", p: "createContext makes a Context object. Wrapping part of your tree in that context's Provider, with a `value` prop, makes that value available to every component nested inside — no matter how deep.",
        code: "import { createContext } from \"react\";\n\nconst ThemeContext = createContext(\"light\");\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}" },
      { h: "Reading context with useContext", p: "Any component inside the Provider can read the current value with the useContext hook, without needing it passed down as a prop at all.",
        code: "import { useContext } from \"react\";\n\nfunction Toolbar() {\n  const theme = useContext(ThemeContext);\n  return <div className={theme}>Toolbar</div>;\n}" }
    ],
    exercises: [
      { type: "mcq", q: "What problem does Context primarily solve?", options: ["Making components render faster", "Avoiding having to pass a value down manually through every intermediate component (prop drilling)", "Replacing useState entirely", "Styling components"], correct: 1, explain: "Context lets any descendant of a Provider read a shared value directly via useContext, sidestepping the need to pass that value down as a prop through components that don't otherwise need it." },
      { type: "code", q: "Read the ThemeContext value inside this component using useContext, storing it in a variable named theme.", starter: "import { useContext } from \"react\";\n\nfunction Label() {\n  return <span></span>;\n}", checks: [/const\s+theme\s*=\s*useContext\s*\(\s*ThemeContext\s*\)/], hint: "Add `const theme = useContext(ThemeContext);` inside the component.", solution: "import { useContext } from \"react\";\n\nfunction Label() {\n  const theme = useContext(ThemeContext);\n  return <span>{theme}</span>;\n}", explain: "useContext(ThemeContext) reads whatever value the nearest enclosing ThemeContext.Provider is currently supplying." }
    ]
  },
  {
    id: "custom-hooks", title: "Custom hooks",
    tagline: "Extracting reusable stateful logic out of a component into a function you can share.",
    blocks: [
      { h: "A custom hook is just a function", p: "A custom hook is a regular JavaScript function whose name starts with `use`, and which can call other hooks inside it. That naming convention is what lets React (and linters) know it follows the rules of hooks.",
        code: "import { useState } from \"react\";\n\nfunction useToggle(initial = false) {\n  const [value, setValue] = useState(initial);\n  const toggle = () => setValue((v) => !v);\n  return [value, toggle];\n}" },
      { h: "Using a custom hook", p: "Once defined, a custom hook is called exactly like a built-in one, and each component that calls it gets its own independent state — calling useToggle in two components doesn't share the same value between them.",
        code: "function Panel() {\n  const [isOpen, toggleOpen] = useToggle();\n  return <button onClick={toggleOpen}>{isOpen ? \"Close\" : \"Open\"}</button>;\n}" },
      { h: "Why bother?", p: "Custom hooks let you pull repeated logic — like tracking window size, or debouncing a value — out of individual components and into one reusable, testable place, keeping components focused on rendering." }
    ],
    exercises: [
      { type: "mcq", q: "What naming convention must a custom hook follow?", options: ["It must end in Hook", "Its name must start with use", "It must be all uppercase", "There's no convention required"], correct: 1, explain: "Starting a function's name with use is how React and tooling (like ESLint's hooks plugin) recognize it as a hook and apply the rules of hooks to it." },
      { type: "code", q: "Write a custom hook named useCounter that returns a count starting at 0 and a function to increment it.", starter: "import { useState } from \"react\";\n\nfunction useCounter() {\n\n}", checks: [/function\s+useCounter\s*\(/, /useState\s*\(\s*0\s*\)/, /return\s*\[\s*count\s*,\s*\w+\s*\]/], hint: "Declare `const [count, setCount] = useState(0);`, then return `[count, () => setCount(count + 1)]`.", solution: "import { useState } from \"react\";\n\nfunction useCounter() {\n  const [count, setCount] = useState(0);\n  const increment = () => setCount(count + 1);\n  return [count, increment];\n}", explain: "useCounter bundles a piece of state and its update logic into one reusable function, which any component can call to get its own independent counter." }
    ]
  },
  {
    id: "performance", title: "Avoiding unnecessary re-renders",
    tagline: "React re-renders eagerly by default — here's how to skip work that doesn't need to happen again.",
    blocks: [
      { h: "Why a component re-renders", p: "By default, when a component's state changes, React re-renders that component and every component nested inside it — even ones whose props didn't actually change. For most apps this is fast enough to never think about, but expensive components can benefit from skipping unnecessary re-renders.",
        tip: "Reach for these tools when you've actually noticed a performance problem — adding them everywhere by default makes code harder to read for little benefit." },
      { h: "memo: skip re-rendering when props are unchanged", p: "Wrapping a component in React.memo makes it skip re-rendering if its props are the same as last time (compared shallowly).",
        code: "import { memo } from \"react\";\n\nconst ExpensiveRow = memo(function ExpensiveRow({ label }) {\n  return <li>{label}</li>;\n});" },
      { h: "useMemo and useCallback", p: "useMemo caches the result of an expensive calculation between renders, only recomputing when its dependencies change. useCallback does the same thing for a function definition — useful when passing a function down to a memoized child, so that child doesn't see a 'new' function on every render.",
        code: "const sorted = useMemo(() => items.slice().sort(), [items]);\nconst handleClick = useCallback(() => doSomething(id), [id]);" }
    ],
    exercises: [
      { type: "mcq", q: "What does wrapping a component in React.memo do?", options: ["Makes it render faster no matter what", "Skips re-rendering that component when its props haven't changed", "Prevents it from ever re-rendering, even if props change", "Caches its data in localStorage"], correct: 1, explain: "memo adds a shallow comparison of the new props against the previous ones — if they're the same, React reuses the last render's output instead of running the component again." },
      { type: "mcq", q: "When is useCallback most useful?", options: ["On every function in every component", "When passing a function as a prop to a memoized child, so it doesn't see a new function reference every render", "Only inside useEffect", "It replaces useState"], correct: 1, explain: "useCallback returns the same function reference across renders (as long as its dependencies don't change), which matters specifically when that function is a prop to a memo-wrapped child that would otherwise re-render every time." }
    ]
  },
  {
    id: "data-fetching", title: "Fetching data with useEffect",
    tagline: "Loading data from a server when a component mounts, and handling loading and error states along the way.",
    blocks: [
      { h: "Fetching on mount", p: "A common pattern is to kick off a fetch inside useEffect with an empty dependency array, so it runs once when the component first appears, storing the result in state.",
        code: "import { useState, useEffect } from \"react\";\n\nfunction Users() {\n  const [users, setUsers] = useState([]);\n  useEffect(() => {\n    fetch(\"/api/users\")\n      .then((res) => res.json())\n      .then(setUsers);\n  }, []);\n  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;\n}" },
      { h: "Tracking loading and error state", p: "A real fetch needs to account for three states: loading, success, and error — usually tracked with their own pieces of state so the UI can show a spinner or an error message appropriately.",
        code: "const [status, setStatus] = useState(\"loading\");\n\nuseEffect(() => {\n  fetch(\"/api/users\")\n    .then((res) => res.json())\n    .then((data) => { setUsers(data); setStatus(\"done\"); })\n    .catch(() => setStatus(\"error\"));\n}, []);" },
      { h: "Cleaning up to avoid a race condition", p: "If a component can re-fetch (for example, when an id prop changes) or unmount before a fetch finishes, an effect's cleanup function should ignore a response that arrives too late, to avoid setting state on stale data.",
        code: "useEffect(() => {\n  let ignore = false;\n  fetch(`/api/users/${id}`).then((res) => res.json()).then((data) => {\n    if (!ignore) setUser(data);\n  });\n  return () => { ignore = true; };\n}, [id]);" }
    ],
    exercises: [
      { type: "mcq", q: "Why does the cleanup function set an `ignore` flag before a fetch that could still be pending?", options: ["To cancel the network request entirely", "To prevent a late-arriving, now-stale response from overwriting more recent state", "It has no real purpose", "To make the fetch run faster"], correct: 1, explain: "If the component re-fetches (say, because an id prop changed) before the previous fetch resolves, the ignore flag stops that outdated response from being applied once it finally arrives." },
      { type: "code", q: "Add an empty dependency array to this useEffect so the fetch only runs once, on mount.", starter: "useEffect(() => {\n  fetch(\"/api/data\").then((res) => res.json()).then(setData);\n});", checks: [/\}\s*,\s*\[\s*\]\s*\)\s*;?\s*$/], hint: "Add `, []` right before the closing parenthesis of useEffect.", solution: "useEffect(() => {\n  fetch(\"/api/data\").then((res) => res.json()).then(setData);\n}, []);", explain: "An empty dependency array tells React this effect doesn't depend on any changing values, so it should only run once, right after the component's first render." }
    ]
  },
  {
    id: "error-boundaries", title: "Error boundaries",
    tagline: "Catching rendering errors in part of your UI so one broken component doesn't crash the whole app.",
    blocks: [
      { h: "What an error boundary does", p: "Without one, a JavaScript error thrown while rendering unmounts the entire component tree, leaving a blank screen. An error boundary is a component that catches errors thrown by its children during rendering, and can show a fallback UI instead of crashing everything.",
        tip: "Error boundaries only catch errors during rendering, in lifecycle methods, and in constructors of the tree below them — not errors inside event handlers, which you catch with a regular try/catch." },
      { h: "Defining one", p: "As of today, error boundaries must be written as a class component, using the static getDerivedStateFromError lifecycle method to update state and render a fallback once an error is caught.",
        code: "class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  render() {\n    if (this.state.hasError) return <h1>Something went wrong.</h1>;\n    return this.props.children;\n  }\n}" },
      { h: "Wrapping parts of your app", p: "You place an error boundary around any section of the UI you want isolated — if a widget deep inside crashes, only that section falls back to its error UI, while the rest of the app keeps working normally.",
        code: "<ErrorBoundary>\n  <Dashboard />\n</ErrorBoundary>" }
    ],
    exercises: [
      { type: "mcq", q: "What kind of errors does an error boundary catch?", options: ["Errors inside event handlers like onClick", "Errors thrown while rendering the component tree beneath it", "Network request failures automatically", "Syntax errors at build time"], correct: 1, explain: "Error boundaries specifically catch errors thrown during rendering (and a few related lifecycle moments) in their child tree — errors inside event handlers need their own try/catch instead." },
      { type: "mcq", q: "Why wrap only part of an app in an error boundary, rather than none at all?", options: ["It makes no difference", "So a crash in that section shows a fallback UI there, while the rest of the app keeps working", "It's required by JavaScript", "To make that section render faster"], correct: 1, explain: "Isolating a risky or complex section behind its own error boundary means a bug there degrades gracefully to a fallback message, instead of taking down the entire application." }
    ]
  },
  {
    id: "portals", title: "Portals",
    tagline: "Rendering a component's output into a different part of the DOM than where it's actually mounted in the tree.",
    blocks: [
      { h: "The problem portals solve", p: "Something like a modal or a tooltip often needs to visually escape its parent's layout — parent containers with `overflow: hidden` or a low z-index can clip or bury it. A portal lets a component render its JSX into a completely different DOM node, while still behaving like a normal child in React's component tree.",
        code: "import { createPortal } from \"react-dom\";\n\nfunction Modal({ children }) {\n  return createPortal(\n    <div className=\"modal\">{children}</div>,\n    document.getElementById(\"modal-root\")\n  );\n}" },
      { h: "Still part of the React tree", p: "Even though a portal's DOM output lives elsewhere in the page, it still participates fully in React's tree for everything else — events bubble up through its actual React ancestors, and it re-renders normally in response to state and prop changes." }
    ],
    exercises: [
      { type: "mcq", q: "What does createPortal let a component do?", options: ["Skip re-rendering entirely", "Render its output into a different DOM node than its parent, while staying in React's component tree", "Fetch data faster", "Avoid using props"], correct: 1, explain: "A portal changes WHERE a component's output physically appears in the DOM, without changing its place in React's logical component tree — event bubbling and context still work as if it were rendered normally." },
      { type: "mcq", q: "Why is a portal commonly used for a modal dialog?", options: ["Modals require a portal to have state", "So the modal can escape parent containers with clipping or stacking issues, like overflow: hidden", "Portals make components render faster", "It's required by JSX syntax"], correct: 1, explain: "A modal rendered inside a deeply nested, possibly clipped or lower-stacked parent can be visually broken. Rendering it through a portal into a top-level DOM node sidesteps that, while the component logically still \"lives\" wherever it was written in the tree." }
    ]
  },
  {
    id: "suspense", title: "Suspense & code-splitting",
    tagline: "Showing a fallback UI while part of your app is still loading — whether that's code or data.",
    blocks: [
      { h: "Lazy loading components", p: "`React.lazy` lets you load a component's code only when it's actually needed, rather than bundling everything into one large file the browser has to download up front — useful for a route or a heavy component that isn't needed on initial load.",
        code: "import { lazy } from \"react\";\n\nconst SettingsPage = lazy(() => import(\"./SettingsPage\"));" },
      { h: "Suspense: a fallback while waiting", p: "A lazily-loaded component isn't available instantly — Suspense lets you declare a fallback UI (like a spinner) to show while React waits for it to finish loading.",
        code: "import { Suspense } from \"react\";\n\n<Suspense fallback={<p>Loading...</p>}>\n  <SettingsPage />\n</Suspense>" },
      { h: "Why this matters for performance", p: "Splitting your app into smaller chunks that load on demand — rather than one giant bundle — means users only download the code they actually need for the page they're currently on, which can meaningfully speed up initial load times." }
    ],
    exercises: [
      { type: "mcq", q: "What does React.lazy allow you to do?", options: ["Delay a component's rendering forever", "Load a component's code only when it's actually needed, instead of all at once", "Skip prop validation", "Automatically cache API responses"], correct: 1, explain: "React.lazy defers fetching a component's code until it's actually rendered, enabling code-splitting — smaller initial bundles, with additional pieces loaded on demand." },
      { type: "code", q: "Wrap this lazily-loaded component in Suspense with a fallback of \"Loading...\".", starter: "const Profile = lazy(() => import(\"./Profile\"));\n\nfunction App() {\n  return <Profile />;\n}", checks: [/<Suspense\s+fallback\s*=\s*\{\s*<[^>]*>\s*Loading\.\.\.\s*<\/[^>]*>\s*\}\s*>[\s\S]*<Profile\s*\/>[\s\S]*<\/Suspense>/], hint: "Wrap `<Profile />` in `<Suspense fallback={<p>Loading...</p>}>...</Suspense>`", solution: "const Profile = lazy(() => import(\"./Profile\"));\n\nfunction App() {\n  return (\n    <Suspense fallback={<p>Loading...</p>}>\n      <Profile />\n    </Suspense>\n  );\n}", explain: "Suspense shows its fallback content while any lazily-loaded descendant (like Profile) is still being fetched, then swaps to the real content automatically once it's ready." }
    ]
  }
  ]
};
