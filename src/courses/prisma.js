// Prisma course — full content.
export const prismaCourse = {
  id: "prisma",
  title: "Prisma",
  category: "Backend & Tools",
  summary: "A type-safe way to talk to your database from JavaScript/TypeScript.",
  comingSoon: false,
  topics: [
  {
    id: "what-is-prisma", title: "What is Prisma?",
    tagline: "An ORM that lets you query your database using plain, type-safe JavaScript or TypeScript instead of raw SQL.",
    blocks: [
      { h: "The problem Prisma solves", p: "Talking to a database traditionally means writing raw SQL strings in your code — easy to get subtly wrong, with no autocomplete or type-checking. Prisma is an ORM (Object-Relational Mapper): it lets you describe your database's shape once, then query it using regular, type-safe JavaScript/TypeScript function calls.",
        tip: "Think of Prisma as a translator that sits between your code and your database — you call readable functions like `user.findMany()`, and Prisma generates the actual SQL behind the scenes." },
      { h: "The three main pieces", p: "A Prisma setup has three core parts: the schema file (`schema.prisma`), where you define your data models; Prisma Migrate, which turns schema changes into real database changes; and Prisma Client, the auto-generated, type-safe library you actually import and call in your code." }
    ],
    exercises: [
      { type: "mcq", q: "What is an ORM like Prisma primarily used for?", options: ["Styling a web page", "Letting you interact with a database using type-safe code instead of writing raw SQL by hand", "Hosting a website", "Managing Git branches"], correct: 1, explain: "An ORM maps your database tables to code objects and functions, so you write regular JavaScript/TypeScript calls that get translated into the underlying SQL — with the benefit of autocomplete and type checking." },
      { type: "mcq", q: "What is Prisma Client?", options: ["A visual database editor", "The auto-generated, type-safe library you import and call in your application code to query the database", "A command-line Git tool", "A CSS framework"], correct: 1, explain: "Prisma Client is generated automatically from your schema, and provides the actual functions — like prisma.user.findMany() — you call in your code to read and write data." }
    ]
  },
  {
    id: "schema-models", title: "The schema & models",
    tagline: "Describing the shape of your data once, in a single schema.prisma file.",
    blocks: [
      { h: "Defining a model", p: "A model in `schema.prisma` describes a table in your database — its fields, their types, and any special attributes like a primary key or a default value.",
        code: "model User {\n  id    Int     @id @default(autoincrement())\n  email String  @unique\n  name  String?\n}" },
      { h: "Field attributes", p: "Attributes, written with an `@` prefix, add extra behavior to a field. `@id` marks the primary key, `@default(...)` sets a default value, and `@unique` ensures no two rows can share that value. A `?` after a type (like `String?`) makes that field optional." },
      { h: "Generating migrations", p: "Once your schema describes the models you want, `prisma migrate dev` compares it to your actual database, generates the SQL needed to bring the database in line, and applies it — keeping your schema file and real database structure in sync.",
        code: "npx prisma migrate dev --name init" }
    ],
    exercises: [
      { type: "code", q: "Add a `published` field to this model: a Boolean that defaults to false.", starter: "model Post {\n  id    Int    @id @default(autoincrement())\n  title String\n}", checks: [/published\s+Boolean\s+@default\(\s*false\s*\)/], hint: "Add a new line: `published Boolean @default(false)`", solution: "model Post {\n  id        Int     @id @default(autoincrement())\n  title     String\n  published Boolean @default(false)\n}", explain: "The @default(false) attribute gives the published field a starting value of false whenever a new row is created without specifying it explicitly." },
      { type: "mcq", q: "What does a `?` after a field's type, like `name String?`, mean?", options: ["The field is the primary key", "The field is optional and can be left empty (null)", "The field is a list of strings", "It has no effect"], correct: 1, explain: "A trailing ? marks the field as optional — the database column allows null, and code using this model treats the field as possibly missing." }
    ]
  },
  {
    id: "crud", title: "Querying with Prisma Client",
    tagline: "Reading and writing data using Prisma Client's generated functions.",
    blocks: [
      { h: "Creating a record", p: "`create` inserts a new row, taking the field values inside a `data` object.",
        code: "const user = await prisma.user.create({\n  data: { email: \"ada@example.com\", name: \"Ada\" },\n});" },
      { h: "Reading records", p: "`findMany` returns every matching row as an array, while `findUnique` looks up a single row by a unique field, like its id.",
        code: "const users = await prisma.user.findMany();\n\nconst one = await prisma.user.findUnique({\n  where: { id: 1 },\n});" },
      { h: "Updating and deleting", p: "`update` and `delete` both take a `where` clause to identify the row, and `update` additionally takes a `data` object with the fields to change.",
        code: "await prisma.user.update({\n  where: { id: 1 },\n  data: { name: \"Ada Lovelace\" },\n});\n\nawait prisma.user.delete({\n  where: { id: 1 },\n});" }
    ],
    exercises: [
      { type: "code", q: "Write a Prisma Client call to find the unique user with id equal to 5.", starter: "const user = await ", checks: [/prisma\.user\.findUnique\s*\(\s*\{\s*where\s*:\s*\{\s*id\s*:\s*5\s*\}\s*\}\s*\)/], hint: "Use `prisma.user.findUnique({ where: { id: 5 } })`", solution: "const user = await prisma.user.findUnique({ where: { id: 5 } });", explain: "findUnique looks up exactly one row matching a unique field — here, id: 5 — and returns it (or null if no match is found)." },
      { type: "mcq", q: "What does prisma.post.findMany() return?", options: ["A single post object", "An array of every matching Post row", "A boolean indicating whether any posts exist", "The count of posts only"], correct: 1, explain: "findMany queries for all rows matching the given criteria (or every row, if no filter is given) and returns them as an array." }
    ]
  },
  {
    id: "relations", title: "Relations",
    tagline: "Modeling how tables connect to each other, and querying across those connections.",
    blocks: [
      { h: "One-to-many relations", p: "A one-to-many relation — like one user having many posts — is defined with a field on each side: a list field on the \"one\" side, and a foreign key field on the \"many\" side pointing back via `@relation`.",
        code: "model User {\n  id    Int    @id @default(autoincrement())\n  posts Post[]\n}\n\nmodel Post {\n  id       Int  @id @default(autoincrement())\n  author   User @relation(fields: [authorId], references: [id])\n  authorId Int\n}" },
      { h: "Including related data in a query", p: "By default, Prisma Client doesn't fetch related records — you opt in explicitly with `include`, telling it which relations to also pull in alongside the main record.",
        code: "const userWithPosts = await prisma.user.findUnique({\n  where: { id: 1 },\n  include: { posts: true },\n});" },
      { h: "Many-to-many relations", p: "For a many-to-many relation — like posts having many tags, and tags belonging to many posts — both sides simply declare a list field of the other type; Prisma manages the underlying join table for you automatically.",
        code: "model Post {\n  id   Int   @id @default(autoincrement())\n  tags Tag[]\n}\nmodel Tag {\n  id    Int    @id @default(autoincrement())\n  posts Post[]\n}" }
    ],
    exercises: [
      { type: "mcq", q: "By default, does prisma.user.findUnique() also fetch that user's related posts?", options: ["Yes, always automatically", "No — related records are only fetched if you explicitly add include", "Only if the user has fewer than 10 posts", "Only in development mode"], correct: 1, explain: "Prisma Client doesn't eagerly load relations by default, to avoid over-fetching. You have to explicitly ask for related data with an include (or select) clause." },
      { type: "code", q: "Query all posts, including each post's related author.", starter: "const posts = await ", checks: [/prisma\.post\.findMany\s*\(\s*\{\s*include\s*:\s*\{\s*author\s*:\s*true\s*\}\s*\}\s*\)/], hint: "Use `prisma.post.findMany({ include: { author: true } })`", solution: "const posts = await prisma.post.findMany({ include: { author: true } });", explain: "include: { author: true } tells Prisma to also fetch each post's related author record alongside the post itself, rather than leaving it unfetched." }
    ]
  },
  {
    id: "migrations-deep", title: "Migrations in depth",
    tagline: "How Prisma Migrate actually tracks and applies changes to your database's structure over time.",
    blocks: [
      { h: "What a migration file is", p: "Every time you run `prisma migrate dev`, Prisma compares your schema to the database, generates a SQL file describing exactly what changed, and saves it in a `prisma/migrations` folder — building up a complete, ordered history of every structural change your database has ever gone through." },
      { h: "Applying migrations in production", p: "`migrate dev` is meant for local development — it can reset your database if needed. In production, `prisma migrate deploy` applies any pending migration files without ever resetting or prompting, which is what you'd run as part of a deployment pipeline.",
        code: "npx prisma migrate deploy" },
      { h: "Keeping the schema and database in sync", p: "Because both your schema.prisma file and the migrations folder are checked into version control, anyone on the team (or any deployment environment) can run migrate deploy and end up with an identical database structure." }
    ],
    exercises: [
      { type: "mcq", q: "What's the key difference between `migrate dev` and `migrate deploy`?", options: ["No difference — they're aliases", "migrate dev is for local development and can reset the database; migrate deploy applies pending migrations safely, meant for production", "migrate deploy deletes all migration files", "migrate dev only works with PostgreSQL"], correct: 1, explain: "migrate dev is an interactive, development-focused command that can prompt for a reset if needed to keep things in sync. migrate deploy is non-interactive and never resets data — it simply applies whatever pending migrations exist, which is what you want running as part of a deploy." },
      { type: "code", q: "Write the command you'd run in a production deployment to apply pending migrations.", starter: "", checks: [/npx prisma migrate deploy/], hint: "It's `npx prisma migrate deploy`", solution: "npx prisma migrate deploy", explain: "migrate deploy applies every migration file that hasn't been run against this database yet, in order, without any interactive prompts or reset behavior." }
    ]
  },
  {
    id: "filtering-pagination", title: "Filtering, sorting & pagination",
    tagline: "Narrowing down, ordering, and paging through query results using Prisma Client's built-in options.",
    blocks: [
      { h: "Filtering with where", p: "The `where` option supports a range of operators beyond plain equality — like `contains`, `gt` (greater than), and `in` — for building more precise queries.",
        code: "const recentPosts = await prisma.post.findMany({\n  where: {\n    title: { contains: \"prisma\" },\n    views: { gt: 100 },\n  },\n});" },
      { h: "Sorting with orderBy", p: "`orderBy` sorts results by one or more fields, ascending or descending.",
        code: "const posts = await prisma.post.findMany({\n  orderBy: { createdAt: \"desc\" },\n});" },
      { h: "Pagination with skip and take", p: "`skip` and `take` implement basic offset-based pagination — skipping a number of records, then taking a limited number after that.",
        code: "const page2 = await prisma.post.findMany({\n  skip: 10,\n  take: 10,\n});" }
    ],
    exercises: [
      { type: "code", q: "Query the first 5 users, ordered by createdAt descending.", starter: "const users = await ", checks: [/prisma\.user\.findMany\s*\(\s*\{\s*orderBy\s*:\s*\{\s*createdAt\s*:\s*["']desc["']\s*\}\s*,\s*take\s*:\s*5\s*\}\s*\)/], hint: "Combine orderBy and take: `{ orderBy: { createdAt: \"desc\" }, take: 5 }`", solution: "const users = await prisma.user.findMany({\n  orderBy: { createdAt: \"desc\" },\n  take: 5,\n});", explain: "orderBy sorts the full result set first, and take: 5 then limits the returned records to the first 5 of that sorted order." },
      { type: "mcq", q: "What does `skip: 10, take: 10` return?", options: ["The first 10 records", "Records 11 through 20", "The last 10 records", "All records except 10 of them, chosen at random"], correct: 1, explain: "skip: 10 tells Prisma to bypass the first 10 matching records, and take: 10 then returns the next 10 after that — records 11 through 20, a classic \"page 2\" pattern." }
    ]
  },
  {
    id: "seeding", title: "Seeding the database",
    tagline: "Populating a fresh database with initial or sample data automatically, instead of entering it by hand.",
    blocks: [
      { h: "Why seed data matters", p: "A brand-new database is empty, which makes development and testing awkward — you'd have to manually create test users and records every time. A seed script inserts a known, repeatable set of data automatically." },
      { h: "Writing a seed script", p: "Prisma looks for a seed script referenced in your package.json, typically written using Prisma Client itself to insert records.",
        code: "// prisma/seed.js\nimport { PrismaClient } from \"@prisma/client\";\nconst prisma = new PrismaClient();\n\nasync function main() {\n  await prisma.user.create({\n    data: { email: \"demo@example.com\", name: \"Demo User\" },\n  });\n}\n\nmain().finally(() => prisma.$disconnect());" },
      { h: "Running it", p: "Configuring the script's path in package.json lets `prisma db seed` (and `migrate reset`, which seeds automatically afterward) find and run it.",
        code: "// package.json\n\"prisma\": { \"seed\": \"node prisma/seed.js\" }" }
    ],
    exercises: [
      { type: "mcq", q: "What problem does a seed script solve?", options: ["It backs up your production database", "It populates a fresh, empty database with known sample or initial data automatically", "It deletes old migrations", "It replaces the need for a schema"], correct: 1, explain: "Rather than manually creating test records every time you reset or set up a database, a seed script inserts a consistent, repeatable set of starting data with one command." },
      { type: "mcq", q: "What command typically runs the seed script directly?", options: ["prisma migrate dev", "prisma db seed", "prisma generate", "prisma format"], correct: 1, explain: "prisma db seed runs whatever script is configured under the \"prisma\": { \"seed\": ... } entry in package.json — it's also triggered automatically after a migrate reset." }
    ]
  },
  {
    id: "transactions", title: "Transactions",
    tagline: "Making sure a group of related database operations either all succeed together, or none of them take effect at all.",
    blocks: [
      { h: "Why transactions matter", p: "Imagine transferring money between two accounts: subtracting from one and adding to the other. If the first succeeds but the second fails partway through, your data ends up in a broken, inconsistent state. A transaction wraps multiple operations so they succeed or fail as one atomic unit.",
        tip: "Atomic is the key word: either every operation in the transaction happens, or none of them do — there's no in-between state." },
      { h: "prisma.$transaction with an array", p: "Passing an array of Prisma Client operations to `$transaction` runs them all within a single database transaction.",
        code: "await prisma.$transaction([\n  prisma.account.update({ where: { id: 1 }, data: { balance: { decrement: 100 } } }),\n  prisma.account.update({ where: { id: 2 }, data: { balance: { increment: 100 } } }),\n]);" },
      { h: "Interactive transactions", p: "For logic that needs to make decisions between operations, `$transaction` also accepts a callback function receiving a transactional client — any query run through it participates in the same transaction, and throwing inside the callback rolls everything back.",
        code: "await prisma.$transaction(async (tx) => {\n  const account = await tx.account.findUnique({ where: { id: 1 } });\n  if (account.balance < 100) throw new Error(\"Insufficient funds\");\n  await tx.account.update({ where: { id: 1 }, data: { balance: { decrement: 100 } } });\n});" }
    ],
    exercises: [
      { type: "mcq", q: "What guarantee does wrapping two updates in a $transaction give you?", options: ["They'll run faster", "They either both succeed together, or neither takes effect — no partial state", "Only the first update is guaranteed to run", "It automatically retries failed updates forever"], correct: 1, explain: "A transaction is atomic: the database guarantees that either every operation inside it commits, or — if anything fails — none of them do, leaving your data in a consistent state either way." },
      { type: "mcq", q: "What happens if you throw an error inside a $transaction callback (interactive transaction)?", options: ["Only that specific query is rolled back", "The entire transaction is rolled back, undoing every operation performed inside it so far", "The error is silently ignored", "It commits everything anyway"], correct: 1, explain: "Throwing inside the transaction callback signals Prisma to roll back the whole transaction — none of the operations performed through the transactional client tx take effect." }
    ]
  },
  {
    id: "error-handling-prisma", title: "Error handling", 
    tagline: "Recognizing and responding to the specific kinds of errors a Prisma Client query can throw.",
    blocks: [
      { h: "Known request errors", p: "Prisma throws a `PrismaClientKnownRequestError` for predictable database errors — like violating a unique constraint — each tagged with a specific error code, such as `P2002` for a unique constraint violation.",
        code: "import { Prisma } from \"@prisma/client\";\n\ntry {\n  await prisma.user.create({ data: { email: \"taken@example.com\" } });\n} catch (err) {\n  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === \"P2002\") {\n    console.log(\"That email is already taken.\");\n  }\n}" },
      { h: "Why check the error code", p: "Checking the specific error code lets you respond differently depending on what actually went wrong — showing a friendly \"email already in use\" message for P2002, versus a generic error for something unexpected — rather than treating every failure identically." }
    ],
    exercises: [
      { type: "mcq", q: "What does Prisma's P2002 error code indicate?", options: ["A network timeout", "A unique constraint was violated (e.g. a duplicate email)", "The database is out of disk space", "A missing migration"], correct: 1, explain: "P2002 specifically signals that an operation tried to insert or update a value that would violate a unique constraint — like creating a user with an email that's already taken." },
      { type: "mcq", q: "Why check `err.code` instead of just catching any error generically?", options: ["It's not useful — all errors should be handled the same way", "It lets you respond appropriately to specific, known failure reasons, like showing a friendly message for a duplicate value", "It's required by TypeScript", "It disables error handling entirely"], correct: 1, explain: "Distinguishing error codes lets your app react meaningfully — e.g., telling the user their email is taken for P2002 — rather than showing the same generic failure message for every possible database error." }
    ]
  }
  ]
};
