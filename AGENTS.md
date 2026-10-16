# Repository guide

QFL is a formal consensus workbench. Keep changes focused on the project, preserve its existing behavior, and verify code changes with the available checks.

## Development

- Use Node.js 22 or later.
- Install dependencies with `npm ci`.
- Start the development server with `npm run dev`.
- Run `npm test`, `npm run typecheck`, and `npm run build` when relevant to a change.
- Keep the development port at 8080 and the production preview port at 8081.

## Application structure

- `src/components/` contains the workbench interface.
- `src/lib/` contains protocol models, specifications, invariants, and simulation logic.
- `src/routes/` contains application routes.
- `scripts/` contains development and verification utilities.
- `migrations/` contains database migrations.

## Engineering practices

- Preserve the existing authentication and data-isolation guarantees.
- Keep secrets out of source control and browser bundles.
- Treat the protocol simulators as educational models; do not describe their output as a proof of production correctness.
- Keep interfaces responsive and accessible.
- Run the relevant checks before considering a change complete.
