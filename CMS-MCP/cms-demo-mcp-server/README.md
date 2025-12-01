# CMS Demo MCP Server

This is a MuleSoft MCP (Model Context Protocol) server that exposes the CMS Demo API for Customer and Card Management.

## API Base URL
`https://cms-demo-api-impl-dl2x0l.5sc6y6-4.usa-e2.cloudhub.io/api`

## API Specification
[CMS Demo API Spec on Anypoint Exchange](https://anypoint.mulesoft.com/exchange/a985e716-cd81-4160-9e00-91c97363ae9d/cms-demo-api/minor/1.0/)

## Available MCP Tools

### Customer Management

1. **get_all_customers**
   - Description: Retrieves all customers from the CMS API
   - Parameters: None
   - Returns: List of all customers

2. **get_customer_by_id**
   - Description: Retrieves a specific customer by their ID
   - Parameters: `customerId` (string, required)
   - Returns: Customer details

3. **create_customer**
   - Description: Creates a new customer in the CMS
   - Parameters:
     - `name` (string, required)
     - `email` (string, required)
     - `phone` (string, optional)
   - Returns: Created customer details

4. **update_customer**
   - Description: Updates an existing customer's information
   - Parameters:
     - `customerId` (string, required)
     - `name` (string, optional)
     - `email` (string, optional)
     - `phone` (string, optional)
   - Returns: Updated customer details

5. **delete_customer**
   - Description: Deletes a customer from the CMS
   - Parameters: `customerId` (string, required)
   - Returns: Deletion confirmation

### Card Management

6. **get_all_cards**
   - Description: Retrieves all cards from the CMS API
   - Parameters: None
   - Returns: List of all cards

7. **get_card_by_id**
   - Description: Retrieves a specific card by its ID
   - Parameters: `cardId` (string, required)
   - Returns: Card details

8. **create_card**
   - Description: Creates a new card in the CMS
   - Parameters:
     - `customerId` (string, required)
     - `cardNumber` (string, required)
     - `cardType` (string, required)
     - `expiryDate` (string, optional)
   - Returns: Created card details

9. **update_card**
   - Description: Updates an existing card's information
   - Parameters:
     - `cardId` (string, required)
     - `cardNumber` (string, optional)
     - `cardType` (string, optional)
     - `expiryDate` (string, optional)
   - Returns: Updated card details

10. **delete_card**
    - Description: Deletes a card from the CMS
    - Parameters: `cardId` (string, required)
    - Returns: Deletion confirmation

## Configuration

The server uses the following configuration properties (defined in `src/main/resources/config.properties`):

- `mcp.serverName`: CMS-Demo-MCP-Server
- `mcp.serverVersion`: 1.0.0
- `http.port`: 8081
- `https.port`: 8082
- `cms.api.baseUrl`: https://cms-demo-api-impl-dl2x0l.5sc6y6-4.usa-e2.cloudhub.io/api

## Building the Project

```bash
mvn clean package -DskipTests
```

**Build Status:** ✅ **SUCCESS** - Project builds successfully with MCP Connector 1.2.0

## Deploying to CloudHub 2.0

```bash
mvn deploy -DmuleDeploy
```

## Running Locally

### Run with Cursor Debugger (Recommended)
1. **Reload window first** (Cmd+Shift+P → "Reload Window")
2. Press `F5` or go to **Run > Start Debugging**
3. Select "Debug CMS Demo MCP Server" configuration
4. The MCP server will start and be available at `http://localhost:8081`
5. Set breakpoints in your XML flows as needed

**Note:** This project uses mule-maven-plugin 4.3.0 which doesn't have the `mule:run` goal. Use the Cursor debugger or deploy to CloudHub 2.0.

## Testing the MCP Tools

Once running, test the 10 MCP tools:

### Quick Test
```bash
# Interactive menu
./test-mcp-tools.sh

# Or Python client
python3 test-mcp-client.py
```

### Manual curl Test
```bash
# List available tools
curl -X POST http://localhost:8081 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | jq '.'

# Get all customers
curl -X POST http://localhost:8081 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"tools/call",
    "params":{"name":"get_all_customers","arguments":{}}
  }' | jq '.'
```

**📖 See [TESTING_GUIDE.md](TESTING_GUIDE.md) for complete testing documentation**

## MCP Server Configuration

### Connect to AI Tools

Use the provided configuration files to connect this MCP server to AI tools:

**Quick Setup:**
```json
{
  "mcpServers": {
    "cms-demo-mcp-server": {
      "transport": "sse",
      "url": "https://cms-demo-mcp-server-dl2x0l.5sc6y6-2.usa-e2.cloudhub.io"
    }
  }
}
```

**Available Configuration Files:**
- `server.json` - Full MCP server specification
- `mcp-client-config.json` - Simplified client configuration
- `MCP_SERVER_GUIDE.md` - Complete setup guide for Cursor, Claude, and other AI tools

**📖 See [MCP_SERVER_GUIDE.md](MCP_SERVER_GUIDE.md) for detailed connection instructions**

## Requirements

- Java 17
- Apache Maven 3.6+
- Mule Runtime 4.10.0+
- MCP Connector 1.1.0+

## Project Structure

```
cms-demo-mcp-server/
├── src/
│   ├── main/
│   │   ├── mule/
│   │   │   ├── cms-demo-mcp-server.xml  # MCP tool flows
│   │   │   └── global.xml                # Global configurations
│   │   └── resources/
│   │       ├── config.properties          # Configuration properties
│   │       └── log4j2.xml                # Logging configuration
│   └── test/
├── pom.xml
└── mule-artifact.json
```

## Troubleshooting

### Error: `e.configuration[t.MULE_ARG_LAUNCH_PROPERTY].split is not a function`

This error occurs when the Mule runtime receives launch arguments as an **array** instead of a **string**. The Mule runtime calls `.split()` on the arguments, which fails on arrays.

**✅ FIXED:** The `.vscode/launch.json` has been corrected to use:
```json
"mule.runtime.args": " "
```
Instead of an array of arguments.

**To apply the fix:**
1. **Reload Cursor/VS Code window:**
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
   - Type: "Reload Window"
   - Press Enter

2. **Or restart Cursor completely**

3. **Press F5 to debug** - it should now work!

**Alternative: Run with debug script:**
```bash
./START_DEBUG.sh
```
Then press F5 and select "Debug Mule (Attach)"

### Common Issues

- **Port already in use:** If port 8081 is already in use, change `http.port` in `config.properties`
- **Dependencies not found:** Run `mvn clean install -U` to force update dependencies
- **IDE cache issues:** Delete `.settings`, `.classpath`, and `.studio` folders (if they exist) and reimport the project

## Notes

- The CMS Demo API requires no authentication
- All tool parameters are validated using JSON Schema
- Error handling is implemented for all flows
- The server uses Streamable HTTP for MCP communication
- The `pom.xml` has been configured with the proper mule-maven-plugin settings

