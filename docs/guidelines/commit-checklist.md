# Commit Checklist for Mico CSS Framework

This checklist helps ensure that commits to the Mico CSS Framework repository follow best practices and maintain code quality.

## Before Committing

### Code Quality
- [ ] CSS code follows the project's style guidelines
- [ ] No unnecessary comments or console logs
- [ ] Code is properly formatted
- [ ] No hardcoded values (use CSS variables)
- [ ] CSS classes follow naming conventions

### Testing
- [ ] Changes have been tested in multiple browsers
- [ ] Responsive design works on different screen sizes
- [ ] Accessibility requirements are met
- [ ] No regressions in existing functionality

### Documentation
- [ ] New features are documented
- [ ] Comments added for complex code
- [ ] README updated if necessary
- [ ] Examples created or updated for new features

## Commit Process

### Files to Include
- [ ] Source CSS files in the `css` directory
- [ ] Configuration files if modified
- [ ] Documentation files
- [ ] Test files

### Files to Exclude
- [ ] `node_modules` directory
- [ ] Build artifacts in the `dist` directory
- [ ] IDE-specific files (.idea, .vscode)
- [ ] Log files
- [ ] Temporary files

### Commit Message Format
Follow this format for commit messages:

```
<type>: <subject>

<body>

<footer>
```

Where:
- `<type>`: The type of change (feat, fix, docs, style, refactor, perf, test, chore)
- `<subject>`: A short description of the change
- `<body>`: A more detailed explanation of the change (optional)
- `<footer>`: References to issues, PRs, or breaking changes (optional)

#### Examples:

```
feat: add hover utility classes

- Add hover background color utilities
- Add hover text color utilities
- Add transform hover effects
```

```
fix: correct spacing in typography utilities

Fixes inconsistent spacing in heading elements.
Resolves #123
```

## After Committing

### Push to Remote
- [ ] Push changes to the appropriate branch (usually `dev`)
- [ ] Verify that the push was successful

### Pull Request (when ready for main)
- [ ] Create a pull request from `dev` to `main`
- [ ] Add a detailed description of the changes
- [ ] Reference any related issues
- [ ] Request a review if applicable

## Release Process

When preparing a release:

1. **Update Version**
   - [ ] Update version in package.json according to semantic versioning
   - [ ] Update CHANGELOG.md with the changes in the new version

2. **Create Tag and Release**
   - [ ] Create a git tag with the version number
   - [ ] Push the tag to GitHub
   - [ ] Create a GitHub release with release notes

## Semantic Versioning Guidelines

Follow these guidelines when determining the new version number:

### Major Version (X.0.0)
Increment when making incompatible API changes:
- Renaming core utility classes
- Changing the framework's architecture
- Removing features
- Any changes that would break existing implementations

### Minor Version (0.X.0)
Increment when adding functionality in a backward-compatible manner:
- Adding new utility classes
- Introducing new features
- Expanding existing functionality
- Any non-breaking additions

### Patch Version (0.0.X)
Increment when making backward-compatible bug fixes:
- Fixing bugs
- Improving performance
- Refactoring code
- Documentation updates
- Any changes that don't add features or break existing code
