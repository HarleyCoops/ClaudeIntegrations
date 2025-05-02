/**
 * Jira Issues API Tools
 * 
 * This module provides tools for working with Jira issues.
 */

const axios = require('axios');
const auth = require('../auth');
const { formatToolResponse } = require('../../../core/mcp-utils');

/**
 * Create a new Jira issue
 * 
 * @param {Object} args - Arguments for creating an issue
 * @param {string} args.projectKey - Project key
 * @param {string} args.summary - Issue summary
 * @param {string} args.description - Issue description
 * @param {string} args.issueType - Issue type (e.g., 'Bug', 'Task', 'Story')
 * @param {string} [args.priority] - Issue priority
 * @param {string} [args.assignee] - Username of assignee
 * @param {Array<string>} [args.labels] - Issue labels
 * @param {Object} [args.customFields] - Custom fields in the format { fieldId: value }
 * @returns {Promise<Object>} Created issue
 */
async function createIssue(args) {
  if (!auth.isConfigured()) {
    throw new Error('Jira authentication not configured');
  }

  const { projectKey, summary, description, issueType, priority, assignee, labels, customFields } = args;

  // Prepare the issue data
  const issueData = {
    fields: {
      project: {
        key: projectKey
      },
      summary: summary,
      description: description ? {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: description
              }
            ]
          }
        ]
      } : undefined,
      issuetype: {
        name: issueType
      }
    }
  };

  // Add optional fields if provided
  if (priority) {
    issueData.fields.priority = { name: priority };
  }

  if (assignee) {
    issueData.fields.assignee = { name: assignee };
  }

  if (labels && labels.length > 0) {
    issueData.fields.labels = labels;
  }

  // Add custom fields if provided
  if (customFields) {
    Object.entries(customFields).forEach(([fieldId, value]) => {
      issueData.fields[fieldId] = value;
    });
  }

  try {
    // In a real implementation, this would make an API call to Jira
    // const response = await axios.post(auth.getApiUrl('issue'), issueData, {
    //   headers: auth.getAuthHeaders()
    // });
    // return formatToolResponse(response.data);

    // For demonstration, return a mock response
    console.log('Would create Jira issue:', issueData);
    
    return {
      id: '12345',
      key: `${projectKey}-123`,
      self: `${auth.getInstanceUrl()}/rest/api/3/issue/${projectKey}-123`,
      success: true
    };
  } catch (error) {
    console.error('Error creating Jira issue:', error);
    throw new Error(`Failed to create Jira issue: ${error.message}`);
  }
}

/**
 * Get details of a specific Jira issue
 * 
 * @param {Object} args - Arguments for getting an issue
 * @param {string} args.issueKey - Issue key (e.g., 'PROJ-123')
 * @param {Array<string>} [args.expand] - Fields to expand
 * @returns {Promise<Object>} Issue details
 */
async function getIssue(args) {
  if (!auth.isConfigured()) {
    throw new Error('Jira authentication not configured');
  }

  const { issueKey, expand } = args;
  
  try {
    // Construct the API URL with optional expand parameter
    let apiUrl = `issue/${issueKey}`;
    if (expand && expand.length > 0) {
      apiUrl += `?expand=${expand.join(',')}`;
    }

    // In a real implementation, this would make an API call to Jira
    // const response = await axios.get(auth.getApiUrl(apiUrl), {
    //   headers: auth.getAuthHeaders()
    // });
    // return formatToolResponse(response.data);

    // For demonstration, return a mock response
    console.log(`Would get Jira issue: ${issueKey}`);
    
    return {
      id: '12345',
      key: issueKey,
      fields: {
        summary: 'Example issue',
        description: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'This is an example issue'
                }
              ]
            }
          ]
        },
        status: {
          name: 'To Do'
        },
        priority: {
          name: 'Medium'
        },
        assignee: {
          displayName: 'John Doe',
          accountId: 'user123'
        },
        creator: {
          displayName: 'Jane Smith',
          accountId: 'user456'
        },
        created: '2023-01-01T12:00:00.000Z',
        updated: '2023-01-02T12:00:00.000Z'
      }
    };
  } catch (error) {
    console.error(`Error getting Jira issue ${issueKey}:`, error);
    throw new Error(`Failed to get Jira issue: ${error.message}`);
  }
}

/**
 * Update an existing Jira issue
 * 
 * @param {Object} args - Arguments for updating an issue
 * @param {string} args.issueKey - Issue key (e.g., 'PROJ-123')
 * @param {string} [args.summary] - New issue summary
 * @param {string} [args.description] - New issue description
 * @param {string} [args.status] - New status name
 * @param {string} [args.priority] - New priority name
 * @param {string} [args.assignee] - New assignee username
 * @param {Array<string>} [args.labels] - New issue labels
 * @param {Object} [args.customFields] - Custom fields to update
 * @returns {Promise<Object>} Update result
 */
