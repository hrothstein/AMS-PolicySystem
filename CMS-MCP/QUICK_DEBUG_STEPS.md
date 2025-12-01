# Quick Steps to Debug

Since F5 isn't working, try these steps in order:

## Step 1: Try the Debug Panel Instead of F5

1. **Open Debug Panel**: Click the bug icon 🐛 on the left sidebar (or press `Cmd+Shift+D`)
2. At the top, you should see a dropdown that says **"Debug CMS Demo MCP Server"**
3. Click the **green play button** ▶️ next to it
4. Watch the Debug Console at the bottom for output

## Step 2: Check What's Happening

**Open the Debug Console:**
- Go to `View > Debug Console` (or `Cmd+Shift+Y`)
- This shows what happens when you try to debug

**Check the Output Panel:**
- Go to `View > Output` (or `Cmd+Shift+U`)
- In the dropdown on the right, select **"Mule DX"** or **"Mule Runtime"**
- Look for error messages

## Step 3: Reload VS Code Window

Sometimes VS Code needs a fresh start:
1. Press `Cmd+Shift+P` to open Command Palette
2. Type: `Developer: Reload Window`
3. Press Enter
4. Try F5 or Debug Panel again

## Step 4: Make Sure You're in the Right Folder

1. In VS Code, check the bottom left - it should say: `/Users/hrothstein/cursorrepos/CMS-MCP`
2. If not, do: `File > Open Folder...` and select `/Users/hrothstein/cursorrepos/CMS-MCP`

## Step 5: Open a Mule File First

The debugger might need a Mule XML file to be open:
1. In VS Code, open: `cms-demo-mcp-server/src/main/mule/cms-demo-mcp-server.xml`
2. Now try F5 again

## Step 6: Try Manual Run (Alternative)

If debugging still doesn't work, run it manually to test:

```bash
cd /Users/hrothstein/cursorrepos/CMS-MCP/cms-demo-mcp-server
mvn mule:run
```

Press `Ctrl+C` to stop when done.

## Step 7: Check Extension is Active

1. Press `Cmd+Shift+P`
2. Type: `Extensions: Show Installed Extensions`
3. Search for "MuleSoft" or "Anypoint"
4. Make sure it says **"Enabled"** (not just installed)
5. If it says "Disabled", click to enable it

## What Should You See When It Works?

When debugging works, you should see:
1. **Terminal** opens at the bottom
2. Output shows: `Starting Mule Runtime...`
3. After 30-60 seconds: `Mule is up and running`
4. Red dot appears on the debug icon (top left)
5. Debug toolbar appears at the top center

## Still Not Working?

Tell me what you see when you:
1. Click the Debug Panel (bug icon)
2. Click the green play button
3. Check the Debug Console - what does it say?

That will help me figure out the exact issue!

