# Testing the CMS Demo MCP Server

## 🎯 Overview

This MCP server exposes **10 tools** for managing customers and cards through the Model Context Protocol.

## 📋 Available MCP Tools

### Customer Management (5 tools)
| Tool | Description | Required Parameters |
|------|-------------|---------------------|
| `get_all_customers` | Get all customers | None |
| `get_customer_by_id` | Get customer by ID | `customerId` (string) |
| `create_customer` | Create new customer | `name`, `email`, `phone` |
| `update_customer` | Update customer | `customerId`, `name`, `email`, `phone` |
| `delete_customer` | Delete customer | `customerId` |

### Card Management (5 tools)
| Tool | Description | Required Parameters |
|------|-------------|---------------------|
| `get_all_cards` | Get all cards | None |
| `get_card_by_id` | Get card by ID | `cardId` (string) |
| `create_card` | Create new card | `customerId`, `cardNumber`, `cardType`, `expiryDate` |
| `update_card` | Update card | `cardId`, `cardNumber`, `cardType`, `expiryDate` |
| `delete_card` | Delete card | `cardId` |

---

## 🚀 Quick Start Testing

### Step 1: Start the MCP Server

Choose any method:

```bash
# Method 1: Simple run
./run.sh

# Method 2: Debug mode
./START_DEBUG.sh

# Method 3: Press F5 in Cursor (after reloading window)
```

Wait for:
```
✅ Mule MCP Server is running!
🌐 http://localhost:8081
```

### Step 2: Run Tests

Choose your testing method:

#### **Option A: Interactive Shell Script (Easiest)**
```bash
./test-mcp-tools.sh
```

Then select from menu:
- List all tools
- Get all customers
- Get all cards
- Create a test customer
- Run all tests

#### **Option B: Python Test Client (Full Workflow)**
```bash
python3 test-mcp-client.py
```

Then select:
1. Customer workflow (CRUD operations)
2. Card workflow (list cards)
3. List tools only
4. Custom tool call

#### **Option C: Manual curl Commands**

See examples below ⬇️

---

## 📝 Manual Testing Examples

### List Available Tools
```bash
curl -X POST http://localhost:8081 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }' | jq '.'
```

### Get All Customers
```bash
curl -X POST http://localhost:8081 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "get_all_customers",
      "arguments": {}
    }
  }' | jq '.'
```

### Create a Customer
```bash
curl -X POST http://localhost:8081 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "create_customer",
      "arguments": {
        "name": "Jane Smith",
        "email": "jane@example.com",
        "phone": "555-1234"
      }
    }
  }' | jq '.'
```

### Get Customer by ID
```bash
curl -X POST http://localhost:8081 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "get_customer_by_id",
      "arguments": {
        "customerId": "12345"
      }
    }
  }' | jq '.'
```

### Update Customer
```bash
curl -X POST http://localhost:8081 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "update_customer",
      "arguments": {
        "customerId": "12345",
        "name": "Jane Smith Updated",
        "email": "jane.updated@example.com",
        "phone": "555-5678"
      }
    }
  }' | jq '.'
```

### Delete Customer
```bash
curl -X POST http://localhost:8081 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "delete_customer",
      "arguments": {
        "customerId": "12345"
      }
    }
  }' | jq '.'
```

### Get All Cards
```bash
curl -X POST http://localhost:8081 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "get_all_cards",
      "arguments": {}
    }
  }' | jq '.'
```

### Create a Card
```bash
curl -X POST http://localhost:8081 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "create_card",
      "arguments": {
        "customerId": "12345",
        "cardNumber": "4111111111111111",
        "cardType": "Credit",
        "expiryDate": "12/25"
      }
    }
  }' | jq '.'
```

---

## 🧪 Testing in Cursor AI

Once the MCP server is running, you can connect it to Cursor AI:

1. **Configure Cursor to use the MCP server**
   - Add to your Cursor MCP settings
   - Server URL: `http://localhost:8081`

2. **Use the tools in Cursor**
   - Cursor will automatically discover the 10 tools
   - You can ask Cursor to use them:
     - "Get all customers from the CMS"
     - "Create a new customer named John Doe"
     - "Show me all cards in the system"

---

## 🔍 Debugging

### View MCP Server Logs

The server logs to the console where you started it. Watch for:
- Tool invocations
- HTTP requests
- Backend API calls
- Errors

### Enable Verbose Logging

Edit `src/main/resources/log4j2.xml` and change log level:
```xml
<Logger level="DEBUG" name="org.mule"/>
```

### Check Backend API

The MCP server calls the backend CMS API at:
```
https://cms-demo-api-impl-dl2x0l.5sc6y6-4.usa-e2.cloudhub.io/api
```

Test the backend directly:
```bash
# Get customers from backend
curl https://cms-demo-api-impl-dl2x0l.5sc6y6-4.usa-e2.cloudhub.io/api/customers

# Get cards from backend
curl https://cms-demo-api-impl-dl2x0l.5sc6y6-4.usa-e2.cloudhub.io/api/cards
```

---

## ✅ Expected Responses

### Successful Tool Call
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\"customers\": [...]}"
      }
    ]
  }
}
```

### Error Response
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32603,
    "message": "Internal error",
    "data": {
      "error": "Customer not found",
      "statusCode": "404"
    }
  }
}
```

---

## 📊 Test Workflow Recommendation

1. **Start server**: `./run.sh`
2. **List tools**: `./test-mcp-tools.sh` → Option 1
3. **Get all customers**: Option 2
4. **Create customer**: Option 4
5. **Get customer by ID**: Use returned ID
6. **Update customer**: Modify the customer
7. **Delete customer**: Clean up test data

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port 8081 is in use
lsof -ti:8081 | xargs kill -9

# Rebuild and restart
mvn clean package -DskipTests
./run.sh
```

### Tool calls fail
- Check server logs for errors
- Verify backend API is accessible
- Test backend API directly with curl
- Check network connectivity

### "Connection refused"
- Make sure server is running: `lsof -i:8081`
- Wait for full startup (30-60 seconds)
- Check logs for startup errors

---

## 📚 Additional Resources

- **Flows**: `src/main/mule/cms-demo-mcp-server.xml`
- **Config**: `src/main/resources/config.properties`
- **Backend API**: [Exchange Link](https://anypoint.mulesoft.com/exchange/a985e716-cd81-4160-9e00-91c97363ae9d/cms-demo-api/minor/1.0/)

---

## 💡 Tips

- Use `jq` to format JSON output: `curl ... | jq '.'`
- Save customer IDs from create operations for subsequent tests
- The backend CMS API persists data - clean up test data when done
- Use debug mode to set breakpoints in Cursor

