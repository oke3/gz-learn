# Contributing to gz-learn

Thanks for your interest in contributing!

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Type check
npx tsc --noEmit

# Build
bun run build
```

## Pull Requests

1. Fork the repo and create a feature branch
2. Write tests for new functionality
3. Ensure all tests pass: `bun test`
4. Ensure type check passes: `npx tsc --noEmit`
5. Submit a PR with a clear description

## Adding Curriculum Modules

Curriculum lives in `src/curriculum.ts`. Each module needs:

- A unique `id` (kebab-case)
- A `level`: `beginner`, `intermediate`, or `advanced`
- A one-line `description`
- 3+ lessons, each with `id`, `title`, `objective`, `concepts[]`, and a `practice` prompt

Add tests in `test/curriculum.test.ts` for any structural changes.

## Code Style

- TypeScript strict mode
- ES modules (`import`/`export`)
- Zero runtime dependencies
- Tests for all new features

## License

By contributing, you agree that your contributions will be licensed under the MIT License.