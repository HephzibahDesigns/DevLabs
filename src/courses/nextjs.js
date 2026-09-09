// Next.js course — full content.
export const nextjsCourse = {
  id: "nextjs",
  title: "Next.js",
  category: "Frameworks & Libraries",
  summary: "The React framework for routing, rendering, and full-stack apps.",
  comingSoon: false,
  topics: [
  {
    id: "what-is-nextjs", title: "What is Next.js?",
    tagline: "React handles components — Next.js adds everything around them: routing, rendering, and a backend.",
    blocks: [
      { h: "React is a library, Next.js is a framework", p: "React gives you components and state, but it doesn't decide how pages are organized, how data gets fetched, or how your app is served to the browser. Next.js is a framework built on top of React that answers those questions for you, with sensible defaults, so you spend less time wiring up infrastructure.",
        tip: "A useful mental model: React is the engine, Next.js is the whole car — routing, data fetching, and deployment all come built in." },
      { h: "What Next.js gives you out of the box", p: "The big pieces are: file-based routing (a file in your project becomes a URL), a choice of rendering a page on the server or the client, built-in API routes for backend logic, and an optimized production build process — all without you having to assemble these tools yourself." },
      { h: "The App Router", p: "Modern Next.js projects organize routes inside an `app` directory, using a convention called the App Router. Each folder inside `app` can represent a URL segment, and special files inside that folder (like `page.js`) define what renders there." }
    ],
    exercises: [
      { type: "mcq", q: "What is the relationship between React and Next.js?", options: ["They are unrelated, competing tools", "Next.js is a framework built on top of React, adding routing, rendering, and more", "React is built on top of Next.js", "Next.js replaces the need to know JavaScript"], correct: 1, explain: "Next.js uses React for components, and layers on the parts a real application needs beyond components alone: routing, data fetching strategies, and a production build pipeline." },
      { type: "mcq", q: "In the App Router, which directory holds your route folders and files by convention?", options: ["src/routes", "pages", "app", "components"], correct: 2, explain: "The App Router convention organizes routes inside an `app` directory — each folder can represent a segment of the URL, with special files like `page.js` defining what renders." }
    ]
  },
  {
    id: "routing", title: "File-based routing",
    tagline: "In Next.js, the files and folders you create automatically become the URLs of your app.",
    blocks: [
      { h: "Folders become URL segments", p: "Inside the `app` directory, each folder maps to a segment of the URL. A `page.js` (or `page.tsx`) file inside a folder is what actually renders when a visitor lands on that route.",
        code: "app/\n  page.js          -> \"/\"\n  about/\n    page.js        -> \"/about\"\n  blog/\n    page.js        -> \"/blog\"" },
      { h: "Dynamic routes", p: "Wrapping a folder name in square brackets creates a dynamic segment — a placeholder that matches any value at that position in the URL, like a blog post's slug or a product's id.",
        code: "app/\n  blog/\n    [slug]/\n      page.js        -> \"/blog/anything-here\"" },
      { h: "Reading a dynamic route's value", p: "Inside a page, Next.js passes route information through a `params` prop, so you can read whatever value matched the dynamic segment.",
        code: "export default function BlogPost({ params }) {\n  return <h1>Post: {params.slug}</h1>;\n}" },
      { h: "Linking between pages", p: "Instead of a plain `<a>` tag, Next.js provides a `Link` component. It behaves like a normal link but enables fast, client-side navigation between pages instead of a full page reload.",
        code: "import Link from \"next/link\";\n\n<Link href=\"/about\">About us</Link>" }
    ],
    exercises: [
      { type: "mcq", q: "To create a route at `/contact`, where should you put the page file?", options: ["app/contact/page.js", "pages/contact.html", "routes/contact.js", "components/Contact.js"], correct: 0, explain: "In the App Router, a folder inside `app` named after the desired URL segment — here `contact` — with a `page.js` file inside it, becomes the route `/contact`." },
      { type: "code", q: "Write a folder path (as a comment) for a dynamic route that would match \"/products/anything\" — using square-bracket syntax.", starter: "// app/", checks: [/app\/products\/\[\s*\w+\s*\]\/page\.(js|jsx|tsx)/], hint: "The dynamic segment goes in square brackets, e.g. `app/products/[id]/page.js`", solution: "// app/products/[id]/page.js", explain: "Square brackets around a folder name — like [id] — create a dynamic segment that matches any value in that position of the URL." }
    ]
  },
  {
    id: "server-client", title: "Server & Client Components",
    tagline: "Next.js renders components on the server by default — here's what that means and when you need the client instead.",
    blocks: [
      { h: "Server Components are the default", p: "In the App Router, every component is a Server Component unless you say otherwise. Server Components render on the server, so their code — and anything they import — never gets shipped to the browser, which keeps your app's JavaScript bundle smaller.",
        tip: "Server Components are great for anything that doesn't need interactivity: fetching data, reading files, or rendering static content." },
      { h: "Client Components: opting in to the browser", p: "Some things only work in the browser: onClick handlers, useState, useEffect. To use those, mark a file with a `\"use client\"` directive at the very top — this tells Next.js to also send that component's JavaScript to the browser so it can run there.",
        code: "\"use client\";\n\nimport { useState } from \"react\";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}" },
      { h: "Choosing between them", p: "A helpful rule of thumb: default to Server Components, and only add `\"use client\"` to the specific components that actually need interactivity, state, or browser-only APIs. This keeps as much of your app as possible fast and lightweight." }
    ],
    exercises: [
      { type: "mcq", q: "Why might a component need the `\"use client\"` directive?", options: ["To make it load faster", "Because it uses useState, useEffect, or event handlers like onClick", "It's required at the top of every single file in a Next.js app", "To fetch data from a database"], correct: 1, explain: "`\"use client\"` opts a component into running in the browser, which is required for interactivity — state, effects, and event handlers only work there, not on the server." },
      { type: "code", q: "Add the directive needed to make this a Client Component.", starter: "import { useState } from \"react\";\n\nexport default function Toggle() {\n  const [on, setOn] = useState(false);\n  return <button onClick={() => setOn(!on)}>{on ? \"On\" : \"Off\"}</button>;\n}", checks: [/^\s*["']use client["'];?/], hint: "Add `\"use client\";` as the very first line of the file, before any imports.", solution: "\"use client\";\n\nimport { useState } from \"react\";\n\nexport default function Toggle() {\n  const [on, setOn] = useState(false);\n  return <button onClick={() => setOn(!on)}>{on ? \"On\" : \"Off\"}</button>;\n}", explain: "Since this component uses useState and an onClick handler, it needs to run in the browser — the \"use client\" directive at the top of the file makes that happen." }
    ]
  },
  {
    id: "data-fetching", title: "Data fetching",
    tagline: "How Server Components pull in data directly, without needing a separate API layer just to render a page.",
    blocks: [
      { h: "Fetching data directly in a Server Component", p: "Because Server Components run on the server, they can use `async`/`await` directly inside the component itself to fetch data — no useEffect, no loading state juggling required for the initial render.",
        code: "export default async function Posts() {\n  const res = await fetch(\"https://api.example.com/posts\");\n  const posts = await res.json();\n\n  return (\n    <ul>\n      {posts.map((post) => (\n        <li key={post.id}>{post.title}</li>\n      ))}\n    </ul>\n  );\n}" },
      { h: "Caching behavior", p: "Next.js extends the built-in `fetch` function with caching options. By default, fetches are often cached and reused across requests, but you can control this explicitly — for example, forcing a fresh fetch every time with `{ cache: \"no-store\" }`.",
        code: "const res = await fetch(\"https://api.example.com/posts\", {\n  cache: \"no-store\", // always fetch fresh data\n});" }
    ],
    exercises: [
      { type: "mcq", q: "What lets a Server Component fetch data directly in its body, without useEffect?", options: ["A special Next.js-only syntax unrelated to JavaScript", "The component itself can be declared async and use await, since it runs on the server", "Server Components cannot fetch data at all", "You must always use a separate API route first"], correct: 1, explain: "Because Server Components render on the server rather than in the browser, they can simply be async functions and await a fetch call directly — there's no need for useEffect, which exists to handle side effects safely in the browser." },
      { type: "code", q: "Add fetch options so this request always fetches fresh data instead of using the cache.", starter: "const res = await fetch(\"https://api.example.com/posts\");", checks: [/fetch\s*\(\s*["'`][^"'`]+["'`]\s*,\s*\{\s*cache\s*:\s*["']no-store["']\s*\}\s*\)/], hint: "Add a second argument to fetch: `{ cache: \"no-store\" }`", solution: "const res = await fetch(\"https://api.example.com/posts\", { cache: \"no-store\" });", explain: "Passing `{ cache: \"no-store\" }` as fetch's second argument tells Next.js to skip its caching layer and fetch fresh data on every request." }
    ]
  },
  {
    id: "layouts", title: "Layouts & navigation",
    tagline: "Sharing UI, like a header or sidebar, across multiple pages without repeating yourself.",
    blocks: [
      { h: "layout.js: UI shared across a section of your app", p: "A `layout.js` file wraps every page inside its folder (and any nested folders), so you can define shared UI — like a navigation bar — once. Layouts receive a `children` prop, which is where the matching page gets rendered.",
        code: "export default function DashboardLayout({ children }) {\n  return (\n    <div>\n      <nav>Dashboard nav</nav>\n      <main>{children}</main>\n    </div>\n  );\n}" },
      { h: "Nested layouts", p: "Layouts can nest: a root layout wraps your entire app, and folders further down can add their own layout, which wraps just that section. Each layout only re-renders when something inside its own section changes, which keeps navigation fast." },
      { h: "The root layout is required", p: "Every Next.js App Router project needs a root `app/layout.js`, since it defines the outermost HTML structure — including the `<html>` and `<body>` tags — that every single page shares." }
    ],
    exercises: [
      { type: "mcq", q: "What prop does a layout.js file receive to know where to render the current page?", options: ["page", "content", "children", "slot"], correct: 2, explain: "A layout component receives its wrapped page (or nested layout) through the `children` prop, exactly like any other React component that wraps other content." },
      { type: "mcq", q: "Why is a root layout.js required in every App Router project?", options: ["It's optional and rarely used", "It defines the outermost HTML structure, including <html> and <body>, shared by every page", "It only matters for API routes", "It replaces the need for page.js files"], correct: 1, explain: "Because Next.js doesn't add a surrounding HTML document for you automatically, the root layout is where you declare the <html> and <body> tags that wrap the entire app." }
    ]
  },
  {
    id: "route-handlers", title: "Route Handlers (API endpoints)",
    tagline: "Defining your own backend endpoints, right inside the same app directory as your pages.",
    blocks: [
      { h: "A route.js file becomes an API endpoint", p: "Instead of page.js, a folder inside app can contain a route.js file — this makes that URL an API endpoint rather than a page, letting you handle raw HTTP requests and return your own response, such as JSON.",
        code: "app/\n  api/\n    users/\n      route.js       -> \"/api/users\"" },
      { h: "Handling different HTTP methods", p: "A route.js file exports a function named after the HTTP method it handles — GET, POST, PUT, DELETE, and so on. Next.js calls the matching export based on the incoming request's method.",
        code: "export async function GET() {\n  const users = await getUsersFromDb();\n  return Response.json(users);\n}\n\nexport async function POST(request) {\n  const body = await request.json();\n  const user = await createUser(body);\n  return Response.json(user, { status: 201 });\n}" },
      { h: "When to use a Route Handler vs. fetching directly", p: "Server Components can already fetch data directly, so Route Handlers are mainly for cases where you need a real HTTP endpoint — for a webhook, a mobile app to call, or a form that posts data from the client side." }
    ],
    exercises: [
      { type: "mcq", q: "What determines which exported function inside route.js handles an incoming request?", options: ["The file's name", "The HTTP method of the request — GET, POST, etc. — matches the corresponding named export", "Whichever function is listed first", "It always runs every exported function"], correct: 1, explain: "Next.js looks at the incoming request's HTTP method and calls the export with that exact name — a GET request calls the exported GET function, a POST calls POST, and so on." },
      { type: "code", q: "Write a GET route handler function that returns the JSON { status: \"ok\" }.", starter: "export async function GET() {\n\n}", checks: [/return\s+Response\.json\s*\(\s*\{\s*status\s*:\s*["']ok["']\s*\}\s*\)/], hint: "Use `return Response.json({ status: \"ok\" });`", solution: "export async function GET() {\n  return Response.json({ status: \"ok\" });\n}", explain: "Response.json() is a convenient shorthand for building a Response whose body is JSON, with the right content-type header already set." }
    ]
  },
  {
    id: "server-actions", title: "Server Actions",
    tagline: "Running server-side code directly from a form or a button click, without hand-building an API route.",
    blocks: [
      { h: "What a Server Action is", p: "A Server Action is a function marked with a \"use server\" directive that runs only on the server, but can be called directly from a Client Component — for example, as a form's action — without you setting up a separate API endpoint.",
        code: "// actions.js\n\"use server\";\n\nexport async function createPost(formData) {\n  const title = formData.get(\"title\");\n  await db.post.create({ data: { title } });\n}" },
      { h: "Using it on a form", p: "Passing a Server Action directly to a form's `action` prop means submitting the form calls that server function with the form's data — no client-side fetch or JSON.stringify required.",
        code: "import { createPost } from \"./actions\";\n\nexport default function NewPost() {\n  return (\n    <form action={createPost}>\n      <input name=\"title\" />\n      <button type=\"submit\">Create</button>\n    </form>\n  );\n}" },
      { h: "Why this matters", p: "Server Actions collapse what would otherwise be a client fetch call plus a separate API route into one function, while still keeping sensitive logic (like a database write) running only on the server." }
    ],
    exercises: [
      { type: "mcq", q: "What directive marks a function as a Server Action?", options: ["\"use client\"", "\"use server\"", "\"use action\"", "No directive is needed"], correct: 1, explain: "The \"use server\" directive, placed at the top of the function or the file, tells Next.js this code must only ever run on the server, even when called from a Client Component." },
      { type: "mcq", q: "What's the benefit of passing a Server Action directly to a form's action prop?", options: ["It disables the form", "The form can submit straight to server-side logic without a separate client fetch or API route", "It only works with GET requests", "It requires jQuery"], correct: 1, explain: "Because the browser understands the form action mechanism natively, passing a Server Action there lets submission call server code directly, skipping the usual fetch-to-API-route dance." }
    ]
  },
  {
    id: "metadata-seo", title: "Metadata & SEO",
    tagline: "Controlling a page's title, description, and social preview without hand-writing <head> tags.",
    blocks: [
      { h: "Static metadata", p: "Exporting a `metadata` object from a page.js or layout.js file tells Next.js what to put in the document's <head> — title, description, and more — without you writing any <head> or <meta> tags yourself.",
        code: "export const metadata = {\n  title: \"My Blog\",\n  description: \"Thoughts on code and coffee.\",\n};" },
      { h: "Dynamic metadata", p: "For a page whose title depends on data — like a blog post's own title — you export an async `generateMetadata` function instead, which receives the same params as the page and can fetch data to build the metadata.",
        code: "export async function generateMetadata({ params }) {\n  const post = await getPost(params.slug);\n  return { title: post.title };\n}" },
      { h: "Metadata inherits and merges down layouts", p: "Metadata defined in a layout applies to every page nested inside it, and a page's own metadata merges with (and can override) whatever its layouts already defined — so you rarely need to repeat shared fields like a site name on every page." }
    ],
    exercises: [
      { type: "mcq", q: "How would you set a dynamic page title based on fetched data, like a blog post's title?", options: ["Only static metadata objects are supported", "Export an async generateMetadata function that fetches the data and returns the metadata object", "Edit the HTML file directly", "It's not possible in Next.js"], correct: 1, explain: "generateMetadata runs on the server before the page renders, receiving the same params as the page, so it can fetch whatever data it needs to build a metadata object dynamically." },
      { type: "code", q: "Export a static metadata object from this file setting the title to \"About\".", starter: "export default function AboutPage() {\n  return <h1>About</h1>;\n}", checks: [/export\s+const\s+metadata\s*=\s*\{\s*title\s*:\s*["']About["']\s*\}/], hint: "Add `export const metadata = { title: \"About\" };` above or below the component.", solution: "export const metadata = { title: \"About\" };\n\nexport default function AboutPage() {\n  return <h1>About</h1>;\n}", explain: "Exporting a metadata object with a title field is enough for Next.js to set that page's document title automatically." }
    ]
  },
  {
    id: "middleware", title: "Middleware",
    tagline: "Running code before a request completes — for things like redirects, auth checks, and rewriting URLs.",
    blocks: [
      { h: "What middleware is for", p: "A single middleware.js file at the root of your project can run logic before a matching request finishes — checking cookies for authentication, redirecting based on the visitor's country, or rewriting one URL to another, all before any page even starts rendering.",
        code: "export function middleware(request) {\n  const isLoggedIn = request.cookies.has(\"session\");\n  if (!isLoggedIn) {\n    return Response.redirect(new URL(\"/login\", request.url));\n  }\n}" },
      { h: "Controlling which routes it runs on", p: "By default middleware runs on every request. A `config` export with a `matcher` pattern limits it to specific paths, so you're not adding overhead to routes that don't need the check.",
        code: "export const config = {\n  matcher: [\"/dashboard/:path*\"],\n};" }
    ],
    exercises: [
      { type: "mcq", q: "When does middleware run, relative to a page rendering?", options: ["After the page has fully rendered", "Before the request completes, prior to a page rendering", "Only in production builds", "Only on the client"], correct: 1, explain: "Middleware intercepts a request early — before routing finishes deciding what to render — which is exactly why it's suited to redirects and auth checks that should happen before any page logic runs." },
      { type: "mcq", q: "What does the `matcher` field in middleware's config export control?", options: ["Which database to connect to", "Which paths the middleware actually runs on", "The response status code", "The page's title"], correct: 1, explain: "Without a matcher, middleware runs on every request; a matcher pattern scopes it down to only the paths you actually need it to intercept, like everything under /dashboard." }
    ]
  },
  {
    id: "deployment", title: "Building & deploying",
    tagline: "Turning your project into an optimized production build, and getting it live.",
    blocks: [
      { h: "The production build", p: "`next build` compiles your app for production — bundling and minifying JavaScript, pre-rendering pages where possible, and optimizing images and fonts. `next start` then runs that build as a Node.js server.",
        code: "npm run build\nnpm run start" },
      { h: "Deploying to a host", p: "Next.js apps can be deployed to any Node.js hosting environment, but platforms built specifically around Next.js — most notably Vercel, made by the same team — can deploy straight from a Git push, automatically handling the build step and infrastructure." },
      { h: "Environment variables", p: "Configuration that differs between environments — like an API key or database URL — belongs in environment variables, typically defined in a `.env.local` file locally and configured separately in your hosting platform for production. Only variables prefixed with `NEXT_PUBLIC_` are exposed to browser code; everything else stays server-only.",
        code: "// .env.local\nDATABASE_URL=postgres://...\nNEXT_PUBLIC_ANALYTICS_ID=abc123" }
    ],
    exercises: [
      { type: "mcq", q: "Why does an environment variable need the NEXT_PUBLIC_ prefix to be used in the browser?", options: ["It's just a naming convention with no effect", "Without that prefix, Next.js keeps the variable server-only, to avoid accidentally exposing secrets to the browser", "It makes the variable load faster", "It's required for all environment variables, including server-only ones"], correct: 1, explain: "Next.js deliberately keeps environment variables server-side by default — only ones explicitly prefixed NEXT_PUBLIC_ get bundled into the client-side JavaScript, as a safeguard against leaking secrets like API keys." },
      { type: "code", q: "Write the command that runs a production build of a Next.js app.", starter: "", checks: [/next build/], hint: "It's `next build` (or `npm run build`, which typically calls it).", solution: "next build", explain: "next build compiles and optimizes the app for production, ready to be started with next start or deployed to a hosting platform." }
    ]
  },
  {
    id: "image-font-optimization", title: "Image & font optimization",
    tagline: "Built-in components that handle two of the biggest, most common performance costs on the web automatically.",
    blocks: [
      { h: "The next/image component", p: "Rather than a plain `<img>`, Next.js provides an Image component that automatically resizes, compresses, and serves images in modern formats, and lazy-loads images that are off-screen — all without you writing that logic yourself.",
        code: "import Image from \"next/image\";\n\n<Image src=\"/photo.jpg\" alt=\"A photo\" width={600} height={400} />" },
      { h: "Why width and height are required", p: "Image requires explicit width and height (or the `fill` prop) so it can reserve the correct space in the layout before the image finishes loading — preventing the page from jumping around as images pop in, a common cause of poor perceived performance." },
      { h: "next/font", p: "The next/font module downloads and self-hosts fonts (including Google Fonts) at build time, rather than fetching them from an external server at runtime — improving privacy and avoiding the loading flash that comes with external font requests.",
        code: "import { Inter } from \"next/font/google\";\n\nconst inter = Inter({ subsets: [\"latin\"] });\n\n<body className={inter.className}>...</body>" }
    ],
    exercises: [
      { type: "mcq", q: "Why does next/image require a width and height?", options: ["It's a stylistic choice with no functional purpose", "So it can reserve the correct layout space before the image loads, preventing content from jumping around", "To compress the image file", "It's optional and never actually required"], correct: 1, explain: "Knowing the image's dimensions up front lets the browser reserve exactly the right amount of space in the layout immediately, so surrounding content doesn't shift once the image finishes downloading — a common performance and UX issue known as layout shift." },
      { type: "mcq", q: "What does next/font do differently from linking a Google Font the traditional way?", options: ["Nothing — it's identical", "It downloads and self-hosts the font at build time instead of fetching it from an external server at runtime", "It only works with system fonts", "It removes the need for CSS entirely"], correct: 1, explain: "next/font fetches the font file during your build and serves it from your own domain, avoiding an external network request (and its associated flash of unstyled text) at runtime." }
    ]
  },
  {
    id: "env-vars", title: "Environment variables & config",
    tagline: "Keeping settings and secrets — like API keys — out of your source code, and available where your app needs them.",
    blocks: [
      { h: ".env files", p: "Next.js automatically loads variables from a `.env.local` file (which should never be committed to version control) into `process.env`, available in server-side code like Route Handlers and Server Components.",
        code: "# .env.local\nDATABASE_URL=postgres://localhost/mydb" },
      { h: "Server-only vs. browser-exposed variables", p: "By default, environment variables are only available on the server — they never reach the browser bundle, which is important for secrets. To intentionally expose one to client-side code, its name must be prefixed with `NEXT_PUBLIC_`.",
        code: "NEXT_PUBLIC_ANALYTICS_ID=abc123   # exposed to the browser\nSTRIPE_SECRET_KEY=sk_live_...      # server-only, never exposed" }
    ],
    exercises: [
      { type: "mcq", q: "Why do server-only environment variables never reach the browser bundle by default?", options: ["It's a bug that will eventually be fixed", "To keep secrets like API keys and database URLs safe, since anything sent to the browser is publicly visible", "Because .env files aren't supported", "They do reach the browser by default"], correct: 1, explain: "Anything shipped in the browser's JavaScript bundle is visible to anyone who opens dev tools. Next.js deliberately keeps environment variables server-only unless you explicitly opt one in, protecting secrets from accidental exposure." },
      { type: "mcq", q: "What does prefixing a variable with NEXT_PUBLIC_ do?", options: ["Nothing, it's just a naming convention with no effect", "It intentionally exposes that variable's value to browser (client-side) code", "It encrypts the variable", "It makes the variable required"], correct: 1, explain: "The NEXT_PUBLIC_ prefix is a deliberate escape hatch — it tells Next.js this specific value is safe and meant to be included in the client-side bundle, unlike every other environment variable which stays server-only." }
    ]
  }
  ]
};
