# Mico CSS Framework Development Workflow

This document outlines the development workflow, Git practices, and release management for the Mico CSS Framework.

## Table of Contents
- [Git Workflow](#git-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Semantic Versioning](#semantic-versioning)
- [Release Process](#release-process)
- [Build Process](#build-process)

## Git Workflow

### Branches

The Mico CSS Framework uses the following branch structure:

- **main**: Production-ready code. This branch should always be stable and deployable.
- **dev**: Development branch where all feature work is integrated before being merged to main.

### Daily Development Workflow

1. **Before starting work**, pull the latest changes:
   ```
   git checkout dev
   git pull origin dev
   ```

2. **Make your changes** to the codebase

3. **Commit your changes** with a descriptive message:
   ```
   git add .
   git commit -m "Brief description of changes"
   ```

4. **Push your changes** to the dev branch:
   ```
   git push origin dev
   ```

### Releasing to Main Branch

When you have a stable version ready for release:

1. **Create a pull request** from dev to main on GitHub:
   - Go to: https://github.com/MichaelKatiba/mico/pull/new/dev
   - Add a detailed description of the changes
   - Request a review if applicable

2. **Merge the pull request** on GitHub

3. **Update your local main branch**:
   ```
   git checkout main
   git pull origin main
   ```

4. **Create a version tag** following semantic versioning:
   ```
   git tag -a v1.0.0 -m "Version 1.0.0 - Initial release"
   git push origin v1.0.0
   ```

## Commit Guidelines

Follow these guidelines for commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

### Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

Example:
```
feat: add hover utility classes

- Add hover background color utilities
- Add hover text color utilities
- Add transform hover effects
```

## Semantic Versioning

The Mico CSS Framework follows semantic versioning (vX.Y.Z):

- **X (Major)**: Increment when making incompatible API changes
  - Example: Renaming core utility classes, changing the framework's architecture

- **Y (Minor)**: Increment when adding functionality in a backward-compatible manner
  - Example: Adding new utility classes, introducing new features

- **Z (Patch)**: Increment when making backward-compatible bug fixes
  - Example: Fixing bugs, improving performance, refactoring code

### Version Progression Example

- v0.1.0: Initial development version
- v0.2.0: Added hover utility classes
- v0.2.1: Fixed bugs in hover utilities
- v1.0.0: First stable release
- v1.1.0: Added new animation utilities
- v1.1.1: Fixed browser compatibility issues
- v2.0.0: Major redesign of the framework architecture

## Release Process

1. **Ensure all tests pass** and the build is successful
2. **Update version number** in package.json
3. **Update CHANGELOG.md** with the changes in the new version
4. **Merge dev to main** through a pull request
5. **Tag the release** with the version number
6. **Create a GitHub release** with release notes

## Build Process

The Mico CSS Framework uses PostCSS for processing CSS files. The build process includes:

1. **Development build**: Compiles CSS with source maps for development
2. **Production build**: Minifies and optimizes CSS for production

### Build Commands

- `npm run build`: Build the CSS framework for production
- `npm run dev`: Build with source maps and watch for changes
- `npm run lint`: Run stylelint to check for CSS issues

### Files to Commit

When committing changes, include:

- Source CSS files in the `css` directory
- Configuration files (postcss.config.js, mico.config.js, etc.)
- Documentation files
- Test files

Do NOT commit:
- `node_modules` directory
- Build artifacts in the `dist` directory (these should be generated during the build process)
- IDE-specific files (.idea, .vscode)
- Log files
- Temporary files

## Continuous Integration

Consider setting up GitHub Actions for:
- Running tests on pull requests
- Linting code
- Building the framework
- Deploying documentation
