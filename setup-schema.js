const HRPCBuilder = require("hrpc");
const Hyperschema = require("hyperschema");
const path = require("path");

const SCHEMA_DIR = path.join(__dirname, "spec", "hyperschema");
const HRPC_DIR = path.join(__dirname, "spec", "hrpc");

// Register schema
const schema = Hyperschema.from(SCHEMA_DIR);
const schemaNs = schema.namespace("ping");

// Ping request schema
schemaNs.register({
  name: "ping-request",
  fields: [
    { name: "message", type: "string" },
    { name: "timestamp", type: "uint" },
  ],
});

// Ping response schema
schemaNs.register({
  name: "ping-response",
  fields: [
    { name: "message", type: "string" },
    { name: "timestamp", type: "uint" },
    { name: "serverTime", type: "uint" },
  ],
});

// Save schema to disk
Hyperschema.toDisk(schema);

// Load and build HRPC interface
const builder = HRPCBuilder.from(SCHEMA_DIR, HRPC_DIR);
const ns = builder.namespace("ping");

// Register ping command (request/response)
ns.register({
  name: "ping",
  request: { name: "@ping/ping-request", stream: false },
  response: { name: "@ping/ping-response", stream: false },
});

// Save HRPC interface to disk
HRPCBuilder.toDisk(builder);

console.log("Schema and HRPC interface generated successfully!");
