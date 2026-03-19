---
name: run-tests
description: Run Cypress E2E tests on Windows via PowerShell, handling known platform quirks (ELECTRON_RUN_AS_NODE, sandbox). Use when you need to execute Cypress tests.
---

# Run Cypress Tests (Windows)

Run Cypress E2E tests on Windows. Handles known platform issues automatically.

## Arguments

- `$ARGUMENTS` — optional: spec file path (e.g., `cypress/e2e/search.cy.ts`) or `all` to run everything. Defaults to all specs.

## Windows Quirks to Handle

### ELECTRON_RUN_AS_NODE

VS Code sets `ELECTRON_RUN_AS_NODE=1` in its terminal environment. This causes `Cypress.exe` (an Electron app) to launch as a plain Node process instead of Electron, producing the error:

```
Cypress.exe: bad option: --smoke-test
```

**Fix:** Remove the env var before every Cypress command using `Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue`.

### Sandbox mode

Claude Code's default Bash sandbox can interfere with Cypress binary execution on Windows. All Cypress commands **must** use `dangerouslyDisableSandbox: true` on the Bash tool call.

### Browser

Default to `chrome` browser. Electron browser inherits the `ELECTRON_RUN_AS_NODE` issue even after unsetting the var in some edge cases.

## Steps

1. **Run the tests** via PowerShell, unsetting `ELECTRON_RUN_AS_NODE` first.

   **IMPORTANT:** Always set `dangerouslyDisableSandbox: true` on the Bash tool call.

   If a specific spec was provided in `$ARGUMENTS`:

   ```bash
   powershell.exe -Command "cd 'c:\Users\vikha\project\cypressTemplate'; Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue; npx cypress run --browser chrome --spec '$ARGUMENTS'"
   ```

   If no arguments or `all`:

   ```bash
   powershell.exe -Command "cd 'c:\Users\vikha\project\cypressTemplate'; Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue; npx cypress run --browser chrome"
   ```

2. **On failure**, read the screenshot from the error output path (under `cypress/screenshots/`) to understand what went wrong visually.

3. **Report results** to the user: passed/failed count, duration, and any failure details.
