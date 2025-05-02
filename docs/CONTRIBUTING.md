# Contributing to Claude Integrations

Thank you for your interest in contributing to Claude Integrations! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion for improvement:

1. Check if the issue already exists in the [Issue Tracker](https://github.com/your-username/claude-integrations/issues).
2. If not, create a new issue with a clear description, steps to reproduce, and expected behavior.

### Development Workflow

1. Fork the repository.
2. Create a new branch for your feature or bugfix: `git checkout -b feature/your-feature-name` or `git checkout -b fix/your-bugfix-name`.
3. Make your changes following the coding conventions.
4. Add tests for your changes.
5. Run the tests to ensure they pass.
6. Commit your changes with a clear and descriptive commit message.
7. Push to your fork.
8. Submit a pull request.

### Pull Request Process

1. Update the README.md or other documentation as necessary.
2. Update the CHANGELOG.md file with details of changes.
3. Ensure your code follows the project's coding standards.
4. Your pull request will be reviewed by the maintainers, who may request changes or improvements.
5. Once approved, your pull request will be merged.

## Adding a New Integration

To add a new integration:

1. Create a new directory in `src/integrations` for your integration (e.g., `src/integrations/new-service`).
2. Follow the integration structure outlined in the project structure document.
3. Implement the required files:
   - `README.md` - Documentation for your integration
   - `index.js` - Main entry point
   - `auth.js` - Authentication handling
   - `tools/` - MCP tools implementations
   - `resources/` - MCP resources implementations
4. Add your integration to the main `src/index.js` file.
5. Add tests for your integration.
6. Update the documentation to include your new integration.

### Integration Structure

Each integration should follow this structure:

```
integration-name/
├── README.md                     # Integration-specific documentation
├── index.js                      # Main integration entry point
├── auth.js                       # Authentication handling
├── tools/                        # MCP tools
│   ├── tool1.js                  # Tool implementation
│   ├── tool2.js                  # Tool implementation
│   └── index.js                  # Tool exports
├── resources/                    # MCP resources
│   ├── resource1.js              # Resource implementation
│   ├── resource2.js              # Resource implementation
│   └── index.js                  # Resource exports
└── examples/                     # Usage examples
```

## Coding Standards

- Use ESLint for linting.
- Write clear, descriptive comments.
- Include JSDoc comments for all functions and classes.
- Follow the existing code style.
- Write tests for all new functionality.

## Testing

Before submitting a pull request:

1. Run the test suite: `npm test`
2. Run the linter: `npm run lint`
3. Ensure all tests pass and there are no linting errors.

## Documentation

- Update the README.md file with any new features or changes.
- Update the integration's README.md with specific instructions.
- Include example usage in the integration's examples directory.

## Questions?

If you have any questions or need help, please reach out by opening an issue or contacting the maintainers.

Thank you for contributing to Claude Integrations!
