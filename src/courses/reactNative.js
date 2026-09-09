// React Native course — full content.
export const reactNativeCourse = {
  id: "react-native",
  title: "React Native",
  category: "Frameworks & Libraries",
  summary: "Build native iOS and Android apps using React.",
  comingSoon: false,
  topics: [
  {
    id: "what-is-rn", title: "What is React Native?",
    tagline: "The same component model as React, but rendering to real native iOS and Android UI instead of a browser.",
    blocks: [
      { h: "One codebase, two platforms", p: "React Native lets you write your app's logic and UI once, using JavaScript and React's component model, and have it run as a genuinely native app on both iOS and Android — not a website wrapped in an app shell, but real native buttons, scroll views, and navigation.",
        tip: "If you already know React for the web, the mental model — components, props, state — carries over directly. What changes is which building blocks you use to describe the UI." },
      { h: "No HTML elements", p: "Since there's no browser involved, React Native doesn't use `<div>`, `<span>`, or `<p>`. Instead, it provides its own set of core components — like View and Text — which get translated into real native UI elements on each platform." }
    ],
    exercises: [
      { type: "mcq", q: "What does React Native ultimately render to?", options: ["A website displayed inside a browser view", "Real native UI components on iOS and Android", "A PDF file", "A desktop-only application"], correct: 1, explain: "Unlike a web app wrapped in a native shell, React Native renders actual native UI elements on each platform — the JavaScript describes the UI, but what shows up is genuinely native." },
      { type: "mcq", q: "Why doesn't React Native use HTML elements like <div>?", options: ["Because HTML is deprecated", "Because there's no browser — it renders through its own native-mapped components instead", "Because JSX doesn't support HTML tags", "It does use them, just renamed"], correct: 1, explain: "There's no DOM in a React Native app. Instead, core components like View and Text stand in for HTML elements and get mapped to real native views on each platform." }
    ]
  },
  {
    id: "core-components", title: "Core components",
    tagline: "The basic building blocks you'll reach for constantly: View, Text, Image, and touch handling.",
    blocks: [
      { h: "View: the general-purpose container", p: "View is the React Native equivalent of a `<div>` — a container used for layout and grouping other components. Nearly every screen is built from Views nested inside each other.",
        code: "import { View, Text } from \"react-native\";\n\nfunction Card() {\n  return (\n    <View>\n      <Text>Hello!</Text>\n    </View>\n  );\n}" },
      { h: "Text: the only place text can go", p: "Unlike the web, where text can sit directly inside almost any element, React Native requires all text to be wrapped in a Text component. Trying to render a plain string inside a View directly will cause an error.",
        code: "// wrong\n<View>Hello</View>\n\n// right\n<View><Text>Hello</Text></View>" },
      { h: "Handling touch with Pressable", p: "Since there's no mouse, React Native uses touch-based components instead of onClick. Pressable is the modern, flexible way to make anything respond to a tap.",
        code: "import { Pressable, Text } from \"react-native\";\n\n<Pressable onPress={() => console.log(\"tapped!\")}>\n  <Text>Tap me</Text>\n</Pressable>" }
    ],
    exercises: [
      { type: "code", q: "Wrap the text \"Loading...\" correctly so it renders without error — replace the plain string with a Text component.", starter: "import { View, Text } from \"react-native\";\n\nfunction Loader() {\n  return <View>Loading...</View>;\n}", checks: [/<View>\s*<Text>\s*Loading\.\.\.\s*<\/Text>\s*<\/View>/], hint: "Wrap \"Loading...\" in `<Text>...</Text>` before putting it inside the View.", solution: "import { View, Text } from \"react-native\";\n\nfunction Loader() {\n  return (\n    <View>\n      <Text>Loading...</Text>\n    </View>\n  );\n}", explain: "React Native requires any raw text to be inside a Text component — a View is purely a layout container and can't render text directly." },
      { type: "mcq", q: "What's the React Native equivalent of a web onClick handler for a tappable element?", options: ["onTap", "onPress, typically on a Pressable component", "onClick works identically", "onTouch"], correct: 1, explain: "React Native components like Pressable use an onPress prop to respond to taps — the touch-based equivalent of a web onClick handler." }
    ]
  },
  {
    id: "styling", title: "Styling with StyleSheet",
    tagline: "React Native styling looks like CSS but is actually plain JavaScript objects, with a subset of CSS-like properties.",
    blocks: [
      { h: "Styles as JavaScript objects", p: "Instead of CSS files or className, React Native components take a `style` prop set to a JavaScript object. Property names are camelCased (like `backgroundColor` instead of `background-color`), and there are no units — numbers are treated as density-independent pixels by default.",
        code: "import { View } from \"react-native\";\n\nfunction Box() {\n  return <View style={{ width: 100, height: 100, backgroundColor: \"tomato\" }} />;\n}" },
      { h: "StyleSheet.create", p: "For anything beyond a one-off inline style, `StyleSheet.create` lets you define named styles up front, which is more organized and slightly more performant than inline objects.",
        code: "import { View, StyleSheet } from \"react-native\";\n\nconst styles = StyleSheet.create({\n  box: { width: 100, height: 100, backgroundColor: \"tomato\" },\n});\n\nfunction Box() {\n  return <View style={styles.box} />;\n}" },
      { h: "Flexbox is the default layout system", p: "React Native uses Flexbox for layout by default on every View — there's no separate 'display: flex' to turn on. The main difference from CSS is that `flexDirection` defaults to `column` instead of `row`, since mobile layouts are usually stacked vertically." }
    ],
    exercises: [
      { type: "mcq", q: "What does React Native's `flexDirection` default to, unlike CSS on the web?", options: ["row, same as CSS", "column", "It has no default", "It depends on the platform"], correct: 1, explain: "Web Flexbox containers default to flexDirection: row, but React Native Views default to column — reflecting that mobile screens are typically laid out top-to-bottom." },
      { type: "code", q: "Use StyleSheet.create to define a style named `container` with flex: 1 and backgroundColor: \"white\", then use it on the View.", starter: "import { View, StyleSheet } from \"react-native\";\n\nfunction Screen() {\n  return <View></View>;\n}", checks: [/StyleSheet\.create\s*\(\s*\{\s*container\s*:\s*\{\s*flex\s*:\s*1\s*,\s*backgroundColor\s*:\s*["']white["']\s*\}\s*\}\s*\)/, /<View\s+style\s*=\s*\{\s*styles\.container\s*\}\s*>/], hint: "Define `const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: \"white\" } });` above the component, then use `style={styles.container}` on the View.", solution: "import { View, StyleSheet } from \"react-native\";\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, backgroundColor: \"white\" },\n});\n\nfunction Screen() {\n  return <View style={styles.container}></View>;\n}", explain: "StyleSheet.create groups named styles in one place, and `style={styles.container}` applies that particular style object to the View." }
    ]
  },
  {
    id: "lists", title: "Scrolling lists with FlatList",
    tagline: "Rendering long, scrollable lists efficiently — a mobile-specific concern the web doesn't usually need to think about.",
    blocks: [
      { h: "Why not just .map() everything into a View?", p: "For a short list, mapping over an array and rendering everything inside a ScrollView works fine. But for long lists — hundreds or thousands of items — rendering everything at once wastes memory and slows the app down, since off-screen items still exist in memory.",
        tip: "FlatList solves this by only rendering the items currently near the visible area of the screen, recycling views as the user scrolls — a technique often called 'virtualization'." },
      { h: "Basic FlatList usage", p: "FlatList takes a `data` array and a `renderItem` function that describes how to render each entry. It also needs a `keyExtractor` (or items with a `key` property) so it can track items efficiently, just like the `key` prop in web React lists.",
        code: "import { FlatList, Text } from \"react-native\";\n\nfunction Names({ names }) {\n  return (\n    <FlatList\n      data={names}\n      keyExtractor={(item) => item}\n      renderItem={({ item }) => <Text>{item}</Text>}\n    />\n  );\n}" }
    ],
    exercises: [
      { type: "mcq", q: "Why use FlatList instead of mapping an array inside a ScrollView for a very long list?", options: ["FlatList looks nicer by default", "FlatList only renders items near the visible screen area, saving memory and improving performance", "ScrollView cannot render lists at all", "There's no real difference"], correct: 1, explain: "FlatList virtualizes its content — it only keeps items near the visible viewport mounted, recycling them as the user scrolls — which keeps long lists fast and memory-efficient, unlike rendering every item up front." },
      { type: "code", q: "Add the required keyExtractor prop to this FlatList, using each item's `id`.", starter: "<FlatList\n  data={users}\n  renderItem={({ item }) => <Text>{item.name}</Text>}\n/>", checks: [/keyExtractor\s*=\s*\{\s*\(?\s*item\s*\)?\s*=>\s*item\.id\s*\}/], hint: "Add `keyExtractor={(item) => item.id}` as a prop on FlatList.", solution: "<FlatList\n  data={users}\n  keyExtractor={(item) => item.id}\n  renderItem={({ item }) => <Text>{item.name}</Text>}\n/>", explain: "keyExtractor tells FlatList how to get a unique key for each item — here, each user's id — which it needs to track items efficiently as the list scrolls and updates." }
    ]
  },
  {
    id: "navigation", title: "Navigation with React Navigation",
    tagline: "Moving between screens, and passing data along the way — the mobile equivalent of routing.",
    blocks: [
      { h: "Why navigation is its own library", p: "There's no browser URL bar in a native app, so React Native doesn't include navigation out of the box. React Navigation is the most widely used solution — it provides a set of navigators (stack, tabs, drawer) that manage a history of screens and the transitions between them.",
        code: "npm install @react-navigation/native @react-navigation/native-stack" },
      { h: "Stack navigation", p: "A stack navigator behaves like a deck of cards: navigating to a new screen pushes it on top, and going back pops it off — the same mental model as a browser's back button, complete with native slide transitions.",
        code: "import { NavigationContainer } from \"@react-navigation/native\";\nimport { createNativeStackNavigator } from \"@react-navigation/native-stack\";\n\nconst Stack = createNativeStackNavigator();\n\nfunction App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator>\n        <Stack.Screen name=\"Home\" component={HomeScreen} />\n        <Stack.Screen name=\"Profile\" component={ProfileScreen} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}" },
      { h: "Navigating and passing params", p: "Every screen component automatically receives a `navigation` prop. Calling `navigation.navigate` moves to another screen, and an optional second argument passes data along with it, readable on the other side via the `route` prop.",
        code: "// on HomeScreen\nnavigation.navigate(\"Profile\", { userId: 42 });\n\n// on ProfileScreen\nfunction ProfileScreen({ route }) {\n  const { userId } = route.params;\n  return <Text>Viewing user {userId}</Text>;\n}" }
    ],
    exercises: [
      { type: "mcq", q: "What does a stack navigator's \"push\" and \"pop\" behavior correspond to?", options: ["Adding and removing items from a list on screen", "Navigating to a new screen (push) and going back (pop), like a browser history", "Saving and loading app state", "Installing and uninstalling the app"], correct: 1, explain: "A stack navigator tracks a history of screens like a stack of cards — navigating forward pushes a new screen on top, and going back pops it off, revealing the previous one." },
      { type: "code", q: "Navigate to a screen named \"Details\" passing an itemId of 7 as a param.", starter: "navigation.navigate(", checks: [/navigation\.navigate\s*\(\s*["']Details["']\s*,\s*\{\s*itemId\s*:\s*7\s*\}\s*\)/], hint: "Pass the screen name, then an object with itemId: 7 as the second argument.", solution: "navigation.navigate(\"Details\", { itemId: 7 });", explain: "The second argument to navigate becomes that screen's route.params, so Details can read route.params.itemId once it renders." }
    ]
  },
  {
    id: "gestures-animations", title: "Gestures & animations",
    tagline: "Making an app feel native means reacting to touch smoothly and animating changes instead of snapping instantly.",
    blocks: [
      { h: "The Animated API", p: "React Native's built-in Animated API lets you drive style properties from a value that changes smoothly over time, rather than jumping directly between states.",
        code: "import { Animated } from \"react-native\";\nimport { useRef, useEffect } from \"react\";\n\nfunction FadeIn({ children }) {\n  const opacity = useRef(new Animated.Value(0)).current;\n\n  useEffect(() => {\n    Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();\n  }, []);\n\n  return <Animated.View style={{ opacity }}>{children}</Animated.View>;\n}" },
      { h: "useNativeDriver", p: "Setting `useNativeDriver: true` offloads the animation to run on the native UI thread instead of JavaScript, keeping it smooth even if the JS thread is busy. It only works for non-layout properties, like opacity and transform.",
        tip: "As a rule of thumb: animate opacity and transform (translate, scale, rotate) with the native driver whenever you can — they cover the vast majority of common UI animations." },
      { h: "Gesture handling", p: "For anything beyond a simple tap — swipes, drags, pinches — the react-native-gesture-handler library provides gesture recognizers that integrate smoothly with native touch handling, commonly paired with react-native-reanimated for the animation itself." }
    ],
    exercises: [
      { type: "mcq", q: "Why set useNativeDriver: true on an Animated.timing call?", options: ["It makes the animation run in reverse", "It runs the animation on the native UI thread, keeping it smooth even under JS load", "It's required for all animations", "It disables the animation"], correct: 1, explain: "Native-driven animations run outside of JavaScript entirely once started, so they stay smooth even if the JS thread gets busy — though it's limited to non-layout properties like opacity and transform." },
      { type: "mcq", q: "What is react-native-gesture-handler typically used for?", options: ["Styling components", "Recognizing touch gestures like swipes, drags, and pinches beyond a basic tap", "Fetching data from a server", "Managing navigation history"], correct: 1, explain: "Gesture Handler provides native-backed gesture recognizers for more complex touch interactions than a simple onPress, and is commonly paired with Reanimated to drive smooth animations from those gestures." }
    ]
  },
  {
    id: "networking", title: "Networking & data fetching",
    tagline: "Talking to a server from a mobile app works largely the same as on the web, with a few mobile-specific wrinkles.",
    blocks: [
      { h: "fetch works the same way", p: "React Native includes the same `fetch` API used on the web, so requesting JSON from an API looks identical to a web app.",
        code: "async function loadUsers() {\n  const res = await fetch(\"https://api.example.com/users\");\n  const data = await res.json();\n  return data;\n}" },
      { h: "Handling loading and error states", p: "Since a request takes time and can fail, a typical pattern tracks loading and error state alongside the data itself, so the UI can show a spinner or an error message appropriately.",
        code: "const [users, setUsers] = useState([]);\nconst [loading, setLoading] = useState(true);\n\nuseEffect(() => {\n  fetch(\"https://api.example.com/users\")\n    .then((res) => res.json())\n    .then(setUsers)\n    .catch((err) => console.error(err))\n    .finally(() => setLoading(false));\n}, []);" },
      { h: "No cookies by default", p: "Unlike a browser, a React Native app doesn't automatically manage cookies for you. Authentication is more commonly handled by storing a token (like a JWT) after login and attaching it manually to each request's headers." }
    ],
    exercises: [
      { type: "mcq", q: "Does React Native provide the same fetch API used on the web?", options: ["No, it requires a completely different networking API", "Yes — fetch works the same way for making HTTP requests", "Only for GET requests", "Only inside Expo projects"], correct: 1, explain: "React Native ships with a fetch implementation matching the web standard, so making requests and reading JSON responses looks the same as it would in browser JavaScript." },
      { type: "code", q: "Add an Authorization header carrying a bearer token to this fetch call.", starter: "fetch(\"https://api.example.com/me\");", checks: [/fetch\s*\(\s*["'`][^"'`]+["'`]\s*,\s*\{\s*headers\s*:\s*\{\s*Authorization\s*:\s*[`"'].*Bearer[\s\S]*token[\s\S]*[`"']\s*\}\s*\}\s*\)/], hint: "Pass a second argument: `{ headers: { Authorization: `Bearer ${token}` } }`", solution: "fetch(\"https://api.example.com/me\", {\n  headers: { Authorization: `Bearer ${token}` },\n});", explain: "Since there's no automatic cookie handling, an auth token is typically attached manually as an Authorization header on each authenticated request." }
    ]
  },
  {
    id: "storage", title: "Local storage with AsyncStorage",
    tagline: "Saving small amounts of data on the device itself, so it survives an app restart.",
    blocks: [
      { h: "What AsyncStorage is for", p: "AsyncStorage is a simple, asynchronous, persistent key-value store, similar in spirit to localStorage on the web. It's meant for small amounts of data — user preferences, an auth token, cached settings — not for storing large datasets or files.",
        code: "npm install @react-native-async-storage/async-storage" },
      { h: "Reading and writing values", p: "Every method returns a Promise, since storage operations are asynchronous. Values are always stored and read as strings, so objects need to be serialized with JSON.stringify and parsed back with JSON.parse.",
        code: "import AsyncStorage from \"@react-native-async-storage/async-storage\";\n\nawait AsyncStorage.setItem(\"theme\", \"dark\");\nconst theme = await AsyncStorage.getItem(\"theme\");\n\nawait AsyncStorage.setItem(\"user\", JSON.stringify({ id: 1, name: \"Ada\" }));\nconst user = JSON.parse(await AsyncStorage.getItem(\"user\"));" }
    ],
    exercises: [
      { type: "mcq", q: "Why does storing an object in AsyncStorage require JSON.stringify first?", options: ["It's optional, just a style preference", "AsyncStorage only stores strings, so objects must be serialized before saving and parsed back after reading", "JSON.stringify makes storage faster", "AsyncStorage automatically handles objects without it"], correct: 1, explain: "AsyncStorage's underlying storage only holds string values, so any non-string data — like an object — needs to be converted to a string with JSON.stringify before saving, and parsed back with JSON.parse after reading." },
      { type: "code", q: "Write the code to save the string \"en\" under the key \"language\" using AsyncStorage.", starter: "", checks: [/await\s+AsyncStorage\.setItem\s*\(\s*["']language["']\s*,\s*["']en["']\s*\)/], hint: "Use `await AsyncStorage.setItem(\"language\", \"en\");`", solution: "await AsyncStorage.setItem(\"language\", \"en\");", explain: "setItem takes a key and a string value and returns a Promise, since the write happens asynchronously." }
    ]
  },
  {
    id: "platform-permissions", title: "Platform-specific code & permissions",
    tagline: "Writing code that behaves differently on iOS vs. Android, and asking the user for access to device features.",
    blocks: [
      { h: "The Platform module", p: "The built-in Platform module lets you branch logic based on which OS the app is running on, useful for small platform-specific tweaks.",
        code: "import { Platform, StyleSheet } from \"react-native\";\n\nconst styles = StyleSheet.create({\n  header: {\n    paddingTop: Platform.OS === \"ios\" ? 44 : 24,\n  },\n});" },
      { h: "Platform-specific files", p: "For larger differences, you can create two files — `Button.ios.js` and `Button.android.js` — and simply import `./Button`. React Native automatically picks the right file for the platform it's running on, no conditional needed." },
      { h: "Requesting permissions", p: "Accessing sensitive device features — camera, location, notifications — requires asking the user for permission first. Libraries like expo-location provide a `requestPermissionsAsync` function that shows the native permission prompt and reports whether it was granted.",
        code: "import * as Location from \"expo-location\";\n\nconst { status } = await Location.requestForegroundPermissionsAsync();\nif (status === \"granted\") {\n  const position = await Location.getCurrentPositionAsync();\n}" }
    ],
    exercises: [
      { type: "mcq", q: "What is one advantage of a .ios.js / .android.js file pair over a Platform.OS conditional?", options: ["There's no real difference", "It keeps larger platform-specific implementations in separate files entirely, rather than branching inside one shared file", "It only works with class components", "It removes the need to test on both platforms"], correct: 1, explain: "For small tweaks, an inline Platform.OS check is simplest. But when a component's implementation differs substantially between platforms, separate .ios.js and .android.js files keep each version clean and independently readable — React Native picks the right one automatically at build time." },
      { type: "mcq", q: "Why must an app request permission before accessing something like the camera or location?", options: ["It's an optional best practice with no real requirement", "Sensitive device features require explicit user consent via a native permission prompt before they can be accessed", "Permissions only apply to web apps", "It's only required on Android"], correct: 1, explain: "Both iOS and Android require apps to explicitly request access to sensitive capabilities, showing the user a native prompt — code attempting to use the feature without a granted permission will fail or return no data." }
    ]
  },
  {
    id: "publishing-rn", title: "Building & publishing your app",
    tagline: "Getting a React Native app from your development machine into the App Store and Google Play.",
    blocks: [
      { h: "Development vs. production builds", p: "While developing, you run your app through a development server with live reloading. Shipping to real users requires a separate production build — a compiled, standalone app bundle that doesn't depend on a running dev server at all." },
      { h: "Building with Expo (EAS)", p: "For an Expo-based project, `eas build` handles compiling a native production build in the cloud for either platform, without you needing to touch Xcode or Android Studio directly.",
        code: "npx eas build --platform ios\nnpx eas build --platform android" },
      { h: "Submitting to the stores", p: "Once you have a production build, `eas submit` can upload it directly to App Store Connect or the Google Play Console, handling most of the manual upload steps for you — though you'll still need developer accounts on both platforms." }
    ],
    exercises: [
      { type: "mcq", q: "Why can't you just ship the development build of an app to real users?", options: ["You technically could, but it depends on a running dev server and isn't optimized — a separate production build is standalone and ready for release", "Development builds are illegal to distribute", "There's no difference between the two", "Production builds don't include your code"], correct: 0, explain: "A development build is wired up for fast iteration (live reload, debugging) and typically depends on your local dev server. A production build is compiled standalone, optimized, and self-contained — what you actually submit to the app stores." },
      { type: "code", q: "Write the EAS command to build a production app for the Android platform.", starter: "", checks: [/npx\s+eas\s+build\s+--platform\s+android/], hint: "Use `npx eas build --platform android`", solution: "npx eas build --platform android", explain: "eas build, given a --platform flag, compiles a real native build for that platform in Expo's cloud infrastructure." }
    ]
  }
  ]
};
