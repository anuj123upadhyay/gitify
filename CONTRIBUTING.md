# Contributing Guide :

Thank you for considering contributing to **Gitify**! We appreciate community involvement to make the project better. Please follow this guide to get started.

## Getting Started :

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/gitify.git
   cd gitify
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Making Changes :

- Make small, focused commits with clear messages.
- Ensure TypeScript types are correct and no type errors.
- Follow the existing code style (Prettier & ESLint configurations).
- Write tests for new functionality or bug fixes, especially for core logic.

## Pull Request Process :

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a Pull Request on the `main` branch of the original repo.
3. Describe the problem you’re solving and how to test your changes.
4. Wait for review; address any feedback by updating your branch.
5. Once approved, your PR will be merged.

## Development Guidelines :

- Use descriptive branch names (`feature/...`, `fix/...`, etc.).
- Run `npm run lint` and `npm run test` before pushing.
- Keep PRs small and focused.

Thank you for helping make **Gitify** even better! 🎉
