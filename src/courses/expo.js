// Expo course — full content.
export const expoCourse = {
  id: "expo",
  title: "Expo",
  category: "Frameworks & Libraries",
  summary: "The toolchain that makes React Native development fast and simple.",
  comingSoon: false,
  topics: [
  {
    id: "what-is-expo", title: "What is Expo?",
    tagline: "React Native gives you the framework — Expo gives you the tools to actually build, run, and ship it easily.",
    blocks: [
      { h: "A layer on top of React Native", p: "Setting up a React Native project from scratch involves native build tools, Xcode, Android Studio, and a lot of configuration. Expo removes most of that: it's a set of tools and services built around React Native that let you start building immediately, often without touching native code at all.",
        tip: "Think of plain React Native as the engine, and Expo as the toolkit — dev server, pre-built native modules, and a build/deploy pipeline — that gets you from an idea to a running app much faster." },
      { h: "What Expo provides", p: "The core pieces are: the Expo CLI for starting and running a project, a large library of ready-made native modules (camera, location, notifications, and more) that you'd otherwise have to write native code for, the Expo Go app for instantly previewing your project on a real phone, and EAS for building and submitting your app to the app stores." }
    ],
    exercises: [
      { type: "mcq", q: "What problem does Expo primarily solve for React Native developers?", options: ["It replaces JavaScript with a different language", "It removes most of the native build setup and provides ready-made tools, modules, and a dev workflow", "It only works for web apps", "It's a separate framework unrelated to React Native"], correct: 1, explain: "Expo is built around React Native — it doesn't replace it. It removes friction: you get a fast dev server, prebuilt native modules, and build/deploy tooling without setting up Xcode or Android Studio yourself for most common use cases." },
      { type: "mcq", q: "What is Expo Go?", options: ["A code editor", "An app that lets you preview your Expo project live on a real device, without a custom native build", "A database", "A CSS framework"], correct: 1, explain: "Expo Go is a companion app you install on your phone; it can load and run your in-development project instantly by scanning a QR code, which is a major speed boost while iterating." }
    ]
  },
  {
    id: "cli-workflow", title: "The Expo CLI & dev workflow",
    tagline: "How you actually start a project and see it running, day to day.",
    blocks: [
      { h: "Starting a new project", p: "The `create-expo-app` command scaffolds a new project with a sensible starting structure, so you don't have to assemble one by hand.",
        code: "npx create-expo-app my-app\ncd my-app\nnpx expo start" },
      { h: "The dev server & QR code", p: "Running `expo start` boots a development server and shows a QR code in your terminal (and a browser dev tools page). Scanning that code with Expo Go on your phone loads your app live, connected to that dev server, with support for fast refresh as you edit code." },
      { h: "Running on a simulator", p: "If you have Xcode (for iOS) or Android Studio (for Android) installed, you can also press `i` or `a` in the terminal running `expo start` to launch your app in an iOS Simulator or Android Emulator directly, without needing a physical device." }
    ],
    exercises: [
      { type: "code", q: "Write the command to scaffold a new Expo project named \"my-app\".", starter: "", checks: [/npx\s+create-expo-app\s+my-app/], hint: "The command is `npx create-expo-app my-app`", solution: "npx create-expo-app my-app", explain: "create-expo-app, run through npx, scaffolds a new Expo project with a working starting structure in a folder named after your app." },
      { type: "mcq", q: "What does scanning the QR code shown by `expo start` do?", options: ["Downloads the finished app from the app store", "Loads your in-development project live inside Expo Go, connected to your dev server", "Compiles a production build", "Nothing on physical devices"], correct: 1, explain: "The QR code points Expo Go to your locally running development server, so your phone loads and runs the current state of your project — including live updates as you save changes." }
    ]
  },
  {
    id: "expo-router", title: "Expo Router",
    tagline: "File-based routing for React Native, using the same folder-based mental model as Next.js.",
    blocks: [
      { h: "Routes from your file structure", p: "Expo Router brings the file-based routing idea to React Native: files inside an `app` directory automatically become screens in your app, and navigating between them is as simple as linking or pushing a new route — no manually configured navigator required for the basics.",
        code: "app/\n  index.js         -> the first screen shown\n  profile.js       -> a \"profile\" screen\n  settings/\n    index.js       -> a \"settings\" screen" },
      { h: "Navigating between screens", p: "The Link component (imported from `expo-router`) works much like it does on the web — wrap anything in it and pass an `href` to navigate there when pressed.",
        code: "import { Link } from \"expo-router\";\nimport { Text } from \"react-native\";\n\n<Link href=\"/profile\">\n  <Text>Go to profile</Text>\n</Link>" }
    ],
    exercises: [
      { type: "mcq", q: "What does Expo Router base its screens and navigation structure on?", options: ["A single central config file listing every screen", "The file and folder structure inside the app directory", "XML layout files", "A separate routing library unrelated to file structure"], correct: 1, explain: "Like Next.js's App Router, Expo Router uses your project's file structure inside `app` to automatically define screens and how they nest — no manual navigator setup needed for standard cases." },
      { type: "code", q: "Import Link from expo-router and use it to link to \"/settings\", wrapping the text \"Settings\".", starter: "import { Text } from \"react-native\";\n\nfunction Menu() {\n  return  ;\n}", checks: [/import\s*\{\s*Link\s*\}\s*from\s*["']expo-router["']/, /<Link\s+href\s*=\s*["']\/settings["']\s*>[\s\S]*<Text>\s*Settings\s*<\/Text>[\s\S]*<\/Link>/], hint: "Add `import { Link } from \"expo-router\";` and return `<Link href=\"/settings\"><Text>Settings</Text></Link>`", solution: "import { Text } from \"react-native\";\nimport { Link } from \"expo-router\";\n\nfunction Menu() {\n  return (\n    <Link href=\"/settings\">\n      <Text>Settings</Text>\n    </Link>\n  );\n}", explain: "Link from expo-router navigates to the given href when pressed — here, to the /settings screen — matching the file-based route you'd define at app/settings/index.js." }
    ]
  },
  {
    id: "modules-build", title: "Native modules & building your app",
    tagline: "Using device features like the camera, and turning your project into something you can actually ship.",
    blocks: [
      { h: "Ready-made native modules", p: "Expo maintains a large collection of packages — like `expo-camera`, `expo-location`, and `expo-notifications` — that wrap native device functionality behind a simple JavaScript API, so you don't have to write native iOS or Android code yourself for common features.",
        code: "npx expo install expo-camera" },
      { h: "EAS: building for real devices and app stores", p: "EAS (Expo Application Services) is Expo's cloud build and submission platform. Instead of configuring Xcode and Android Studio yourself, `eas build` compiles a real, installable app in the cloud, and `eas submit` can send it to the App Store or Google Play." }
    ],
    exercises: [
      { type: "mcq", q: "What is EAS primarily used for?", options: ["Writing JavaScript faster", "Cloud-based building and submitting of your app to the App Store / Google Play", "Styling components", "Managing state"], correct: 1, explain: "EAS (Expo Application Services) handles compiling your project into an installable native app in the cloud, and can also help submit that build to the app stores — sidestepping a lot of local native tooling setup." },
      { type: "code", q: "Write the command to install the expo-camera package the Expo-recommended way.", starter: "", checks: [/npx\s+expo\s+install\s+expo-camera/], hint: "Use `npx expo install expo-camera` rather than a plain npm install — it ensures a version compatible with your Expo SDK.", solution: "npx expo install expo-camera", explain: "`expo install` (rather than plain npm/yarn install) checks your project's Expo SDK version and installs a compatible version of the package, avoiding version-mismatch issues." }
    ]
  },
  {
    id: "dev-client", title: "Expo Go vs. development builds",
    tagline: "Expo Go is great for getting started, but some native code needs a custom development build instead.",
    blocks: [
      { h: "The limits of Expo Go", p: "Expo Go is a pre-built app that can run any project using only the libraries it already includes. That's fast to start with, but it means Expo Go can't run a project that adds a native module Expo Go itself wasn't built with — for example, a third-party native SDK.",
        tip: "For most apps using Expo's own SDK packages, Expo Go covers everything you need for a long time — you typically only outgrow it once you need a specific native library it doesn't include." },
      { h: "Development builds", p: "A development build is your own custom version of Expo Go, built specifically for your project, including whatever native modules it needs. You install it once on your device or simulator, and it then behaves like Expo Go — connecting to your dev server and supporting fast refresh — but with your project's exact native dependencies included.",
        code: "npx expo install expo-dev-client\nnpx expo run:ios     # or run:android" }
    ],
    exercises: [
      { type: "mcq", q: "Why might a project need a custom development build instead of just using Expo Go?", options: ["Development builds are always required, even for the simplest project", "The project uses a native module that isn't included in the standard Expo Go app", "Expo Go doesn't support JavaScript", "Development builds are faster for every single project regardless of dependencies"], correct: 1, explain: "Expo Go ships with a fixed set of native modules built in. If your project needs a native library outside that set, you need a development build compiled specifically with that library included." },
      { type: "mcq", q: "Once installed, how does a development build behave day-to-day compared to Expo Go?", options: ["It's a completely different, unrelated workflow", "It behaves like Expo Go — connecting to your dev server with fast refresh — but includes your project's own native modules", "It requires rebuilding after every code change", "It only works without an internet connection"], correct: 1, explain: "A development build is essentially your own custom Expo Go, so the day-to-day experience of connecting to a dev server and getting fast refresh stays the same; the difference is which native code is baked in." }
    ]
  },
  {
    id: "app-config", title: "app.json / app.config.js",
    tagline: "The central file that describes your app's identity: its name, icon, version, and platform-specific settings.",
    blocks: [
      { h: "What lives in the app config", p: "app.json (or app.config.js, for when you need actual JavaScript logic) holds metadata about your app — its display name, unique identifier, version number, icon and splash screen paths, and settings specific to iOS or Android, like permissions text.",
        code: "{\n  \"expo\": {\n    \"name\": \"My App\",\n    \"slug\": \"my-app\",\n    \"version\": \"1.0.0\",\n    \"icon\": \"./assets/icon.png\"\n  }\n}" },
      { h: "Using app.config.js for dynamic values", p: "When configuration needs to vary — like a different app name for a staging build versus production, or a value pulled from an environment variable — app.config.js lets you export a JavaScript function that computes the config instead of a static JSON file.",
        code: "export default ({ config }) => ({\n  ...config,\n  name: process.env.APP_VARIANT === \"staging\" ? \"My App (Staging)\" : \"My App\",\n});" }
    ],
    exercises: [
      { type: "mcq", q: "When would you reach for app.config.js instead of app.json?", options: ["Never — app.json is always sufficient", "When your configuration needs actual logic, like varying by environment variable", "Only for iOS-specific projects", "app.config.js and app.json can't coexist with any other files"], correct: 1, explain: "app.json is static JSON; app.config.js is a JavaScript file that exports a function, which lets you compute configuration values dynamically — useful for things like environment-based app names." },
      { type: "mcq", q: "Which of these would you typically configure in app.json?", options: ["Individual React component logic", "The app's display name, version, and icon", "Database queries", "CSS class names"], correct: 1, explain: "app.json is about your app's identity and packaging metadata — name, version, icon, splash screen, and platform settings — not application logic." }
    ]
  },
  {
    id: "assets", title: "Assets: icons, splash screens & fonts",
    tagline: "Bundling images and fonts into your app, and setting up the icon and splash screen users see first.",
    blocks: [
      { h: "Importing images", p: "Images live in your project (commonly an `assets` folder) and are imported like any other module — the bundler handles packaging them and resolving the right resolution for the device.",
        code: "import logo from \"./assets/logo.png\";\nimport { Image } from \"react-native\";\n\n<Image source={logo} style={{ width: 100, height: 100 }} />" },
      { h: "App icon & splash screen", p: "The app's icon and splash screen (the image shown briefly while the app launches) are configured by pointing app.json at image files, rather than being set up in your React code at all." },
      { h: "Loading custom fonts", p: "Custom fonts need to be explicitly loaded before you use them — Expo's `useFonts` hook loads font files asynchronously, and you typically keep the app on a loading screen until it resolves.",
        code: "import { useFonts } from \"expo-font\";\n\nfunction App() {\n  const [loaded] = useFonts({\n    Inter: require(\"./assets/fonts/Inter-Regular.ttf\"),\n  });\n  if (!loaded) return null;\n  return <MainApp />;\n}" }
    ],
    exercises: [
      { type: "mcq", q: "Where are an app's icon and splash screen typically configured?", options: ["Inside a React component using useState", "By pointing to image files from app.json", "They can't be customized in Expo", "In a CSS file"], correct: 1, explain: "The icon and splash screen are packaging-level concerns, configured via image file paths in app.json rather than rendered by your app's own component code." },
      { type: "mcq", q: "Why does useFonts return a loaded flag you need to check before rendering?", options: ["It's optional and can be ignored", "Custom fonts load asynchronously, so you need to wait until they're ready before rendering text that uses them", "Fonts load instantly and the flag is unused", "It only matters on Android"], correct: 1, explain: "Font files are loaded asynchronously, so checking the loaded flag (and rendering nothing, or a loading screen, until it's true) avoids a flash of the wrong font before the custom one is ready." }
    ]
  },
  {
    id: "eas-build-submit", title: "EAS Build, Submit & Update",
    tagline: "The full pipeline from source code to an app installed on a real device or listed in an app store.",
    blocks: [
      { h: "Build profiles", p: "eas.json defines build profiles — like development, preview, and production — each with its own settings, so a single command can produce the right kind of build for the situation, without you remembering a long list of flags.",
        code: "{\n  \"build\": {\n    \"preview\": { \"distribution\": \"internal\" },\n    \"production\": { }\n  }\n}\n\n// then:\neas build --profile production --platform ios" },
      { h: "Submitting to the app stores", p: "eas submit takes a completed build and uploads it to the App Store Connect or Google Play Console, handling most of the manual upload steps you'd otherwise do through each store's own website.",
        code: "eas submit --platform android" },
      { h: "EAS Update: pushing JS changes without a new build", p: "For changes that are purely JavaScript (not a new native module or config change), EAS Update can push an update directly to installed apps, which download and apply it the next time they launch — without going through app store review again." }
    ],
    exercises: [
      { type: "mcq", q: "What is the purpose of build profiles in eas.json?", options: ["They have no real effect", "They let you define distinct build configurations — like development vs. production — selected by name at build time", "They only affect the app's icon", "They replace app.json entirely"], correct: 1, explain: "Named build profiles bundle together settings appropriate for a given situation, so `eas build --profile production` reliably produces the right kind of build without repeating configuration flags." },
      { type: "mcq", q: "Why is EAS Update able to skip app store review for some changes?", options: ["It bypasses the app stores' rules entirely for any change", "It only pushes JavaScript changes to already-installed apps, not changes to native code, which is the part stores review most strictly", "It never actually updates anything", "It only works in development"], correct: 1, explain: "Because EAS Update delivers new JavaScript to an app's existing native shell rather than shipping new native code, it falls outside what app stores typically require a fresh review for — though native changes still need a new build and submission." }
    ]
  },
  {
    id: "push-notifications", title: "Push notifications",
    tagline: "Sending a message to a user's device even when your app isn't open, using Expo's push notification service.",
    blocks: [
      { h: "Getting a push token", p: "expo-notifications can request permission and generate a unique push token for the device — an address Expo's push service uses to route notifications to that specific device.",
        code: "import * as Notifications from \"expo-notifications\";\n\nconst { status } = await Notifications.requestPermissionsAsync();\nconst token = (await Notifications.getExpoPushTokenAsync()).data;" },
      { h: "Sending a notification", p: "With a device's push token saved on your backend, you send a notification by POSTing to Expo's push API — Expo then handles delivering it through Apple's and Google's own push services on your behalf.",
        code: "await fetch(\"https://exp.host/--/api/v2/push/send\", {\n  method: \"POST\",\n  headers: { \"Content-Type\": \"application/json\" },\n  body: JSON.stringify({ to: token, title: \"Hello\", body: \"You have a new message\" }),\n});" },
      { h: "Handling a received notification", p: "You can listen for notifications while the app is open (to update the UI) and for when a user taps one (to navigate somewhere relevant), using listeners expo-notifications provides." }
    ],
    exercises: [
      { type: "mcq", q: "What is an Expo push token used for?", options: ["Authenticating a user's login", "Uniquely identifying a device so Expo's push service knows where to deliver a notification", "Encrypting notification content", "Storing local app data"], correct: 1, explain: "A push token is essentially that device's address for push notifications — your backend saves it, and later includes it when telling Expo's push service which device a notification should be delivered to." },
      { type: "mcq", q: "How does sending a push notification through Expo actually work under the hood?", options: ["Expo has no involvement — you talk to Apple and Google directly", "You send a request to Expo's push API, and Expo relays it through Apple's and Google's own push services", "Notifications are sent via email", "It only works when the app is currently open"], correct: 1, explain: "Rather than integrating separately with Apple Push Notification service and Firebase Cloud Messaging yourself, Expo's push service acts as a single unified layer — you send one request to Expo, and it handles routing to the right underlying platform service." }
    ]
  },
  {
    id: "debugging-expo", title: "Debugging & error handling",
    tagline: "Finding and fixing problems while developing — reading logs, using dev tools, and handling crashes gracefully.",
    blocks: [
      { h: "Reading logs", p: "console.log statements in your code show up right in the terminal running `expo start`, and also in the in-app developer menu — a fast way to inspect values without a full debugger.",
        tip: "Shaking a physical device (or pressing Cmd+D on iOS Simulator / Cmd+M on Android Emulator) opens Expo's developer menu, with options like reloading the app and opening the debugger." },
      { h: "Using React DevTools", p: "Expo projects work with the standalone React DevTools, letting you inspect your component tree, props, and state visually — the same tool used for debugging React on the web, connected to your running app." },
      { h: "Handling errors gracefully", p: "An uncaught JavaScript error crashes the whole app with a red error screen in development. Wrapping key parts of your app in an error boundary component lets you catch those errors and show a friendlier fallback UI in production instead of a hard crash." }
    ],
    exercises: [
      { type: "mcq", q: "Where do console.log statements from your Expo app show up?", options: ["Nowhere — they're silently discarded", "In the terminal running expo start, and in the in-app developer menu", "Only in a separate database", "Only after building a production app"], correct: 1, explain: "Expo streams your app's console output back to the terminal running the dev server (and surfaces it in the dev menu too), giving you a quick way to inspect values during development without extra setup." },
      { type: "mcq", q: "What's the benefit of wrapping part of your app in an error boundary?", options: ["It prevents all bugs from occurring", "It catches an otherwise-uncaught error and shows a friendlier fallback UI instead of crashing the whole app", "It makes the app run faster", "It's required for expo-notifications to work"], correct: 1, explain: "Without an error boundary, one uncaught error anywhere in the component tree can crash the entire app. An error boundary contains the damage, letting you show a recoverable fallback instead of a full crash." }
    ]
  }
  ]
};
