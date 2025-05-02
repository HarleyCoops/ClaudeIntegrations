/**
 * Unit tests for Jira issues tools
 */

const issueTools = require('../../../../src/integrations/atlassian-jira/tools/issues');
const auth = require('../../../../src/integrations/atlassian-jira/auth');

// Mock the auth module
jest.mock('../../../../src/integrations/atlassian-jira/auth');

describe('Jira Issue Tools', () => {
  beforeEach(() => {
    // Set up mocks
    auth.isConfigured.mockReturnValue(true);
    auth.getInstanceUrl.mockReturnValue('https://example.atlassian.net');
    
    // Reset any tracked function calls
    jest.clearAllMocks();
  });

  describe('createIssue', () => {
    test('creates an issue with required fields', async () => {
      const args = {
        projectKey: 'TEST',
        summary: 'Test Issue',
        description: 'This is a test issue',
        issueType: 'Task'
      };

      const result = await issueTools.createIssue(args);
      
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('key');
      expect(result.key).toContain(args.projectKey);
      expect(result).toHaveProperty('success', true);
    });

    test('throws error when authentication is not configured', async () => {
      auth.isConfigured.mockReturnValue(false);
      
      const args = {
        projectKey: 'TEST',
        summary: 'Test Issue',
        description: 'This is a test issue',
        issueType: 'Task'
      };

      await expect(issueTools.createIssue(args)).rejects.toThrow('Jira authentication not configured');
    });

    test('creates an issue with optional fields', async () => {
      const args = {
        projectKey: 'TEST',
        summary: 'Test Issue',
        description: 'This is a test issue',
        issueType: 'Task',
        priority: 'High',
        assignee: 'user123',
        labels: ['test', 'example'],
        customFields: {
          'customfield_10001': 'Custom value'
        }
      };

      const result = await issueTools.createIssue(args);
      
      expect(result).toHaveProperty('key');
      expect(result.key).toContain(args.projectKey);
    });
  });

  describe('getIssue', () => {
    test('gets an issue by key', async () => {
      const args = {
        issueKey: 'TEST-123'
      };

      const result = await issueTools.getIssue(args);
      
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('key', args.issueKey);
      expect(result).toHaveProperty('fields');
      expect(result.fields).toHaveProperty('summary');
      expect(result.fields).toHaveProperty('description');
    });

    test('includes expanded fields when specified', async () => {
      const args = {
        issueKey: 'TEST-123',
        expand: ['renderedFields', 'changelog']
      };

      const result = await issueTools.getIssue(args);
      
      expect(result).toHaveProperty('key', args.issueKey);
    });
  });

  describe('searchIssues', () => {
    test('searches issues with JQL', async () => {
      const args = {
        jql: 'project = TEST AND status = "To Do"'
      };

      const result = await issueTools.searchIssues(args);
      
      expect(result).toHaveProperty('issues');
      expect(Array.isArray(result.issues)).toBe(true);
    });

    test('uses pagination parameters', async () => {
      const args = {
        jql: 'project = TEST',
        startAt: 10,
        maxResults: 5
      };

      const result = await issueTools.searchIssues(args);
      
      expect(result).toHaveProperty('startAt', args.startAt);
      expect(result).toHaveProperty('maxResults', args.maxResults);
    });
  });
});
