// TypeScript course — full content, unchanged from the original tutorial.
export const typescriptCourse = {
  id: "typescript",
  title: "TypeScript",
  category: "Languages & Core",
  summary: "Add a safety net to your JavaScript: catch mistakes before they ship.",
  comingSoon: false,
  topics: [
  {
    id: "setup", title: "What is TypeScript?",
    tagline: "No experience needed. We'll build up from 'what even is code' to your first typed program.",
    blocks: [
      { h: "JavaScript, but with a safety net", p: "JavaScript is the language that runs in every web browser. It's flexible, but that flexibility has a downside: it lets you make small mistakes — like calling a function with the wrong kind of value — that you won't discover until your program is actually running (and sometimes breaking) in front of a real user.",
        tip: "Think of TypeScript as a spellchecker, but for the structure of your code. It doesn't change what your program does — it just watches over your shoulder and points out mistakes before you hit run.",
        code: "// plain JavaScript — no complaints, until it runs and breaks\nfunction addTax(price) {\n  return price + price * 0.1;\n}\naddTax(\"twenty dollars\"); // oops — this quietly produces nonsense" },
      { h: "TypeScript is JavaScript, with types added", p: "Here's the important part: every JavaScript file you've ever seen is already valid TypeScript. You're not learning a new language from zero — you're learning how to add extra hints, called types, that describe what kind of value a variable, parameter, or return value should be.",
        code: "// the same function, now with a type hint on the parameter\nfunction addTax(price: number) {\n  return price + price * 0.1;\n}\naddTax(\"twenty dollars\"); // TypeScript stops you right here, before you run anything" },
      { h: "A 'type' is just a category of value", p: "When we say a value 'has a type', we just mean: what kind of thing is it? Is it text (a string), a number, a true/false value (a boolean), a list of things (an array), or something more custom you define yourself? Once you tell TypeScript the type, it checks that you're using that value consistently everywhere in your code." },
      { h: "How your code actually runs", p: "Browsers and Node.js only understand plain JavaScript — they've never heard of TypeScript. So a tool called the TypeScript compiler, run with the command tsc, reads your .ts files, checks every type is used correctly, and then strips the types out to produce an ordinary .js file. That .js file is what actually runs.",
        tip: "Nothing about tsc changes how fast your program runs. Its whole job happens before your program runs: reading your code once, checking it for mistakes, and translating it to plain JavaScript.",
        code: "// you write: greeter.ts\nfunction greet(name: string) {\n  return \"Hello, \" + name;\n}\n\n// tsc compiles it to: greeter.js\nfunction greet(name) {\n  return \"Hello, \" + name;\n}\n// notice: the type annotation is gone — it only existed to help you while writing" },
      { h: "tsconfig.json: the settings file", p: "A file called tsconfig.json, sitting at the root of your project, tells the compiler how strict to be and where to put its output. You don't need to memorize every setting — just know that it exists and that turning on \"strict\": true is the single most useful thing you can do, because it enables the full set of safety checks.",
        code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"strict\": true,\n    \"outDir\": \"./dist\"\n  }\n}" }
    ],
    exercises: [
      { type: "mcq", q: "After the TypeScript compiler finishes checking your code, what does it actually produce?", options: ["A .exe program you can double-click", "Plain JavaScript, with the type hints removed", "A completely different programming language", "Nothing — it just shows errors and stops"], correct: 1, explain: "tsc's job is to check your types and then translate your .ts file into an ordinary .js file. Browsers and Node.js only ever run that plain JavaScript output — TypeScript itself is just a helper that works before your code runs." },
      { type: "mcq", q: "True or false: to start using TypeScript, you first need to unlearn JavaScript and learn a brand new language.", options: ["True — TypeScript and JavaScript have almost nothing in common", "False — every valid JavaScript file is already valid TypeScript; you're just adding optional type hints on top"], correct: 1, explain: "TypeScript is JavaScript plus an optional layer of type checking. If you already know some JavaScript, you already know most of TypeScript — the new part is learning to describe the 'shape' of your data." }
    ]
  },
  {
    id: "basics", title: "Basic types",
    tagline: "The handful of building-block types you'll use constantly: text, numbers, true/false, lists, and a few special-purpose ones.",
    blocks: [
      { h: "The everyday three: string, number, boolean", p: "Most values you'll ever type-annotate fall into one of these three buckets. string is text (always written in quotes). number covers every kind of number — TypeScript doesn't separate whole numbers from decimals the way some languages do. boolean is just true or false.",
        tip: "The colon-and-type pattern (name: type) shows up everywhere in TypeScript. Read `let age: number` out loud as 'age, which is a number'.",
        code: "let age: number = 32;\nlet firstName: string = \"Ada\";\nlet isActive: boolean = true;" },
      { h: "Lists of things: arrays", p: "An array is an ordered list. To type one, write the type of its items followed by square brackets — number[] means 'an array where every item is a number'.",
        code: "let scores: number[] = [88, 92, 79];\nlet names: string[] = [\"Ada\", \"Grace\"];" },
      { h: "Tuples: a fixed-size list where each slot has its own type", p: "A tuple looks like an array, but each position is allowed a different, specific type — and the length is fixed. They're handy for small, fixed groupings, like an [x, y] coordinate.",
        code: "let point: [number, number] = [10, 20];\nlet entry: [string, number] = [\"age\", 32]; // slot 0 must be a string, slot 1 a number" },
      { h: "any: turning type-checking off (use sparingly)", p: "Sometimes you'll see the type any. It means 'I'm not telling TypeScript what this is, so don't check it.' It's occasionally useful when migrating old JavaScript, but overusing any throws away the whole benefit of TypeScript — treat it as a last resort, not a default.",
        code: "let loose: any = 4;\nloose.toUpperCase(); // TypeScript allows this... and then it crashes when you actually run it" },
      { h: "unknown: the safer 'I don't know yet'", p: "unknown is any's safer sibling. You can still put anything into an unknown variable, but TypeScript won't let you do anything with it until you've proven what it actually is — usually with a simple check like typeof.",
        code: "let safe: unknown = 4;\n// safe.toUpperCase();      // blocked: TypeScript insists you check first\nif (typeof safe === \"string\") {\n  safe.toUpperCase();       // allowed now — you proved it's a string\n}" },
      { h: "null, undefined, and void", p: "null and undefined represent 'nothing here'. With TypeScript's strict mode on, they're treated seriously — a variable typed as string can't secretly be null unless you say so on purpose. void is a bit different: it's used as the return type for a function that doesn't return anything meaningful, like one that just logs a message." }
    ],
    exercises: [
      { type: "code", q: "Declare a variable named city, give it the type string, and set it to \"Lagos\". (This exercise starts you off with the variable name already written.)", starter: "let city = ", checks: [/let\s+city\s*:\s*string\s*=\s*["'`]Lagos["'`]/], hint: "The pattern is: let variableName: type = value; — so you need to insert `: string` right after `city` and before the equals sign.", solution: "let city: string = \"Lagos\";", explain: "The colon right after the variable name is where the type annotation goes — `city: string` reads as 'city, which is a string'." },
      { type: "mcq", q: "You have a value typed as unknown. What do you have to do before you're allowed to call a method on it, like .toUpperCase()?", options: ["Nothing — unknown works exactly like any", "Convert it to any first and move on", "Prove what it actually is first, e.g. with a typeof check", "Reassign it to a brand new variable with no type"], correct: 2, explain: "unknown is intentionally locked down. TypeScript won't let you use it as if it were a specific type until you've narrowed it down — most commonly with a typeof or instanceof check." }
    ]
  },
  {
    id: "inference", title: "Letting TypeScript guess for you",
    tagline: "You won't annotate every single variable by hand — TypeScript is often smart enough to figure the type out on its own.",
    blocks: [
      { h: "Type inference: TypeScript reads the value you gave it", p: "When you create a variable and immediately give it a value, TypeScript looks at that value and infers (figures out) the type automatically — you don't have to spell it out. This is called type inference, and it's the reason most TypeScript code doesn't look cluttered with type annotations everywhere.",
        code: "let count = 5;         // TypeScript sees 5 and infers: number\nlet label = \"total\";   // sees \"total\" and infers: string\ncount = \"five\";         // ERROR — count was locked in as a number the moment it was created" },
      { h: "So when do you need to write the type yourself?", p: "Mainly in two situations: function parameters (TypeScript can't guess what you'll pass in later, so it needs to be told), and variables you declare without giving them a starting value right away.",
        tip: "Rule of thumb for beginners: if you're assigning a value right when you create the variable, you usually don't need to annotate it — let TypeScript infer. Annotate function parameters, and annotate variables you're declaring 'empty' for now.",
        code: "function double(n: number) {   // parameters always need annotating\n  return n * 2;                // the return type (number) is inferred for you\n}\n\nlet ids: number[] = [];        // empty arrays are worth annotating\nlet result: string;            // declared now, filled in later\nresult = \"done\";" }
    ],
    exercises: [
      { type: "mcq", q: "Given `let total = 12;` with no type written, what type does TypeScript figure out for total on its own?", options: ["any", "number", "unknown", "It has no type at all"], correct: 1, explain: "TypeScript looks at the value you assigned — 12 — and infers the matching type, number, automatically. You don't need to write `: number` yourself here." },
      { type: "code", q: "Add a type annotation so `values` is explicitly an array of numbers, starting out empty.", starter: "let values = [];", checks: [/let\s+values\s*:\s*number\s*\[\]\s*=\s*\[\]/], hint: "An empty array gives TypeScript nothing to infer from — write the annotation yourself, right after the variable name: `: number[]`.", solution: "let values: number[] = [];", explain: "Without an annotation, TypeScript would treat an empty array as `any[]`, which means it stops checking what you add to it later. Spelling out `number[]` keeps that safety net." }
    ]
  },
  {
    id: "functions", title: "Functions",
    tagline: "How to describe what goes into a function and what comes out — plus optional arguments and a few handy shortcuts.",
    blocks: [
      { h: "Typing the inputs and the output", p: "A function's parameters need type annotations, the same way a variable does. The return type is usually left for TypeScript to infer, though writing it explicitly can make a function easier for other people (including future you) to understand at a glance.",
        code: "function add(a: number, b: number): number {\n  return a + b;\n}" },
      { h: "Optional parameters: making an argument not required", p: "Put a question mark right after a parameter's name to say 'callers don't have to pass this one.' Inside the function, that parameter's value will be undefined if it was left out — so you'll often check for that.",
        code: "function greet(name: string, title?: string): string {\n  return title ? title + \" \" + name : name;\n}\ngreet(\"Ada\");            // fine — title is left out\ngreet(\"Ada\", \"Dr.\");     // also fine" },
      { h: "Default parameters: a built-in fallback value", p: "Instead of a question mark, you can give a parameter a default value directly. If the caller skips it, the default is used, and — bonus — it's automatically treated as optional.",
        code: "function power(base: number, exponent: number = 2): number {\n  return Math.pow(base, exponent);\n}\npower(4);      // exponent defaults to 2, so this is 16\npower(4, 3);   // exponent is 3, so this is 64" },
      { h: "Rest parameters: accepting 'as many as you like'", p: "Three dots before a parameter name means 'gather every extra argument into one array'. This is how functions like Math.max let you pass any number of values.",
        code: "function sum(...nums: number[]): number {\n  return nums.reduce((total, n) => total + n, 0);\n}\nsum(1, 2, 3, 4); // 10" }
    ],
    exercises: [
      { type: "code", q: "This function currently requires title. Make it optional, without changing anything else.", starter: "function label(text: string, title: string): string {\n  return title + \": \" + text;\n}", checks: [/title\s*\?\s*:\s*string/], hint: "You just need to add one character — a question mark — right after the word `title` and before the colon.", solution: "function label(text: string, title?: string): string {\n  return title + \": \" + text;\n}", explain: "The `?` after a parameter's name marks it optional. Callers can now leave it out entirely, and its type becomes `string | undefined` behind the scenes." },
      { type: "mcq", q: "In `function sum(...nums: number[])`, what is the type of nums inside the function body?", options: ["number", "number[] — a genuine array you can loop over or reduce", "A single number that keeps changing", "It has no fixed type"], correct: 1, explain: "The three dots (rest parameters) scoop up every extra argument the caller passed and bundle them into one real array — here, an array of numbers — which behaves exactly like any other array inside the function." }
    ]
  },
  {
    id: "interfaces", title: "Interfaces",
    tagline: "How to describe the shape of an object — which properties it must have, and what type each one is.",
    blocks: [
      { h: "An interface is a checklist for an object", p: "Say you're working with an object representing a user. An interface lets you write down, once, exactly what that object must contain: which property names, and what type each one holds. Any object you claim is a User must satisfy that checklist, or TypeScript will point out what's missing or wrong.",
        code: "interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst u: User = { id: 1, name: \"Grace\", email: \"g@example.com\" };" },
      { h: "Optional and readonly properties", p: "Just like function parameters, a property can be marked optional with a ?. readonly is different: it says this property can be set once (usually when the object is first created) but never reassigned afterward.",
        code: "interface User {\n  id: number;\n  name: string;\n  nickname?: string;      // some users have one, some don't\n  readonly createdAt: Date; // set once, never changed again\n}" },
      { h: "Building one interface on top of another", p: "If two object shapes share some properties, you don't have to repeat yourself — one interface can extend another, inheriting everything the base interface already defines.",
        code: "interface Animal {\n  name: string;\n}\ninterface Dog extends Animal {\n  breed: string;\n}\nconst d: Dog = { name: \"Rex\", breed: \"Labrador\" }; // needs both properties" },
      { h: "No 'implements' keyword required", p: "Unlike some other languages, TypeScript doesn't need an object to explicitly declare 'I am a User.' If an object simply has all the right properties with the right types, TypeScript accepts it as a User automatically. This is often called 'structural typing' — what matters is the shape, not the label." }
    ],
    exercises: [
      { type: "code", q: "Write an interface named Book with a required title (string) and an optional pageCount (number).", starter: "interface Book {\n\n}", checks: [/interface\s+Book\s*\{[^}]*title\s*:\s*string[^}]*pageCount\s*\?\s*:\s*number[^}]*\}/s, /interface\s+Book/], hint: "Two lines inside the braces: one for `title: string;` (no question mark — it's required) and one for `pageCount?: number;` (with a question mark — it's optional).", solution: "interface Book {\n  title: string;\n  pageCount?: number;\n}", explain: "No `?` means the property is required — every Book must include it. A `?` makes it optional, so it's fine to leave out." },
      { type: "mcq", q: "What does marking a property `readonly` actually do?", options: ["It freezes the whole object at runtime, like a locked box", "Nothing — TypeScript just ignores the keyword", "TypeScript's compiler blocks your code from reassigning that property later — but only while checking your code, not once it's running", "It automatically makes the property optional"], correct: 2, explain: "readonly is a promise TypeScript enforces while checking your TypeScript code. It doesn't magically lock the object once your program is actually running — plain JavaScript, or a type-cast, could still change it." }
    ]
  },
  {
    id: "unions", title: "Combining types: unions & intersections",
    tagline: "How to say 'this or that' and 'this and that', plus locking a value down to one exact option.",
    blocks: [
      { h: "Naming your own types", p: "The type keyword lets you give any type a name of your own, so you can reuse it instead of retyping it everywhere.",
        code: "type ID = string | number;\ntype Point = { x: number; y: number };" },
      { h: "Union types: 'this OR that'", p: "A union, written with a pipe symbol |, means a value is allowed to be one of several types. Picture it as an either/or: an ID might be a string OR a number, and either is fine.",
        code: "function printId(id: string | number) {\n  console.log(\"ID: \" + id);\n}\nprintId(101);   // fine, it's a number\nprintId(\"abc\"); // also fine, it's a string" },
      { h: "Intersection types: 'this AND that'", p: "An intersection, written with an ampersand &, glues two types together so the result must satisfy both at once. Think of it as combining two checklists into one longer checklist.",
        code: "type Named = { name: string };\ntype Aged = { age: number };\ntype Person = Named & Aged; // must have BOTH name and age\n\nconst p: Person = { name: \"Ada\", age: 30 };" },
      { h: "Literal types: locking a value to exact values", p: "Sometimes you don't want 'any string' — you want one of a small, specific set of exact strings. A literal type does exactly that, and it's the backbone of things like status flags or settings.",
        code: "type Direction = \"up\" | \"down\" | \"left\" | \"right\";\nlet move: Direction = \"up\";      // allowed\n// let move2: Direction = \"north\"; // ERROR — not one of the four allowed strings" }
    ],
    exercises: [
      { type: "code", q: "Create a type alias named Status that can only ever be the exact strings \"idle\", \"loading\", or \"error\" — nothing else.", starter: "type Status = ", checks: [/type\s+Status\s*=\s*["']idle["']\s*\|\s*["']loading["']\s*\|\s*["']error["']/], hint: "Keep the quotes around each word, and put a | (pipe) between each one: \"idle\" | \"loading\" | \"error\"", solution: "type Status = \"idle\" | \"loading\" | \"error\";", explain: "A union of quoted strings restricts the type to exactly those values. Assigning anything else, like \"done\", would be a compile error." },
      { type: "mcq", q: "Given `type Person = Named & Aged;` where Named requires `name` and Aged requires `age`, what must a Person object contain?", options: ["Just name, or just age — either is enough", "Both name and age, at the same time", "Neither — the intersection cancels both out", "Only whatever properties the two types happen to share"], correct: 1, explain: "& (intersection) doesn't pick one or the other — it demands everything from both types simultaneously. A Person needs name AND age." }
    ]
  },
  {
    id: "classes", title: "Classes",
    tagline: "Blueprints for creating objects that share the same structure and behavior — constructors, privacy, and inheritance.",
    blocks: [
      { h: "A class is a blueprint for objects", p: "If an interface is a checklist, a class is a full blueprint: it describes the properties an object will have and the functions (called methods) it can use, and it knows how to build (construct) new objects that match that blueprint.",
        code: "class Point {\n  x: number;\n  y: number;\n  constructor(x: number, y: number) {\n    this.x = x;\n    this.y = y;\n  }\n}\nconst p = new Point(3, 4); // \"new\" builds an actual object from the blueprint" },
      { h: "Controlling who can see what: public, private, protected", p: "public is the default — visible from anywhere. private means only code inside the class itself can touch it. protected is similar to private, but also allows access from subclasses (classes built on top of this one). Combine any of these with readonly to also block reassignment.",
        code: "class Account {\n  private balance: number;       // hidden from outside code\n  readonly ownerId: string;      // set once, never changed\n\n  constructor(ownerId: string, startBalance: number) {\n    this.ownerId = ownerId;\n    this.balance = startBalance;\n  }\n\n  deposit(amount: number) {\n    this.balance += amount;      // fine — we're inside the class\n  }\n}" },
      { h: "A shortcut: declaring fields right in the constructor", p: "Writing `this.x = x` for every single field gets repetitive. As a shortcut, adding a modifier (like private, public, or readonly) directly in front of a constructor parameter both creates the field and assigns it in one step.",
        code: "class Account {\n  constructor(private balance: number, readonly ownerId: string) {}\n}\n// equivalent to writing out the longer version above" },
      { h: "Building on top of a class: inheritance", p: "extends lets one class build on another, reusing its structure. abstract class is a special kind of class that can never be built directly with `new` — it exists purely as a base for other classes to extend, and it can require that subclasses implement certain methods.",
        code: "abstract class Shape {\n  abstract area(): number; // every subclass MUST provide this\n}\n\nclass Circle extends Shape {\n  constructor(private radius: number) { super(); }\n  area(): number {\n    return Math.PI * this.radius ** 2;\n  }\n}" }
    ],
    exercises: [
      { type: "code", q: "Make the `balance` field private so code outside this class can't read or change it directly.", starter: "class Wallet {\n  balance: number;\n  constructor(balance: number) {\n    this.balance = balance;\n  }\n}", checks: [/private\s+balance\s*:\s*number/], hint: "Add the word `private` directly before `balance: number` in the field declaration.", solution: "class Wallet {\n  private balance: number;\n  constructor(balance: number) {\n    this.balance = balance;\n  }\n}", explain: "private locks a field to 'inside this class only'. Anything outside the class body — like `myWallet.balance` — is no longer allowed." },
      { type: "mcq", q: "What happens if you try to write `new Shape()`, where Shape is declared as `abstract class Shape { ... }`?", options: ["It works exactly like any normal class", "Compile error — abstract classes can't be built directly with `new`", "It silently does nothing and returns undefined", "It only fails if Shape has zero methods"], correct: 1, explain: "Marking a class abstract means it exists only to be extended by other classes. TypeScript stops you from creating an instance of it directly — you have to create a concrete subclass first, like Circle." }
    ]
  },
  {
    id: "enums", title: "Enums",
    tagline: "A named menu of related options, so you never have to remember 'magic' numbers or strings scattered through your code.",
    blocks: [
      { h: "Why use an enum instead of plain numbers or strings?", p: "Imagine tracking a traffic light's color using the numbers 0, 1, and 2. Anyone reading your code later has to remember which number means which color. An enum gives each option a readable name instead, so your code reads like plain English.",
        tip: "Think of an enum as a dropdown menu with a fixed list of choices — you (and TypeScript) can only ever pick one of the named options." },
      { h: "Numeric enums", p: "By default, an enum's members are automatically numbered starting at 0, going up by one each time.",
        code: "enum Direction {\n  Up,    // 0\n  Down,  // 1\n  Left,  // 2\n  Right, // 3\n}\nlet d: Direction = Direction.Up;" },
      { h: "String enums", p: "You can instead give each member its own explicit string value. Many developers prefer this, because the value itself is meaningful if you ever see it in a log or a debugger — \"LOADING\" is more helpful than a bare 1.",
        code: "enum Status {\n  Idle = \"IDLE\",\n  Loading = \"LOADING\",\n  Error = \"ERROR\",\n}\nlet current: Status = Status.Loading;" }
    ],
    exercises: [
      { type: "mcq", q: "In `enum Direction { Up, Down, Left, Right }`, with no values written explicitly, what number does Direction.Left end up being?", options: ["0", "1", "2", "3"], correct: 2, explain: "Numeric enums count up from 0 automatically: Up is 0, Down is 1, Left is 2, Right is 3 — each member is one more than the last." },
      { type: "code", q: "Write a string enum named Theme with two members: Light equal to \"LIGHT\", and Dark equal to \"DARK\".", starter: "enum Theme {\n\n}", checks: [/enum\s+Theme\s*\{[^}]*Light\s*=\s*["']LIGHT["'][^}]*Dark\s*=\s*["']DARK["'][^}]*\}/s], hint: "Each member of a string enum needs its own `= \"VALUE\"` written explicitly — unlike numeric enums, they don't auto-fill.", solution: "enum Theme {\n  Light = \"LIGHT\",\n  Dark = \"DARK\",\n}", explain: "String enum members don't auto-increment the way numeric ones do — each one needs its exact string value spelled out." }
    ]
  },
  {
    id: "narrowing", title: "Type narrowing",
    tagline: "How TypeScript gets more specific about a value's type as you add if-checks — like a detective ruling out suspects.",
    blocks: [
      { h: "The problem: a value could be more than one type", p: "If a parameter is typed as `string | number`, TypeScript won't let you blindly call a string-only method on it — what if it's actually a number at that moment? You first need to check which one it is. That process is called narrowing.",
        tip: "Narrowing just means: inside an if-check, TypeScript quietly keeps track of which type is still possible, and lets you use the matching methods safely in that branch." },
      { h: "typeof: the most common narrowing check", p: "Checking `typeof value === \"string\"` inside an if tells TypeScript exactly what to assume for the rest of that block — no extra effort from you required.",
        code: "function format(value: string | number) {\n  if (typeof value === \"string\") {\n    return value.toUpperCase(); // TypeScript knows it's a string here\n  }\n  return value.toFixed(2);      // and knows it's a number here\n}" },
      { h: "instanceof: narrowing by class", p: "When you're working with class instances instead of primitives, instanceof checks which class a value was built from.",
        code: "class Cat { meow() {} }\nclass Dog { bark() {} }\n\nfunction speak(animal: Cat | Dog) {\n  if (animal instanceof Cat) {\n    animal.meow();\n  } else {\n    animal.bark();\n  }\n}" },
      { h: "Discriminated unions: a tidy pattern worth knowing", p: "A common trick: give every variant in a union a shared property (often called a 'tag', like kind) with its own literal value. Then, checking that one property lets TypeScript figure out the whole object's shape at once.",
        code: "type Shape =\n  | { kind: \"circle\"; radius: number }\n  | { kind: \"square\"; side: number };\n\nfunction area(s: Shape): number {\n  if (s.kind === \"circle\") return Math.PI * s.radius ** 2; // radius is available here\n  return s.side * s.side;                                  // side is available here\n}" }
    ],
    exercises: [
      { type: "code", q: "Inside the if-branch, call .trim() on `input` — this only works once TypeScript knows for sure it's a string.", starter: "function clean(input: string | number) {\n  if (typeof input === \"string\") {\n    // your code here\n  }\n}", checks: [/typeof\s+input\s*===\s*["']string["'][\s\S]*input\.trim\(\)/], hint: "The if-check `typeof input === \"string\"` is already written for you — you just need to add `input.trim();` on the line inside it.", solution: "function clean(input: string | number) {\n  if (typeof input === \"string\") {\n    input.trim();\n  }\n}", explain: "Once the typeof check confirms input is a string, TypeScript allows every string-only method — like .trim() — without complaint, for the rest of that block." },
      { type: "mcq", q: "What must a custom type-guard function's return type look like, so TypeScript trusts it as a narrowing check?", options: ["boolean — nothing special needed", "void", "paramName is SomeType", "SomeType | undefined"], correct: 2, explain: "Writing `param is Type` as the return type is a special signal TypeScript understands: whenever this function returns true somewhere in a condition, it treats the checked value as narrowed to that type." }
    ]
  },
  {
    id: "generics", title: "Generics",
    tagline: "Writing one function or type that works with many different types, without giving up type safety.",
    blocks: [
      { h: "The problem generics solve", p: "Imagine writing a function that just hands back whatever you passed into it. Without generics, you'd either write it once per type (identityString, identityNumber, ...) or use any and lose all checking. Generics give you a third option: one definition that adapts to whatever type shows up.",
        tip: "Think of a generic type parameter — usually written as T — like a labeled blank in a form. You don't know what goes in the blank yet, but whatever you write there has to stay consistent throughout." },
      { h: "A generic function", p: "T is a placeholder that TypeScript fills in based on what you actually pass in — you rarely have to write it explicitly.",
        code: "function identity<T>(value: T): T {\n  return value;\n}\nidentity<string>(\"hi\"); // T is explicitly string here\nidentity(42);            // T is inferred as number automatically" },
      { h: "Generic interfaces, and constraining what T can be", p: "Interfaces can take a type parameter too. And you can restrict what's allowed for T using extends — this guarantees you're only allowed types that have whatever members you rely on.",
        code: "interface Box<T> {\n  value: T;\n}\nconst b: Box<number> = { value: 5 };\n\n// T must be something with a .length property, like a string or array\nfunction longest<T extends { length: number }>(a: T, b: T): T {\n  return a.length >= b.length ? a : b;\n}" }
    ],
    exercises: [
      { type: "code", q: "Write a generic function named firstItem that takes an array of type T and returns its first element, also of type T.", starter: "function firstItem", checks: [/function\s+firstItem\s*<\s*T\s*>\s*\(\s*\w+\s*:\s*T\s*\[\]\s*\)\s*:\s*T/], hint: "The shape is: function firstItem<T>(arr: T[]): T { return arr[0]; } — the angle brackets <T> come right after the function name.", solution: "function firstItem<T>(arr: T[]): T {\n  return arr[0];\n}", explain: "T stands in for 'whatever type the caller's array actually holds'. Calling firstItem([1,2,3]) makes T become number automatically, so the return type is also number." },
      { type: "mcq", q: "In `function longest<T extends { length: number }>(a: T, b: T): T`, what job is `extends { length: number }` doing?", options: ["It makes T optional", "It restricts T to only types that have a .length property, so using a.length is safe", "It's what makes the function generic in the first place", "It sets a default value if T isn't provided"], correct: 1, explain: "That's a constraint. It doesn't remove T's flexibility — it just narrows the range of acceptable types to ones guaranteed to have a length property, which is what the function body needs to compare a and b." }
    ]
  },
  {
    id: "utility", title: "Utility types",
    tagline: "Ready-made helpers that reshape a type you already have, so you don't have to redefine it by hand.",
    blocks: [
      { h: "Partial, Required, Readonly", p: "These take an existing type and adjust every property at once. Partial<T> makes every property optional (handy for describing 'just the fields someone wants to update'). Required<T> does the reverse. Readonly<T> locks every property against reassignment.",
        code: "interface User { id: number; name: string; }\n\nfunction updateUser(id: number, changes: Partial<User>) {\n  // changes might be just { name: \"New Name\" } — that's fine now\n}" },
      { h: "Pick and Omit", p: "Pick<T, Keys> builds a smaller type containing only the properties you list. Omit<T, Keys> does the opposite — it builds a type with everything except the properties you list.",
        code: "interface User { id: number; name: string; email: string; }\n\ntype UserPreview = Pick<User, \"id\" | \"name\">;      // { id: number; name: string }\ntype UserWithoutEmail = Omit<User, \"email\">;        // { id: number; name: string }" },
      { h: "Record: a typed dictionary", p: "Record<Keys, ValueType> describes an object where every key maps to the same kind of value — like a lookup table.",
        code: "type Inventory = Record<string, number>;\nconst stock: Inventory = { apples: 10, pears: 4 };" }
    ],
    exercises: [
      { type: "mcq", q: "You have `interface User { id: number; name: string; email: string }` and want a type with only id and name. Which is the better fit?", options: ["Omit<User, \"email\">", "Pick<User, \"id\" | \"name\">", "Partial<User>", "Both A and B end up producing the same result here"], correct: 3, explain: "Pick<User, \"id\" | \"name\"> keeps only what you list; Omit<User, \"email\"> removes only what you list. With exactly three total properties, removing email leaves the same two you'd pick directly — so both approaches land on the same type here." },
      { type: "code", q: "Type the `changes` parameter as a Partial of User (assume `interface User` is already defined elsewhere).", starter: "function patchUser(id: number, changes) {\n\n}", checks: [/changes\s*:\s*Partial\s*<\s*User\s*>/], hint: "Right after `changes`, add `: Partial<User>`.", solution: "function patchUser(id: number, changes: Partial<User>) {\n\n}", explain: "Partial<User> means the caller can pass an object containing any subset of User's properties — exactly the shape you'd want for an 'update just these fields' function." }
    ]
  },
  {
    id: "advanced", title: "Advanced types",
    tagline: "A peek behind the curtain at keyof, mapped types, and conditional types — the tools that build the utility types you just learned.",
    blocks: [
      { h: "keyof: getting all the property names of a type", p: "keyof T produces a union of all of T's property names, as string literal types. It's a way to ask TypeScript, 'what are this type's keys?' and get a usable answer back.",
        code: "interface User { id: number; name: string; }\ntype UserKey = keyof User; // \"id\" | \"name\"" },
      { h: "Mapped types: how Partial and friends are actually built", p: "A mapped type builds a brand new object type by looping over another type's keys. This is genuinely how Partial, Readonly, and Pick work under the hood — they're not magic, just mapped types someone already wrote for you.",
        code: "type MyPartial<T> = {\n  [K in keyof T]?: T[K];\n};\ntype MyReadonly<T> = {\n  readonly [K in keyof T]: T[K];\n};" },
      { h: "Conditional types: an if/else for types", p: "A conditional type picks between two types based on a check — much like a ternary (`condition ? a : b`), except it's evaluated on types instead of values. This is the trick behind Exclude, Extract, and ReturnType.",
        code: "type IsString<T> = T extends string ? true : false;\ntype A = IsString<\"hi\">; // true\ntype B = IsString<42>;   // false" }
    ],
    exercises: [
      { type: "mcq", q: "Given `interface Point { x: number; y: number }`, what does `keyof Point` evaluate to?", options: ["number", "\"x\" | \"y\"", "Point[]", "{ x: number; y: number }"], correct: 1, explain: "keyof hands you a union of the type's own property names as string literals — here, exactly \"x\" | \"y\", nothing more." },
      { type: "code", q: "Write a mapped type MyReadonly<T> that makes every property of T readonly, without using the built-in Readonly.", starter: "type MyReadonly<T> = ", checks: [/type\s+MyReadonly\s*<\s*T\s*>\s*=\s*\{\s*readonly\s*\[\s*K\s+in\s+keyof\s+T\s*\]\s*:\s*T\s*\[\s*K\s*\]\s*;?\s*\}/], hint: "The shape is: { readonly [K in keyof T]: T[K] } — read it as 'for every key K in T, make a readonly property with the same type as T's original key'.", solution: "type MyReadonly<T> = {\n  readonly [K in keyof T]: T[K];\n};", explain: "`[K in keyof T]` loops over every key of T one at a time; putting readonly in front applies that modifier to each resulting property." }
    ]
  },
  {
    id: "async", title: "Async code & Promises",
    tagline: "How to type code that waits for something — like a network request — without freezing everything else.",
    blocks: [
      { h: "A Promise is an 'I owe you a value, eventually'", p: "When you ask for something that takes time (fetching data from the internet, for example), JavaScript hands you back a Promise right away — a placeholder that will eventually either succeed with a value, or fail with an error. Promise<T> means 'a promise that will eventually resolve to a value of type T'.",
        code: "function fetchUser(id: number): Promise<{ id: number; name: string }> {\n  return fetch(\"/users/\" + id).then(r => r.json());\n}" },
      { h: "async and await: writing it like normal, step-by-step code", p: "Marking a function async lets you use the await keyword inside it, which pauses that function (without freezing the rest of your program) until a Promise settles. An async function always returns a Promise itself — even if the code inside looks like it's just returning a plain value.",
        code: "async function getUser(id: number): Promise<{ id: number; name: string }> {\n  const res = await fetch(\"/users/\" + id); // pause here until the request finishes\n  return res.json();\n}" },
      { h: "Handling errors with try/catch", p: "try/catch works around await exactly like it does around normal code. One detail: under strict settings, the error you catch is typed as unknown, so narrow it (often with `instanceof Error`) before reading properties like .message.",
        code: "async function safeGetUser(id: number) {\n  try {\n    return await getUser(id);\n  } catch (err) {\n    if (err instanceof Error) {\n      console.error(err.message);\n    }\n    return null;\n  }\n}" }
    ],
    exercises: [
      { type: "mcq", q: "What is the return type of an async function whose body does `return 42;`?", options: ["number", "Promise<number>", "any", "void"], correct: 1, explain: "Every async function automatically wraps its result in a Promise. Even though the code says `return 42`, the function's actual return type is Promise<number>, not plain number." },
      { type: "code", q: "Add a return type annotation to this async function — it eventually resolves to a boolean.", starter: "async function isAvailable(id: number) {\n  return true;\n}", checks: [/async\s+function\s+isAvailable\s*\(\s*id\s*:\s*number\s*\)\s*:\s*Promise\s*<\s*boolean\s*>/], hint: "Remember async functions always return a Promise — so the annotation is Promise<boolean>, not just boolean.", solution: "async function isAvailable(id: number): Promise<boolean> {\n  return true;\n}", explain: "Because async functions always hand back a Promise, the honest annotation reflects that wrapper: Promise<boolean> rather than bare boolean." }
    ]
  },
  {
    id: "modules", title: "Modules",
    tagline: "Splitting your code across multiple files, and sharing pieces between them with export and import.",
    blocks: [
      { h: "Why split code into files at all", p: "As a project grows, keeping everything in one file becomes unmanageable. Modules let you write related code in its own file, then explicitly choose what other files are allowed to use from it.",
        tip: "Every .ts file is automatically its own module. Nothing inside it is visible to other files unless you explicitly export it." },
      { h: "Named exports and imports", p: "Any declaration — a function, class, interface, type, or const — can be exported by name. Another file imports it using that same name, wrapped in curly braces.",
        code: "// math.ts\nexport function add(a: number, b: number) {\n  return a + b;\n}\nexport interface Vector { x: number; y: number; }\n\n// main.ts\nimport { add, Vector } from \"./math\";" },
      { h: "Default exports", p: "A module can additionally have one 'main' export, called the default export. It's imported without curly braces, and the importing file can call it whatever name it likes.",
        code: "// user.ts\nexport default class User {\n  constructor(public name: string) {}\n}\n\n// main.ts\nimport User from \"./user\"; // no curly braces for a default export" }
    ],
    exercises: [
      { type: "mcq", q: "How many default exports can a single file have?", options: ["Zero or one — it's entirely optional, and there can never be more than one", "Exactly one, always required", "As many as you want", "Only classes are allowed to be default exports"], correct: 0, explain: "A file may have at most one default export, and it's optional — but it can still have any number of named exports alongside it." },
      { type: "code", q: "Write a named import that pulls formatDate and parseDate from a file at \"./date-utils\".", starter: "", checks: [/import\s*\{\s*formatDate\s*,\s*parseDate\s*\}\s*from\s*["']\.\/date-utils["']/], hint: "Named imports go inside curly braces, separated by a comma: import { a, b } from \"path\";", solution: "import { formatDate, parseDate } from \"./date-utils\";", explain: "Named imports must match the exported names exactly (unless you rename with `as`), and multiple names are separated by commas inside the curly braces." }
    ]
  }
  ]
};
