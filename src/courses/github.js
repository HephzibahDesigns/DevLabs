// GitHub course — full content.
export const githubCourse = {
  id: "github",
  title: "GitHub",
  category: "Backend & Tools",
  summary: "Host repositories, review code, and ship with pull requests.",
  comingSoon: false,
  topics: [
  {
    id: "git-vs-github", title: "Git vs. GitHub",
    tagline: "Git is the tool that tracks history. GitHub is a website that hosts that history and adds collaboration on top.",
    blocks: [
      { h: "Two different things with similar names", p: "Git is a program that runs on your computer and manages a project's version history. GitHub is a separate, web-based service that hosts Git repositories online, and adds a layer of tools on top: a UI for browsing code, pull requests for reviewing changes, issues for tracking work, and more.",
        tip: "You can use Git entirely without GitHub — GitHub is one of several places (along with GitLab, Bitbucket, and others) that can host a Git repository and add collaboration features around it." },
      { h: "Cloning a repository", p: "`git clone`, followed by a repository's URL, downloads a full copy of that project — including its entire history — from GitHub (or any other remote) onto your computer.",
        code: "git clone https://github.com/facebook/react.git" }
    ],
    exercises: [
      { type: "mcq", q: "What's the relationship between Git and GitHub?", options: ["They're the same thing", "Git is the version-control tool; GitHub is a website that hosts Git repositories and adds collaboration features", "GitHub replaces the need for Git", "Git only works if you have a GitHub account"], correct: 1, explain: "Git works entirely locally on its own. GitHub is a hosting platform built around Git repositories, adding a browsable interface, pull requests, issues, and more — but it's not required to use Git." },
      { type: "code", q: "Write the command to clone the repository at https://github.com/example/app.git", starter: "", checks: [/git clone https:\/\/github\.com\/example\/app\.git/], hint: "It's `git clone` followed by the URL.", solution: "git clone https://github.com/example/app.git", explain: "git clone downloads a full copy of a remote repository — including its history — onto your machine, ready to work with locally." }
    ]
  },
  {
    id: "repos-remotes", title: "Repositories & remotes on GitHub",
    tagline: "Creating a repository on GitHub, and connecting your local project to it.",
    blocks: [
      { h: "Creating a repository", p: "On GitHub, creating a new repository gives you an empty project hosted online, with its own URL. From there you can either clone it down to start working, or connect an existing local project to it." },
      { h: "Connecting an existing local project", p: "If you already have a local Git repository, `git remote add origin <url>` links it to a GitHub repository, and pushing sends your existing history up to it for the first time.",
        code: "git remote add origin https://github.com/you/project.git\ngit push -u origin main" },
      { h: "The -u flag", p: "The `-u` (or `--set-upstream`) flag on that first push remembers the connection between your local `main` branch and the remote one, so future pushes and pulls can just be `git push` / `git pull` without repeating the remote and branch name." }
    ],
    exercises: [
      { type: "mcq", q: "What does the `-u` flag do on `git push -u origin main`?", options: ["Deletes the remote branch", "Sets up main to track origin/main, so future pushes/pulls don't need the full command", "Uploads only untracked files", "Forces the push, overwriting remote history"], correct: 1, explain: "The -u flag records a tracking relationship between your local branch and the remote branch, so afterward a plain `git push` or `git pull` knows where to send or fetch from without repeating origin main." },
      { type: "code", q: "Write the two commands to connect a local repo to https://github.com/you/site.git as \"origin\", then push main with tracking set up.", starter: "", checks: [/git remote add origin https:\/\/github\.com\/you\/site\.git/, /git push -u origin main/], hint: "First `git remote add origin <url>`, then `git push -u origin main`", solution: "git remote add origin https://github.com/you/site.git\ngit push -u origin main", explain: "The first command registers the GitHub repository as a remote named origin; the second pushes your main branch there and sets up tracking for future pushes/pulls." }
    ]
  },
  {
    id: "pull-requests", title: "Pull requests",
    tagline: "How code review and collaboration actually happen on GitHub, once a branch is ready to be merged.",
    blocks: [
      { h: "What a pull request is", p: "A pull request (PR) is a request to merge one branch into another, opened on GitHub. It's more than just a merge, though — it's a dedicated place to review the proposed changes line by line, leave comments, discuss, and approve (or request changes) before anything is merged.",
        tip: "The typical flow: push a branch to GitHub, open a pull request comparing it to main, get it reviewed, then merge it — often deleting the branch afterward since its work is now part of main." },
      { h: "Reviewing changes", p: "GitHub shows a PR as a 'diff' — a side-by-side or unified view of exactly which lines were added or removed. Reviewers can comment on specific lines, and either approve the PR or request changes before it's allowed to merge, depending on the project's rules." }
    ],
    exercises: [
      { type: "mcq", q: "What is a pull request, most fundamentally?", options: ["A way to permanently delete a branch", "A request to merge one branch into another, with review and discussion attached", "A backup of your repository", "A GitHub-only replacement for commits"], correct: 1, explain: "A PR proposes merging a branch's changes into another (usually main), and provides a structured place for reviewers to look at the diff, comment, and approve — before those changes actually land." },
      { type: "mcq", q: "In the typical GitHub workflow, what usually happens right before opening a pull request?", options: ["Deleting the main branch", "Pushing your feature branch to GitHub", "Cloning the repository again", "Installing GitHub Desktop"], correct: 1, explain: "A pull request compares a branch that already exists on GitHub against another (like main) — so you first push your local branch up before you can open a PR from it." }
    ]
  },
  {
    id: "issues-actions", title: "Issues & GitHub Actions",
    tagline: "Tracking work with issues, and automating tasks like tests with GitHub Actions.",
    blocks: [
      { h: "Issues: tracking bugs and tasks", p: "An issue is a tracked item on a GitHub repository — a bug report, a feature request, or a task — that can be discussed, assigned to someone, labeled, and linked to the pull request that eventually resolves it." },
      { h: "Referencing issues from commits", p: "Writing something like `Fixes #12` in a pull request's description automatically links it to issue number 12, and GitHub will close that issue automatically once the PR is merged.",
        code: "git commit -m \"Fix crash on empty input, fixes #12\"" },
      { h: "GitHub Actions: automation", p: "GitHub Actions lets you define workflows — defined in YAML files inside a `.github/workflows` folder — that run automatically on events like a push or a pull request. A common use is running your test suite automatically every time someone opens a PR." }
    ],
    exercises: [
      { type: "mcq", q: "What happens if a pull request's description includes \"Fixes #12\"?", options: ["Nothing — it's just plain text", "GitHub links it to issue #12 and automatically closes that issue when the PR is merged", "It deletes issue #12 immediately", "It creates a new issue numbered 12"], correct: 1, explain: "GitHub recognizes certain keywords (like Fixes, Closes) followed by an issue number as a special link — merging the PR then automatically closes the referenced issue." },
      { type: "mcq", q: "What are GitHub Actions workflow files typically written in, and where do they live?", options: ["JSON, in the root folder", "YAML, inside a .github/workflows folder", "Python, anywhere in the repo", "They aren't files — configured entirely through the UI"], correct: 1, explain: "GitHub Actions workflows are defined as YAML files inside a .github/workflows directory in your repository, describing what events trigger them and what steps to run." }
    ]
  },
  {
    id: "forking", title: "Forking a repository",
    tagline: "Making your own copy of someone else's repository on GitHub, the usual first step in contributing to a project you don't have write access to.",
    blocks: [
      { h: "What a fork is", p: "Forking creates a complete copy of another repository under your own GitHub account. You have full write access to your fork, even though you don't have write access to the original — this is how most open-source contributions start.",
        tip: "A fork is separate from cloning: forking makes a new repository on GitHub itself; cloning downloads any repository (yours, a fork, or one you have direct access to) onto your computer." },
      { h: "The typical open-source contribution flow", p: "Fork the repository, clone your fork locally, create a branch for your change, commit and push to your fork, then open a pull request from your fork's branch back to the original repository.",
        code: "git clone https://github.com/your-username/project.git\ncd project\ngit switch -c fix-typo\n# make changes, commit\ngit push origin fix-typo\n# then open a PR on GitHub, from your fork into the original repo" },
      { h: "Keeping a fork up to date", p: "Since the original repository keeps moving after you fork it, adding it as a second remote (conventionally named `upstream`) lets you pull in its latest changes to keep your fork current.",
        code: "git remote add upstream https://github.com/original-owner/project.git\ngit fetch upstream\ngit merge upstream/main" }
    ],
    exercises: [
      { type: "mcq", q: "What's the difference between forking and cloning?", options: ["They're the same action", "Forking creates a new copy of a repository under your own GitHub account; cloning downloads a repository to your computer", "Cloning only works on forks", "Forking deletes the original repository"], correct: 1, explain: "Forking is a GitHub-side action that gives you your own writable copy of someone else's repository. Cloning is downloading any repository's history to your local machine — you'd typically clone your fork after creating it." },
      { type: "mcq", q: "Why would you add the original repository as an \"upstream\" remote after forking it?", options: ["It's required before you can clone", "To pull in the original repository's latest changes and keep your fork up to date", "It automatically opens pull requests for you", "To delete your fork"], correct: 1, explain: "Your fork doesn't automatically stay in sync with the original repository's ongoing changes. Adding it as an upstream remote lets you fetch and merge its latest commits into your fork whenever you want to catch up." }
    ]
  },
  {
    id: "github-pages", title: "GitHub Pages",
    tagline: "Hosting a static website directly from a GitHub repository, for free.",
    blocks: [
      { h: "What GitHub Pages does", p: "GitHub Pages serves static files (HTML, CSS, JavaScript, and build output from frameworks like React) directly from a repository, giving you a live URL — commonly used for documentation, portfolios, and project landing pages." },
      { h: "Enabling it", p: "In a repository's Settings, under the Pages section, you choose a source — typically a branch (like `main` or a dedicated `gh-pages` branch) and folder — and GitHub builds and serves that content automatically on every push." },
      { h: "Deploying a built app", p: "For a framework that needs a build step, the common pattern is a GitHub Actions workflow that builds the project and pushes the resulting static output to a `gh-pages` branch, which Pages then serves." }
    ],
    exercises: [
      { type: "mcq", q: "What kind of content does GitHub Pages serve?", options: ["Any backend server code, including databases", "Static files — HTML, CSS, JS, and static build output", "Only Markdown files", "Docker containers"], correct: 1, explain: "GitHub Pages is a static hosting service — it serves files as-is, with no server-side code execution, which is why frameworks with a backend need different hosting, while a built static site works perfectly." },
      { type: "mcq", q: "For a framework project that needs a build step, what's the common way to deploy it to GitHub Pages?", options: ["It's not possible", "A GitHub Actions workflow builds the project and pushes the output to a branch Pages serves from", "You must build it manually every time and email the files to GitHub", "Pages builds every framework automatically with no configuration"], correct: 1, explain: "Since Pages only serves static files, a build step is needed first — commonly automated with a GitHub Actions workflow that runs the build and publishes the resulting static output to the branch configured in Pages settings." }
    ]
  },
  {
    id: "gh-cli", title: "The GitHub CLI",
    tagline: "Doing common GitHub tasks — like opening a pull request — straight from the terminal, without switching to the browser.",
    blocks: [
      { h: "What gh is", p: "The GitHub CLI (`gh`) is an official command-line tool for interacting with GitHub — creating repositories, opening pull requests, viewing issues — without leaving your terminal.",
        code: "gh auth login" },
      { h: "Common commands", p: "A few of the most-used ones: `gh repo create` scaffolds a new repository, `gh pr create` opens a pull request from your current branch, and `gh issue list` shows open issues.",
        code: "gh pr create --title \"Fix login bug\" --body \"Resolves the crash on empty input\"" }
    ],
    exercises: [
      { type: "mcq", q: "What is the GitHub CLI (gh) used for?", options: ["Editing code directly", "Performing GitHub actions like creating PRs and repositories from the terminal", "Replacing Git entirely", "Only viewing commit history"], correct: 1, explain: "gh is a command-line companion to the GitHub website — it wraps common GitHub-specific actions (not already covered by plain git) like opening pull requests or managing issues, directly from the terminal." },
      { type: "code", q: "Write the gh command to open a pull request with the title \"Add dark mode\".", starter: "", checks: [/gh pr create --title ["']Add dark mode["']/], hint: "Use `gh pr create --title \"Add dark mode\"`", solution: "gh pr create --title \"Add dark mode\"", explain: "gh pr create opens a new pull request from your current branch; the --title flag sets its title (gh will prompt interactively for anything you don't specify as a flag)." }
    ]
  },
  {
    id: "codespaces-secrets", title: "Codespaces & Actions secrets",
    tagline: "A cloud dev environment tied to your repo, and how to safely use sensitive values in automated workflows.",
    blocks: [
      { h: "What Codespaces is", p: "GitHub Codespaces spins up a full, cloud-hosted development environment — preconfigured for your specific repository — that you can connect to from your browser or a local editor, without installing anything locally." },
      { h: "Why Actions need secrets", p: "A workflow often needs sensitive values — an API key, a deployment token — that should never be committed directly into your repository's code, since anyone with read access could see them." },
      { h: "Repository secrets", p: "GitHub lets you store secrets in a repository's Settings, encrypted and hidden from logs. Workflows reference them through a special `secrets` context, never exposing the raw value in your workflow file itself.",
        code: "# .github/workflows/deploy.yml\nsteps:\n  - name: Deploy\n    env:\n      API_KEY: ${{ secrets.API_KEY }}\n    run: ./deploy.sh" }
    ],
    exercises: [
      { type: "mcq", q: "Why shouldn't an API key be written directly into a workflow YAML file?", options: ["YAML doesn't support strings", "The workflow file is part of the repository's code, so anyone with read access could see a hardcoded key", "It would make the workflow run slower", "GitHub Actions doesn't allow environment variables"], correct: 1, explain: "Workflow files live in your repository like any other code, visible to anyone with read access. Storing sensitive values as repository secrets instead keeps them encrypted and out of the visible file, referenced only through the secrets context at runtime." },
      { type: "mcq", q: "What does GitHub Codespaces provide?", options: ["A static site host", "A full cloud-hosted development environment configured for your repository", "A place to store secrets only", "A replacement for GitHub Actions"], correct: 1, explain: "Codespaces gives you a ready-to-code cloud environment tied to a specific repository, so you can start developing immediately from a browser or local editor connection, without a local setup step." }
    ]
  },
  {
    id: "branch-protection", title: "Branch protection & code owners",
    tagline: "Enforcing rules around how changes reach an important branch, like requiring review before merging.",
    blocks: [
      { h: "Branch protection rules", p: "In a repository's Settings, branch protection rules let you enforce requirements on a branch — like main — such as requiring at least one approving review, requiring status checks (like tests) to pass, or blocking direct pushes entirely so all changes must go through a pull request." },
      { h: "Why this matters for teams", p: "Without protection, anyone with write access could push directly to main, bypassing review entirely. Protection rules turn code review and passing tests from a convention people might forget into something GitHub actually enforces." },
      { h: "CODEOWNERS", p: "A `CODEOWNERS` file lets you specify which people or teams are automatically requested for review when specific files or folders are touched in a pull request — useful for making sure the right expert reviews changes to a sensitive area of the codebase.",
        code: "# .github/CODEOWNERS\n/src/payments/  @finance-team\n*.md            @docs-team" }
    ],
    exercises: [
      { type: "mcq", q: "What does a branch protection rule requiring \"1 approving review\" enforce?", options: ["Nothing — it's just a label", "A pull request targeting that branch cannot be merged until at least one reviewer has approved it", "Every commit message must be reviewed individually", "It blocks all pull requests permanently"], correct: 1, explain: "That rule makes GitHub itself block the merge button until the requirement is satisfied — turning code review from a social convention into something technically enforced." },
      { type: "mcq", q: "What does a CODEOWNERS file do?", options: ["Deletes unauthorized commits automatically", "Automatically requests review from specified people/teams when matching files are changed in a PR", "Replaces the need for branch protection", "Lists every contributor to the project"], correct: 1, explain: "CODEOWNERS maps file paths to the people or teams responsible for them, so GitHub can automatically add the right reviewers to a pull request based on which files it touches." }
    ]
  }
  ]
};
