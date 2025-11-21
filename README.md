# HRPC Ping Example

A simple ping client and server implementation using HRPC (Hypercore RPC).

## Setup

1. Install dependencies:
```bash
npm install
```

2. Generate the schema and HRPC interface:
```bash
npm run setup
```

This will create the `spec/` directory with the generated schema and RPC code.

## Usage

### Start the server

In one terminal:
```bash
npm run server
```

The server will listen on port 3000.

### Run the client

In another terminal:
```bash
npm run client
```

Or send a custom message:
```bash
npm run client "Your custom ping message"
```

## How it works

- **Schema Definition**: The `setup-schema.js` defines the ping request/response schemas using Hyperschema
- **Server**: Listens for ping requests and responds with a pong message including timestamps
- **Client**: Connects to the server, sends a ping, and displays the response with round-trip time

## Schema

### Ping Request
- `message` (string): The ping message
- `timestamp` (uint): Client timestamp

### Ping Response
- `message` (string): The pong message
- `timestamp` (uint): Original client timestamp
- `serverTime` (uint): Server timestamp
