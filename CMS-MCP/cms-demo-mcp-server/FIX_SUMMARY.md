# Fix Summary: `e.configuration[t.MULE_ARG_LAUNCH_PROPERTY].split is not a function`

## Problem
When trying to debug the MCP server in Cursor/VS Code, the error occurred:
```
e.configuration[t.MULE_ARG_LAUNCH_PROPERTY].split is not a function
```

## Root Cause
The `.vscode/launch.json` configuration had `mule.runtime.args` set to an **array** instead of a **string**. The Mule runtime calls `.split()` on this value, which fails when it receives an array.

## Solution Applied

### 1. Fixed `.vscode/launch.json`

**Before:**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "mule-xml-debugger",
      "request": "launch",
      "name": "Debug CMS Demo MCP Server",
      "mule.project": "${workspaceFolder}",
      "mule.runtime.args": [
        "-M-Dhttp.port=8081",
        "-M-Dhttps.port=8082",
        "-M-Dmcp.serverName=CMS-Demo-MCP-Server",
        "-M-Dmcp.serverVersion=1.0.0"
      ]
    }
  ]
}
```

**After:**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "mule-xml-debugger",
      "request": "launch",
      "name": "Debug CMS Demo MCP Server",
      "mule.project": "${workspaceFolder}",
      "mule.runtime.args": " "
    },
    {
      "type": "java",
      "request": "attach",
      "name": "Debug Mule (Attach)",
      "hostName": "localhost",
      "port": 5005
    }
  ]
}
```

**Key Changes:**
- Changed `"mule.runtime.args"` from an array to a string with single space: `" "`
- Added attach debugger configuration for manual debugging
- Removed runtime arguments (they're read from `config.properties` instead)

### 2. Updated `.vscode/settings.json`

**Before:**
```json
{
  "mule.runtime.defaultArguments": [
    "-M-Dhttp.port=8081",
    ...
  ],
  ...
}
```

**After:**
```json
{
  "mule.runtimePath": "/Users/hrothstein/AnypointCodeBuilder/runtime/mule-enterprise-standalone-4.9.10",
  "mule.project.root": "${workspaceFolder}",
  ...
}
```

**Key Changes:**
- Removed `mule.runtime.defaultArguments` array
- Added explicit `mule.runtimePath` configuration
- Added `mule.project.root` setting

### 3. Updated `pom.xml`

Changed the mule-maven-plugin configuration from:
```xml
<configuration/>
```

To:
```xml
<configuration>
  <classifier>mule-application</classifier>
</configuration>
```

### 4. Created Helper Scripts

- `START_DEBUG.sh` - Start with debug port enabled
- `run.sh` - Simple run script
- `DEBUG_INSTRUCTIONS.md` - Comprehensive debugging guide
- `FIX_SUMMARY.md` - This document

## How to Use the Fix

1. **Reload Cursor window:**
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
   - Type: "Reload Window"
   - Press Enter

2. **Press F5** to debug - should work now!

3. **Or use the debug script:**
   ```bash
   ./START_DEBUG.sh
   ```

## Why This Works

The Mule runtime internally does something like:
```javascript
let args = configuration[MULE_ARG_LAUNCH_PROPERTY];
if (args) {
  let argArray = args.split(' '); // <-- This line fails if args is an array
  // Process arguments...
}
```

By setting `mule.runtime.args` to a string (even an empty one with just a space), the `.split()` method works correctly.

## Configuration Location

All runtime configuration values are now read from:
```
src/main/resources/config.properties
```

This file contains:
- `http.port=8081`
- `https.port=8082`
- `mcp.serverName=CMS-Demo-MCP-Server`
- `mcp.serverVersion=1.0.0`
- `cms.api.baseUrl=...`

No need to pass these as runtime arguments in the launch configuration!

## Verification

To verify the fix worked:
1. Reload Cursor window
2. Press F5
3. You should see the Mule application starting in the debug console
4. No more `.split is not a function` error!

## Reference

This fix is based on the working configuration from:
`/Users/hrothstein/cursorrepos/mule-imp-cms-test`

