// Git course — full content.
export const gitCourse = {
  id: "git",
  title: "Git",
  category: "Backend & Tools",
  summary: "Track changes to your code and collaborate without stepping on each other.",
  comingSoon: false,
  topics: [
  {
    id: "what-is-git", title: "What is version control?",
    tagline: "Git keeps a complete history of every change to your project, so nothing is ever truly lost.",
    blocks: [
      { h: "The problem Git solves", p: "Without version control, tracking changes to a project usually means folders named `project-final`, `project-final-v2`, `project-really-final`. Git replaces that mess with a system that records every change you make, lets you go back to any earlier point, and lets multiple people work on the same project without overwriting each other's work.",
        tip: "Think of Git as an extremely detailed 'undo history' for your whole project, plus a way to safely combine changes from multiple people." },
      { h: "A repository", p: "A Git repository (often shortened to 'repo') is a project folder that Git is tracking. Running `git init` inside a folder turns it into a repository by creating a hidden `.git` folder, where Git stores the entire history.",
        code: "cd my-project\ngit init" }
    ],
    exercises: [
      { type: "mcq", q: "What core problem does Git (version control) solve?", options: ["It makes code run faster", "It tracks every change to a project over time, so history isn't lost and multiple people can collaborate safely", "It replaces the need for a code editor", "It's a hosting service for websites"], correct: 1, explain: "Git records a detailed history of changes to your project, letting you go back to earlier states and merge work from multiple contributors — solving the 'which folder is the real one' problem that manual file copies create." },
      { type: "code", q: "Write the command that turns the current folder into a new Git repository.", starter: "", checks: [/git init\b/], hint: "It's simply `git init`", solution: "git init", explain: "git init creates a hidden .git folder in the current directory, which is where Git will store the project's entire tracked history from that point on." }
    ]
  },
  {
    id: "staging-committing", title: "Staging & committing",
    tagline: "Git's core loop: make changes, choose which ones to save, then save them as a labeled snapshot.",
    blocks: [
      { h: "Checking what's changed: git status", p: "`git status` shows which files have been modified, added, or deleted since the last snapshot — it's the command you'll run constantly to orient yourself.",
        code: "git status" },
      { h: "Staging: choosing what to include", p: "Before saving a snapshot, you tell Git exactly which changes to include using `git add`. This 'staging area' is what lets you commit only part of your work-in-progress, rather than being forced to save everything at once.",
        code: "git add index.html      # stage a specific file\ngit add .                # stage everything changed" },
      { h: "Committing: saving a snapshot", p: "A commit is a saved snapshot of the staged changes, along with a message describing what changed. Commits build up your project's history, one labeled checkpoint at a time.",
        code: "git commit -m \"Add navigation bar\"" }
    ],
    exercises: [
      { type: "mcq", q: "What is the purpose of the staging area (git add)?", options: ["It permanently deletes unstaged files", "It lets you choose exactly which changes to include in the next commit", "It's the same thing as committing", "It uploads your code to a server"], correct: 1, explain: "Staging is a middle step between 'changed on disk' and 'saved in history' — git add lets you deliberately choose which changes go into the next commit, rather than committing every modified file automatically." },
      { type: "code", q: "Stage all changed files, then commit them with the message \"Fix typo\" — write both commands.", starter: "", checks: [/git add \./, /git commit -m ["']Fix typo["']/], hint: "First `git add .`, then `git commit -m \"Fix typo\"`", solution: "git add .\ngit commit -m \"Fix typo\"", explain: "`git add .` stages every changed file in the current directory, and `git commit -m \"...\"` saves those staged changes as a new snapshot with the given message." }
    ]
  },
  {
    id: "branches", title: "Branches",
    tagline: "Working on a new feature or fix without touching your project's main line of history until you're ready.",
    blocks: [
      { h: "What a branch is", p: "A branch is an independent line of development. The default branch (often called `main`) usually represents your stable, working code — creating a new branch lets you experiment or build a feature in isolation, without affecting `main` until you decide to merge it back in.",
        tip: "Branches are cheap and fast in Git — creating one doesn't copy your whole project, so it's normal to create a new branch for nearly every feature or fix." },
      { h: "Creating and switching branches", p: "`git branch` lists or creates branches, and `git switch` (or the older `git checkout`) moves you onto a different one. The shortcut `-c` creates and switches in one step.",
        code: "git branch feature-login       # create a branch\ngit switch feature-login       # switch to it\n\n# or, in one step:\ngit switch -c feature-login" }
    ],
    exercises: [
      { type: "mcq", q: "Why would you create a new branch instead of working directly on main?", options: ["Branches make your code run faster", "To isolate new work so main stays stable until you're ready to merge the changes in", "It's required before every commit", "Branches are only for deleting files"], correct: 1, explain: "A branch lets you develop a feature or fix in its own independent line of history, so main isn't affected by half-finished work until you deliberately merge the branch back in." },
      { type: "code", q: "Write the single command that creates a new branch named \"feature-search\" and switches to it immediately.", starter: "", checks: [/git switch -c feature-search/, ], hint: "Use the -c flag: `git switch -c feature-search`", solution: "git switch -c feature-search", explain: "The -c flag on git switch creates the named branch and switches to it in one step, instead of running git branch and git switch separately." }
    ]
  },
  {
    id: "merging", title: "Merging",
    tagline: "Bringing the work from one branch into another, once it's ready.",
    blocks: [
      { h: "Merging a branch in", p: "Once work on a branch is finished, `git merge` combines its history into another branch — typically, you switch to `main` and merge your feature branch into it.",
        code: "git switch main\ngit merge feature-login" },
      { h: "Merge conflicts", p: "If the same lines of a file were changed differently on both branches, Git can't automatically decide which version to keep — this is called a merge conflict. Git marks the conflicting spot in the file, and you manually edit it to decide the final result, then commit.",
        code: "<<<<<<< HEAD\nconst title = \"Welcome\";\n=======\nconst title = \"Hello there\";\n>>>>>>> feature-login\n// edit this block by hand, then remove the markers and commit" }
    ],
    exercises: [
      { type: "mcq", q: "What causes a merge conflict?", options: ["Running git merge too many times", "The same lines in a file were changed differently on the two branches being merged", "Forgetting to commit", "Deleting the .git folder"], correct: 1, explain: "Git can automatically combine changes when they don't overlap, but if both branches edited the very same lines differently, it can't guess which version you want — so it pauses and asks you to resolve it manually." },
      { type: "code", q: "Write the two commands to switch to main and merge a branch called \"bugfix\" into it.", starter: "", checks: [/git switch main/, /git merge bugfix/], hint: "First `git switch main`, then `git merge bugfix`", solution: "git switch main\ngit merge bugfix", explain: "You merge INTO the branch you're currently on, so you first switch to main, then run git merge with the name of the branch whose changes you want to bring in." }
    ]
  },
  {
    id: "remotes", title: "Remotes: pushing & pulling",
    tagline: "How your local commits get shared with a server like GitHub, and how you get others' work back.",
    blocks: [
      { h: "What a remote is", p: "A remote is a version of your repository hosted elsewhere — most commonly on a service like GitHub. Your local repo can be connected to one or more remotes, letting you sync history back and forth.",
        code: "git remote add origin https://github.com/you/project.git" },
      { h: "Pushing your commits", p: "`git push` uploads your local commits to the remote, making them available to anyone else working on the project.",
        code: "git push origin main" },
      { h: "Pulling others' commits", p: "`git pull` downloads and merges any new commits from the remote into your current branch, bringing your local copy up to date with everyone else's work.",
        code: "git pull origin main" }
    ],
    exercises: [
      { type: "mcq", q: "What does `git push` do?", options: ["Downloads changes from a remote", "Uploads your local commits to a remote repository", "Deletes your local commit history", "Creates a new branch"], correct: 1, explain: "git push sends commits you've made locally up to a remote repository, making them visible and available to anyone else with access to that remote." },
      { type: "code", q: "Write the command to pull the latest changes from the \"main\" branch of the \"origin\" remote.", starter: "", checks: [/git pull origin main/], hint: "It's `git pull origin main`", solution: "git pull origin main", explain: "git pull fetches new commits from the specified remote and branch, then merges them into your current local branch." }
    ]
  },
  {
    id: "undoing", title: "Undoing changes: reset, revert & checkout",
    tagline: "Git gives you several different tools for undoing something, depending on exactly what you want to take back.",
    blocks: [
      { h: "Discarding uncommitted changes", p: "`git checkout -- <file>` (or the newer `git restore <file>`) throws away uncommitted changes to a file, reverting it back to its last committed state.",
        code: "git restore index.html" },
      { h: "git revert: undoing a commit safely", p: "`git revert` creates a brand new commit that undoes the changes from an earlier one, leaving the original commit in history untouched. This is the safe option for undoing something that's already been pushed and shared with others.",
        code: "git revert a1b2c3d" },
      { h: "git reset: rewriting history", p: "`git reset` moves your branch pointer backward, effectively erasing commits from history. It's powerful but riskier — since it rewrites history, it should generally be avoided on commits you've already pushed and shared.",
        code: "git reset --soft HEAD~1   # undo last commit, keep the changes staged\ngit reset --hard HEAD~1   # undo last commit, discard the changes entirely" }
    ],
    exercises: [
      { type: "mcq", q: "Why is `git revert` generally safer than `git reset` for undoing a commit that's already been pushed?", options: ["There's no real difference between them", "revert adds a new commit undoing the change, leaving history intact; reset rewrites history, which can cause problems for others who already pulled it", "reset only works locally and can never be pushed", "revert is faster"], correct: 1, explain: "Because revert preserves the original commit and simply adds a new one on top undoing it, everyone's history stays consistent. reset rewrites what already happened, which causes conflicts for anyone else who's already based work on the commits you removed." },
      { type: "code", q: "Write the command to undo the last commit with git reset, keeping its changes staged (not discarded).", starter: "", checks: [/git reset --soft HEAD~1/], hint: "Use `git reset --soft HEAD~1`", solution: "git reset --soft HEAD~1", explain: "The --soft flag moves the branch pointer back one commit, but leaves the changes from that commit staged, ready to be re-committed differently if you like." }
    ]
  },
  {
    id: "stashing", title: "Stashing changes",
    tagline: "Temporarily setting aside uncommitted work, without committing it, so you can switch tasks and come back later.",
    blocks: [
      { h: "The problem stash solves", p: "Say you're mid-change on a feature, and suddenly need to switch branches to fix an urgent bug — but your changes aren't ready to commit yet. `git stash` sets them aside on a stack, leaving your working directory clean, so you can switch freely.",
        code: "git stash" },
      { h: "Bringing stashed changes back", p: "`git stash pop` reapplies the most recently stashed changes and removes them from the stash list; `git stash apply` does the same but keeps a copy in the stash list.",
        code: "git stash pop" },
      { h: "Multiple stashes", p: "You can stash more than once — `git stash list` shows everything currently stashed, and you can name a specific one to apply if you're juggling several." }
    ],
    exercises: [
      { type: "mcq", q: "What does git stash do?", options: ["Permanently deletes your uncommitted changes", "Temporarily sets aside your uncommitted changes so your working directory is clean, without committing them", "Commits your changes with a default message", "Creates a new branch"], correct: 1, explain: "Stashing is a way to \"pause\" work-in-progress changes without committing them — they're saved on a stack you can return to later with stash pop, leaving your working directory clean in the meantime." },
      { type: "code", q: "Write the command to reapply your most recent stash and remove it from the stash list.", starter: "", checks: [/git stash pop/], hint: "It's `git stash pop`", solution: "git stash pop", explain: "pop reapplies the changes from the most recent stash entry back into your working directory, and removes that entry from the stash list since it's no longer needed there." }
    ]
  },
  {
    id: "rebasing", title: "Rebasing",
    tagline: "An alternative to merging that replays your commits on top of another branch, producing a cleaner, linear history.",
    blocks: [
      { h: "Merge vs. rebase", p: "Where `git merge` combines two branches' histories with a merge commit, `git rebase` takes your branch's commits and replays them one by one on top of another branch's latest commit — as if you'd started your work from there in the first place.",
        code: "git switch feature-login\ngit rebase main" },
      { h: "Why use it", p: "Rebasing produces a straight, linear commit history instead of a web of merge commits, which many teams find easier to read later. The trade-off is that it rewrites your branch's commit history, so it's best used on local or not-yet-shared branches.",
        tip: "A common rule of thumb: rebase your own local, unpushed work to keep it tidy; use merge for combining branches that others are also working from." },
      { h: "Resolving conflicts during a rebase", p: "Like a merge, a rebase can hit conflicts. Git pauses on the conflicting commit, lets you fix it and `git add` the resolution, then `git rebase --continue` moves on to replaying the next commit." }
    ],
    exercises: [
      { type: "mcq", q: "What's the key difference between merge and rebase?", options: ["They produce identical results always", "merge combines histories with a merge commit; rebase replays your commits on top of another branch, producing linear history", "rebase is only for deleting branches", "merge cannot handle conflicts"], correct: 1, explain: "merge preserves both branches' history exactly as it happened, joined by a merge commit. rebase rewrites your branch's commits to appear as if they were made starting from the other branch's latest point, producing a straighter history — at the cost of altering commit history." },
      { type: "code", q: "Write the two commands to switch to a branch named \"my-feature\" and rebase it onto main.", starter: "", checks: [/git switch my-feature/, /git rebase main/], hint: "First `git switch my-feature`, then `git rebase main`", solution: "git switch my-feature\ngit rebase main", explain: "You rebase FROM the branch you're on, so you switch to my-feature first, then rebase main replays my-feature's commits on top of main's latest commit." }
    ]
  },
  {
    id: "tags", title: "Tags & releases",
    tagline: "Marking a specific commit as significant — typically to label a version of your software.",
    blocks: [
      { h: "What a tag is", p: "A tag is a fixed, named pointer to a specific commit — unlike a branch, it doesn't move as new commits are added. Tags are most commonly used to mark release versions, like `v1.0.0`.",
        code: "git tag v1.0.0" },
      { h: "Annotated vs. lightweight tags", p: "A lightweight tag is just a name pointing at a commit. An annotated tag (`-a`) additionally stores a message, the tagger's name, and a date — generally the better choice for anything you intend to actually publish as a release.",
        code: "git tag -a v1.0.0 -m \"First stable release\"" },
      { h: "Pushing tags", p: "Tags aren't included in a normal `git push` by default — they need to be pushed explicitly, either by name or all at once.",
        code: "git push origin v1.0.0\ngit push origin --tags" }
    ],
    exercises: [
      { type: "mcq", q: "How is a tag different from a branch?", options: ["There's no difference", "A tag is a fixed pointer to one specific commit; a branch moves forward as new commits are added", "Tags can only be created on main", "Branches can't be pushed, but tags can"], correct: 1, explain: "A branch is meant to advance as you commit more work on it. A tag deliberately stays fixed on the commit it was created at — perfect for permanently marking a release point in history." },
      { type: "code", q: "Create an annotated tag named \"v2.0.0\" with the message \"Major release\".", starter: "", checks: [/git tag -a v2\.0\.0 -m ["']Major release["']/], hint: "Use `git tag -a v2.0.0 -m \"Major release\"`", solution: "git tag -a v2.0.0 -m \"Major release\"", explain: "The -a flag creates an annotated tag (storing metadata like the message), rather than a bare lightweight tag with just a name." }
    ]
  },
  {
    id: "gitignore", title: ".gitignore & ignoring files",
    tagline: "Telling Git which files it should never track in the first place — build output, dependencies, secrets.",
    blocks: [
      { h: "Why some files shouldn't be tracked", p: "Not everything in a project folder belongs in version control: generated build output, downloaded dependencies (like node_modules), local environment files with secrets, and editor-specific settings all tend to be either regenerable or sensitive." },
      { h: "The .gitignore file", p: "A `.gitignore` file, placed at your project's root, lists patterns for files and folders Git should ignore — they won't show up in `git status`, and `git add .` will skip them automatically.",
        code: "node_modules/\ndist/\n.env\n*.log" },
      { h: "Patterns", p: "A plain name matches that file or folder anywhere in the project; a trailing slash matches only directories; `*` acts as a wildcard. Once a file is already tracked by Git, though, adding it to .gitignore afterward won't stop tracking it — you'd need `git rm --cached` first." }
    ],
    exercises: [
      { type: "mcq", q: "If a file is already tracked by Git, what happens if you add it to .gitignore afterward?", options: ["Git immediately stops tracking it", "Nothing changes automatically — you'd need to explicitly untrack it first, e.g. with git rm --cached", "The file is deleted from disk", ".gitignore has no effect on already-tracked files ever, even after untracking"], correct: 1, explain: ".gitignore only prevents Git from starting to track new matching files — it has no retroactive effect on files already being tracked. To stop tracking one, you need an explicit command like git rm --cached <file>, then commit that removal." },
      { type: "code", q: "Write a .gitignore entry that ignores every file ending in .log, and a separate line ignoring the .env file.", starter: "", checks: [/\*\.log/, /\.env/], hint: "Two lines: `*.log` and `.env`", solution: "*.log\n.env", explain: "*.log matches any file ending in .log anywhere in the project, and .env matches that specific filename — both common candidates for exclusion from version control." }
    ]
  }
  ]
};
