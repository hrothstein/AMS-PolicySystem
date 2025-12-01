# How to Upload MCP Server to Anypoint Exchange

## ✅ **Correct File for Exchange Upload**

According to the [MuleSoft Exchange documentation](https://docs.mulesoft.com/exchange/to-create-an-asset), when creating an MCP Server asset in Exchange, you need to upload an **OpenRPC schema file**.

**Use this file:** `mcp-openrpc-schema.json` ⭐

---

## 📄 **Understanding the Different Files**

### 1. `mcp-openrpc-schema.json` - **FOR EXCHANGE UPLOAD** ⭐
**OpenRPC specification** that describes your MCP server's methods (tools)

**Use for:**
- ✅ Publishing to Anypoint Exchange
- ✅ Creating MCP Server asset in Exchange
- ✅ Making your MCP server discoverable

**Format:** OpenRPC 1.0.0 with methods, parameters, and schemas

### 2. `mcp-client-config.json` - FOR AI TOOLS
**Client configuration** for connecting AI tools to your MCP server

**Use for:**
- ✅ Cursor AI configuration
- ✅ Claude Desktop configuration
- ✅ Custom MCP clients

**Format:** MCP client config with transport and URL

### 3. `server.json` - FOR DOCUMENTATION
**Full MCP server specification** with metadata and examples

**Use for:**
- ✅ Complete server documentation
- ✅ Tool discovery and cataloging
- ✅ Integration documentation

**Format:** Extended MCP server specification with examples

---

## 🚀 **Steps to Upload to Exchange**

Follow these steps from the [Exchange documentation](https://docs.mulesoft.com/exchange/to-create-an-asset#create-an-mcp-server-asset):

### 1. Go to Anypoint Exchange
```
https://anypoint.mulesoft.com/exchange/
```

### 2. Click "Publish new asset"

### 3. Enter Asset Details
- **Name:** `CMS Demo MCP Server`
- **Asset Type:** Select **MCP** from dropdown

### 4. Upload Schema File
- Click **Choose file**
- Select: `mcp-openrpc-schema.json` ⭐
- This is the OpenRPC schema file that Exchange expects

### 5. Select Platform
- Enter the platform name
- Select from the list

### 6. Click "Publish"

✅ Your MCP server will now be discoverable in Exchange!

---

## 📋 **File Summary**

| File | Purpose | Use For |
|------|---------|---------|
| `mcp-openrpc-schema.json` | OpenRPC schema | **Exchange upload** ⭐ |
| `mcp-client-config.json` | Client config | Cursor/Claude setup |
| `server.json` | Full documentation | Reference docs |
| `exchange.json` | Exchange metadata | Auto-generated |

---

## ✅ **What's in the OpenRPC Schema?**

The `mcp-openrpc-schema.json` file includes:

### OpenRPC Structure
```json
{
  "openrpc": "1.0.0",
  "info": {
    "version": "1.0.0",
    "title": "CMS Demo MCP Server",
    "description": "..."
  },
  "servers": [
    {
      "url": "https://cms-demo-mcp-server-dl2x0l.5sc6y6-2.usa-e2.cloudhub.io"
    }
  ],
  "methods": [
    // All 10 tools defined here
  ],
  "components": {
    "schemas": {
      // Customer and Card schemas
    }
  }
}
```

### All 10 Methods Defined
1. `get_all_customers` - with params and result schema
2. `get_customer_by_id` - with params and result schema
3. `create_customer` - with params and result schema
4. `update_customer` - with params and result schema
5. `delete_customer` - with params and result schema
6. `get_all_cards` - with params and result schema
7. `get_card_by_id` - with params and result schema
8. `create_card` - with params and result schema
9. `update_card` - with params and result schema
10. `delete_card` - with params and result schema

### Schemas Defined
- `Customer` schema - customerId, name, email, phone
- `Card` schema - cardId, customerId, cardNumber, cardType, expiryDate

---

## 🎯 **Quick Reference**

**Uploading to Exchange?**
→ Use `mcp-openrpc-schema.json`

**Connecting Cursor/Claude?**
→ Use `mcp-client-config.json`

**Want full documentation?**
→ See `server.json` or `MCP_SERVER_GUIDE.md`

---

## 📚 **Additional Documentation**

- [MuleSoft Exchange - Creating Assets](https://docs.mulesoft.com/exchange/to-create-an-asset)
- [OpenRPC Specification](https://spec.open-rpc.org/)
- `MCP_SERVER_GUIDE.md` - Complete MCP setup guide
- `TESTING_GUIDE.md` - Testing documentation

---

## ✅ **You're Ready!**

The `mcp-openrpc-schema.json` file is ready to upload to Anypoint Exchange.

This file follows the OpenRPC 1.0.0 specification and includes all 10 tools with their parameters and schemas, exactly as Exchange expects!

🎉 **Upload it to Exchange now!**

