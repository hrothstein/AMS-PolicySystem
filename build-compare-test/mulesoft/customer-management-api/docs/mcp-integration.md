# MCP Server Integration

## Overview

The Customer Management API is exposed via MCP (Model Context Protocol) to enable AI agent discovery and invocation.

## MCP Server Implementation

To expose this API via MCP:

1. **Add MCP Connector Dependency** to `pom.xml`:
```xml
<dependency>
  <groupId>com.mulesoft.connectors</groupId>
  <artifactId>mule-mcp-connector</artifactId>
  <version>1.0.0</version>
  <classifier>mule-plugin</classifier>
</dependency>
```

2. **Configure MCP Server** in `global.xml`:
```xml
<mcp:config name="MCP_Config" doc:name="MCP Config">
  <mcp:connection host="${mcp.host}" port="${mcp.port}"/>
</mcp:config>
```

3. **Create MCP Tool Listeners** for each endpoint:
   - `getAllCustomers` - Maps to GET /customers
   - `getCustomerById` - Maps to GET /customers/{id}
   - `createCustomer` - Maps to POST /customers
   - `updateCustomer` - Maps to PUT /customers/{id}
   - `deleteCustomer` - Maps to DELETE /customers/{id}

4. **Access Controls**:
   - API Key authentication for agent invocations
   - Rate limiting per agent/client
   - Audit logging for all agent invocations

## Agent Discovery

Agents can discover this API through:
- Anypoint Exchange (when published)
- MCP server endpoint discovery
- OpenAPI specification at `/docs/openapi.yaml`

## Usage Example

An AI agent can invoke the API via MCP:

```json
{
  "tool": "getCustomerById",
  "arguments": {
    "id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

## Security

- All agent invocations require API key authentication
- Rate limiting: 100 requests/minute per agent
- Sensitive data (email, phone) is masked in logs
- Audit trail maintained for compliance

