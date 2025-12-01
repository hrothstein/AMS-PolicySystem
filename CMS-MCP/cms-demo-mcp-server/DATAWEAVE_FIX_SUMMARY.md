# DataWeave Serialization Error Fix

## Error Fixed

```
java.lang.IllegalStateException: No read or write handler for success
```

This error occurred when the MCP connector tried to serialize the HTTP response payload.

## Root Cause

The MCP connector's `<mcp:text-tool-response-content text="#[payload]" />` expects a **String**, but the Transform Message components were outputting **Java objects** with `output application/json`.

DataWeave was unable to serialize these Java objects because they contained properties (like "success" status objects from HTTP responses) that DataWeave couldn't handle.

## Solution Applied

### Before (Caused Error):
```xml
<http:request ... />
<ee:transform doc:name="Transform Message">
    <ee:message>
        <ee:set-payload><![CDATA[%dw 2.0
            output application/json
            ---
            payload]]></ee:set-payload>
    </ee:message>
</ee:transform>
<!-- Later... -->
<mcp:responses>
    <mcp:text-tool-response-content text="#[payload]" />
</mcp:responses>
```

**Problem:** The `output application/json` creates a Java object, not a string.

### After (Fixed):
```xml
<http:request ... />
<set-payload 
    doc:name="Convert to String" 
    value="#[output application/json --- payload]" 
    mimeType="text/plain" />
<!-- Later... -->
<mcp:responses>
    <mcp:text-tool-response-content text="#[payload]" />
</mcp:responses>
```

**Solution:** Using `set-payload` with `mimeType="text/plain"` ensures the payload is a JSON **string**, not a Java object.

## Changes Made

### 1. All 10 Flow Success Responses Fixed

- ✅ `get-all-customersFlow`
- ✅ `get-customer-by-idFlow`
- ✅ `create-customerFlow`
- ✅ `update-customerFlow`
- ✅ `delete-customerFlow`
- ✅ `get-all-cardsFlow`
- ✅ `get-card-by-idFlow`
- ✅ `create-cardFlow`
- ✅ `update-cardFlow`
- ✅ `delete-cardFlow`

**Pattern:**
- Replaced `<ee:transform>` with `<set-payload>`
- Set `mimeType="text/plain"` to ensure string output
- Used DataWeave inline: `#[output application/json --- payload]`

### 2. All 10 Error Handlers Fixed

Each flow's error handler also updated:

**Before:**
```xml
<ee:transform doc:name="Transform Error Message">
    <ee:message>
        <ee:set-payload><![CDATA[%dw 2.0
            output application/json
            ---
            {
                error: error.description,
                statusCode: error.errorType.identifier
            }]]></ee:set-payload>
    </ee:message>
</ee:transform>
```

**After:**
```xml
<set-payload 
    doc:name="Convert Error to String" 
    value='#[output application/json --- {"error": error.description, "statusCode": error.errorType.identifier}]' 
    mimeType="text/plain" />
```

### 3. Configuration Files Fixed

**`.vscode/launch.json`:**
```json
{
  "mule.runtime.args": " "  // String, not array
}
```

**`.vscode/settings.json`:**
```json
{
  "mule.runtimePath": "/Users/hrothstein/AnypointCodeBuilder/runtime/mule-enterprise-standalone-4.9.10",
  "mule.project.root": "${workspaceFolder}"
}
```

## Testing

### Build Status
✅ `mvn clean package -DskipTests` - **SUCCESS**

### How to Run
1. **Reload Cursor window:** `Cmd+Shift+P` → "Reload Window"
2. **Press F5** to start debugging
3. Server starts at `http://localhost:8081`

### Test the MCP Tools
```bash
# Use the test script
./test-mcp-tools.sh

# Or Python client
python3 test-mcp-client.py
```

## Key Takeaways

1. **MCP text responses must be strings**, not Java objects
2. **Use `mimeType="text/plain"`** when setting JSON string payloads
3. **Don't use `output application/json` in ee:transform** for MCP responses - it creates Java objects
4. **Use `set-payload` with inline DataWeave** instead of `ee:transform` blocks for simple conversions

## Files Modified

- ✅ `src/main/mule/cms-demo-mcp-server.xml` - Fixed all 10 flows
- ✅ `.vscode/launch.json` - Fixed runtime args
- ✅ `.vscode/settings.json` - Added runtime path
- ✅ `pom.xml` - Added classifier configuration
- ✅ `README.md` - Updated documentation
- ❌ Removed `run.sh` - mvn mule:run doesn't exist in plugin 4.3.0
- ❌ Removed `START_DEBUG.sh` - mvn mule:run doesn't exist in plugin 4.3.0

## Verification

Test with:
```bash
curl -X POST http://localhost:8081 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"tools/call",
    "params":{"name":"get_all_customers","arguments":{}}
  }'
```

Expected: JSON string response, no serialization errors! 🎉

