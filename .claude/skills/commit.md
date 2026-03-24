---
name: commit
description: Analyze staged/unstaged changes and create a git commit. Optionally accepts a message hint as an argument.
---

# Git Commit

Analyze the current changes in the working directory and create a well-formed git commit.

## Arguments

- `$ARGUMENTS` — optional: a hint or short description to include in the commit message. If provided, use it as the basis for the commit message subject. If empty, generate the subject automatically from the diff analysis.

## Steps

1. **Gather context** — run these commands in parallel:

   ```bash
   git status
   ```

   ```bash
   git diff
   ```

   ```bash
   git diff --cached
   ```

   ```bash
   git log --oneline -5
   ```

2. **Analyze changes** — look at both staged and unstaged changes. Determine:
   - What files were added, modified, or deleted
   - The nature of the change (feature, fix, refactor, docs, test, chore, etc.)
   - A concise summary of _why_ the change was made, not just _what_ changed

3. **Stage files** — add relevant changed files to the staging area. Prefer adding specific files by name rather than `git add -A`. Do NOT stage files that likely contain secrets (`.env`, credentials, tokens).

4. **Compose the commit message** following these rules:
   - If `$ARGUMENTS` is provided: use it as the commit subject line (capitalize first letter, no period at end). Add a body if the changes are non-trivial.
   - If `$ARGUMENTS` is empty: generate a subject line from the analysis. Keep it under 72 characters, imperative mood (e.g., "Add login validation", "Fix broken selector in search page").
   - Match the style of recent commits from `git log`.
   - End the message with:
     ```
     Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
     ```

5. **Create the commit** using a HEREDOC for the message:

   ```bash
   git commit -m "$(cat <<'EOF'
   Subject line here

   Optional body here.

   Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
   EOF
   )"
   ```

6. **Verify** — run `git status` after the commit to confirm success.

7. **Report** — show the user a brief summary: the commit hash, subject, and number of files changed.

## Rules

- NEVER use `git add -A` or `git add .` — always stage specific files
- NEVER commit `.env`, credentials, or secret files
- NEVER amend previous commits unless the user explicitly asks
- NEVER push to remote — only commit locally
- If there are no changes to commit, inform the user and stop
- If a pre-commit hook fails, fix the issue and create a NEW commit (do not amend)
