// PostgreSQL course — full content.
export const postgresqlCourse = {
  id: "postgresql",
  title: "PostgreSQL",
  category: "Backend & Tools",
  summary: "A powerful, production-grade relational database.",
  comingSoon: false,
  topics: [
  {
    id: "relational-basics", title: "What is a relational database?",
    tagline: "Data organized into tables of rows and columns, with relationships defined between them.",
    blocks: [
      { h: "Tables, rows, and columns", p: "A relational database stores data in tables — think of a table like a spreadsheet. Each row is one record (like one user), and each column is a specific piece of information about that record (like an email address), with a defined type.",
        tip: "PostgreSQL (often called 'Postgres') is one specific, widely used relational database system — the concepts here apply broadly across systems like MySQL too, though exact syntax can differ slightly." },
      { h: "Why 'relational'", p: "The 'relational' part refers to how tables can reference each other. Instead of duplicating a customer's full details on every one of their orders, an orders table just stores a reference (a foreign key) to a row in a customers table — keeping data consistent and avoiding repetition." }
    ],
    exercises: [
      { type: "mcq", q: "In a relational database table, what does a single row typically represent?", options: ["A whole table", "One individual record, like one specific user or order", "A column's data type", "The entire database"], correct: 1, explain: "Each row holds one record's worth of data, with each column supplying one attribute of that record — much like a single line in a spreadsheet." },
      { type: "mcq", q: "What does it mean for a database to be 'relational'?", options: ["It's slower than other databases", "Tables can reference each other, avoiding duplicated data", "It only stores text", "It has no structure at all"], correct: 1, explain: "The relational model lets tables link to each other via references (foreign keys), so related data — like which customer placed which order — can be modeled without repeating the customer's full details everywhere." }
    ]
  },
  {
    id: "tables-types", title: "Creating tables & data types",
    tagline: "Defining a table's structure — its columns, their types, and basic constraints.",
    blocks: [
      { h: "CREATE TABLE", p: "The `CREATE TABLE` statement defines a new table's name, its columns, and each column's data type.",
        code: "CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email TEXT UNIQUE NOT NULL,\n  name TEXT,\n  created_at TIMESTAMP DEFAULT NOW()\n);" },
      { h: "Common data types", p: "Some frequently used types: `INTEGER` for whole numbers, `TEXT` for strings of any length, `BOOLEAN` for true/false, `TIMESTAMP` for dates and times, and `SERIAL` for an auto-incrementing integer, commonly used for id columns." },
      { h: "Constraints", p: "Constraints restrict what values a column can hold. `PRIMARY KEY` uniquely identifies each row, `NOT NULL` requires a value, and `UNIQUE` ensures no two rows share the same value in that column." }
    ],
    exercises: [
      { type: "code", q: "Write a CREATE TABLE statement for a table named products with an auto-incrementing id primary key, and a NOT NULL TEXT column named name.", starter: "", checks: [/CREATE TABLE\s+products\s*\(\s*id\s+SERIAL\s+PRIMARY KEY\s*,\s*name\s+TEXT\s+NOT NULL\s*\)\s*;/i], hint: "Follow the pattern: `CREATE TABLE products ( id SERIAL PRIMARY KEY, name TEXT NOT NULL );`", solution: "CREATE TABLE products (\n  id SERIAL PRIMARY KEY,\n  name TEXT NOT NULL\n);", explain: "SERIAL PRIMARY KEY creates an auto-incrementing unique identifier for each row, and NOT NULL on name requires every product to have one." },
      { type: "mcq", q: "What does the SERIAL type do when used on a column like `id`?", options: ["Stores text", "Auto-increments an integer value for each new row, commonly used for ids", "Marks the column as optional", "Stores a date and time"], correct: 1, explain: "SERIAL is shorthand for an auto-incrementing integer — Postgres automatically assigns the next number in sequence each time a row is inserted, without you specifying it." }
    ]
  },
  {
    id: "select-filter", title: "Querying data with SELECT",
    tagline: "Reading rows out of a table, filtering them, and controlling their order.",
    blocks: [
      { h: "A basic SELECT", p: "`SELECT` retrieves data from a table. You specify which columns you want (or `*` for all of them), and which table to pull from.",
        code: "SELECT * FROM users;\n\nSELECT name, email FROM users;" },
      { h: "Filtering with WHERE", p: "`WHERE` narrows down which rows are returned, based on a condition.",
        code: "SELECT * FROM users\nWHERE created_at > '2024-01-01';" },
      { h: "Sorting with ORDER BY", p: "`ORDER BY` sorts the results by one or more columns — `ASC` (ascending, the default) or `DESC` (descending).",
        code: "SELECT * FROM users\nORDER BY created_at DESC;" }
    ],
    exercises: [
      { type: "code", q: "Write a query that selects the name and email columns from users where name equals 'Ada'.", starter: "", checks: [/SELECT\s+name\s*,\s*email\s+FROM\s+users\s+WHERE\s+name\s*=\s*'Ada'\s*;?/i], hint: "Combine SELECT with a WHERE clause: `SELECT name, email FROM users WHERE name = 'Ada';`", solution: "SELECT name, email FROM users WHERE name = 'Ada';", explain: "SELECT name, email limits which columns are returned, and WHERE name = 'Ada' filters the rows down to just the matching one(s)." },
      { type: "mcq", q: "What does `ORDER BY created_at DESC` do?", options: ["Filters out rows with no created_at value", "Sorts the results by created_at from newest to oldest", "Groups rows by created_at", "Deletes old rows"], correct: 1, explain: "ORDER BY sorts the result set by the given column; DESC means descending order, so the most recent created_at values come first." }
    ]
  },
  {
    id: "joins", title: "Joins",
    tagline: "Combining rows from two related tables into a single result, based on a shared key.",
    blocks: [
      { h: "Why joins are needed", p: "Since related data lives in separate tables — like orders and the customers who placed them — a join lets you query across that relationship, pulling matching rows from both tables together in one result." },
      { h: "INNER JOIN", p: "An `INNER JOIN` returns only rows that have a match in both tables, connected via an `ON` clause specifying how the tables relate.",
        code: "SELECT orders.id, users.name\nFROM orders\nINNER JOIN users ON orders.user_id = users.id;" },
      { h: "LEFT JOIN", p: "A `LEFT JOIN` returns every row from the left (first-listed) table, even if there's no matching row in the right table — in that case, the right table's columns come back as NULL. This is useful when you want, say, every user, including ones with zero orders." }
    ],
    exercises: [
      { type: "mcq", q: "What's the key difference between an INNER JOIN and a LEFT JOIN?", options: ["There's no difference", "INNER JOIN only returns rows with a match in both tables; LEFT JOIN also returns unmatched rows from the left table", "LEFT JOIN is always faster", "INNER JOIN can't use a WHERE clause"], correct: 1, explain: "INNER JOIN excludes rows with no counterpart in the other table, while LEFT JOIN keeps every row from the left table regardless — filling in NULLs for any missing match on the right." },
      { type: "code", q: "Write a query joining orders to users on orders.user_id = users.id, selecting orders.id and users.name, using INNER JOIN.", starter: "", checks: [/SELECT\s+orders\.id\s*,\s*users\.name\s+FROM\s+orders\s+INNER JOIN\s+users\s+ON\s+orders\.user_id\s*=\s*users\.id/i], hint: "Follow the pattern: `SELECT orders.id, users.name FROM orders INNER JOIN users ON orders.user_id = users.id;`", solution: "SELECT orders.id, users.name\nFROM orders\nINNER JOIN users ON orders.user_id = users.id;", explain: "The ON clause tells Postgres how the two tables relate — matching each order's user_id to the corresponding user's id — so it can pull matching rows from both into one result." }
    ]
  },
  {
    id: "insert-update-delete", title: "Inserting, updating & deleting",
    tagline: "The other half of SQL: actually changing the data, not just reading it.",
    blocks: [
      { h: "INSERT", p: "`INSERT INTO` adds a new row, specifying the columns and their values.",
        code: "INSERT INTO users (email, name)\nVALUES ('ada@example.com', 'Ada');" },
      { h: "UPDATE", p: "`UPDATE` modifies existing rows. The `WHERE` clause is critical here — leaving it off updates every single row in the table.",
        code: "UPDATE users\nSET name = 'Ada Lovelace'\nWHERE id = 1;" },
      { h: "DELETE", p: "`DELETE FROM` removes rows matching a `WHERE` clause — again, forgetting the WHERE clause deletes every row in the table, so it's worth double-checking before running it.",
        code: "DELETE FROM users\nWHERE id = 1;" }
    ],
    exercises: [
      { type: "mcq", q: "What happens if you run `UPDATE users SET name = 'Anonymous';` with no WHERE clause?", options: ["It does nothing", "It updates every single row in the users table", "It only affects the first row", "It throws an error automatically"], correct: 1, explain: "Without a WHERE clause to narrow down which rows are affected, UPDATE (and DELETE) applies to every row in the table — a common and costly mistake, so it's always worth checking your WHERE clause first." },
      { type: "code", q: "Write an UPDATE statement that sets email to 'new@example.com' for the user where id = 3.", starter: "", checks: [/UPDATE\s+users\s+SET\s+email\s*=\s*'new@example\.com'\s+WHERE\s+id\s*=\s*3/i], hint: "Follow the pattern: `UPDATE users SET email = 'new@example.com' WHERE id = 3;`", solution: "UPDATE users\nSET email = 'new@example.com'\nWHERE id = 3;", explain: "SET specifies which column(s) to change and to what value, and WHERE id = 3 restricts the change to exactly the one matching row." }
    ]
  },
  {
    id: "constraints-keys", title: "Constraints & foreign keys",
    tagline: "Rules the database itself enforces, so invalid or inconsistent data can never be saved in the first place.",
    blocks: [
      { h: "Why enforce rules at the database level", p: "You could try to validate data only in your application code, but that breaks down the moment more than one program touches the database. Constraints put the rules directly in the database itself, so they're enforced no matter what inserts the data." },
      { h: "Foreign keys", p: "A foreign key constraint ties a column in one table to a column (usually the primary key) in another, and prevents inserting a value that doesn't have a matching row — you can't create an order for a customer_id that doesn't exist.",
        code: "CREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  customer_id INTEGER REFERENCES customers(id),\n  total NUMERIC\n);" },
      { h: "CHECK constraints", p: "A CHECK constraint enforces a custom condition on a column's value — like requiring a price to be positive — rejecting any insert or update that would violate it.",
        code: "CREATE TABLE products (\n  id INTEGER PRIMARY KEY,\n  price NUMERIC CHECK (price > 0)\n);" }
    ],
    exercises: [
      { type: "mcq", q: "What does a foreign key constraint prevent?", options: ["Inserting any data at all", "Inserting a value that doesn't have a matching row in the referenced table", "Deleting rows", "Creating indexes"], correct: 1, explain: "A foreign key ties a column to another table's primary key, and the database rejects any insert or update that would reference a row that doesn't actually exist there — keeping relationships consistent." },
      { type: "code", q: "Add a CHECK constraint to this column requiring quantity to be at least 0.", starter: "CREATE TABLE items (\n  id INTEGER PRIMARY KEY,\n  quantity INTEGER\n);", checks: [/quantity\s+INTEGER\s+CHECK\s*\(\s*quantity\s*>=\s*0\s*\)/i], hint: "Add `CHECK (quantity >= 0)` right after the column's type.", solution: "CREATE TABLE items (\n  id INTEGER PRIMARY KEY,\n  quantity INTEGER CHECK (quantity >= 0)\n);", explain: "The CHECK constraint runs on every insert or update, rejecting any attempt to set quantity to a negative number." }
    ]
  },
  {
    id: "indexes", title: "Indexes",
    tagline: "Speeding up queries by giving the database a fast lookup structure instead of scanning every row.",
    blocks: [
      { h: "The problem without an index", p: "Without an index, finding rows matching a condition means Postgres checks every single row in the table — fine for a small table, but slow once you have millions of rows and are filtering on a column often.",
        tip: "Think of an index like a book's index: instead of reading every page to find a topic, you jump straight to the right page." },
      { h: "Creating an index", p: "`CREATE INDEX` builds a fast lookup structure on one or more columns, dramatically speeding up queries that filter or sort by them.",
        code: "CREATE INDEX idx_users_email ON users (email);" },
      { h: "The trade-off", p: "Indexes aren't free — they take up disk space, and slow down writes slightly, since every insert or update also has to update the index. The general guidance is to index columns you frequently filter, join, or sort on, not every column indiscriminately." }
    ],
    exercises: [
      { type: "mcq", q: "What is an index primarily used for?", options: ["Enforcing that a column is unique", "Speeding up lookups on a column, avoiding a full scan of every row", "Storing backup copies of data", "Automatically deleting old rows"], correct: 1, explain: "An index gives Postgres a fast structure to jump directly to matching rows instead of examining the whole table — a major performance win for queries that filter, join, or sort on that column." },
      { type: "code", q: "Write a statement creating an index named idx_orders_customer on the customer_id column of the orders table.", starter: "", checks: [/CREATE INDEX\s+idx_orders_customer\s+ON\s+orders\s*\(\s*customer_id\s*\)/i], hint: "Follow the pattern: `CREATE INDEX idx_orders_customer ON orders (customer_id);`", solution: "CREATE INDEX idx_orders_customer ON orders (customer_id);", explain: "This creates a lookup structure on customer_id, which would speed up queries filtering or joining on that column — like finding all orders for a specific customer." }
    ]
  },
  {
    id: "aggregates", title: "Aggregate functions & GROUP BY",
    tagline: "Computing summary values — counts, sums, averages — across groups of rows.",
    blocks: [
      { h: "Aggregate functions", p: "Functions like `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX` compute a single summary value across a set of rows, rather than returning each row individually.",
        code: "SELECT COUNT(*) FROM orders;\nSELECT AVG(total) FROM orders;" },
      { h: "GROUP BY", p: "`GROUP BY` splits rows into groups sharing the same value in a column, and lets you apply an aggregate function to each group separately, rather than across the whole table at once.",
        code: "SELECT customer_id, SUM(total) AS total_spent\nFROM orders\nGROUP BY customer_id;" },
      { h: "Filtering groups with HAVING", p: "`WHERE` filters individual rows before grouping; `HAVING` filters the groups themselves, after aggregation — useful for something like \"only customers who've spent over $500 total\".",
        code: "SELECT customer_id, SUM(total) AS total_spent\nFROM orders\nGROUP BY customer_id\nHAVING SUM(total) > 500;" }
    ],
    exercises: [
      { type: "mcq", q: "What's the difference between WHERE and HAVING?", options: ["They're interchangeable", "WHERE filters individual rows before grouping; HAVING filters groups after aggregation", "HAVING can only be used without GROUP BY", "WHERE is only for numbers"], correct: 1, explain: "WHERE operates on raw rows before any grouping happens, while HAVING operates on the aggregated groups themselves — which is why HAVING can filter on something like SUM(total) but WHERE cannot." },
      { type: "code", q: "Write a query that counts orders per customer_id, grouping by customer_id.", starter: "", checks: [/SELECT\s+customer_id\s*,\s*COUNT\(\*\)\s+FROM\s+orders\s+GROUP BY\s+customer_id/i], hint: "Combine COUNT(*) with GROUP BY: `SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id;`", solution: "SELECT customer_id, COUNT(*)\nFROM orders\nGROUP BY customer_id;", explain: "GROUP BY customer_id splits the orders into one group per customer, and COUNT(*) then counts how many rows fall into each group." }
    ]
  },
  {
    id: "transactions-pg", title: "Transactions",
    tagline: "Wrapping multiple statements so they all succeed together, or none of them take effect — the same atomicity guarantee as Prisma's transactions, expressed directly in SQL.",
    blocks: [
      { h: "BEGIN, COMMIT, and ROLLBACK", p: "A transaction starts with `BEGIN`, groups any number of statements, and ends with either `COMMIT` (making all the changes permanent) or `ROLLBACK` (undoing everything since BEGIN).",
        code: "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;" },
      { h: "Why this matters", p: "If the second UPDATE failed partway through — say, due to a connection issue — without a transaction, the first UPDATE would already be permanently applied, leaving the accounts out of sync. Wrapping both in a transaction means a failure rolls back everything, so money is never lost or duplicated." },
      { h: "Automatic transactions", p: "Outside an explicit BEGIN/COMMIT block, every individual statement in Postgres runs in its own implicit transaction — this is why a single UPDATE either fully applies or doesn't happen at all, even without you writing BEGIN yourself." }
    ],
    exercises: [
      { type: "mcq", q: "What does ROLLBACK do inside a transaction?", options: ["Permanently saves all changes made since BEGIN", "Undoes every change made since BEGIN, as if none of it happened", "Deletes the entire table", "Creates a backup"], correct: 1, explain: "ROLLBACK cancels the transaction, reverting the database to the state it was in right before BEGIN — none of the statements in between take effect." },
      { type: "code", q: "Write a transaction that begins, inserts a row into logs with message 'started', and commits.", starter: "", checks: [/BEGIN\s*;[\s\S]*INSERT INTO\s+logs[\s\S]*'started'[\s\S]*COMMIT\s*;/i], hint: "Structure: `BEGIN;` then the INSERT statement, then `COMMIT;`", solution: "BEGIN;\nINSERT INTO logs (message) VALUES ('started');\nCOMMIT;", explain: "BEGIN opens the transaction, the INSERT is staged as part of it, and COMMIT makes that insert permanent — if you'd written ROLLBACK instead, the insert would never have taken effect." }
    ]
  },
  {
    id: "views", title: "Views",
    tagline: "Saving a query as a virtual, reusable table you can select from like any other.",
    blocks: [
      { h: "What a view is", p: "A view is a saved SELECT query given a name — querying the view runs the underlying query fresh each time, so it always reflects current data, without duplicating that data anywhere.",
        code: "CREATE VIEW high_value_orders AS\nSELECT * FROM orders WHERE total > 500;\n\nSELECT * FROM high_value_orders;" },
      { h: "Why use a view", p: "Views are handy for hiding a complex query (like one with several joins) behind a simple name, and for controlling access — you might grant a user access to a view showing only certain columns, without exposing the full underlying table." }
    ],
    exercises: [
      { type: "mcq", q: "When you query a view, what actually happens?", options: ["It reads from a separately stored, duplicated copy of the data", "The underlying SELECT query defining the view runs fresh, reflecting current data", "It returns cached results from when the view was created", "Views cannot be queried directly"], correct: 1, explain: "A regular view doesn't store data itself — it's just a saved query. Selecting from it re-runs that query against the live tables, so results are always current." },
      { type: "code", q: "Create a view named recent_users selecting all columns from users where created_at > '2024-01-01'.", starter: "", checks: [/CREATE VIEW\s+recent_users\s+AS\s+SELECT\s+\*\s+FROM\s+users\s+WHERE\s+created_at\s*>\s*'2024-01-01'/i], hint: "Follow the pattern: `CREATE VIEW recent_users AS SELECT * FROM users WHERE created_at > '2024-01-01';`", solution: "CREATE VIEW recent_users AS\nSELECT * FROM users WHERE created_at > '2024-01-01';", explain: "This saves the filtered query under the name recent_users, so `SELECT * FROM recent_users` afterward re-runs that same filter automatically." }
    ]
  }
  ]
};
