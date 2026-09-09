export const cssCourse = {
  id: "css",
  title: "CSS",
  category: "Languages & Core",
  summary: "Colors, layout, spacing — how to make HTML actually look like something.",
  comingSoon: false,
  topics: [
    {
      id: "what-is-css",
      title: "What is CSS?",
      tagline: "Rules that describe how HTML elements should look.",
      blocks: [
        { h: "Selectors + declarations", p: "A CSS rule has a selector (which elements it targets) and a block of declarations (property: value pairs) that describe how those elements should look.",
          tip: "Read a rule like a sentence: 'For every <p>, set the color to a dark gray and the font size to 16 pixels.'",
          code: "p {\n  color: #333;\n  font-size: 16px;\n}" },
        { h: "Three ways to add CSS", p: "Inline (a style attribute on one element), internal (a <style> tag in the page's <head>), or external (a separate .css file linked with <link>). External is the standard for any real project — it keeps styling separate from structure and lets one stylesheet style many pages.",
          code: "<!-- external, the recommended way -->\n<link rel=\"stylesheet\" href=\"styles.css\" />" }
      ],
      exercises: [
        { type: "mcq", q: "What are the two main parts of a CSS rule?", options: ["A selector and a block of declarations", "A tag and an attribute", "A class and an id", "An import and an export"], correct: 0, explain: "The selector picks which elements to target; the declaration block (in curly braces) says how to style them." },
        { type: "code", q: "Write a CSS rule that sets every <h1>'s color to \"red\".", starter: "", checks: [/h1\s*\{[^}]*color\s*:\s*red[^}]*\}/i], hint: "selector { property: value; }", solution: "h1 {\n  color: red;\n}", explain: "h1 is the selector, and color: red; is the one declaration inside the block." }
      ]
    },
    {
      id: "selectors",
      title: "Selectors",
      tagline: "Precisely targeting the elements you want to style.",
      blocks: [
        { h: "Element, class, and id selectors", p: "An element selector (p) targets every element of that type. A class selector (.card) targets any element with class=\"card\" — classes are reusable across many elements. An id selector (#header) targets the one element with id=\"header\" — ids must be unique on a page.",
          tip: "Reach for classes almost always. Save ids for things that are genuinely one-of-a-kind on the page, like a unique page header.",
          code: "p { color: navy; }\n.card { border: 1px solid #ccc; }\n#header { background: black; }" },
        { h: "Combining selectors", p: "You can chain a class onto an element (button.primary targets only <button> elements with class=\"primary\"), or use a space to target descendants (nav a targets any <a> inside a <nav>, no matter how deeply nested).",
          code: "button.primary { background: blue; }\nnav a { text-decoration: none; }" }
      ],
      exercises: [
        { type: "mcq", q: "Which selector should you reach for most often when styling reusable components?", options: ["Class selector (.name)", "Id selector (#name)", "Universal selector (*)", "Attribute selector"], correct: 0, explain: "Classes are reusable across many elements, which is exactly what most styling needs. Ids should be reserved for unique elements." },
        { type: "code", q: "Write a CSS rule targeting every element with class=\"highlight\", setting background-color to \"yellow\".", starter: "", checks: [/\.highlight\s*\{[^}]*background-color\s*:\s*yellow[^}]*\}/i], hint: "Class selectors start with a dot: .highlight { ... }", solution: ".highlight {\n  background-color: yellow;\n}", explain: "A leading dot means 'match any element with this class' — .highlight matches class=\"highlight\"." }
      ]
    },
    {
      id: "box-model",
      title: "The box model",
      tagline: "Every element on a page is secretly a rectangular box.",
      blocks: [
        { h: "Content, padding, border, margin", p: "From the inside out: content is the element itself (text, an image). Padding is space inside the border, between the content and the edge. Border is a visible line around the padding. Margin is space outside the border, separating the element from its neighbors.",
          tip: "A handy mnemonic: padding is like a coat pushing outward from your body; margin is the empty space you keep between yourself and other people.",
          code: ".box {\n  padding: 16px;\n  border: 1px solid #ccc;\n  margin: 24px;\n}" },
        { h: "box-sizing changes the math", p: "By default, width/height apply only to the content — padding and border add extra size on top. Setting box-sizing: border-box makes width/height include padding and border instead, which is far more predictable and is what most modern CSS resets turn on globally.",
          code: "* {\n  box-sizing: border-box;\n}" }
      ],
      exercises: [
        { type: "mcq", q: "Going from the inside out, what's the correct box model order?", options: ["Content, padding, border, margin", "Content, margin, border, padding", "Padding, content, margin, border", "Border, content, padding, margin"], correct: 0, explain: "Content is innermost, then padding, then the border line, then margin as the outermost spacing." },
        { type: "code", q: "Write a rule for .box setting padding to 10px and margin to 20px.", starter: "", checks: [/\.box\s*\{[^}]*padding\s*:\s*10px[^}]*margin\s*:\s*20px[^}]*\}|\.box\s*\{[^}]*margin\s*:\s*20px[^}]*padding\s*:\s*10px[^}]*\}/i], hint: "Both declarations go inside the same .box { } block, in any order.", solution: ".box {\n  padding: 10px;\n  margin: 20px;\n}", explain: "Declaration order inside a rule doesn't matter here since padding and margin don't affect each other." }
      ]
    },
    {
      id: "flexbox",
      title: "Layout with Flexbox",
      tagline: "The single most useful layout tool for arranging things in a row or column.",
      blocks: [
        { h: "Turning on flex", p: "Set display: flex on a container, and its direct children line up in a row by default (side by side), instead of each stacking on its own line the way block elements normally do.",
          code: ".row {\n  display: flex;\n}" },
        { h: "Aligning and spacing children", p: "justify-content controls spacing along the main axis (horizontally, by default) — options like center, space-between, and space-around are common. align-items controls alignment on the cross axis (vertically, by default) — center is the most common for vertically centering things.",
          tip: "'Center something with flexbox' almost always means: display: flex; justify-content: center; align-items: center; on the parent.",
          code: ".row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}" },
        { h: "gap adds space between items", p: "The gap property adds consistent spacing between flex children, without needing margin tricks on individual items.", code: ".row {\n  display: flex;\n  gap: 12px;\n}" }
      ],
      exercises: [
        { type: "mcq", q: "Which property turns a container into a flex container?", options: ["display: flex;", "position: flex;", "layout: flex;", "flex: container;"], correct: 0, explain: "display: flex; on the parent is what activates flexbox layout for its direct children." },
        { type: "code", q: "Write a rule for .row that makes it a flex container with its items centered on both axes.", starter: "", checks: [/\.row\s*\{[^}]*display\s*:\s*flex[^}]*\}/i, /justify-content\s*:\s*center/i, /align-items\s*:\s*center/i], hint: "You need display: flex, justify-content: center, and align-items: center — all inside the .row rule.", solution: ".row {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}", explain: "justify-content centers along the main axis, align-items centers along the cross axis — together they fully center content." }
      ]
    },
    {
      id: "responsive",
      title: "Responsive design",
      tagline: "Making layouts adapt to different screen sizes.",
      blocks: [
        { h: "Media queries", p: "A media query applies CSS only when a condition is true — most commonly, when the viewport is at or below a certain width. This is how a three-column layout becomes one column on a phone.",
          code: "@media (max-width: 600px) {\n  .row {\n    flex-direction: column;\n  }\n}" },
        { h: "Relative units", p: "Prefer relative units over fixed pixel values where it makes sense: % sizes relative to the parent, rem sizes relative to the root font size (great for consistent, scalable spacing and text), and vw/vh size relative to the viewport." }
      ],
      exercises: [
        { type: "mcq", q: "What does a media query like @media (max-width: 600px) { ... } do?", options: ["Applies the enclosed styles only when the viewport is 600px wide or narrower", "Sets every element's width to 600px", "Only works in print stylesheets", "Disables CSS above 600px"], correct: 0, explain: "max-width: 600px means 'apply these styles when the viewport is at most 600px wide' — the common pattern for mobile layouts." },
        { type: "mcq", q: "Which unit is sized relative to the root element's font size?", options: ["rem", "px", "vh", "deg"], correct: 0, explain: "rem stands for 'root em' — it scales with the root (<html>) font size, making it great for consistent, scalable spacing." }
      ]
    }
  ]
};
