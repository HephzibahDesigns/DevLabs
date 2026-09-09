export const javascriptCourse = {
  id: "javascript",
  title: "JavaScript",
  category: "Languages & Core",
  summary: "Bring pages to life — variables, logic, functions, and the DOM.",
  comingSoon: false,
  topics: [
    {
      id: "variables",
      title: "Variables & values",
      tagline: "Storing information so your program can use it later.",
      blocks: [
        { h: "let, const, and (never) var", p: "Use const when a variable's value won't be reassigned — this should be your default. Use let when it will change. var is an older way of declaring variables with confusing behavior, and modern code avoids it.",
          tip: "Start every variable as const. Only switch to let if you get an error telling you that you're trying to reassign a constant.",
          code: "const name = \"Ada\";\nlet age = 30;\nage = 31; // fine, age was declared with let\n// name = \"Grace\"; // error — name is const" },
        { h: "Primitive types", p: "The basic building blocks: string (text, in quotes), number (both whole numbers and decimals), boolean (true or false), and the special values null and undefined for 'nothing here'.",
          code: "const city = \"Lagos\";      // string\nconst count = 42;          // number\nconst isActive = true;     // boolean\nlet result = undefined;    // not yet set" }
      ],
      exercises: [
        { type: "mcq", q: "Which keyword should you reach for by default when declaring a variable?", options: ["const", "let", "var", "def"], correct: 0, explain: "const communicates 'this won't be reassigned', which is the more common and safer case — reach for let only when you know the value needs to change." },
        { type: "code", q: "Declare a const variable named greeting with the value \"Hello\".", starter: "", checks: [/const\s+greeting\s*=\s*["']Hello["']\s*;?/], hint: "const name = value;", solution: "const greeting = \"Hello\";", explain: "const declares a variable that can't be reassigned later — perfect for a value like this that never changes." }
      ]
    },
    {
      id: "functions",
      title: "Functions",
      tagline: "Reusable blocks of logic you can call by name.",
      blocks: [
        { h: "Declaring and calling functions", p: "A function is a named, reusable block of code. You define it once, then call it (run it) as many times as you like, optionally passing in different arguments each time.",
          code: "function greet(name) {\n  return \"Hello, \" + name + \"!\";\n}\n\ngreet(\"Ada\"); // \"Hello, Ada!\"\ngreet(\"Grace\"); // \"Hello, Grace!\"" },
        { h: "Arrow functions", p: "Arrow functions are a shorter way to write functions, especially common for small one-off functions passed as arguments. They behave almost identically to regular functions for everyday use.",
          code: "const add = (a, b) => {\n  return a + b;\n};\n\n// shorter, when the body is just one expression\nconst double = (n) => n * 2;" }
      ],
      exercises: [
        { type: "mcq", q: "What's the main purpose of a function?", options: ["To bundle reusable logic under a name you can call repeatedly", "To permanently store data on disk", "To style HTML elements", "To define the structure of a web page"], correct: 0, explain: "Functions let you write logic once and reuse it — call the same function with different inputs instead of copy-pasting code." },
        { type: "code", q: "Write an arrow function named square that takes a number n and returns n * n.", starter: "", checks: [/const\s+square\s*=\s*\(?n\)?\s*=>/, /n\s*\*\s*n/], hint: "const square = (n) => n * n;", solution: "const square = (n) => n * n;", explain: "This is the compact 'implicit return' form of an arrow function — no curly braces or return keyword needed for a single expression." }
      ]
    },
    {
      id: "conditionals-loops",
      title: "Conditionals & loops",
      tagline: "Making decisions and repeating work.",
      blocks: [
        { h: "if / else", p: "An if statement runs a block of code only when a condition is true. Add else to run different code when it's false, and else if to check additional conditions in sequence.",
          code: "const age = 20;\nif (age >= 18) {\n  console.log(\"adult\");\n} else {\n  console.log(\"minor\");\n}" },
        { h: "for and while loops", p: "A for loop repeats a block a set number of times — great when you know how many iterations you need, like looping over an array. A while loop repeats as long as a condition stays true — useful when you don't know the count ahead of time.",
          code: "for (let i = 0; i < 3; i++) {\n  console.log(i); // 0, 1, 2\n}\n\nlet n = 5;\nwhile (n > 0) {\n  n--;\n}" }
      ],
      exercises: [
        { type: "mcq", q: "When is a for loop typically the better choice over a while loop?", options: ["When you know in advance how many times to repeat", "When the condition might never become true", "When you don't want to repeat anything", "For loops and while loops can never do the same thing"], correct: 0, explain: "for loops are the natural fit when you know the number of iterations up front — e.g. looping a fixed number of times or over every item in an array." },
        { type: "code", q: "Write an if statement that logs \"positive\" when a variable n is greater than 0.", starter: "const n = 5;\n", checks: [/if\s*\(\s*n\s*>\s*0\s*\)/, /console\.log\(\s*["']positive["']\s*\)/], hint: "if (condition) { console.log(...); }", solution: "if (n > 0) {\n  console.log(\"positive\");\n}", explain: "The condition n > 0 goes in parentheses, and the code to run only when it's true goes inside the curly braces." }
      ]
    },
    {
      id: "arrays-objects",
      title: "Arrays & objects",
      tagline: "The two data structures you'll use constantly.",
      blocks: [
        { h: "Arrays hold ordered lists", p: "An array is an ordered collection, written with square brackets. Access items by their zero-based index — the first item is at index 0.",
          code: "const fruits = [\"apple\", \"banana\", \"cherry\"];\nfruits[0]; // \"apple\"\nfruits.length; // 3\nfruits.push(\"date\"); // adds to the end" },
        { h: "Objects hold key-value pairs", p: "An object groups related data under named keys, written with curly braces. Access a value with dot notation (object.key) or bracket notation (object[\"key\"]).",
          code: "const user = {\n  name: \"Ada\",\n  age: 30\n};\nuser.name; // \"Ada\"\nuser[\"age\"]; // 30" },
        { h: "Common array methods", p: "map() transforms every item into a new array. filter() keeps only items matching a condition. Both return a brand-new array and leave the original untouched.",
          code: "const nums = [1, 2, 3];\nconst doubled = nums.map((n) => n * 2); // [2, 4, 6]\nconst evens = nums.filter((n) => n % 2 === 0); // [2]" }
      ],
      exercises: [
        { type: "mcq", q: "What index does the first item in an array have?", options: ["0", "1", "-1", "It depends on the array"], correct: 0, explain: "JavaScript arrays are zero-indexed — the first item is always at index 0." },
        { type: "code", q: "Write an object named person with a name key set to \"Ada\" and an age key set to 30.", starter: "", checks: [/const\s+person\s*=\s*\{[^}]*name\s*:\s*["']Ada["'][^}]*age\s*:\s*30[^}]*\}|const\s+person\s*=\s*\{[^}]*age\s*:\s*30[^}]*name\s*:\s*["']Ada["'][^}]*\}/], hint: "const person = { name: \"Ada\", age: 30 };", solution: "const person = { name: \"Ada\", age: 30 };", explain: "Object keys and values are separated by colons, and each key-value pair is separated by a comma." }
      ]
    },
    {
      id: "dom",
      title: "The DOM",
      tagline: "How JavaScript reads and changes what's on the page.",
      blocks: [
        { h: "What the DOM is", p: "The DOM (Document Object Model) is the browser's live, in-memory representation of your HTML — a tree of elements that JavaScript can read and modify. Changing the DOM changes what's on screen, instantly, without reloading the page.",
          code: "// grab an element from the page\nconst title = document.querySelector(\"h1\");\ntitle.textContent = \"Updated!\";" },
        { h: "Responding to events", p: "addEventListener lets you run a function whenever something happens — a click, a key press, a form submission. This is the foundation of interactivity: nothing on a page reacts to a user without an event listener somewhere.",
          code: "const button = document.querySelector(\"button\");\nbutton.addEventListener(\"click\", () => {\n  console.log(\"clicked!\");\n});" }
      ],
      exercises: [
        { type: "mcq", q: "What does the DOM represent?", options: ["The browser's live, in-memory tree of the page's elements", "A database table", "A CSS stylesheet", "A JavaScript variable type"], correct: 0, explain: "The DOM is the browser's live representation of the page — JavaScript reads and updates it to change what's displayed." },
        { type: "mcq", q: "What's the standard way to run code when a button is clicked?", options: ["button.addEventListener(\"click\", handlerFunction)", "button.onClickHappened()", "if (button.clicked) { ... }", "It happens automatically, no code needed"], correct: 0, explain: "addEventListener registers a function to run whenever the given event — here, \"click\" — occurs on that element." }
      ]
    }
  ]
};
