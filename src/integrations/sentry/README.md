# Sentry Integration

This integration connects Claude to Sentry through the Model Context Protocol (MCP).

## Features

- Query issues and events from Sentry
- Create and manage issues
- Retrieve error data and stack traces
- Analyze performance metrics
- Access project statistics

## Setup

1. Create a Sentry authentication token with appropriate scopes
2. Configure the integration with your Sentry organization and project
3. Connect Claude to this MCP integration

## Configuration

Set the following environment variables:

```
SENTRY_AUTH_TOKEN=your-sentry-auth-token
SENTRY_ORGANIZATION=your-sentry-organization
SENTRY_PROJECT=your-sentry-project
```

## Available Tools

### Issues

- `get_issues`: Get a list of issues for a project
- `get_issue`: Get details of a specific issue
- `update_issue`: Update an issue's status, assignee, etc.
- `search_issues`: Search for issues using various filters

### Events

- `get_events`: Get a list of events for a project or issue
- `get_event`: Get details of a specific event

### Projects

- `get_projects`: Get a list of all projects in the organization
- `get_project`: Get details of a specific project
- `get_project_stats`: Get statistics for a project

### Analytics

- `get_performance_metrics`: Get performance metrics for a project
- `analyze_issue_trends`: Analyze trends in issues over time

## Available Resources

- `/issues`: List of all issues
- `/issues/{issue_id}`: Details of a specific issue
- `/events/{event_id}`: Details of a specific event
- `/projects`: List of all projects
- `/projects/{project_id}`: Details of a specific project

## Example Usage

```javascript
// Get recent issues from Sentry
const result = await claudeMcp.useToolFromServer(
  'sentry', 
  'get_issues', 
  {
    query: 'is:unresolved',
    sort: 'date',
    limit: 10
  }
);

// Get details of a specific issue
const issue = await claudeMcp.accessResourceFromServer(
  'sentry',
  `/issues/12345`
);
