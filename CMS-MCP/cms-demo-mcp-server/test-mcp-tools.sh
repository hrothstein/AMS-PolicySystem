#!/bin/bash
# Quick test script for CMS Demo MCP Server using curl

MCP_URL="http://localhost:8081"

echo "=================================================="
echo "  CMS Demo MCP Server - Quick Test Script"
echo "=================================================="
echo ""
echo "Server URL: $MCP_URL"
echo ""

# Check if server is running
echo "🔍 Checking if MCP server is running..."
if ! curl -s --connect-timeout 2 $MCP_URL > /dev/null 2>&1; then
    echo "❌ MCP server is not running!"
    echo ""
    echo "Please start the server first:"
    echo "  ./run.sh"
    echo "  OR"
    echo "  ./START_DEBUG.sh"
    echo "  OR"
    echo "  Press F5 in Cursor"
    echo ""
    exit 1
fi

echo "✅ Server is running!"
echo ""

# Function to call MCP tool
call_tool() {
    local tool_name=$1
    local params=$2
    
    echo "=================================================="
    echo "📞 Calling: $tool_name"
    echo "=================================================="
    
    if [ -z "$params" ]; then
        params="{}"
    fi
    
    echo "Parameters: $params"
    echo ""
    
    curl -s -X POST $MCP_URL \
        -H "Content-Type: application/json" \
        -d '{
            "jsonrpc": "2.0",
            "id": 1,
            "method": "tools/call",
            "params": {
                "name": "'"$tool_name"'",
                "arguments": '"$params"'
            }
        }' | jq '.' || echo "(Response not in JSON format)"
    
    echo ""
}

# Menu
echo "What would you like to test?"
echo ""
echo "1. List all available tools"
echo "2. Get all customers"
echo "3. Get all cards"
echo "4. Create a test customer"
echo "5. Run all tests"
echo "0. Exit"
echo ""
read -p "Enter your choice (0-5): " choice

case $choice in
    1)
        echo ""
        echo "=================================================="
        echo "📋 Listing Available MCP Tools"
        echo "=================================================="
        echo ""
        curl -s -X POST $MCP_URL \
            -H "Content-Type: application/json" \
            -d '{
                "jsonrpc": "2.0",
                "id": 1,
                "method": "tools/list"
            }' | jq '.'
        ;;
    2)
        call_tool "get_all_customers" "{}"
        ;;
    3)
        call_tool "get_all_cards" "{}"
        ;;
    4)
        call_tool "create_customer" '{
            "name": "Test User",
            "email": "test@example.com",
            "phone": "555-0001"
        }'
        ;;
    5)
        echo ""
        echo "Running all tests..."
        echo ""
        
        # List tools
        echo "=================================================="
        echo "📋 1. List Available Tools"
        echo "=================================================="
        curl -s -X POST $MCP_URL \
            -H "Content-Type: application/json" \
            -d '{
                "jsonrpc": "2.0",
                "id": 1,
                "method": "tools/list"
            }' | jq '.result.tools[] | {name: .name, description: .description}'
        echo ""
        
        # Get all customers
        call_tool "get_all_customers" "{}"
        
        # Get all cards
        call_tool "get_all_cards" "{}"
        
        echo "✅ All basic tests completed!"
        ;;
    0)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo "Invalid choice!"
        exit 1
        ;;
esac

echo ""
echo "=================================================="
echo "✅ Test Complete!"
echo "=================================================="
echo ""
echo "💡 Tip: You can also use the Python client for more tests:"
echo "   python3 test-mcp-client.py"
echo ""

