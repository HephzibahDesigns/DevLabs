// NativeWind course — full content.
export const nativewindCourse = {
  id: "nativewind",
  title: "NativeWind",
  category: "Frameworks & Libraries",
  summary: "Tailwind-style utility classes for React Native.",
  comingSoon: false,
  topics: [
  {
    id: "what-is-nativewind", title: "What is NativeWind?",
    tagline: "The convenience of Tailwind's utility classes, working inside a React Native app's style system.",
    blocks: [
      { h: "Tailwind syntax, React Native output", p: "React Native styling uses JavaScript objects rather than CSS, which means you can't normally use Tailwind CSS directly. NativeWind bridges that gap: it lets you write familiar Tailwind utility classes using the `className` prop, and translates them into React Native's style objects behind the scenes.",
        code: "import { View, Text } from \"react-native\";\n\nfunction Card() {\n  return (\n    <View className=\"p-4 bg-white rounded-lg\">\n      <Text className=\"text-lg font-bold\">Hello</Text>\n    </View>\n  );\n}" },
      { h: "Why use it", p: "Without NativeWind, styling a React Native app means writing StyleSheet objects by hand for every component. NativeWind lets teams that already know Tailwind's utility classes reuse that same knowledge and muscle memory on mobile, and keeps styles compact and colocated with the markup." }
    ],
    exercises: [
      { type: "mcq", q: "What does NativeWind fundamentally do?", options: ["Replaces React Native entirely", "Lets you write Tailwind-style utility classes via className, translated into React Native styles", "Only works on the web", "Adds new native components"], correct: 1, explain: "NativeWind is a styling layer: it takes Tailwind-like class names passed through className and converts them into the style objects React Native components actually expect." },
      { type: "mcq", q: "Which prop does NativeWind use to accept Tailwind-style classes on a React Native component?", options: ["style", "class", "className", "styles"], correct: 2, explain: "NativeWind hooks into the className prop — the same one used in web React with Tailwind — even though plain React Native normally only understands the style prop." }
    ]
  },
  {
    id: "setup", title: "Setup & basic usage",
    tagline: "Getting NativeWind wired into a project, and writing your first utility-styled component.",
    blocks: [
      { h: "Installing and configuring", p: "Setup involves installing the NativeWind package and Tailwind CSS, then creating a `tailwind.config.js` that points at your project's files so unused styles can be stripped out, and wiring NativeWind's Babel plugin into your config.",
        code: "npx expo install nativewind tailwindcss\nnpx tailwindcss init" },
      { h: "Writing styles with utility classes", p: "Once set up, styling is a matter of composing small utility classes directly on your components — spacing, color, typography, and layout classes all work the same way they do in web Tailwind.",
        code: "<View className=\"flex-1 items-center justify-center bg-slate-900\">\n  <Text className=\"text-white text-2xl font-semibold\">Welcome</Text>\n</View>" }
    ],
    exercises: [
      { type: "code", q: "Style this View with className to center its content (items-center, justify-center) and give it a white background.", starter: "<View>\n  <Text>Centered</Text>\n</View>", checks: [/<View\s+className\s*=\s*["'][^"']*items-center[^"']*["']/, /justify-center/, /bg-white/], hint: "Add `className=\"items-center justify-center bg-white\"` to the View.", solution: "<View className=\"items-center justify-center bg-white\">\n  <Text>Centered</Text>\n</View>", explain: "items-center and justify-center handle centering along both axes, and bg-white sets the background — all as Tailwind-style utility classes on the className prop." },
      { type: "mcq", q: "What is tailwind.config.js used for in a NativeWind setup?", options: ["It's unrelated to NativeWind", "Configuring which files Tailwind scans, so it knows which utility classes are actually used", "Storing API keys", "Defining navigation routes"], correct: 1, explain: "Tailwind's config file tells the build process which files to scan for class names, so it can generate only the styles you actually use, keeping the output small." }
    ]
  },
  {
    id: "responsive-dark", title: "Responsive & dark mode styling",
    tagline: "Adjusting styles based on screen size and the device's light/dark appearance setting.",
    blocks: [
      { h: "Responsive prefixes", p: "NativeWind supports Tailwind's breakpoint prefixes (like `sm:`, `md:`, `lg:`) so you can apply different classes depending on screen width — handy for apps that need to look good on both phones and tablets.",
        code: "<View className=\"p-2 md:p-6\">\n  <Text className=\"text-base md:text-xl\">Adaptive text</Text>\n</View>" },
      { h: "Dark mode with the dark: prefix", p: "Just like Tailwind on the web, prefixing a class with `dark:` applies it only when the device is in dark mode, letting you support both appearances from the same markup.",
        code: "<View className=\"bg-white dark:bg-black\">\n  <Text className=\"text-black dark:text-white\">Adaptive theme</Text>\n</View>" }
    ],
    exercises: [
      { type: "mcq", q: "What does the `dark:` prefix do in a NativeWind class name?", options: ["Makes the text bold", "Applies that class only when the device's appearance is set to dark mode", "Disables the style entirely", "Only works on Android"], correct: 1, explain: "The dark: prefix, borrowed directly from Tailwind CSS, conditionally applies a class based on the device's current light/dark appearance setting." },
      { type: "code", q: "Add a dark-mode background of black to this View, which currently only has a light background.", starter: "<View className=\"bg-white\">\n</View>", checks: [/className\s*=\s*["'][^"']*bg-white[^"']*dark:bg-black[^"']*["']/, /dark:bg-black/], hint: "Append `dark:bg-black` inside the className string, after `bg-white`.", solution: "<View className=\"bg-white dark:bg-black\">\n</View>", explain: "bg-white applies normally, while dark:bg-black overrides it specifically when the device is in dark mode — both classes can coexist in the same className string." }
    ]
  },
  {
    id: "custom-theme", title: "Customizing the theme",
    tagline: "Extending NativeWind's default colors, spacing, and fonts to match your own design system.",
    blocks: [
      { h: "Extending tailwind.config.js", p: "Since NativeWind uses Tailwind's configuration under the hood, adding your own brand colors, spacing values, or fonts works exactly like it does for web Tailwind — under theme.extend.",
        code: "// tailwind.config.js\nmodule.exports = {\n  content: [\"./app/**/*.{js,jsx,ts,tsx}\"],\n  theme: {\n    extend: {\n      colors: { brand: \"#5b4fff\" },\n    },\n  },\n};" },
      { h: "Using your custom values", p: "Once added, custom theme values become usable in className exactly like built-in utilities — bg-brand, text-brand, and so on — with no extra import or setup needed in your components.",
        code: "<View className=\"bg-brand p-4 rounded-lg\">\n  <Text className=\"text-white\">Branded card</Text>\n</View>" }
    ],
    exercises: [
      { type: "mcq", q: "Where do you add a custom color so it becomes usable as a NativeWind className, like bg-brand?", options: ["Directly in the component's style prop", "Under theme.extend.colors in tailwind.config.js", "It's not possible to customize NativeWind's theme", "In app.json"], correct: 1, explain: "Because NativeWind reads the same Tailwind config as the web version, extending theme.extend.colors registers a new utility class you can then use in any className." },
      { type: "code", q: "Extend the theme's colors with a color named \"accent\" set to \"#22c55e\".", starter: "module.exports = {\n  theme: {\n    extend: {\n      colors: {\n      }\n    }\n  }\n};", checks: [/colors\s*:\s*\{\s*accent\s*:\s*["']#22c55e["']\s*\}/], hint: "Add `accent: \"#22c55e\"` inside the colors object.", solution: "module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        accent: \"#22c55e\"\n      }\n    }\n  }\n};", explain: "Adding accent to theme.extend.colors makes bg-accent, text-accent, and similar utility classes available throughout the app." }
    ]
  },
  {
    id: "variants", title: "Component variants",
    tagline: "Managing a component that needs several visual variations, like a button's primary vs. secondary style.",
    blocks: [
      { h: "The problem: conditional class strings", p: "A component with multiple variants (size, color, state) can quickly turn into a messy pile of ternaries building up a className string by hand. A small helper library, `class-variance-authority` (cva), organizes that logic instead.",
        tip: "cva isn't specific to NativeWind — it's a general pattern for organizing variant-based class names, also used heavily alongside Tailwind and shadcn/ui on the web." },
      { h: "Defining variants with cva", p: "cva takes a base set of classes and a `variants` object describing each possible variation, returning a function you call with your chosen options to get the final class string.",
        code: "import { cva } from \"class-variance-authority\";\n\nconst button = cva(\"rounded-lg px-4 py-2\", {\n  variants: {\n    intent: {\n      primary: \"bg-blue-600\",\n      secondary: \"bg-gray-200\",\n    },\n  },\n});\n\n<Pressable className={button({ intent: \"primary\" })}>\n  <Text>Save</Text>\n</Pressable>" }
    ],
    exercises: [
      { type: "mcq", q: "What problem does a library like cva solve?", options: ["It replaces NativeWind entirely", "It organizes building a className string across multiple variants, instead of a hand-rolled chain of ternaries", "It only works on the web", "It removes the need for Tailwind classes"], correct: 1, explain: "cva structures variant logic — base classes plus named options like intent or size — into a single reusable function, keeping variant-heavy components readable." },
      { type: "mcq", q: "In the cva example, what does calling `button({ intent: \"primary\" })` return?", options: ["A React component", "A string combining the base classes with the primary intent's classes", "A boolean", "Nothing — cva calls have no return value"], correct: 1, explain: "Calling the function cva returns, with a chosen variant option, produces the final combined className string — the base classes plus whichever variant classes match your selection." }
    ]
  },
  {
    id: "platform-styles", title: "Platform-specific NativeWind styles",
    tagline: "Applying a class only on iOS or only on Android, the same way you'd use a responsive or dark-mode prefix.",
    blocks: [
      { h: "The ios: and android: prefixes", p: "NativeWind extends Tailwind's prefix system with platform prefixes, letting you apply a class conditionally based on which OS the app is running on — handy for small platform-specific tweaks like shadow styling.",
        code: "<View className=\"p-4 ios:shadow-md android:elevation-2\">\n  <Text>Card</Text>\n</View>" },
      { h: "Combining with other prefixes", p: "Like other NativeWind prefixes, platform prefixes can combine with others, such as dark mode, letting you express fairly specific conditional styling directly in className.",
        code: "<View className=\"bg-white dark:ios:bg-gray-800\">\n</View>" }
    ],
    exercises: [
      { type: "mcq", q: "What does the ios: prefix do in a NativeWind className?", options: ["Applies the class on both platforms", "Applies that class only when running on iOS", "Disables the class on iOS", "Only works with color utilities"], correct: 1, explain: "Similar to a responsive breakpoint or the dark: prefix, ios: (and android:) conditionally applies its class only when the app is running on that specific platform." },
      { type: "code", q: "Add an android-only class of elevation-4 to this View, alongside its existing padding.", starter: "<View className=\"p-4\">\n</View>", checks: [/className\s*=\s*["'][^"']*p-4[^"']*android:elevation-4[^"']*["']/], hint: "Append `android:elevation-4` inside the className string.", solution: "<View className=\"p-4 android:elevation-4\">\n</View>", explain: "android:elevation-4 only takes effect on Android, letting you handle a platform-specific concern like Android's elevation-based shadow system directly in className." }
    ]
  },
  {
    id: "arbitrary-values-nw", title: "Arbitrary values & style interop",
    tagline: "Handling a one-off value Tailwind's scale doesn't cover, and mixing NativeWind with plain React Native styles.",
    blocks: [
      { h: "Arbitrary values", p: "Just like web Tailwind, square brackets let you drop in an exact, one-off value that isn't part of the default scale — useful for matching a specific design spec precisely.",
        code: "<View className=\"w-[137px] h-[42px]\">\n</View>" },
      { h: "Mixing with the style prop", p: "NativeWind classes and the plain React Native `style` prop can coexist on the same component — handy for dynamic values computed at runtime that don't fit neatly into a class name, like an animated value.",
        code: "<Animated.View\n  className=\"rounded-lg bg-white\"\n  style={{ opacity: fadeAnim }}\n/>" }
    ],
    exercises: [
      { type: "mcq", q: "What do square brackets, like w-[137px], let you do in NativeWind?", options: ["Nothing special", "Specify an exact, one-off value outside Tailwind's normal predefined scale", "Only works for colors", "Disable the class"], correct: 1, explain: "Arbitrary value syntax lets you specify a precise value directly in the class name when none of the predefined scale steps match what a design calls for." },
      { type: "mcq", q: "Can NativeWind's className and React Native's style prop be used together on the same component?", options: ["No, they conflict and one is ignored entirely", "Yes — they can coexist, which is useful for runtime-computed values like animations", "Only on Android", "Only if style is empty"], correct: 1, explain: "className and style can be combined freely — a common pattern is using className for static design values, and style for something computed dynamically at runtime, like an Animated value driving opacity." }
    ]
  },
  {
    id: "performance-nw", title: "Performance considerations",
    tagline: "How NativeWind turns class names into actual styles, and what that means for your app's performance.",
    blocks: [
      { h: "Compiled at build time", p: "NativeWind doesn't parse class name strings at runtime on the device — a Babel/PostCSS-based build step processes your className usage ahead of time and generates the equivalent React Native style objects, so there's minimal runtime overhead compared to hand-written StyleSheet code." },
      { h: "Keeping class lists readable", p: "Because utility classes are composed directly in markup, a component with many conditional style variants can end up with a long className string. Libraries like `cva` (covered in the Component variants topic) help keep that organized without sacrificing NativeWind's build-time approach." }
    ],
    exercises: [
      { type: "mcq", q: "Does NativeWind parse your className strings on the device at runtime?", options: ["Yes, on every render", "No — a build-time compilation step converts them into style objects ahead of time, similar to how StyleSheet.create works", "Only in production builds", "Only on iOS"], correct: 1, explain: "NativeWind's build tooling resolves className usage into React Native style objects during your build process, not while the app is running — keeping runtime overhead comparable to writing StyleSheet objects by hand." },
      { type: "mcq", q: "What's a good strategy for keeping a component's className readable when it has many variants?", options: ["Avoid utility classes entirely", "Use a helper like cva to organize variant-based class composition, instead of long inline ternary chains", "Put every style in a separate file", "There's no way to manage this"], correct: 1, explain: "A helper like class-variance-authority structures variant logic into a single reusable function, keeping components with many conditional styles readable instead of accumulating a tangle of inline ternaries in the className string." }
    ]
  }
  ]
};
