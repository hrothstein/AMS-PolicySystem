# 🐛 Debug Setup Guide for CMS Demo MCP Server

## Prerequisites Checklist

### 1. ✅ Install Required VS Code Extension

You need the **MuleSoft extension for VS Code**:

**Option A: Install via VS Code UI**
1. Open VS Code
2. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac) to open Extensions
3. Search for: **"MuleSoft"** or **"Salesforce MuleSoft"**
4. Install: **"Anypoint Code Builder Extension Pack"** by Salesforce
5. Reload VS Code

**Option B: Install via Command Line**
```bash
code --install-extension salesforce.salesforce-vscode-mulesoft
```

### 2. ✅ Verify Java 17 is Installed

Check your Java version:
```bash
java -version
```

Should show: `openjdk version "17.x.x"` or `java version "17.x.x"`

If not installed:
- **macOS**: `brew install openjdk@17`
- **Windows**: Download from [Adoptium](https://adoptium.net/)
- **Linux**: `sudo apt install openjdk-17-jdk`

### 3. ✅ Verify Maven is Installed

```bash
mvn -version
```

Should show Maven 3.6+ and Java 17

## 🚀 Debug Methods

### Method 1: Using Debug Panel (Recommended)

1. Open VS Code in the workspace: `/Users/hrothstein/cursorrepos/CMS-MCP`
2. Click the **Debug icon** in the Activity Bar (left side, bug icon) or press `Ctrl+Shift+D` (`Cmd+Shift+D` on Mac)
3. At the top, select **"Debug CMS Demo MCP Server"** from the dropdown
4. Click the **green play button** ▶️ next to it
5. Wait for the Mule runtime to start (this can take 30-60 seconds the first time)

### Method 2: Using F5

1. Make sure you have a Mule XML file open (e.g., `cms-demo-mcp-server.xml`)
2. Press `F5`
3. If prompted, select **"Debug CMS Demo MCP Server"**

### Method 3: Using Command Palette

1. Press `Ctrl+Shift+P` (`Cmd+Shift+P` on Mac)
2. Type: **"Debug: Start Debugging"**
3. Select it and choose **"Debug CMS Demo MCP Server"**

## 🔍 Troubleshooting

### Issue: "Nothing happens when I press F5"

**Solution 1: Check Extension is Installed**
```bash
code --list-extensions | grep salesforce
```
Should show: `salesforce.salesforce-vscode-mulesoft`

**Solution 2: Restart VS Code**
- Close VS Code completely
- Reopen the workspace: `code /Users/hrothstein/cursorrepos/CMS-MCP`

**Solution 3: Check Output Panel**
1. Open Output panel: `View > Output` or `Ctrl+Shift+U`
2. Select **"Mule DX"** or **"Mule Runtime"** from dropdown
3. Look for error messages

### Issue: "Mule Runtime not found"

**Solution: Install Mule Runtime**
```bash
cd /Users/hrothstein/cursorrepos/CMS-MCP/cms-demo-mcp-server
mvn clean package -DskipTests
```

This will download the Mule runtime during the build.

### Issue: Debug starts but immediately stops

**Solution: Check port 8081 is available**
```bash
lsof -i :8081
```

If something is using port 8081, either:
- Stop that process
- Or change the port in `.vscode/settings.json`: `-M-Dhttp.port=8082`

## 📝 What Should Happen When Debugging Works:

1. **Terminal shows**: "Starting Mule Runtime..."
2. **Wait 30-60 seconds** (first time downloads Mule runtime)
3. **Output shows**: 
   ```
   **********************************************************************
   * Mule Runtime and Integration Platform                             *
   * Version: 4.10.0                                                    *
   **********************************************************************
   * Mule is up and running                                            *
   **********************************************************************
   ```
4. **MCP Server is running** at `http://localhost:8081`

## 🎯 Testing the MCP Server

Once running, test it with curl:

```bash
# Test health endpoint (if available)
curl http://localhost:8081/mcp

# Or check if it's listening
lsof -i :8081
```

## 🆘 Still Not Working?

### Check the Debug Console:
1. `View > Debug Console` or `Ctrl+Shift+Y`
2. Look for error messages

### Check Mule Logs:
```bash
tail -f /Users/hrothstein/cursorrepos/CMS-MCP/cms-demo-mcp-server/.mule/logs/mule_ee.log
```

### Manual Run (Alternative):
If debugging doesn't work, you can run manually:
```bash
cd /Users/hrothstein/cursorrepos/CMS-MCP/cms-demo-mcp-server
mvn mule:run
```

Then attach debugger or add logging to troubleshoot.

## ✅ Next Steps After Debugging Works:

1. Set breakpoints in `cms-demo-mcp-server.xml` by clicking left of line numbers
2. Make requests to your MCP tools
3. Debugger will pause at breakpoints
4. Inspect payload, variables, and attributes in the Debug panel

---

**Need help?** Check the [MuleSoft Debug Documentation](https://docs.mulesoft.com/mule-runtime/latest/mule-app-dev-debug)

