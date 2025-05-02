# PayPal Integration

This integration connects Claude to PayPal through the Model Context Protocol (MCP).

## Features

- Create and manage PayPal invoices
- Track payment information
- Process payments
- Check transaction history
- Manage subscription billing

## Setup

1. Create a PayPal Developer account and generate API credentials
2. Configure the integration with your PayPal client ID and secret
3. Connect Claude to this MCP integration

## Configuration

Set the following environment variables:

```
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_ENVIRONMENT=sandbox # or live
```

## Available Tools

### Invoices

- `create_invoice`: Create a new PayPal invoice
- `send_invoice`: Send an invoice to a recipient
- `get_invoice`: Get details of a specific invoice
- `list_invoices`: List all invoices
- `update_invoice`: Update an existing invoice

### Payments

- `create_payment`: Create a new payment
- `execute_payment`: Execute an approved payment
- `get_payment`: Get details of a specific payment
- `list_payments`: List all payments

### Transactions

- `get_transaction`: Get details of a specific transaction
- `list_transactions`: List all transactions
- `search_transactions`: Search for transactions using filters

### Subscriptions

- `create_subscription`: Create a new subscription
- `update_subscription`: Update an existing subscription
- `cancel_subscription`: Cancel a subscription
- `list_subscriptions`: List all subscriptions

## Available Resources

- `/invoices`: List of all invoices
- `/invoices/{invoice_id}`: Details of a specific invoice
- `/payments`: List of all payments
- `/payments/{payment_id}`: Details of a specific payment
- `/transactions`: List of all transactions
- `/subscriptions`: List of all subscriptions

## Example Usage

```javascript
// Create a new PayPal invoice
const result = await claudeMcp.useToolFromServer(
  'paypal', 
  'create_invoice', 
  {
    merchantInfo: {
      businessName: "Example Business",
      email: "business@example.com"
    },
    billingInfo: [{
      email: "customer@example.com"
    }],
    items: [{
      name: "Web Development Services",
      quantity: 1,
      unitPrice: {
        currency: "USD",
        value: "100.00"
      }
    }],
    note: "Thank you for your business!"
  }
);

// Get transaction details
const transaction = await claudeMcp.accessResourceFromServer(
  'paypal',
  `/transactions/T12345`
);
