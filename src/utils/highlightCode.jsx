import React from "react";

/* ============================= SYNTAX HIGHLIGHTING =============================
   A tiny regex-based highlighter — good enough for the short code snippets
   shown in lessons, without pulling in a full syntax-highlighting library. */

// Words that get the "keyword" color (control flow, declarations, etc.)
const KEYWORDS = "interface|type|class|extends|implements|function|const|let|var|return|if|else|for|while|new|this|public|private|protected|readonly|abstract|enum|import|export|from|default|async|await|try|catch|throw|in|of|instanceof|typeof|keyof|as|is|static|get|set|namespace|declare|satisfies|switch|case|break";

// Words that get the "type" color (built-in types and common TS utility types)
const TYPES = "string|number|boolean|any|unknown|object|symbol|bigint|null|undefined|true|false|void|never|Array|Promise|Record|Partial|Pick|Omit|Readonly|Required|Exclude|Extract|ReturnType|Capitalize";

// One combined pattern that finds, in priority order: line comments,
// strings (backtick/single/double quoted), keywords, types, and numbers.
const TOKEN_PATTERN = new RegExp(
  "(\\/\\/.*$)" +
  "|(`(?:[^`\\\\]|\\\\.)*`|'(?:[^'\\\\]|\\\\.)*'|\"(?:[^\"\\\\]|\\\\.)*\")" +
  "|\\b(" + KEYWORDS + ")\\b" +
  "|\\b(" + TYPES + ")\\b" +
  "|\\b(\\d+(?:\\.\\d+)?)\\b",
  "gm"
);

// Splits a code string into React fragments/spans, coloring each matched
// token (comment/string/keyword/type/number) and leaving everything else
// as plain text in between.
export function highlightCode(code) {
  const renderedParts = [];
  let lastMatchEnd = 0;
  let match;
  let fragmentKey = 0;
  const tokenScanner = new RegExp(TOKEN_PATTERN.source, TOKEN_PATTERN.flags);

  while ((match = tokenScanner.exec(code)) !== null) {
    // Anything between the previous match and this one is plain, unstyled text.
    if (match.index > lastMatchEnd) {
      renderedParts.push(
        <React.Fragment key={fragmentKey++}>
          {code.slice(lastMatchEnd, match.index)}
        </React.Fragment>
      );
    }

    const [fullMatch, commentText, stringText, keywordText, typeText, numberText] = match;
    let tokenClassName = null;
    if (commentText) tokenClassName = "text-tokCmt italic";
    else if (stringText) tokenClassName = "text-tokStr";
    else if (keywordText) tokenClassName = "text-tokKw";
    else if (typeText) tokenClassName = "text-tokTy";
    else if (numberText) tokenClassName = "text-tokNum";

    renderedParts.push(
      <span key={fragmentKey++} className={tokenClassName}>
        {fullMatch}
      </span>
    );
    lastMatchEnd = match.index + fullMatch.length;
  }

  // Trailing plain text after the last matched token.
  if (lastMatchEnd < code.length) {
    renderedParts.push(
      <React.Fragment key={fragmentKey++}>{code.slice(lastMatchEnd)}</React.Fragment>
    );
  }

  return renderedParts;
}
