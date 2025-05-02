# Atlassian Jira Integration

This integration connects Claude to Atlassian Jira through the Model Context Protocol (MCP).

## Features

- Create, read, update, and search Jira issues
- Query project information
- Manage comments and attachments
- Work with sprints and epics

## Setup

1. Create a Jira API token from your Atlassian account settings
2. Configure the integration with your Jira instance URL, email, and API token
3. Connect Claude to this MCP integration

## Configuration

Set the following environment variables:

```
JIRA_INSTANCE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-api-token
```

## Available Tools

### Issues

- `create_issue`: Create a new Jira issue
- `get_issue`: Get details of a specific issue
- `update_issue`: Update an existing issue
- `search_issues`: Search for issues using JQL
- `add_comment`: Add a comment to an issue
- `get_issue_comments`: Get all comments for an issue

### Projects

- `get_projects`: Get a list of all projects
- `get_project`: Get details of a specific project
- `get_project_issues`: Get all issues for a project

### Sprints

- `get_active_sprints`: Get all active sprints
- `get_sprint_issues`: Get all issues in a sprint

## Available Resources

- `/projects`: List of all projects
- `/projects/{key}`: Details of a specific project
- `/issues/{key}`: Details of a specific issue
- `/fields`: List of all available fields
- `/statuses`: List of all available statuses

## Example Usage

```javascript
// Create a new issue
const result = await claudeMcp.useToolFromServer(
  'atlassian-jira', 
  'create_issue', 
  {
    projectKey: 'PROJ',
    summary: 'Implement new feature',
    description: 'We need to implement this feature for the next release',
    issueType: 'Task',
    priority: 'Medium'
  }
);

// Get issue details
const issue = await claudeMcp.accessResourceFromServer(
  'atlassian-jira',
  '/issues/PROJ-123'
);
