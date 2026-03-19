---
name: lint
description: Run ESLint and Prettier on the project
---

# Lint and Format

Run the linter and formatter across the entire project.

## Steps

1. Run ESLint with auto-fix:

   ```bash
   npx eslint . --fix
   ```

2. Run Prettier to format all files:

   ```bash
   npx prettier --write .
   ```

3. Report any remaining ESLint errors (without --fix) so the user can see what needs manual attention:
   ```bash
   npx eslint .
   ```
