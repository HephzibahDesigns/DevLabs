// Tailwind CSS course — full content.
export const tailwindCourse = {
  id: "tailwind",
  title: "Tailwind CSS",
  category: "Frameworks & Libraries",
  summary: "Style directly in your markup with utility classes.",
  comingSoon: false,
  topics: [
  {
    id: "utility-first", title: "The utility-first approach",
    tagline: "Instead of writing custom CSS classes, you compose small, single-purpose classes directly in your HTML.",
    blocks: [
      { h: "A different way of writing CSS", p: "Traditionally, you'd write a CSS class like `.card` and define its padding, background, and border in a separate stylesheet. Tailwind flips that: it gives you many small utility classes — one for padding, one for background color, one for rounded corners — that you combine directly on the element.",
        code: "<div class=\"p-4 bg-white rounded-lg shadow\">\n  <p class=\"text-gray-700\">A card, styled entirely with utility classes.</p>\n</div>" },
      { h: "Why this trade-off is worth it", p: "At first, this can look like it's just moving styles into your markup. The payoff is that you stop inventing new class names and switching files for every small style tweak, and it becomes very hard for unused CSS to pile up, since every class maps to a specific, known utility.",
        tip: "You're not writing new CSS for most changes — you're picking from a fixed vocabulary of utilities, which makes styles predictable and easy to scan." }
    ],
    exercises: [
      { type: "mcq", q: "What is the core idea behind Tailwind's 'utility-first' approach?", options: ["Writing large custom CSS classes for each component", "Composing many small, single-purpose classes directly in your markup", "Avoiding CSS entirely in favor of inline styles", "Using only pre-built component libraries"], correct: 1, explain: "Rather than authoring custom named classes per component, Tailwind provides a large set of small utility classes — each handling one concern, like spacing or color — that you combine directly on elements." },
      { type: "code", q: "Add classes to give this div padding of 4 and a rounded-lg corner style.", starter: "<div>\n  Content\n</div>", checks: [/class\s*=\s*["'][^"']*\bp-4\b[^"']*\brounded-lg\b[^"']*["']/], hint: "Add `class=\"p-4 rounded-lg\"` to the div.", solution: "<div class=\"p-4 rounded-lg\">\n  Content\n</div>", explain: "p-4 applies padding on all sides, and rounded-lg applies a moderately rounded border-radius — both are standalone utility classes you combine as needed." }
    ]
  },
  {
    id: "core-utilities", title: "Core utilities: spacing, color, typography",
    tagline: "The handful of utility categories you'll reach for on nearly every element.",
    blocks: [
      { h: "Spacing: padding and margin", p: "Classes like `p-4` (padding) and `m-2` (margin) use a consistent numeric scale. You can also target one side specifically — `pt-4` for padding-top, `mx-auto` for margin left and right (commonly used to center a block).",
        code: "<div class=\"mx-auto p-6\">Centered, with padding</div>" },
      { h: "Color utilities", p: "Color classes follow a `property-color-shade` pattern, like `text-blue-600` or `bg-gray-100` — the number is a shade from a consistent palette, where higher numbers are darker.",
        code: "<button class=\"bg-blue-600 text-white\">Save</button>" },
      { h: "Typography", p: "Text size (`text-sm`, `text-xl`), weight (`font-bold`, `font-medium`), and alignment (`text-center`) all have their own utility classes, letting you compose typographic styles piece by piece.",
        code: "<h1 class=\"text-2xl font-bold text-center\">Page Title</h1>" }
    ],
    exercises: [
      { type: "mcq", q: "In `bg-blue-600`, what does the number 600 represent?", options: ["A pixel size", "A shade of blue on Tailwind's color scale — higher numbers are darker", "The z-index", "A font weight"], correct: 1, explain: "Tailwind's color utilities use a numeric shade scale (typically 50 to 900) for each color — 600 is a mid-to-dark shade of blue, with higher numbers indicating darker shades." },
      { type: "code", q: "Style this button with a green background (bg-green-600), white text, and bold font.", starter: "<button>\n  Confirm\n</button>", checks: [/class\s*=\s*["'][^"']*bg-green-600[^"']*text-white[^"']*font-bold[^"']*["']/], hint: "Add `class=\"bg-green-600 text-white font-bold\"` to the button (order of classes doesn't matter).", solution: "<button class=\"bg-green-600 text-white font-bold\">\n  Confirm\n</button>", explain: "bg-green-600 sets the background, text-white sets the text color, and font-bold sets the font weight — three independent utilities stacked together." }
    ]
  },
  {
    id: "responsive", title: "Responsive design",
    tagline: "Adjusting styles at different screen widths using Tailwind's breakpoint prefixes.",
    blocks: [
      { h: "Mobile-first breakpoints", p: "A class with no prefix applies at all screen sizes. Adding a breakpoint prefix like `md:` or `lg:` makes that class apply only from that screen width upward — Tailwind is mobile-first, so you style the small screen first, then layer on overrides for bigger ones.",
        code: "<div class=\"text-base md:text-lg lg:text-xl\">\n  Grows on larger screens\n</div>" },
      { h: "The standard breakpoints", p: "Tailwind ships with a default set of breakpoints — sm (640px), md (768px), lg (1024px), xl (1280px), and 2xl (1536px) — that you can also customize in your config if your project needs different values." }
    ],
    exercises: [
      { type: "mcq", q: "What does the class `md:hidden` do?", options: ["Hides the element at all screen sizes", "Hides the element from the md breakpoint upward", "Only affects the md color palette", "Is invalid syntax"], correct: 1, explain: "The md: prefix applies its class starting at the md breakpoint and up. So md:hidden hides the element on medium screens and larger, while leaving it visible below that width." },
      { type: "code", q: "Make this div stack full width on small screens but only take half width (w-1/2) from the md breakpoint up.", starter: "<div class=\"w-full\">\n</div>", checks: [/class\s*=\s*["'][^"']*w-full[^"']*md:w-1\/2[^"']*["']/], hint: "Add `md:w-1/2` after `w-full` in the class list.", solution: "<div class=\"w-full md:w-1/2\">\n</div>", explain: "w-full applies by default (mobile-first), and md:w-1/2 overrides it starting at the md breakpoint, so the element only becomes half-width on medium screens and up." }
    ]
  },
  {
    id: "states", title: "Hover, focus & other states",
    tagline: "Styling interactive states — like hover and focus — without writing separate CSS rules.",
    blocks: [
      { h: "State prefixes", p: "Just like responsive prefixes, state prefixes like `hover:` and `focus:` apply a class only in that specific state. This keeps all of an element's possible appearances declared together in one place.",
        code: "<button class=\"bg-blue-600 hover:bg-blue-700 focus:ring-2\">\n  Submit\n</button>" },
      { h: "Combining prefixes", p: "Prefixes can be stacked, so you can target very specific combinations — like a hover state that only applies on larger screens.",
        code: "<button class=\"lg:hover:bg-blue-700\">Desktop-only hover</button>" }
    ],
    exercises: [
      { type: "mcq", q: "What does `hover:bg-blue-700` do?", options: ["Applies a blue background always", "Applies that background color only while the element is being hovered", "Removes the background on hover", "Is only valid on buttons"], correct: 1, explain: "The hover: prefix makes its class apply conditionally — only while the user's cursor is hovering over the element — leaving the base (unprefixed) classes in effect the rest of the time." },
      { type: "code", q: "Add a hover state to this link that changes text color to blue-600.", starter: "<a class=\"text-gray-700\">Read more</a>", checks: [/class\s*=\s*["'][^"']*text-gray-700[^"']*hover:text-blue-600[^"']*["']/], hint: "Add `hover:text-blue-600` to the class list.", solution: "<a class=\"text-gray-700 hover:text-blue-600\">Read more</a>", explain: "text-gray-700 is the default color, and hover:text-blue-600 overrides it only while the link is hovered." }
    ]
  },
  {
    id: "customizing", title: "Customizing & dark mode",
    tagline: "Extending Tailwind's defaults to match your own design system, and supporting a dark theme.",
    blocks: [
      { h: "Extending the theme", p: "Rather than fighting Tailwind's defaults, `tailwind.config.js` lets you extend the theme with your own values — custom colors, spacing, or fonts — which then become available as utility classes, just like the built-in ones.",
        code: "// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        brand: \"#5b4fff\",\n      },\n    },\n  },\n};\n\n// now usable as:\n// <div class=\"bg-brand\">" },
      { h: "Dark mode support", p: "Tailwind supports a `dark:` variant, similar to hover or responsive prefixes, that applies a class only when dark mode is active — either based on the user's system setting, or a class toggled manually, depending on your config.",
        code: "<div class=\"bg-white dark:bg-gray-900 text-black dark:text-white\">\n  Adapts to the user's theme\n</div>" }
    ],
    exercises: [
      { type: "mcq", q: "Where would you add a custom brand color so it becomes usable as a Tailwind utility class?", options: ["Directly in your HTML, inline", "In tailwind.config.js, under theme.extend.colors", "It isn't possible to add custom colors", "In a separate .css file only"], correct: 1, explain: "Extending theme.extend.colors in tailwind.config.js registers a new color that Tailwind then generates utility classes for — e.g. bg-brand, text-brand — just like its built-in colors." },
      { type: "code", q: "Add a dark-mode text color of white to this element, which currently only sets a light-mode text color of black.", starter: "<p class=\"text-black\">Hello</p>", checks: [/class\s*=\s*["'][^"']*text-black[^"']*dark:text-white[^"']*["']/], hint: "Add `dark:text-white` after `text-black`.", solution: "<p class=\"text-black dark:text-white\">Hello</p>", explain: "text-black is the default, and dark:text-white overrides it specifically when dark mode is active — both can be declared side by side." }
    ]
  },
  {
    id: "flexbox-grid", title: "Flexbox & Grid layout",
    tagline: "Building real layouts using Tailwind's flex and grid utility classes.",
    blocks: [
      { h: "Flex container utilities", p: "Adding `flex` to an element turns it into a flex container. From there, `flex-row` / `flex-col` set the direction, `items-*` controls cross-axis alignment, `justify-*` controls main-axis alignment, and `gap-*` adds spacing between children.",
        code: "<div class=\"flex items-center justify-between gap-4\">\n  <span>Left</span>\n  <span>Right</span>\n</div>" },
      { h: "Grid utilities", p: "`grid` turns an element into a grid container, and `grid-cols-*` sets how many equal-width columns it has. Individual items can span multiple columns with `col-span-*`.",
        code: "<div class=\"grid grid-cols-3 gap-4\">\n  <div class=\"col-span-2\">Wide</div>\n  <div>Normal</div>\n</div>" },
      { h: "Choosing between them", p: "A rough rule of thumb: reach for flex when arranging items along a single row or column (like a navbar), and grid when you're laying out a two-dimensional structure with both rows and columns (like a card gallery)." }
    ],
    exercises: [
      { type: "mcq", q: "Which class turns an element into a grid container with three equal columns?", options: ["flex-cols-3", "grid grid-cols-3", "grid-3", "columns-3-grid"], correct: 1, explain: "grid enables CSS Grid on the element, and grid-cols-3 divides it into three equal-width columns — both classes are needed together." },
      { type: "code", q: "Make this div a flex row that centers its children on both axes, with a gap of 4 between them.", starter: "<div>\n  <span>A</span>\n  <span>B</span>\n</div>", checks: [/class\s*=\s*["'][^"']*\bflex\b[^"']*items-center[^"']*justify-center[^"']*gap-4[^"']*["']/], hint: "Add `class=\"flex items-center justify-center gap-4\"`.", solution: "<div class=\"flex items-center justify-center gap-4\">\n  <span>A</span>\n  <span>B</span>\n</div>", explain: "flex enables flexbox, items-center and justify-center center content on the cross and main axes respectively, and gap-4 spaces the children apart." }
    ]
  },
  {
    id: "sizing-layout", title: "Sizing & positioning",
    tagline: "Controlling an element's width, height, and where it sits relative to its surroundings.",
    blocks: [
      { h: "Width and height", p: "`w-*` and `h-*` set width and height, using the same numeric scale as spacing, plus special values like `w-full` (100%), `w-screen` (100vw), and fractional values like `w-1/2`.",
        code: "<div class=\"w-1/2 h-32 bg-slate-200\"></div>" },
      { h: "Positioning", p: "`relative`, `absolute`, `fixed`, and `sticky` map directly to their CSS position values. Combined with `top-*`, `right-*`, `bottom-*`, and `left-*`, they let you place an element precisely, typically relative to the nearest `relative`-positioned ancestor.",
        code: "<div class=\"relative\">\n  <span class=\"absolute top-0 right-0\">badge</span>\n</div>" }
    ],
    exercises: [
      { type: "mcq", q: "For an absolutely positioned child to be placed relative to its parent (not the whole page), what does the parent typically need?", options: ["Nothing extra is needed", "The class `relative`, establishing a positioning context", "The class `hidden`", "position doesn't matter"], correct: 1, explain: "An absolutely positioned element is placed relative to its nearest ancestor that has a position other than static — adding `relative` to the parent is the usual way to establish that." },
      { type: "code", q: "Give this span absolute positioning, pinned to the top-right corner (top-0 right-0).", starter: "<div class=\"relative\">\n  <span>New</span>\n</div>", checks: [/class\s*=\s*["'][^"']*\babsolute\b[^"']*top-0[^"']*right-0[^"']*["']/], hint: "Add `class=\"absolute top-0 right-0\"` to the span.", solution: "<div class=\"relative\">\n  <span class=\"absolute top-0 right-0\">New</span>\n</div>", explain: "absolute takes the span out of normal document flow, and top-0 right-0 pin it exactly to the top-right corner of its relative-positioned parent." }
    ]
  },
  {
    id: "apply-components", title: "Extracting repeated styles",
    tagline: "What to do when the same long string of utility classes keeps showing up across your markup.",
    blocks: [
      { h: "The component-based approach", p: "In frameworks like React, the most common way to avoid repeating a long className string is exactly what you'd do with any repeated markup: extract it into its own component once, and reuse that component everywhere.",
        code: "function Button({ children, ...props }) {\n  return (\n    <button className=\"px-4 py-2 rounded-lg bg-blue-600 text-white font-medium\" {...props}>\n      {children}\n    </button>\n  );\n}" },
      { h: "@apply, for plain CSS contexts", p: "In a plain CSS file (not a component-based framework), Tailwind's `@apply` directive lets you fold a set of utility classes into one custom class name, for cases where extracting a component isn't an option.",
        code: "/* styles.css */\n.btn {\n  @apply px-4 py-2 rounded-lg bg-blue-600 text-white font-medium;\n}" },
      { h: "Which to prefer", p: "Tailwind's own guidance leans toward the component approach wherever you're already using a component-based framework — @apply is best reserved for genuinely global, framework-agnostic styles, since overusing it starts to recreate the very problem utility classes were meant to avoid." }
    ],
    exercises: [
      { type: "mcq", q: "In a React project, what's generally the preferred way to avoid repeating a long utility class string?", options: ["Always use @apply instead of components", "Extract a reusable component that already includes those classes", "Copy and paste the class string everywhere", "Avoid Tailwind entirely"], correct: 1, explain: "Since React (and similar frameworks) already solve markup duplication with components, wrapping a styled element in its own component is usually simpler and more idiomatic than reaching for @apply." },
      { type: "code", q: "Use @apply inside this .card class to apply p-4, rounded-lg, and bg-white.", starter: ".card {\n\n}", checks: [/@apply\s+p-4\s+rounded-lg\s+bg-white\s*;/], hint: "Write `@apply p-4 rounded-lg bg-white;` inside the .card rule.", solution: ".card {\n  @apply p-4 rounded-lg bg-white;\n}", explain: "@apply lets a plain CSS class pull in a set of utility classes, effectively giving that class the combined effect of all three." }
    ]
  },
  {
    id: "arbitrary-values", title: "Arbitrary values",
    tagline: "Escaping the default scale for the rare case when you need an exact, one-off value.",
    blocks: [
      { h: "Square-bracket syntax", p: "When none of Tailwind's preset values fit — an exact pixel width from a design file, say — square brackets let you specify any arbitrary CSS value directly inside a utility class name.",
        code: "<div class=\"w-[327px] top-[13px]\"></div>" },
      { h: "Arbitrary values work across most utilities", p: "This isn't limited to sizing — colors, grid templates, and many other utilities accept the same bracket syntax for a one-off value that doesn't exist in the default theme.",
        code: "<div class=\"bg-[#1da1f2] grid-cols-[200px_1fr]\"></div>" },
      { h: "Use sparingly", p: "Arbitrary values are meant for genuine exceptions. Reaching for them constantly is usually a sign the value should instead be added to your theme in tailwind.config.js, so it's consistent and reusable across the project." }
    ],
    exercises: [
      { type: "mcq", q: "What is the main purpose of Tailwind's square-bracket arbitrary value syntax, like w-[327px]?", options: ["To disable that utility", "To specify a one-off exact value outside the default preset scale", "It's only for colors", "It's required for every class"], correct: 1, explain: "Square brackets let a utility accept any CSS value directly, for the specific cases where the built-in scale (like w-1, w-2, w-4...) doesn't have the exact value you need." },
      { type: "code", q: "Give this div an exact width of 250px using arbitrary value syntax.", starter: "<div>\n</div>", checks: [/class\s*=\s*["']w-\[250px\]["']/], hint: "Use `class=\"w-[250px]\"`.", solution: "<div class=\"w-[250px]\">\n</div>", explain: "w-[250px] sets the width to exactly 250 pixels, using square brackets to pass an arbitrary value straight through to the generated CSS." }
    ]
  },
  {
    id: "animations", title: "Animations & transitions",
    tagline: "Smoothly animating changes in style, and applying a handful of ready-made animations out of the box.",
    blocks: [
      { h: "transition utilities", p: "Classes like `transition`, `duration-300`, and `ease-in-out` make style changes (triggered by, say, a hover: class) animate smoothly instead of snapping instantly.",
        code: "<button class=\"bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out\">\n  Hover me\n</button>" },
      { h: "Built-in animations", p: "Tailwind ships a few ready-made keyframe animations as utility classes — `animate-spin` for a loading spinner, `animate-pulse` for a loading skeleton, and `animate-bounce`.",
        code: "<div class=\"animate-spin h-6 w-6 border-2 border-blue-600 rounded-full\"></div>" }
    ],
    exercises: [
      { type: "mcq", q: "What does adding the `transition` class to an element do?", options: ["Nothing by itself — it just enables smooth animation for subsequent style changes, like a hover state", "Immediately animates the element on page load", "Removes all existing styles", "Only works with color changes"], correct: 0, explain: "transition, on its own, tells the browser to animate certain property changes smoothly rather than instantly — but it needs an actual change to animate, like a hover: or focus: class swapping in different styles." },
      { type: "code", q: "Add a spinning loading indicator using Tailwind's built-in animate-spin utility on this div.", starter: "<div class=\"h-6 w-6 border-2 rounded-full\">\n</div>", checks: [/class\s*=\s*["'][^"']*animate-spin[^"']*["']/], hint: "Add `animate-spin` to the class list.", solution: "<div class=\"h-6 w-6 border-2 rounded-full animate-spin\">\n</div>", explain: "animate-spin applies Tailwind's built-in spinning keyframe animation — a common, ready-made way to build a loading spinner without writing any custom CSS." }
    ]
  },
  {
    id: "plugins-layer", title: "Plugins & @layer",
    tagline: "Extending Tailwind with reusable custom utilities and components, and organizing custom CSS alongside Tailwind's own.",
    blocks: [
      { h: "The @layer directive", p: "When you do need to write custom CSS alongside Tailwind, `@layer` tells Tailwind which \"bucket\" it belongs in — base, components, or utilities — so it's ordered correctly relative to Tailwind's own generated styles, and properly removed if unused.",
        code: "@layer components {\n  .btn-primary {\n    @apply bg-blue-600 text-white px-4 py-2 rounded-lg;\n  }\n}" },
      { h: "Plugins", p: "A Tailwind plugin is a JavaScript function that can register new utility classes, components, or variants, extending what's available in your project beyond the built-in defaults. Official plugins exist for things like typography and forms styling.",
        code: "// tailwind.config.js\nmodule.exports = {\n  plugins: [require(\"@tailwindcss/typography\")],\n};" }
    ],
    exercises: [
      { type: "mcq", q: "What does wrapping custom CSS in @layer components accomplish?", options: ["It has no effect at all", "It tells Tailwind which category the styles belong to, so ordering and unused-style removal work correctly", "It makes the CSS load faster", "It's required for all custom CSS to work"], correct: 1, explain: "@layer places your custom rules into the same layering system Tailwind uses internally (base, components, utilities), ensuring predictable cascade order and correct behavior when Tailwind strips out unused styles during a build." },
      { type: "mcq", q: "What is a Tailwind plugin?", options: ["A browser extension", "A JavaScript function that can register new utility classes, components, or variants for your project", "A separate CSS framework", "A VS Code extension only"], correct: 1, explain: "Plugins hook into Tailwind's build process to add capabilities beyond the defaults — like the official typography plugin, which adds prose classes for nicely styled long-form text content." }
    ]
  }
  ]
};
