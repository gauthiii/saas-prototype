# Contributing to Forge UI

Thank you for your interest in contributing! We welcome contributions from everyone. Here's how you can help:

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/gauthiii/saas-prototype.git
   cd saas-prototype
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Project

```bash
npm run dev
```

This starts the development server with hot module reloading.

### Building for Production

```bash
npm run build
```

### Code Style

- Use TypeScript for type safety
- Follow the existing code style and conventions
- Format code with Prettier (if configured)
- Ensure no console errors or warnings

## Making Changes

1. **Keep commits atomic** — each commit should represent a single logical change
2. **Write clear commit messages** — describe what changed and why
3. **Add tests** if applicable (if test infrastructure exists)
4. **Test your changes** thoroughly before submitting a PR

## Submitting a Pull Request

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description of what was changed and why
   - Reference to any related issues (e.g., "Fixes #123")

3. **Be responsive** to review feedback and maintain the PR until it's merged

## Areas You Can Contribute

- **Components**: Improve or add new UI components in `src/components/`
- **Themes**: Add or enhance themes in `src/theme.ts`
- **Features**: Add new functionality to specific domains in `src/domains/`
- **Documentation**: Improve README or add examples
- **Bug Fixes**: Fix existing issues
- **Performance**: Optimize rendering and bundle size

## Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Comment on an existing issue
- Check the project README for more details

## Code of Conduct

Please be respectful and constructive in all interactions. We value diversity and inclusion.

---

Happy coding! 🚀
