/**
 * MCP (Model Context Protocol) utilities for Claude Integrations
 * 
 * This module provides utilities for working with the Model Context Protocol,
 * including server setup, tool registration, and request handling.
 */

/**
 * Create a new MCP tool definition
 * 
 * @param {Object} options - Tool options
 * @param {string} options.name - Tool name
 * @param {string} options.description - Tool description
 * @param {Object} options.inputSchema - JSON Schema for tool input
 * @param {Function} options.handler - Function that implements the tool
 * @returns {Object} Tool definition
 */
function createTool(options) {
  const { name, description, inputSchema, handler } = options;
  
  return {
    name,
    description,
    inputSchema,
    handler
  };
}

/**
 * Create a new MCP resource definition
 * 
 * @param {Object} options - Resource options
 * @param {string} options.uri - Resource URI
 * @param {string} options.description - Resource description
 * @param {Function} options.resolver - Function that resolves the resource
 * @returns {Object} Resource definition
 */
function createResource(options) {
  const { uri, description, resolver } = options;
  
  return {
    uri,
    description,
    resolver
  };
}

/**
 * Create an MCP server configuration
 * 
 * @param {Object} options - Server options
 * @param {string} options.name - Server name
 * @param {string} options.description - Server description
 * @param {Array<Object>} options.tools - Array of tool definitions
 * @param {Array<Object>} options.resources - Array of resource definitions
 * @returns {Object} Server configuration
 */
function createServer(options) {
  const { name, description = '', tools = [], resources = [] } = options;
  
  return {
    name,
    description,
    tools,
    resources,
    
    // Helper methods
    addTool(tool) {
      this.tools.push(tool);
      return this;
    },
    
    addResource(resource) {
      this.resources.push(resource);
      return this;
    },
    
    // Generate the server manifest
    getManifest() {
      return {
        name: this.name,
        description: this.description,
        tools: this.tools.map(tool => ({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema
        })),
        resources: this.resources.map(resource => ({
          uri: resource.uri,
          description: resource.description
        }))
      };
    },
    
    // Handle a tool invocation
    async handleToolInvocation(toolName, args) {
      const tool = this.tools.find(t => t.name === toolName);
      
      if (!tool) {
        throw new Error(`Tool not found: ${toolName}`);
      }
      
      try {
        return await tool.handler(args);
      } catch (error) {
        console.error(`Error invoking tool ${toolName}:`, error);
        throw error;
      }
    },
    
    // Handle a resource request
    async handleResourceRequest(uri, context = {}) {
      const resource = this.resources.find(r => r.uri === uri);
      
      if (!resource) {
        throw new Error(`Resource not found: ${uri}`);
      }
      
      try {
        return await resource.resolver(context);
      } catch (error) {
        console.error(`Error resolving resource ${uri}:`, error);
        throw error;
      }
    }
  };
}

/**
 * Format an MCP tool response
 * 
 * @param {any} result - Tool execution result
 * @param {string} [contentType='application/json'] - Content type
 * @returns {Object} Formatted MCP response
 */
function formatToolResponse(result, contentType = 'application/json') {
  if (contentType === 'application/json') {
    return {
      contentType,
      body: typeof result === 'string' ? result : JSON.stringify(result)
    };
  }
  
  return {
    contentType,
    body: result.toString()
  };
}

/**
 * Format an MCP resource response
 * 
 * @param {any} data - Resource data
 * @param {string} [contentType='application/json'] - Content type
 * @returns {Object} Formatted MCP response
 */
function formatResourceResponse(data, contentType = 'application/json') {
  return formatToolResponse(data, contentType);
}

/**
 * Parse MCP request arguments
 * 
 * @param {string} argsString - JSON string of arguments
 * @returns {Object} Parsed arguments
 */
function parseArguments(argsString) {
  try {
    return JSON.parse(argsString);
  } catch (error) {
    throw new Error(`Invalid arguments format: ${error.message}`);
  }
}

module.exports = {
  createTool,
  createResource,
  createServer,
  formatToolResponse,
  formatResourceResponse,
  parseArguments
};
