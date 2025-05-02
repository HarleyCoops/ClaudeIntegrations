/**
 * Authentication utilities for Atlassian Jira Integration
 * 
 * This module provides authentication functionality for the Jira integration.
 * It handles API tokens, OAuth, and other authentication methods.
 */

const { storeCredentials, getCredentials } = require('../../core/auth');

/**
 * Authentication state
 */
let authState = {
  configured: false,
  instanceUrl: null,
  email: null,
  apiToken: null
};

/**
 * Set up Jira authentication using the provided config
 * 
 * @param {Object} config - Configuration object
 * @param {string} config.instanceUrl - Jira instance URL
 * @param {string} config.email - User email
 * @param {string} config.apiToken - API token
 */
function setup(config) {
  if (!config) {
    console.warn('No configuration provided for Jira authentication');
    return;
  }

  if (!config.instanceUrl) {
    console.warn('No instance URL provided for Jira authentication');
  }

  if (!config.email) {
    console.warn('No email provided for Jira authentication');
  }
  
  if (!config.apiToken) {
    console.warn('No API token provided for Jira authentication');
  }

  authState = {
    configured: !!(config.instanceUrl && config.email && config.apiToken),
    instanceUrl: config.instanceUrl,
    email: config.email,
    apiToken: config.apiToken
  };

  // Store credentials securely
  storeCredentials('jira', {
    instanceUrl: config.instanceUrl,
    email: config.email,
    apiToken: config.apiToken
  });

  console.log(`Jira authentication ${authState.configured ? 'configured' : 'not fully configured'}`);
}

/**
 * Get authentication headers for Jira API requests
 * 
 * @returns {Object} Headers object with authentication
 */
function getAuthHeaders() {
  if (!authState.configured) {
    throw new Error('Jira authentication not configured');
  }

  // Basic authentication with email and API token
  const basicAuth = Buffer.from(`${authState.email}:${authState.apiToken}`).toString('base64');
  
  return {
    'Authorization': `Basic ${basicAuth}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
}

/**
 * Get the configured Jira instance URL
 * 
 * @returns {string} Jira instance URL
 */
function getInstanceUrl() {
  if (!authState.configured) {
    throw new Error('Jira authentication not configured');
  }
  
  return authState.instanceUrl;
}

/**
 * Check if Jira authentication is configured
 * 
 * @returns {boolean} True if configured, false otherwise
 */
function isConfigured() {
  return authState.configured;
}

/**
 * Create API request URL with the configured instance URL
 * 
 * @param {string} path - API path (without leading slash)
 * @returns {string} Full API URL
 */
function getApiUrl(path) {
  const baseUrl = getInstanceUrl();
  const apiPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}/rest/api/3${apiPath}`;
}

module.exports = {
  setup,
  getAuthHeaders,
  getInstanceUrl,
  isConfigured,
  getApiUrl
};
