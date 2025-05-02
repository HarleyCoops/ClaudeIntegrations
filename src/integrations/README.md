# Claude Integrations - Service Implementations

This directory contains implementations of Model Context Protocol (MCP) integrations for various services.

## Structure

Each integration follows a similar structure:

```
integration-name/
├── README.md                     # Integration-specific documentation
├── index.js                      # Main integration entry point
├── auth.js                       # Authentication handling
├── tools/                        # MCP tools
│   ├── tool1.js                  # Tool implementation
│   ├── tool2.js                  # Tool implementation
│   └── index.js                  # Tool exports
├── resources/                    # MCP resources
│   ├── resource1.js              # Resource implementation
│   ├── resource2.js              # Resource implementation
│   └── index.js                  # Resource exports
└── examples/                     # Usage examples
```

## Available Integrations

1. **atlassian-jira** - Jira issue tracking and project management
2. **atlassian-confluence** - Confluence team collaboration and knowledge management
3. **zapier** - Connection to thousands of apps and services
4. **cloudflare** - Web performance and security services
5. **intercom** - Customer messaging platform
6. **asana** - Project management and task tracking
7. **square** - Payment processing and point-of-sale
8. **sentry** - Application monitoring and error tracking
9. **paypal** - Online payment processing
10. **linear** - Software project management
11. **plaid** - Financial services and banking APIs

## Implementation Status

| Integration | Status | Description |
|-------------|--------|-------------|
| atlassian-jira | Example | Fully implemented example with tools for issues |
| sentry | Example | Basic structure with README |
| Other integrations | Planned | Structure set up, implementation needed |

## Adding a New Integration

To add a new integration:

1. Create a new directory with the service name.
2. Implement the required files following the pattern in the example integrations.
3. Add the integration to the main export in `src/index.js`.

See the [CONTRIBUTING.md](../../docs/CONTRIBUTING.md) guide for more details.
