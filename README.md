# QFL — Formal Consensus Workbench

QFL is an interactive workbench for exploring distributed consensus, formal specifications, proof obligations, and execution traces.

## Workbench

The interface brings together:

- **Raft** — annotated specification, cluster simulation, model checking, and invariants.
- **Paxos and Multi-Paxos** — protocol traces, failure cases, and proof obligations.
- **Byzantine consensus** — quorum behavior and adversarial scenarios.
- **Mapping and kernel views** — connect abstract models to implementation-level behavior.
- **Quantum and logical models** — GHZ voting, mesa optimization, Löb, and HoTT explorations.

The simulations are educational tools. Their results illustrate the encoded model and should not be treated as a proof of a production implementation.

## Development

Requirements: Node.js 22 or later and npm.

```sh
npm ci
npm run dev
```

The development server listens on port 8080.

## Checks

```sh
npm test
npm run typecheck
npm run build
```

## Project structure

- `src/components/` — workbench panels and interactive views
- `src/lib/` — protocol models, invariants, specifications, and simulation logic
- `src/routes/` — application routes
- `scripts/` — local development and verification utilities
- `migrations/` — database schema migrations

## License

No license has been declared yet. All rights remain with the copyright holder unless a license is added.
