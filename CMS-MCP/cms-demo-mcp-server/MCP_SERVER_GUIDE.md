# MCP Server Configuration Guide

This guide explains how to use the CMS Demo MCP Server with various AI tools and MCP clients.

## 📄 Configuration Files

### 1. `server.json` - Full Server Specification
Complete MCP server specification with all metadata, tools, and documentation.

**Use this for:**
- Publishing to Anypoint Exchange
- Complete server documentation
- Tool discovery and cataloging
- Integration documentation

### 2. `mcp-client-config.json` - Client Configuration
Simplified configuration for MCP clients (AI tools).

**Use this for:**
- Cursor AI
- Claude Desktop
- Custom MCP clients
- Quick setup

---

## 🚀 Publishing to Anypoint Exchange

### Option 1: Using the Exchange UI

1. **Log in to Anypoint Platform**
   ```
   https://anypoint.mulesoft.com/exchange/
   ```

2. **Navigate to Your Organization**
   - Click on your organization name

3. **Upload server.json**
   - Go to the asset: `cms-demo-mcp-server`
   - Click "Add Files"
   - Upload `server.json`
   - Add description: "MCP Server Configuration"

### Option 2: Using Maven (Already Done!)

The asset is already published! ✅

View it at:
```
https://anypoint.mulesoft.com/exchange/a985e716-cd81-4160-9e00-91c97363ae9d/cms-demo-mcp-server
```

---

## 🔌 Connecting AI Tools

### Cursor AI

1. **Open Cursor Settings**
   - `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux)

2. **Navigate to Extensions → MCP**

3. **Add Server Configuration**
   
   Copy from `mcp-client-config.json`:
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

4. **Reload Cursor**

5. **Test the Connection**
   
   Ask Cursor:
   ```
   "Can you list all customers from the CMS?"
   ```

### Claude Desktop

1. **Locate Claude Desktop Config**
   
   **Mac:**
   ```
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```
   
   **Windows:**
   ```
   %APPDATA%\Claude\claude_desktop_config.json
   ```

2. **Add MCP Server**
   
   Edit the config file:
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

3. **Restart Claude Desktop**

4. **Test the Connection**
   
   Ask Claude:
   ```
   "Show me all customers from the CMS"
   ```

### Other MCP Clients

For any MCP-compatible client, use the configuration from `mcp-client-config.json`:

```json
{
  "url": "https://cms-demo-mcp-server-dl2x0l.5sc6y6-2.usa-e2.cloudhub.io",
  "transport": "http"
}
```

---

## 🛠️ Available Tools

Once connected, these 10 tools will be available to the AI:

### Customer Management (5 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_all_customers` | Get all customers | None |
| `get_customer_by_id` | Get customer by ID | `customerId` |
| `create_customer` | Create new customer | `name`, `email`, `phone` |
| `update_customer` | Update customer | `customerId`, `name`, `email`, `phone` |
| `delete_customer` | Delete customer | `customerId` |

### Card Management (5 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_all_cards` | Get all cards | None |
| `get_card_by_id` | Get card by ID | `cardId` |
| `create_card` | Create new card | `customerId`, `cardNumber`, `cardType`, `expiryDate` |
| `update_card` | Update card | `cardId`, `cardNumber`, `cardType`, `expiryDate` |
| `delete_card` | Delete card | `cardId` |

---

## 💡 Example AI Prompts

Once the MCP server is connected, you can ask the AI:

### Customer Operations
```
"Can you show me all customers?"
"Get customer details for ID 123"
"Create a new customer named John Doe with email john@example.com and phone 555-1234"
"Update customer 123's email to newemail@example.com"
"Delete customer with ID 456"
```

### Card Operations
```
"List all cards in the system"
"Show me the card with ID 789"
"Create a new credit card for customer 123 with number 4111111111111111 expiring 12/25"
"Update card 789 to expire on 06/26"
"Remove card 789 from the system"
```

### Complex Workflows
```
"Create a customer named Jane Smith with email jane@example.com and phone 555-5678, then create a credit card for them"
"Find all customers and show me their cards"
"Update customer 123's information and add a new card for them"
```

---

## 🔍 Testing the Server

### Using curl

```bash
# List available tools
curl -X POST https://cms-demo-mcp-server-dl2x0l.5sc6y6-2.usa-e2.cloudhub.io \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"tools/list"
  }'

# Call get_all_customers
curl -X POST https://cms-demo-mcp-server-dl2x0l.5sc6y6-2.usa-e2.cloudhub.io \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"tools/call",
    "params":{
      "name":"get_all_customers",
      "arguments":{}
    }
  }'
```

### Using Test Scripts

```bash
# Interactive test menu
./test-mcp-tools.sh

# Python test client
python3 test-mcp-client.py
```

See `TESTING_GUIDE.md` for complete testing documentation.

---

## 📊 Server Status

- **Status:** ✅ Running
- **Platform:** CloudHub 2.0
- **Region:** US-East-2
- **URL:** https://cms-demo-mcp-server-dl2x0l.5sc6y6-2.usa-e2.cloudhub.io
- **Runtime:** Mule 4.9.10 with Java 17
- **Exchange:** https://anypoint.mulesoft.com/exchange/a985e716-cd81-4160-9e00-91c97363ae9d/cms-demo-mcp-server

---

## 🔒 Security

- **Authentication:** None required (backend API is open)
- **Rate Limiting:** CloudHub 2.0 standard limits apply
- **HTTPS:** All connections are encrypted

---

## 📚 Additional Resources

- **Full Documentation:** See `README.md`
- **Testing Guide:** See `TESTING_GUIDE.md`
- **Debug Instructions:** See `DEBUG_INSTRUCTIONS.md`
- **DataWeave Fix:** See `DATAWEAVE_FIX_SUMMARY.md`
- **CMS Demo API Spec:** https://anypoint.mulesoft.com/exchange/a985e716-cd81-4160-9e00-91c97363ae9d/cms-demo-api/minor/1.0/

---

## 💬 Support

- **Email:** support@mulesoft.com
- **Documentation:** https://docs.mulesoft.com/mcp-connector/
- **Community:** https://help.mulesoft.com

---

## 🎉 Quick Start

1. **Copy the client config:**
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

2. **Add to your AI tool** (Cursor, Claude, etc.)

3. **Ask your AI:**
   ```
   "Can you show me all customers from the CMS?"
   ```

4. **Enjoy!** 🚀

Your MCP server is ready to use!

