/**
 * Atlassian Jira Integration
 * 
 * This module provides MCP tools and resources for interacting with Atlassian Jira.
 */

const { createServer, createTool, createResource, formatToolResponse, formatResourceResponse } = require('../../core/mcp-utils');
const { getIntegrationConfig } = require('../../core/config');
const auth = require('./auth');

// Import sub-modules (to be implemented)
const issueTools = require('./tools/issues');
const projectTools = require('./tools/projects');
const sprintTools = require('./tools/sprints');

/**
 * Create a new MCP server for Jira integration
 */
const server = createServer({
  name: 'atlassian-jira',
  description: 'MCP integration for Atlassian Jira',
  tools: [],
  resources: []
});

// Add issue tools
server.addTool(
  createTool({
    name: 'create_issue',
    description: 'Create a new Jira issue',
    inputSchema: {
      type: 'object',
      properties: {
        projectKey: {
          type: 'string',
          description: 'Project key (e.g., PROJ)'
        },
        summary: {
          type: 'string',
          description: 'Issue summary'
        },
        description: {
          type: 'string',
          description: 'Issue description'
        },
        issueType: {
          type: 'string',
          description: 'Issue type (e.g., Bug, Task, Story)'
        },
        priority: {
          type: 'string',
          description: 'Issue priority'
        },
        assignee: {
          type: 'string',
          description: 'Username of assignee'
        },
        labels: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Issue labels'
        },
        customFields: {
          type: 'object',
          description: 'Custom fields in the format { fieldId: value }'
        }
      },
      required: ['projectKey', 'summary', 'issueType']
    },
    handler: async (args) => {
      // This would be implemented to call the Jira API
      console.log('Creating Jira issue:', args);
      
      // Mock implementation
      return formatToolResponse({
        id: '12345',
        key: `${args.projectKey}-123`,
        self: `https://your-domain.atlassian.net/rest/api/3/issue/${args.projectKey}-123`,
        success: true
      });
    }
  })
);

server.addTool(
  createTool({
    name: 'get_issue',
    description: 'Get details of a specific Jira issue',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Issue key (e.g., PROJ-123)'
        },
        expand: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Fields to expand (e.g., renderedFields, transitions, changelog)'
        }
      },
      required: ['issueKey']
    },
    handler: async (args) => {
      // This would be implemented to call the Jira API
      console.log('Getting Jira issue:', args);
      
      // Mock implementation
      return formatToolResponse({
        id: '12345',
        key: args.issueKey,
        fields: {
          summary: 'Example issue',
          description: 'This is an example issue',
          status: {
            name: 'To Do'
          },
          priority: {
            name: 'Medium'
          },
          assignee: {
            displayName: 'John Doe'
          }
        }
      });
    }
  })
);

server.addTool(
  createTool({
    name: 'search_issues',
    description: 'Search for Jira issues using JQL',
    inputSchema: {
      type: 'object',
      properties: {
        jql: {
          type: 'string',
          description: 'JQL query'
        },
        maxResults: {
          type: 'number',
          description: 'Maximum number of results to return'
        },
        startAt: {
          type: 'number',
          description: 'Index of the first result to return'
        },
        fields: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Fields to include in the response'
        }
      },
      required: ['jql']
    },
    handler: async (args) => {
      // This would be implemented to call the Jira API
      console.log('Searching Jira issues:', args);
      
      // Mock implementation
      return formatToolResponse({
        startAt: args.startAt || 0,
        maxResults: args.maxResults || 50,
        total: 1,
        issues: [
          {
            id: '12345',
            key: 'PROJ-123',
            fields: {
              summary: 'Example issue',
              description: 'This is an example issue'
            }
          }
        ]
      });
    }
  })
);

// Add project tools
server.addTool(
  createTool({
    name: 'get_projects',
    description: 'Get a list of all Jira projects',
    inputSchema: {
      type: 'object',
      properties: {
        recent: {
          type: 'boolean',
          description: 'Only return recently accessed projects'
        }
      }
    },
    handler: async (args) => {
      // This would be implemented to call the Jira API
      console.log('Getting Jira projects:', args);
      
      // Mock implementation
      return formatToolResponse([
        {
          id: '10000',
          key: 'PROJ',
          name: 'Example Project',
          description: 'An example project'
        }
      ]);
    }
  })
);

// Add resources
server.addResource(
  createResource({
    uri: '/projects',
    description: 'List of all Jira projects',
    resolver: async (context) => {
      // This would be implemented to call the Jira API
      console.log('Resolving Jira projects resource:', context);
      
      // Mock implementation
      return formatResourceResponse([
        {
          id: '10000',
          key: 'PROJ',
          name: 'Example Project'
        },
        {
          id: '10001',
          key: 'EXMP',
          name: 'Another Project'
        }
      ]);
    }
  })
);

server.addResource(
  createResource({
    uri: '/issues/{key}',
    description: 'Details of a specific Jira issue',
    resolver: async (context) => {
      // Extract issue key from URI
      const issueKey = context.query.key;
      
      // This would be implemented to call the Jira API
      console.log('Resolving Jira issue resource:', issueKey);
      
      // Mock implementation
      return formatResourceResponse({
        id: '12345',
        key: issueKey,
        fields: {
          summary: 'Example issue',
          description: 'This is an example issue',
          status: {
            name: 'To Do'
          }
        }
      });
    }
  })
);

/**
 * Initialize Jira integration with authentication
 */
function initialize() {
  const config = getIntegrationConfig('jira');
  
  // Set up authentication (if needed)
  auth.setup(config);
  
  return server;
}

// Initialize and export the server
module.exports = {
  server: initialize(),
  // Export other utilities if needed
};
