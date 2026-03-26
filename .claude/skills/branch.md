---
name: branch
description: Create a git branch with the pattern autotests/<number>. Optionally accepts a ticket number as argument. If no number given, finds the latest autotests/* PR/branch and increments.
---

# Create Autotest Branch

Create a new git branch following the `autotests/<number>` naming pattern.

## Arguments

- `$ARGUMENTS` — optional: ticket/issue number to use in the branch name. If empty, auto-increment from the latest `autotests/*` branch or PR.

## Steps

1. **Determine the branch number:**
   - If `$ARGUMENTS` is provided and non-empty: use that as the number.
   - If `$ARGUMENTS` is empty: find the latest number by checking both local branches and GitHub PRs:

     ```bash
     git branch --list "autotests/*" --sort=-version:refname | head -1
     ```

     ```bash
     gh pr list --search "head:autotests/" --state all --limit 1 --json number,headRefName --jq '.[0].headRefName'
     ```

     Extract the number from the highest `autotests/<N>` found across both sources. If none exist, start at 1. Increment by 1 to get the new number.

2. **Ensure clean working state:**

   ```bash
   git status --short
   ```

   All changes should already be committed before creating the branch. If there are uncommitted changes, warn the user and stop.

3. **Create and switch to the new branch from `main`:**

   ```bash
   git checkout -b autotests/<number>
   ```

4. **Confirm** — output the branch name:

   ```
   Branch created: autotests/<number>
   ```

## Rules

- Branch is always created from the current HEAD (tests should already be committed)
- NEVER push the branch — only create it locally
- If the branch already exists, warn the user and ask for a different number
- The number should be zero-padded to match existing convention if one exists (e.g., if existing branches use `autotests/42`, don't pad; if they use `autotests/042`, pad to 3 digits)
