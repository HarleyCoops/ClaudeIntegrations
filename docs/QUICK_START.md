# Claude Integrations Quick Start

This quick start guide provides a summary of steps to get up and running with Claude Integrations.

## Setup in 5 Minutes

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/claude-integrations.git
   cd claude-integrations
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env file with your credentials
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

## Connect to Claude

1. In Claude (with Claude Max plan), go to Settings > Profile > Integrations
2. Click "Add More Integration URL"
3. Enter a name and your MCP server URL: `http://localhost:3000/api/SERVICE_NAME/manifest`
4. Connect and start using in a new conversation

## Service-Specific Setup

For each service you want to use, you'll need to:

1. Create an account with the service if you don't already have one
2. Generate API keys or tokens as required
3. Add the credentials to your `.env` file
4. Read the service-specific README.md in the integration directory

## Example Usage

Once connected, you can start using the integration in Claude:

```
Can you list my recent Jira issues in the PROJECT-X project?
```

```
Create a new Sentry issue for the error I'm seeing in our logs.
```

```
Get the latest payment information from my PayPal account.
```

## Next Steps

- Read [MCP_OVERVIEW.md](MCP_OVERVIEW.md) to understand how MCP integrations work
- Check [GETTING_STARTED.md](GETTING_STARTED.md) for a more detailed setup guide
- See [CONTRIBUTING.md](CONTRIBUTING.md) if you want to add new integrations
