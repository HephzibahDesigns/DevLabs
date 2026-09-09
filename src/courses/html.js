export const htmlCourse = {
  id: "html",
  title: "HTML",
  category: "Languages & Core",
  summary: "The skeleton of every web page — learn to structure content the right way.",
  comingSoon: false,
  topics: [
    {
      id: "what-is-html",
      title: "What is HTML?",
      tagline: "The markup language that gives every web page its structure and meaning.",
      blocks: [
        { h: "Structure, not style", p: "HTML (HyperText Markup Language) describes what a page contains and how it's organized — a heading, a paragraph, a list, a button. It does not decide colors or fonts; that's CSS's job. Think of HTML as the skeleton, and CSS as the skin and clothes.",
          tip: "If you're ever unsure whether something belongs in HTML or CSS, ask: 'is this about meaning/structure, or about appearance?' Meaning → HTML. Appearance → CSS.",
          code: "<h1>Welcome</h1>\n<p>This is a paragraph of text.</p>\n<button>Click me</button>" },
        { h: "Elements are made of tags", p: "Most HTML elements have an opening tag and a matching closing tag, with content in between. A few elements (like images and line breaks) are 'self-closing' and never wrap any content.",
          tip: "The closing tag is just the opening tag with a forward slash: <p> opens, </p> closes. Forgetting the closing tag is one of the most common beginner mistakes.",
          code: "<p>A normal element with content.</p>\n<img src=\"cat.jpg\" alt=\"A cat\" />\n<br />" },
        { h: "Attributes add extra information", p: "Attributes live inside the opening tag and give an element extra details — a link's destination, an image's source file, or an accessible label. They're written as name=\"value\" pairs.",
          code: "<a href=\"https://example.com\">Visit example.com</a>\n<img src=\"logo.png\" alt=\"Company logo\" width=\"120\" />" }
      ],
      exercises: [
        { type: "mcq", q: "What does HTML primarily describe?", options: ["The structure and meaning of content", "Colors and fonts", "How to animate elements", "Database queries"], correct: 0, explain: "HTML is about structure and meaning — headings, paragraphs, lists. Visual styling is CSS's job." },
        { type: "code", q: "Write a paragraph element containing the text \"Hello, world!\".", starter: "", checks: [/<p>\s*Hello,\s*world!\s*<\/p>/i], hint: "It needs an opening <p>, the text, then a closing </p>.", solution: "<p>Hello, world!</p>", explain: "Every non-self-closing element needs a matching closing tag — </p> closes what <p> opened." }
      ]
    },
    {
      id: "document-structure",
      title: "The document skeleton",
      tagline: "Every HTML page starts from the same handful of required elements.",
      blocks: [
        { h: "The boilerplate", p: "Every HTML file starts with a doctype declaration (telling the browser 'this is modern HTML'), an <html> root element, a <head> for metadata the visitor doesn't see directly, and a <body> for everything that's actually displayed.",
          tip: "You'll type this exact skeleton hundreds of times — most code editors can generate it for you with a shortcut like typing '!' and pressing Tab.",
          code: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello!</h1>\n  </body>\n</html>" },
        { h: "The <head> holds metadata", p: "Nothing inside <head> is rendered on the page itself. It's where you set the page title (shown in the browser tab), link stylesheets, set the character encoding, and describe the page for search engines.",
          code: "<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>My Store</title>\n  <link rel=\"stylesheet\" href=\"styles.css\" />\n</head>" },
        { h: "The <body> holds everything visible", p: "Headings, paragraphs, images, buttons, forms — anything a visitor actually sees or interacts with goes inside <body>, and only inside <body>." }
      ],
      exercises: [
        { type: "mcq", q: "Where do visible page elements like headings and paragraphs go?", options: ["Inside <body>", "Inside <head>", "Inside <title>", "Directly inside <html>, never nested"], correct: 0, explain: "Everything a visitor actually sees belongs in <body>. <head> is for metadata that isn't rendered directly on the page." },
        { type: "code", q: "Write a <title> element (inside <head>, but just write the tag itself) setting the page title to \"My Store\".", starter: "", checks: [/<title>\s*My Store\s*<\/title>/i], hint: "It's just an opening tag, the text, and a closing tag — like a paragraph.", solution: "<title>My Store</title>", explain: "The <title> element's text shows up in the browser tab and in search engine results." }
      ]
    },
    {
      id: "text-and-lists",
      title: "Text, headings & lists",
      tagline: "The building blocks you'll reach for in almost every page.",
      blocks: [
        { h: "Headings show hierarchy", p: "There are six heading levels, <h1> through <h6>, from most to least important. Use them in order — don't skip from <h1> straight to <h4> just because you like how it looks; screen readers and search engines rely on that hierarchy to understand your page.",
          code: "<h1>Page Title</h1>\n<h2>A Major Section</h2>\n<h3>A Subsection</h3>" },
        { h: "Lists group related items", p: "Use <ul> (unordered list) for items where order doesn't matter, and <ol> (ordered list) when it does. Each item goes inside an <li> tag.",
          tip: "Unordered = bullets. Ordered = numbers. The names describe whether sequence matters, not how they look — you can restyle either with CSS.",
          code: "<ul>\n  <li>Milk</li>\n  <li>Eggs</li>\n</ul>\n\n<ol>\n  <li>Preheat oven</li>\n  <li>Mix ingredients</li>\n</ol>" },
        { h: "Inline emphasis", p: "<strong> marks text as important (usually shown bold), and <em> marks it as emphasized (usually shown italic). Prefer these over visual-only tags like <b> and <i> — they carry meaning, not just looks." }
      ],
      exercises: [
        { type: "mcq", q: "Which element should you use for the single most important heading on a page?", options: ["<h1>", "<h6>", "<head>", "<title>"], correct: 0, explain: "<h1> is the highest-level heading — typically used once per page for the main title." },
        { type: "code", q: "Write an unordered list with two list items: \"Tea\" and \"Coffee\".", starter: "", checks: [/<ul>[\s\S]*<li>\s*Tea\s*<\/li>[\s\S]*<li>\s*Coffee\s*<\/li>[\s\S]*<\/ul>/i], hint: "Wrap two <li> elements inside a <ul>.", solution: "<ul>\n  <li>Tea</li>\n  <li>Coffee</li>\n</ul>", explain: "<ul> is the container; each item inside it is its own <li>." }
      ]
    },
    {
      id: "links-images-forms",
      title: "Links, images & forms",
      tagline: "How pages connect to each other, and how they collect input from visitors.",
      blocks: [
        { h: "Links with <a>", p: "The anchor element creates a clickable link. Its href attribute is the destination — another page, another site, or a spot further down the same page.",
          code: "<a href=\"https://example.com\">External link</a>\n<a href=\"/about\">Internal link</a>\n<a href=\"#section-2\">Jump to section 2</a>" },
        { h: "Images with <img>", p: "<img> is self-closing and always needs a src (the file to show) and an alt (text describing the image, used by screen readers and shown if the image fails to load).",
          tip: "Never skip the alt attribute — even alt=\"\" (empty, for purely decorative images) is better than leaving it out entirely." },
        { h: "Forms collect input", p: "A <form> wraps one or more <input> elements (text fields, checkboxes, etc.) plus a submit button, so visitors can send data back to a server.",
          code: "<form>\n  <label for=\"email\">Email</label>\n  <input type=\"email\" id=\"email\" name=\"email\" />\n  <button type=\"submit\">Sign up</button>\n</form>" }
      ],
      exercises: [
        { type: "mcq", q: "Which attribute on <img> provides fallback text for screen readers?", options: ["alt", "title", "src", "label"], correct: 0, explain: "alt describes the image — it's read aloud by screen readers and shown if the image fails to load." },
        { type: "code", q: "Write a link to \"https://example.com\" with the visible text \"Visit\".", starter: "", checks: [/<a\s+href=["']https:\/\/example\.com["']\s*>\s*Visit\s*<\/a>/i], hint: "The destination goes in href, and the clickable text goes between the opening and closing tags.", solution: "<a href=\"https://example.com\">Visit</a>", explain: "href is required on every meaningful <a> element — without it, the element isn't actually a link." }
      ]
    },
    {
      id: "semantic-html",
      title: "Semantic HTML",
      tagline: "Tags that describe what a section is, not just how it's arranged.",
      blocks: [
        { h: "Why semantics matter", p: "You could build an entire page out of generic <div> elements — but tags like <header>, <nav>, <main>, <article>, and <footer> tell browsers, screen readers, and search engines what each part of the page actually is, for free.",
          code: "<header>\n  <nav>...</nav>\n</header>\n<main>\n  <article>...</article>\n</main>\n<footer>...</footer>" },
        { h: "<div> and <span> are the fallback", p: "When no semantic element fits, <div> (a generic block-level container) and <span> (a generic inline container) are your general-purpose tools — often used together with CSS classes for styling hooks.",
          tip: "Rule of thumb: reach for a semantic tag first; only fall back to <div>/<span> when nothing more specific applies." }
      ],
      exercises: [
        { type: "mcq", q: "Which element should wrap a site's main navigation links?", options: ["<nav>", "<div>", "<main>", "<footer>"], correct: 0, explain: "<nav> is the semantic element specifically meant for major navigation blocks." },
        { type: "mcq", q: "What's the main reason to prefer <article> over a plain <div> for a blog post?", options: ["It communicates meaning to browsers, assistive tech, and search engines", "It makes the text bold automatically", "It's required for the page to load", "It disables CSS on that section"], correct: 0, explain: "Semantic tags don't change appearance by default — their value is the meaning they communicate to tools that read your markup." }
      ]
    }
  ]
};