async function updateIssue(args) {
  if (!auth.isConfigured()) {
    throw new Error('Jira authentication not configured');
  }

  const { issueKey, summary, description, status, priority, assignee, labels, customFields } = args;

  // Prepare the update data
  const updateData = {
    fields: {}
  };

  // Add fields that were provided
  if (summary !== undefined) {
    updateData.fields.summary = summary;
  }

  if (description !== undefined) {
    updateData.fields.description = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: description
            }
          ]
        }
      ]
    };
  }

  if (priority !== undefined) {
    updateData.fields.priority = { name: priority };
  }

  if (assignee !== undefined) {
    updateData.fields.assignee = { name: assignee };
  }

  if (labels !== undefined) {
    updateData.fields.labels = labels;
  }

  // Add custom fields if provided
  if (customFields) {
    Object.entries(customFields).forEach(([fieldId, value]) => {
      updateData.fields[fieldId] = value;
    });
  }

  try {
    // In a real implementation, this would make an API call to Jira
    // const response = await axios.put(auth.getApiUrl(`issue/${issueKey}`), updateData, {
    //   headers: auth.getAuthHeaders()
    // });
    // return formatToolResponse(response.data);

    // For demonstration, return a mock response
    console.log(`Would update Jira issue ${issueKey}:`, updateData);
    
    return {
      success: true,
      key: issueKey,
      message: 'Issue updated successfully'
    };
  } catch (error) {
    console.error(`Error updating Jira issue ${issueKey}:`, error);
    throw new Error(`Failed to update Jira issue: ${error.message}`);
  }
}

/**
 * Search for Jira issues using JQL
 * 
 * @param {Object} args - Arguments for searching issues
 * @param {string} args.jql - JQL query
 * @param {number} [args.maxResults=50] - Maximum number of results to return
 * @param {number} [args.startAt=0] - Index of the first result to return
 * @param {Array<string>} [args.fields] - Fields to include in the response
 * @returns {Promise<Object>} Search results
 */
async function searchIssues(args) {
  if (!auth.isConfigured()) {
    throw new Error('Jira authentication not configured');
  }

  const { jql, maxResults = 50, startAt = 0, fields } = args;

  // Prepare the search data
  const searchData = {
    jql: jql,
    startAt: startAt,
    maxResults: maxResults
  };

  if (fields && fields.length > 0) {
    searchData.fields = fields;
  }

  try {
    // In a real implementation, this would make an API call to Jira
    // const response = await axios.post(auth.getApiUrl('search'), searchData, {
    //   headers: auth.getAuthHeaders()
    // });
    // return formatToolResponse(response.data);

    // For demonstration, return a mock response
    console.log('Would search Jira issues:', searchData);
    
    return {
      startAt: startAt,
      maxResults: maxResults,
      total: 1,
      issues: [
        {
          id: '12345',
          key: 'PROJ-123',
          fields: {
            summary: 'Example issue',
            description: 'This is an example issue',
            status: {
              name: 'To Do'
            },
            priority: {
              name: 'Medium'
            }
          }
        }
      ]
    };
  } catch (error) {
    console.error('Error searching Jira issues:', error);
    throw new Error(`Failed to search Jira issues: ${error.message}`);
  }
}

/**
 * Add a comment to a Jira issue
 * 
 * @param {Object} args - Arguments for adding a comment
 * @param {string} args.issueKey - Issue key (e.g., 'PROJ-123')
 * @param {string} args.body - Comment text
 * @returns {Promise<Object>} Created comment
 */
async function addComment(args) {
  if (!auth.isConfigured()) {
    throw new Error('Jira authentication not configured');
  }

  const { issueKey, body } = args;

  // Prepare the comment data
  const commentData = {
    body: {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: body
            }
          ]
        }
      ]
    }
  };

  try {
    // In a real implementation, this would make an API call to Jira
    // const response = await axios.post(auth.getApiUrl(`issue/${issueKey}/comment`), commentData, {
    //   headers: auth.getAuthHeaders()
    // });
    // return formatToolResponse(response.data);

    // For demonstration, return a mock response
    console.log(`Would add comment to Jira issue ${issueKey}:`, commentData);
    
    return {
      id: '54321',
      body: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: body
              }
            ]
          }
        ]
      },
      author: {
        displayName: 'John Doe',
        accountId: 'user123'
      },
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error adding comment to Jira issue ${issueKey}:`, error);
    throw new Error(`Failed to add comment: ${error.message}`);
  }
}

/**
 * Get all comments for a Jira issue
 * 
 * @param {Object} args - Arguments for getting comments
 * @param {string} args.issueKey - Issue key (e.g., 'PROJ-123')
 * @param {number} [args.maxResults=50] - Maximum number of results to return
 * @param {number} [args.startAt=0] - Index of the first result to return
 * @returns {Promise<Object>} Comments
 */
async function getIssueComments(args) {
  if (!auth.isConfigured()) {
    throw new Error('Jira authentication not configured');
  }

  const { issueKey, maxResults = 50, startAt = 0 } = args;

  try {
    // In a real implementation, this would make an API call to Jira
    // const response = await axios.get(auth.getApiUrl(`issue/${issueKey}/comment`), {
    //   headers: auth.getAuthHeaders(),
    //   params: {
    //     maxResults,
    //     startAt
    //   }
    // });
    // return formatToolResponse(response.data);

    // For demonstration, return a mock response
    console.log(`Would get comments for Jira issue ${issueKey}`);
    
    return {
      startAt: startAt,
      maxResults: maxResults,
      total: 1,
      comments: [
        {
          id: '54321',
          body: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'This is a comment'
                  }
                ]
              }
            ]
          },
          author: {
            displayName: 'John Doe',
            accountId: 'user123'
          },
          created: '2023-01-03T12:00:00.000Z',
          updated: '2023-01-03T12:00:00.000Z'
        }
      ]
    };
  } catch (error) {
    console.error(`Error getting comments for Jira issue ${issueKey}:`, error);
    throw new Error(`Failed to get comments: ${error.message}`);
  }
}

module.exports = {
  createIssue,
  getIssue,
  updateIssue,
  searchIssues,
  addComment,
  getIssueComments
};
