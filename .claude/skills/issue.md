---
name: issue
description: Show details of a GitHub issue by its number. Pass the issue number as an argument.
---

# Show GitHub Issue

Display the full details of a specific GitHub issue.

## Arguments

- `$ARGUMENTS` — required: the issue number (e.g., `2`, `15`)

## Steps

1. Run:

   ```bash
   gh issue view $ARGUMENTS
   ```

2. Present the issue details to the user: title, status, labels, body.
