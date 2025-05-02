# Testing Claude Integrations

This document provides guidance on testing MCP integrations in this repository.

## Testing Locally

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Claude Max account

### Setting Up the Test Environment

1. Install development dependencies:
   ```bash
   npm install
   ```

2. Create a test configuration:
   ```bash
   cp .env.example .env.test
   ```

3. Edit `.env.test` with test credentials (consider using sandbox/test environments for services that offer them)

### Running Unit Tests

```bash
npm test
```

This will run all tests in the `tests/` directory. To run tests for a specific integration:

```bash
npm test -- --testPathPattern=integrations/jira
```

### Testing in Claude

To test your integration with Claude:

1. Start the server with your test configuration:
   ```bash
   NODE_ENV=test npm start
   ```

2. Connect Claude to your local MCP server (see QUICK_START.md)

3. Try example queries in Claude that use your integration

## Mock Testing

For testing without actual API calls:

1. Check the `__mocks__` directory for mock data
2. Run tests with the mock flag:
   ```bash
   npm test -- --mock
   ```

## Integration Testing

Each integration should have its own test suite in `tests/integrations/{integration-name}/`.

### Structure of Integration Tests

- `auth.test.js` - Tests for authentication
- `tools/*.test.js` - Tests for each tool
- `resources/*.test.js` - Tests for each resource
- `integration.test.js` - End-to-end tests

### Example Test

```javascript
// tests/integrations/jira/tools/issues.test.js
const issueTools = require('../../../../src/integrations/atlassian-jira/tools/issues');
const auth = require('../../../../src/integrations/atlassian-jira/auth');

// Mock the auth module
jest.mock('../../../../src/integrations/atlassian-jira/auth');

describe('Jira Issue Tools', () => {
  beforeEach(() => {
    // Set up mocks
    auth.isConfigured.mockReturnValue(true);
    auth.getInstanceUrl.mockReturnValue('https://example.atlassian.net');
  });

  test('createIssue creates an issue with required fields', async () => {
    const args = {
      projectKey: 'TEST',
      summary: 'Test Issue',
      description: 'This is a test issue',
      issueType: 'Task'
    };

    const result = await issueTools.createIssue(args);
    
    expect(result).toHaveProperty('key');
    expect(result.key).toContain(args.projectKey);
  });
});
```

## Testing Checklist

For each integration, test:

1. **Authentication**
   - Valid credentials work
   - Invalid credentials fail appropriately
   - Token refresh works (if applicable)

2. **Tools**
   - Each tool handles valid inputs correctly
   - Tools properly handle invalid inputs
   - Error handling works as expected

3. **Resources**
   - Resources return expected data
   - Resource URIs are parsed correctly
   - Resource caching works (if implemented)

4. **End-to-End**
   - MCP server responds to tool invocations
   - MCP server responds to resource requests
   - Server manifest is correctly generated

## Continuous Integration

This repository uses GitHub Actions for continuous integration. To set up CI for your integration:

1. Add secrets for any API credentials needed for testing
2. Add your integration to the CI workflow file
3. Make sure to use test/sandbox environments for external services
