// Shadcn/ui course — full content.
export const shadcnCourse = {
  id: "shadcn",
  title: "Shadcn/ui",
  category: "Frameworks & Libraries",
  summary: "Accessible, unstyled-by-default components you own and customize.",
  comingSoon: false,
  topics: [
  {
    id: "what-is-shadcn", title: "What is shadcn/ui?",
    tagline: "Not a component library you install — a collection of components you copy into your own project and own outright.",
    blocks: [
      { h: "Not your typical npm package", p: "Most component libraries (like Material UI) are installed as a package, and you're stuck styling within whatever system they impose. shadcn/ui works differently: a CLI copies the actual component source code — built with Radix UI primitives and styled with Tailwind — directly into your project.",
        tip: "Because the code lives in your own project, there's no library version to be locked into, and no fighting against someone else's CSS to override a style — you just edit the component file directly." },
      { h: "Built on Radix UI and Tailwind", p: "Under the hood, each shadcn/ui component uses a Radix UI primitive for accessible, unstyled behavior (like focus handling and keyboard navigation for a dropdown), and Tailwind CSS classes for the actual visual styling — which is exactly why it pairs so naturally with a Tailwind project." }
    ],
    exercises: [
      { type: "mcq", q: "How is shadcn/ui fundamentally different from a typical component library?", options: ["It's identical to installing any npm package", "It copies component source code directly into your project, rather than being installed as a versioned dependency", "It only works with Vue", "It doesn't use any styling at all"], correct: 1, explain: "Rather than depending on an external package you update over time, shadcn/ui's CLI adds the actual component source files to your codebase, so you have full, direct control over them." },
      { type: "mcq", q: "What two things does a typical shadcn/ui component combine?", options: ["Vanilla CSS and jQuery", "A Radix UI primitive for behavior/accessibility, and Tailwind CSS for styling", "Bootstrap and SASS", "GraphQL and REST"], correct: 1, explain: "shadcn/ui components pair a Radix UI primitive — which handles accessible, unstyled interaction logic — with Tailwind utility classes for the visual design layer." }
    ]
  },
  {
    id: "cli-install", title: "Installing components with the CLI",
    tagline: "How components actually get added to your project.",
    blocks: [
      { h: "Initializing your project", p: "The `init` command sets up the configuration shadcn/ui needs — where components should go, your Tailwind config, and a few style preferences — asked interactively the first time you run it.",
        code: "npx shadcn@latest init" },
      { h: "Adding a component", p: "The `add` command fetches a specific component's source and drops it into your project — typically under a `components/ui` folder — ready to import and use right away.",
        code: "npx shadcn@latest add button" },
      { h: "Using the component", p: "Once added, you import it like any other local component — because that's exactly what it is now.",
        code: "import { Button } from \"@/components/ui/button\";\n\nfunction Toolbar() {\n  return <Button variant=\"outline\">Save</Button>;\n}" }
    ],
    exercises: [
      { type: "code", q: "Write the CLI command to add the \"dialog\" component to a shadcn/ui project.", starter: "", checks: [/npx\s+shadcn@latest\s+add\s+dialog/], hint: "Use `npx shadcn@latest add dialog`", solution: "npx shadcn@latest add dialog", explain: "The `add` command, followed by the component's name, copies that component's source files into your project." },
      { type: "mcq", q: "After running `npx shadcn@latest add button`, where does the Button component's code end up?", options: ["Downloaded temporarily and deleted after use", "As real source files in your own project, typically under components/ui", "Only in node_modules, like a normal dependency", "It doesn't produce any files"], correct: 1, explain: "Unlike a normal package install, the add command writes actual, editable component source files into your project — commonly under a components/ui directory — which you can then modify freely." }
    ]
  },
  {
    id: "customizing", title: "Customizing components & theming",
    tagline: "Since you own the code, changing how a component looks or behaves is just editing a file.",
    blocks: [
      { h: "Editing a component directly", p: "Want to change a Button's default padding, or add a new variant? Since the component's source is sitting in your own project, you edit it exactly like any other component you wrote yourself — no wrapping, overriding, or fighting specificity required." },
      { h: "Theming with CSS variables", p: "shadcn/ui components reference a set of CSS custom properties (variables) — like `--primary` and `--background` — defined in your global stylesheet. Changing those variables updates the look of every component that uses them, which is how light/dark themes and custom color schemes are typically implemented.",
        code: ":root {\n  --primary: 222.2 47.4% 11.2%;\n  --background: 0 0% 100%;\n}\n\n.dark {\n  --primary: 210 40% 98%;\n  --background: 222.2 84% 4.9%;\n}" }
    ],
    exercises: [
      { type: "mcq", q: "Why is theming shadcn/ui components typically done through CSS variables?", options: ["It's not possible to theme them", "Components reference shared CSS variables like --primary, so changing the variable updates every component using it at once", "Each component needs to be individually recolored", "Only inline styles work"], correct: 1, explain: "Because components reference shared custom properties rather than hardcoded colors, updating a variable's value in your stylesheet (e.g. for a dark theme) cascades that change to every component referencing it." },
      { type: "mcq", q: "If you want to change the default padding on every Button in your app, what do you do?", options: ["Wait for a library update", "Edit the Button component's source file directly, since it lives in your own project", "It's not customizable", "Override it with !important everywhere it's used"], correct: 1, explain: "Because the Button's code is a real file in your project (not a black-boxed dependency), you can open it and change the Tailwind classes directly — the change then applies everywhere that component is used." }
    ]
  },
  {
    id: "forms", title: "Forms with react-hook-form & zod",
    tagline: "The standard shadcn/ui pattern for building forms with validation and helpful error messages.",
    blocks: [
      { h: "Why a form library at all", p: "Managing form state by hand — tracking every field's value, validating on submit, showing the right error under the right field — gets repetitive fast. react-hook-form handles the state and validation wiring, and zod describes the validation rules as a schema.",
        code: "npx shadcn@latest add form" },
      { h: "Defining a schema", p: "A zod schema describes what a valid value looks like for each field — its type, and any extra rules like a minimum length or a valid email format.",
        code: "import { z } from \"zod\";\n\nconst formSchema = z.object({\n  username: z.string().min(2, \"Too short\"),\n  email: z.string().email(\"Invalid email\"),\n});" },
      { h: "Wiring it to the Form component", p: "shadcn/ui's Form component connects react-hook-form to accessible, pre-styled field markup — each FormField renders its label, input, and any validation error message together, driven by the shared form state.",
        code: "const form = useForm({ resolver: zodResolver(formSchema) });\n\n<Form {...form}>\n  <FormField\n    control={form.control}\n    name=\"username\"\n    render={({ field }) => (\n      <FormItem>\n        <FormLabel>Username</FormLabel>\n        <FormControl><Input {...field} /></FormControl>\n        <FormMessage />\n      </FormItem>\n    )}\n  />\n</Form>" }
    ],
    exercises: [
      { type: "mcq", q: "What is zod's role in a shadcn/ui form?", options: ["It renders the input elements", "It defines a schema describing what counts as a valid value for each field", "It handles network requests", "It replaces react-hook-form entirely"], correct: 1, explain: "zod describes the shape and rules a valid form value must satisfy — react-hook-form then uses that schema (via a resolver) to validate the form and surface errors." },
      { type: "code", q: "Add a rule to this zod schema requiring `age` to be a number of at least 18.", starter: "const schema = z.object({\n  name: z.string(),\n});", checks: [/age\s*:\s*z\.number\(\)\.min\(\s*18/], hint: "Add a line: `age: z.number().min(18)`", solution: "const schema = z.object({\n  name: z.string(),\n  age: z.number().min(18),\n});", explain: "z.number().min(18) requires age to be numeric and at least 18 — zod reports a validation error automatically if a submitted value fails either check." }
    ]
  },
  {
    id: "overlays", title: "Dialogs, Sheets & Popovers",
    tagline: "The family of shadcn/ui components that show content layered above the page.",
    blocks: [
      { h: "Dialog: a centered modal", p: "Dialog shows content in a centered modal overlay, typically used for focused tasks like confirming an action or filling out a short form, blocking interaction with the rest of the page until it's dismissed.",
        code: "<Dialog>\n  <DialogTrigger asChild><Button>Edit profile</Button></DialogTrigger>\n  <DialogContent>\n    <DialogHeader><DialogTitle>Edit profile</DialogTitle></DialogHeader>\n    {/* form fields */}\n  </DialogContent>\n</Dialog>" },
      { h: "Sheet: a slide-in panel", p: "Sheet is built on the same Dialog primitive, but slides in from an edge of the screen instead of appearing centered — a common pattern for a mobile-friendly menu or a settings panel." },
      { h: "Popover: anchored, non-blocking content", p: "Unlike Dialog, Popover doesn't block the rest of the page — it shows a small floating panel anchored to a trigger element, useful for things like a color picker or a quick-edit form, and closes when you click outside it." }
    ],
    exercises: [
      { type: "mcq", q: "What's the key behavioral difference between a Dialog and a Popover?", options: ["There is no difference — they're the same component renamed", "A Dialog is a centered, blocking modal; a Popover is a smaller, non-blocking panel anchored to its trigger", "Popover can only contain text", "Dialog is mobile-only"], correct: 1, explain: "Dialog centers itself and blocks interaction with the rest of the page until dismissed, while Popover stays anchored near its trigger element and lets the rest of the page remain interactive." },
      { type: "mcq", q: "What is Sheet typically used for?", options: ["Displaying tabular data only", "A panel that slides in from a screen edge, often for navigation or settings on smaller screens", "Replacing all buttons in an app", "Server-side data fetching"], correct: 1, explain: "Sheet reuses Dialog's underlying behavior but anchors and animates from an edge of the viewport, which is a common pattern for mobile navigation drawers or settings panels." }
    ]
  },
  {
    id: "data-table", title: "Data tables",
    tagline: "Combining shadcn/ui's Table component with TanStack Table for sorting, filtering, and pagination.",
    blocks: [
      { h: "Table is just the markup", p: "shadcn/ui's Table component is a set of styled, semantic table primitives (Table, TableHeader, TableRow, TableCell) — it doesn't handle sorting, filtering, or pagination logic on its own." },
      { h: "Pairing it with TanStack Table", p: "For interactive data tables — sortable columns, filtering, pagination — shadcn/ui's documented pattern pairs its Table markup with TanStack Table (formerly React Table), a 'headless' library that manages all that logic and hands you the resulting rows to render.",
        code: "npx shadcn@latest add table" },
      { h: "Defining columns", p: "TanStack Table works from a column definitions array describing each column's key, header, and optional custom cell rendering — the actual table rows are then generated for you based on your data and those definitions.",
        code: "const columns = [\n  { accessorKey: \"name\", header: \"Name\" },\n  { accessorKey: \"email\", header: \"Email\" },\n];" }
    ],
    exercises: [
      { type: "mcq", q: "Does shadcn/ui's Table component handle sorting and pagination by itself?", options: ["Yes, entirely built in", "No — it provides the styled markup, while logic like sorting and pagination typically comes from pairing it with TanStack Table", "Only sorting, not pagination", "Only in Next.js projects"], correct: 1, explain: "Table is intentionally just presentational primitives. For interactive behavior, shadcn/ui's own docs recommend combining it with TanStack Table, a headless library that manages the actual sorting/filtering/pagination logic." },
      { type: "mcq", q: "In TanStack Table, what does a column definition's accessorKey do?", options: ["Sets the column's width", "Specifies which field on each data row that column should read and display", "Enables sorting for the whole table", "Styles the column's text color"], correct: 1, explain: "accessorKey tells TanStack Table which property of each row object to pull the value from for that particular column." }
    ]
  },
  {
    id: "dark-mode-toggle", title: "Adding a dark mode toggle",
    tagline: "Letting users switch themes, on top of the CSS-variable theming shadcn/ui already sets up.",
    blocks: [
      { h: "next-themes", p: "The common pattern for a shadcn/ui project pairs it with the next-themes library, which manages toggling a `dark` class on the root HTML element and persists the user's choice — despite the name, it works in any React setup, not just Next.js.",
        code: "npm install next-themes" },
      { h: "Wrapping the app in a ThemeProvider", p: "A ThemeProvider near the root of your app makes the current theme available everywhere, and can default to the user's system preference.",
        code: "import { ThemeProvider } from \"next-themes\";\n\n<ThemeProvider attribute=\"class\" defaultTheme=\"system\" enableSystem>\n  <App />\n</ThemeProvider>" },
      { h: "Building the toggle button", p: "The `useTheme` hook exposes the current theme and a setter, which is all a toggle button needs.",
        code: "import { useTheme } from \"next-themes\";\n\nfunction ThemeToggle() {\n  const { theme, setTheme } = useTheme();\n  return (\n    <Button onClick={() => setTheme(theme === \"dark\" ? \"light\" : \"dark\")}>\n      Toggle theme\n    </Button>\n  );\n}" }
    ],
    exercises: [
      { type: "mcq", q: "What does the next-themes library manage for a shadcn/ui project's dark mode?", options: ["It writes all the component styles from scratch", "Toggling a dark class on the root element and persisting the user's theme choice", "It replaces Tailwind entirely", "It only works with a specific font"], correct: 1, explain: "next-themes handles the mechanics of applying and remembering a theme choice — typically by toggling a class on <html> — which then activates the dark: CSS variable overrides shadcn/ui's components already rely on." },
      { type: "code", q: "Use the useTheme hook to set the theme to \"light\" when a button is clicked.", starter: "function LightButton() {\n  const { setTheme } = useTheme();\n  return <Button></Button>;\n}", checks: [/onClick\s*=\s*\{\s*\(\)\s*=>\s*setTheme\s*\(\s*["']light["']\s*\)\s*\}/], hint: "Add `onClick={() => setTheme(\"light\")}` to the Button.", solution: "function LightButton() {\n  const { setTheme } = useTheme();\n  return <Button onClick={() => setTheme(\"light\")}>Light mode</Button>;\n}", explain: "setTheme, from useTheme, directly sets which theme is active — next-themes takes care of updating the class on the root element and persisting the choice." }
    ]
  },
  {
    id: "composing", title: "Composing complex components",
    tagline: "Building a real UI feature by combining several shadcn/ui primitives together.",
    blocks: [
      { h: "Components are meant to be combined", p: "Because every shadcn/ui component is just React and Tailwind, building something more complex — like a settings card with a form inside a Dialog, or a Command palette using Dialog plus a search input — is a matter of composing the smaller pieces you already have, not learning a new API." },
      { h: "An example: a confirm-delete dialog", p: "A common composed pattern: a Dialog whose content includes a description and two Buttons, one styled as a destructive `variant`, wired to call a deletion handler and close the dialog.",
        code: "<Dialog open={open} onOpenChange={setOpen}>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Delete this item?</DialogTitle>\n      <DialogDescription>This action cannot be undone.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <Button variant=\"outline\" onClick={() => setOpen(false)}>Cancel</Button>\n      <Button variant=\"destructive\" onClick={handleDelete}>Delete</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>" }
    ],
    exercises: [
      { type: "mcq", q: "Why is composing shadcn/ui components together straightforward compared to some other UI libraries?", options: ["It isn't — every combination needs custom CSS overrides", "Because every component is plain React and Tailwind classes living in your own project, so combining them is just normal component composition", "Because shadcn/ui provides a special composition API", "Composing components isn't supported"], correct: 1, explain: "Since there's no black-boxed library wrapping the components, nesting a Form inside a Dialog, or building a custom card layout from primitives, works exactly like composing any other React components you've written yourself." },
      { type: "mcq", q: "In the confirm-delete example, what does the destructive variant on the delete Button typically signal?", options: ["That the button is disabled", "A visually distinct style (often red) indicating a dangerous or irreversible action", "That the button submits a form", "Nothing — variant has no visual effect"], correct: 1, explain: "Button's variant prop switches between predefined visual styles; destructive is the conventional choice for actions like permanent deletion, giving the user a visual warning before they click." }
    ]
  },
  {
    id: "cli-internals", title: "The component registry & CLI internals",
    tagline: "A closer look at what's actually happening when you run the shadcn/ui CLI.",
    blocks: [
      { h: "components.json", p: "The `init` command creates a components.json file, recording your project's conventions — where components should be added, whether you use TypeScript, your Tailwind config path, and path aliases — so every later `add` command knows exactly where things go." },
      { h: "The registry", p: "Each component the CLI can install is described by a registry entry: its source files, and any other components or packages it depends on. When you run `add dialog`, the CLI resolves that entry, and any dependencies it needs (like the underlying Radix primitive), and writes them all into your project." },
      { h: "Updating a component", p: "Because components are copied rather than installed as a versioned package, there's no automatic update mechanism. If shadcn/ui improves a component later, picking up that change means re-running `add` (which will prompt before overwriting) or manually applying the diff yourself — the trade-off for full ownership of the code." }
    ],
    exercises: [
      { type: "mcq", q: "What does components.json store?", options: ["Your component's actual source code", "Your project's conventions — paths, TypeScript usage, aliases — so the CLI knows where to put new components", "A list of every npm package installed", "Nothing — it's an empty placeholder file"], correct: 1, explain: "components.json is project-level configuration the init command creates, which every subsequent add command reads so it knows where in your project components should be written." },
      { type: "mcq", q: "Why doesn't shadcn/ui have an automatic \"update this component\" command like a normal package manager would?", options: ["It's a missing feature that will be added eventually", "Because components are copied directly into your project rather than tracked as a versioned dependency, so there's no version to diff against automatically", "Because components never change", "Because it only works with pnpm"], correct: 1, explain: "Since you own the actual source files once they're added, there's no dependency version for a package manager to compare — picking up upstream improvements means re-adding or manually merging changes yourself, trading automatic updates for full control." }
    ]
  }
  ]
};
