# Debugging the CMS Demo API

## Option 1: VS Code Mule Debugger (Recommended)

### Prerequisites Check:
1. Verify you have **"Anypoint Code Builder"** or **"MuleSoft Extension Pack"** installed
2. Check in VS Code: Extensions → Search "MuleSoft"

### Steps to Debug:
1. Open this project in VS Code: `/Users/hrothstein/cursorrepos/mule-imp-cms-test`
2. Press **F5** or Run → Start Debugging
3. Select: **"Debug Mule Application"**

### If Nothing Happens:
1. Open **View → Output**
2. Select **"Mule DX Server"** from dropdown
3. Look for error messages
4. Share the error message for help

---

## Option 2: MuleSoft MCP Server (Works Now)

Already configured! The MCP server can run and debug:

### To Run:
```bash
# Use the MuleSoft MCP tool
mcp_mulesoft-mcp_run_local_mule_application
```

### To Debug with Logs:
The application logs to console - you can watch the logs in real-time:
```bash
tail -f ~/AnypointCodeBuilder/runtime/mule-enterprise-standalone-4.9.10/logs/mule_ee.log
```

---

## Option 3: Maven with Debug Port (Manual Debugging)

Run with Java debug port enabled:

```bash
cd /Users/hrothstein/cursorrepos/mule-imp-cms-test
mvn clean package
mvn mule:run -Dmule.debug.enable=true -Dmule.debug.port=5005
```

Then in VS Code:
1. Press F5
2. Select: **"Debug Mule (Attach)"**
3. This attaches to the running Mule instance

---

## Breakpoint Debugging

Once debugger is attached:

1. Open: `src/main/mule/cms-demo-api-implementation.xml`
2. Click left of line numbers to set breakpoints
3. Test API endpoints to trigger breakpoints:
   ```bash
   curl http://localhost:8081/api/customers
   ```

---

## Troubleshooting

### "mule-xml-debugger" type not recognized
**Solution:** Install the MuleSoft extension:
- Extensions → Search "MuleSoft" or "Anypoint Code Builder"
- Install and reload VS Code

### Port 8081 already in use
**Solution:** Kill existing process:
```bash
lsof -ti:8081 | xargs kill -9
```

### Mule runtime not found
**Solution:** Update `.vscode/settings.json`:
```json
{
  "mule.runtimePath": "/Users/hrothstein/AnypointCodeBuilder/runtime/mule-enterprise-standalone-4.9.10"
}
```

---

## Testing Without Debugging

If debugging doesn't work, you can still test:

```bash
# Start application
mvn mule:run

# Test in another terminal
curl http://localhost:8081/api/customers
curl http://localhost:8081/console  # API Console
```

Use the API Console at http://localhost:8081/console for interactive testing.

