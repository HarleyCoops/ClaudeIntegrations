# Getting Started with Claude Integrations

This guide will help you set up and start using the Claude Integrations repository.

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- An account with the service(s) you want to integrate with
- Claude Max plan (required for MCP integrations)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/claude-integrations.git
cd claude-integrations
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file based on the example:

```bash
cp .env.example .env
```

4. Edit the `.env` file and add your credentials for the services you want to use.

## Running the Integration Server

Start the integration server:

```bash
npm start
# or
yarn start
```

By default, the server will run on `http://localhost:3000`.

## Connecting to Claude

1. Open Claude in your browser
2. Go to Settings > Profile > Integrations
3. Click "Add More Integration URL"
4. Enter a name for the integration (e.g., "My Integrations")
5. Enter the URL of your integration server: `http://localhost:3000/api/{integration-name}/manifest`
   - Replace `{integration-name}` with the specific integration you want to use (e.g., `atlassian-jira`, `sentry`, etc.)
6. Click "Add" and then "Connect"
7. Start a new conversation in Claude and enable the integration in the chat settings

## Using Integrations

Each integration provides tools that Claude can use to interact with the external service. For example, to use the Jira integration:

```
Can you list my recent Jira issues?
```

Claude will use the integration to query Jira and return the results.

## Available Integrations

This repository contains integrations for the following services:

1. **Atlassian Jira** - Issue tracking and project management
2. **Atlassian Confluence** - Team collaboration and knowledge management
3. **Zapier** - Connection to thousands of apps and services
4. **Cloudflare** - Web performance and security services
5. **Intercom** - Customer messaging platform
6. **Asana** - Project management and task tracking
7. **Square** - Payment processing and point-of-sale
8. **Sentry** - Application monitoring and error tracking
9. **PayPal** - Online payment processing
10. **Linear** - Software project management
11. **Plaid** - Financial services and banking APIs

## Configuration

Each integration requires specific configuration. See the README.md file in each integration's directory for details on the required credentials and setup steps.

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure the integration server is running
   - Check that the URL is correct in Claude's integration settings

2. **Authentication Failed**
   - Verify your API keys and credentials in the `.env` file
   - Check that you have the necessary permissions for the service

3. **Integration Not Working**
   - Ensure Claude Max is enabled on your account
   - Check the server logs for errors

### Getting Help

If you encounter issues not covered here, please:

1. Check the specific integration's README.md for troubleshooting guidance
2. Look for similar issues in the GitHub repository's issue tracker
3. Create a new issue with details about your problem

## Next Steps

- Explore the individual integration documentation to learn about specific capabilities
- Contribute to the project by adding new features or fixing bugs
- Create your own custom integration by following the guidelines in the CONTRIBUTING.md file
