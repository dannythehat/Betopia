# 🤝 Contributing to Betopia

Thank you for your interest in contributing to Betopia! This document provides guidelines and instructions for contributing to the project.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Documentation](#documentation)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of experience level, background, or identity.

### Expected Behavior

- Be respectful and considerate
- Use welcoming and inclusive language
- Accept constructive criticism gracefully
- Focus on what's best for the project
- Show empathy towards other contributors

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or insulting remarks
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- PowerShell (for Windows) or Bash (for Mac/Linux)

### Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/betopia.git
   cd betopia
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/dannythehat/betopia.git
   ```
4. **Install dependencies**:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
5. **Start development**:
   ```bash
   .\dev.ps1  # Windows
   # or
   ./dev.sh   # Mac/Linux (coming soon)
   ```

---

## Development Workflow

### 1. Create a Feature Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new feature branch
git checkout -b feature/your-feature-name
```

**Branch Naming Conventions**:
- `feature/` - New features (e.g., `feature/add-fixtures-filter`)
- `fix/` - Bug fixes (e.g., `fix/api-timeout-error`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/optimize-api-calls`)
- `test/` - Adding tests (e.g., `test/add-fixtures-tests`)

---

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed
- Write tests for new features

---

### 3. Test Your Changes

```bash
# Run backend tests (once implemented)
cd backend
npm test

# Run frontend tests (once implemented)
cd frontend
npm test

# Manual testing
.\dev.ps1
# Test in browser at http://localhost:3000
```

---

### 4. Commit Your Changes

Follow our [commit guidelines](#commit-guidelines):

```bash
git add .
git commit -m "feat(backend): add fixtures filtering endpoint"
```

---

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

---

### 6. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the PR template
5. Submit the PR

---

## Coding Standards

### JavaScript/TypeScript

- **ES6+ syntax**: Use modern JavaScript features
- **Async/await**: Prefer over callbacks or raw promises
- **Arrow functions**: Use for short functions
- **Destructuring**: Use for cleaner code
- **Template literals**: Use for string interpolation

**Example**:
```javascript
// Good
const fetchFixtures = async (league) => {
  const { data } = await api.get(`/fixtures?league=${league}`);
  return data;
};

// Avoid
function fetchFixtures(league) {
  return api.get('/fixtures?league=' + league).then(function(response) {
    return response.data;
  });
}
```

---

### React Components

- **Functional components**: Use hooks instead of class components
- **Named exports**: Prefer over default exports
- **PropTypes**: Add for type checking (or use TypeScript)
- **Hooks**: Use `useState`, `useEffect`, `useCallback`, etc.

**Example**:
```javascript
// Good
export const FixtureCard = ({ fixture }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div onClick={() => setIsExpanded(!isExpanded)}>
      {/* ... */}
    </div>
  );
};

// Avoid
class FixtureCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isExpanded: false };
  }
  // ...
}
```

---

### Backend API

- **RESTful conventions**: Use proper HTTP methods and status codes
- **Error handling**: Always handle errors gracefully
- **Validation**: Validate all inputs
- **Logging**: Log important events and errors

**Example**:
```javascript
// Good
app.get('/api/fixtures', async (req, res) => {
  try {
    const { league, date } = req.query;
    const fixtures = await getFixtures({ league, date });
    res.json({ success: true, data: fixtures });
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
```

---

### CSS/Styling

- **BEM naming**: Use Block-Element-Modifier convention
- **Mobile-first**: Design for mobile, then scale up
- **CSS variables**: Use for colors, spacing, etc.
- **Responsive**: Use media queries for different screen sizes

**Example**:
```css
/* Good */
.fixture-card {
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
}

.fixture-card__header {
  font-size: var(--font-size-lg);
}

.fixture-card--highlighted {
  border: 2px solid var(--color-primary);
}
```

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, build, etc.)

### Scopes

- `backend`: Backend API changes
- `frontend`: Frontend UI changes
- `data`: Data schema or mock data changes
- `scripts`: Automation scripts
- `docs`: Documentation files

### Examples

```bash
# Good commits
git commit -m "feat(backend): add fixtures filtering by league and date"
git commit -m "fix(frontend): resolve status card not updating"
git commit -m "docs: update README with new API endpoints"
git commit -m "refactor(backend): optimize database queries"

# Avoid
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "WIP"
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Commit messages follow guidelines
- [ ] Branch is up to date with main

### PR Template

When creating a PR, include:

1. **Description**: What does this PR do?
2. **Motivation**: Why is this change needed?
3. **Changes**: List of changes made
4. **Testing**: How was this tested?
5. **Screenshots**: If UI changes, include screenshots
6. **Related Issues**: Link to related issues

**Example**:
```markdown
## Description
Adds filtering functionality to the fixtures endpoint, allowing users to filter by league and date.

## Motivation
Users need to view fixtures for specific leagues and dates without loading all fixtures.

## Changes
- Added query parameter parsing in `/api/fixtures`
- Implemented filtering logic for league and date
- Updated frontend to send filter parameters
- Added tests for filtering functionality

## Testing
- Manual testing with various league/date combinations
- Unit tests for filtering logic
- Integration tests for API endpoint

## Screenshots
[Include screenshots if applicable]

## Related Issues
Closes #123
```

---

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests
2. **Code Review**: Maintainer reviews code
3. **Feedback**: Address any requested changes
4. **Approval**: PR is approved
5. **Merge**: PR is merged into main

---

## Testing

### Backend Tests

```bash
cd backend
npm test
```

**Test Structure**:
```javascript
describe('Fixtures API', () => {
  it('should return all fixtures', async () => {
    const response = await request(app).get('/api/fixtures');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should filter fixtures by league', async () => {
    const response = await request(app)
      .get('/api/fixtures?league=Premier League');
    expect(response.status).toBe(200);
    expect(response.body.data.every(f => f.league === 'Premier League')).toBe(true);
  });
});
```

---

### Frontend Tests

```bash
cd frontend
npm test
```

**Test Structure**:
```javascript
import { render, screen } from '@testing-library/react';
import { FixtureCard } from './FixtureCard';

describe('FixtureCard', () => {
  it('renders fixture details', () => {
    const fixture = { home_team: 'Arsenal', away_team: 'Chelsea' };
    render(<FixtureCard fixture={fixture} />);
    expect(screen.getByText('Arsenal')).toBeInTheDocument();
    expect(screen.getByText('Chelsea')).toBeInTheDocument();
  });
});
```

---

## Documentation

### Code Comments

- **Why, not what**: Explain why code exists, not what it does
- **Complex logic**: Add comments for non-obvious code
- **TODOs**: Mark future improvements with `// TODO:`

**Example**:
```javascript
// Good
// Calculate EV using Kelly Criterion to optimize bet sizing
const expectedValue = (probability * odds) - 1;

// Avoid
// Calculate expected value
const expectedValue = (probability * odds) - 1;
```

---

### Documentation Files

When adding features, update:

- **README.md**: If adding major features
- **ROADMAP.md**: If completing roadmap items
- **STATUS.md**: Daily progress updates
- **DAILY_PLAN.md**: If adding new tasks

---

## Questions?

- **Email**: danqawsedef@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/dannythehat/betopia/issues)
- **Discussions**: [GitHub Discussions](https://github.com/dannythehat/betopia/discussions)

---

## Recognition

Contributors will be recognized in:
- **README.md**: Contributors section
- **Release notes**: Credited for contributions
- **GitHub**: Contributor badge

---

**Thank you for contributing to Betopia! ✨🤖**

*Your Betting Utopia - Where Smart Bets Live*

*Last Updated: 2025-11-05*
