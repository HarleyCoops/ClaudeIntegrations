/**
 * Claude Integrations - Main Entry Point
 * 
 * This is the main entry point for the Claude Integrations project.
 * It initializes and configures all integrations.
 */

const express = require('express');
const { getGlobalConfig } = require('./core/config');

// Import core modules
const { createServer } = require('./core/mcp-utils');

// Load all integrations
const jiraIntegration = require('./integrations/atlassian-jira');
const confluenceIntegration = require('./integrations/atlassian-confluence');
const zapierIntegration = require('./integrations/zapier');
const cloudflareIntegration = require('./integrations/cloudflare');
const intercomIntegration = require('./integrations/intercom');
const asanaIntegration = require('./integrations/asana');
const squareIntegration = require('./integrations/square');
const sentryIntegration = require('./integrations/sentry');
const paypalIntegration = require('./integrations/paypal');
const linearIntegration = require('./integrations/linear');
const plaidIntegration = require('./integrations/plaid');

// Create Express app
const app = express();
app.use(express.json());

// Initialize all integrations
const integrations = {
  'atlassian-jira': jiraIntegration,
  'atlassian-confluence': confluenceIntegration,
  'zapier': zapierIntegration,
  'cloudflare': cloudflareIntegration,
  'intercom': intercomIntegration,
  'asana': asanaIntegration,
  'square': squareIntegration,
  'sentry': sentryIntegration,
  'paypal': paypalIntegration,
  'linear': linearIntegration,
  'plaid': plaidIntegration
};

// Register routes for each integration
Object.entries(integrations).forEach(([name, integration]) => {
  // Register manifest route
  app.get(`/api/${name}/manifest`, (req, res) => {
    try {
      const manifest = integration.server.getManifest();
      res.json(manifest);
    } catch (error) {
      console.error(`Error getting manifest for ${name}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Register tool invocation route
  app.post(`/api/${name}/tools/:toolName`, async (req, res) => {
    try {
      const { toolName } = req.params;
      const args = req.body;
      
      const result = await integration.server.handleToolInvocation(toolName, args);
      res.json(result);
    } catch (error) {
      console.error(`Error invoking tool for ${name}:`, error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

  // Register resource request route
  app.get(`/api/${name}/resources/:uri`, async (req, res) => {
    try {
      const { uri } = req.params;
      const context = { query: req.query };
      
      const result = await integration.server.handleResourceRequest(uri, context);
      res.json(result);
    } catch (error) {
      console.error(`Error resolving resource for ${name}:`, error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

  console.log(`Registered integration: ${name}`);
});

// Start the server
const config = getGlobalConfig();
const PORT = config.server.port;
const HOST = config.server.host;

app.listen(PORT, HOST, () => {
  console.log(`Claude Integrations server running at http://${HOST}:${PORT}`);
  console.log('Available integrations:');
  Object.keys(integrations).forEach(name => {
    console.log(`- ${name}: http://${HOST}:${PORT}/api/${name}/manifest`);
  });
});

// Export for testing
module.exports = app;
