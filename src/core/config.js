/**
 * Configuration management for Claude Integrations
 * 
 * This module handles loading and managing configuration for all integrations.
 * It supports environment variables, configuration files, and default settings.
 */

require('dotenv').config();

/**
 * Default configuration values
 */
const defaultConfig = {
  server: {
    port: 3000,
    host: 'localhost'
  },
  logging: {
    level: 'info',
    format: 'json'
  },
  auth: {
    tokenExpiration: 3600, // seconds
  }
};

/**
 * Get configuration for a specific integration
 * 
 * @param {string} integrationName - Name of the integration (e.g. 'jira', 'slack')
 * @returns {Object} Configuration object for the integration
 */
function getIntegrationConfig(integrationName) {
  // Convert integration name to environment variable format (e.g. jira -> JIRA)
  const envPrefix = integrationName.toUpperCase();
  
  // Gather all environment variables for this integration
  const configFromEnv = {};
  Object.keys(process.env).forEach(key => {
    if (key.startsWith(`${envPrefix}_`)) {
      // Convert JIRA_API_KEY to apiKey
      const configKey = key.replace(`${envPrefix}_`, '')
        .toLowerCase()
        .split('_')
        .map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      
      configFromEnv[configKey] = process.env[key];
    }
  });
  
  return configFromEnv;
}

/**
 * Get global configuration
 * 
 * @returns {Object} Global configuration object
 */
function getGlobalConfig() {
  // Start with default config
  const config = { ...defaultConfig };
  
  // Override with environment variables
  if (process.env.PORT) {
    config.server.port = parseInt(process.env.PORT, 10);
  }
  
  if (process.env.HOST) {
    config.server.host = process.env.HOST;
  }
  
  if (process.env.LOG_LEVEL) {
    config.logging.level = process.env.LOG_LEVEL;
  }
  
  return config;
}

module.exports = {
  getIntegrationConfig,
  getGlobalConfig
};
