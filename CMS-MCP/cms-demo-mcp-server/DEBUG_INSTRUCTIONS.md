# Debugging the CMS Demo MCP Server

## ✅ The Fix Applied

The `e.configuration[t.MULE_ARG_LAUNCH_PROPERTY].split is not a function` error has been **FIXED** by updating `.vscode/launch.json`:

**Before (caused error):**
```json
"mule.runtime.args": [
  "-M-Dhttp.port=8081",
  "-M-Dhttps.port=8082"
]
```

**After (working):**
```json
"mule.runtime.args": " "
```

## Option 1: Cursor/VS Code Debugger (Recommended)

### Prerequisites:
1. Verify you have **"Anypoint Code Builder"** or **"MuleSoft Extension Pack"** installed
2. Check in Cursor: Extensions → Search "MuleSoft"

### Steps to Debug:
1. **Reload the window** to apply the fix:
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
   - Type: "Reload Window"
   - Press Enter

2. Press **F5** or Run → Start Debugging

3. Select: **"Debug CMS Demo MCP Server"**

4. The MCP server will start and be available at `http://localhost:8081`

### If It Still Doesn't Work:
1. Open **View → Output**
2. Select **"Mule DX Server"** from dropdown
3. Look for error messages
4. Try Option 2 below

---

## Option 2: Manual Debug with Attach

Run with Java debug port enabled:

```bash
./START_DEBUG.sh
```

Or manually:
```bash
cd /Users/hrothstein/cursorrepos/CMS-MCP/cms-demo-mcp-server
mvn clean package -DskipTests
mvn mule:run -Dmule.debug.enable=true -Dmule.debug.port=5005 -Dmule.debug.suspend=false
```

Then in Cursor/VS Code:
1. Press **F5**
2. Select: **"Debug Mule (Attach)"**
3. This attaches to the running Mule instance

---

## Option 3: Simple Run (No Debugging)

Just run the application without debugging:

```bash
./run.sh
```

Or manually:
```bash
mvn mule:run
```

---

## Testing the MCP Server

Once running, the MCP server exposes tools at `http://localhost:8081`

### Available Tools:
- `get_all_customers` - Get all customers
- `get_customer_by_id` - Get customer by ID
- `create_customer` - Create new customer
- `update_customer` - Update customer
- `delete_customer` - Delete customer
- `get_all_cards` - Get all cards
- `get_card_by_id` - Get card by ID
- `create_card` - Create new card
- `update_card` - Update card
- `delete_card` - Delete card

### Test with MCP Client:
Connect an MCP client to `http://localhost:8081` to invoke the tools.

---

## Breakpoint Debugging

Once debugger is attached:

1. Open: `src/main/mule/cms-demo-mcp-server.xml`
2. Click left of line numbers to set breakpoints
3. Use an MCP client to invoke tools and trigger breakpoints

---

## Common Issues

### Port 8081 already in use
**Solution:** Kill existing process:
```bash
lsof -ti:8081 | xargs kill -9
```

Or change the port in `src/main/resources/config.properties`:
```properties
http.port=8082
```

### Mule runtime not found
**Solution:** Verify runtime path in `.vscode/settings.json`:
```json
{
  "mule.runtimePath": "/Users/hrothstein/AnypointCodeBuilder/runtime/mule-enterprise-standalone-4.9.10"
}
```

If you don't have this runtime, download it or adjust the path to your installed runtime.

### "mule-xml-debugger" type not recognized
**Solution:** Install the MuleSoft extension:
- Extensions → Search "MuleSoft" or "Anypoint Code Builder"
- Install and reload Cursor/VS Code

---

## Configuration Files

All configuration is read from `src/main/resources/config.properties`:
- `http.port` - HTTP listener port (default: 8081)
- `mcp.serverName` - MCP server name
- `mcp.serverVersion` - MCP server version
- `cms.api.baseUrl` - Backend CMS API URL

No runtime arguments needed in launch configuration!

