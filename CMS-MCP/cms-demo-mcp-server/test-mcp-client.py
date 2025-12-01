#!/usr/bin/env python3
"""
Simple MCP Client to test the CMS Demo MCP Server
"""

import requests
import json
import sys

MCP_SERVER_URL = "http://localhost:8081"

def print_section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}\n")

def call_mcp_tool(tool_name, params=None):
    """Call an MCP tool"""
    print(f"📞 Calling tool: {tool_name}")
    if params:
        print(f"   Parameters: {json.dumps(params, indent=2)}")
    
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": {
            "name": tool_name,
            "arguments": params or {}
        }
    }
    
    try:
        response = requests.post(
            MCP_SERVER_URL,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Success!")
            print(f"Response: {json.dumps(result, indent=2)}")
            return result
        else:
            print(f"❌ Error: Status {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Is the MCP server running on port 8081?")
        print("   Try running: ./run.sh")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def list_tools():
    """List available MCP tools"""
    print(f"📋 Listing available tools...")
    
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/list"
    }
    
    try:
        response = requests.post(
            MCP_SERVER_URL,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Available tools:")
            if "result" in result and "tools" in result["result"]:
                for tool in result["result"]["tools"]:
                    print(f"   - {tool['name']}: {tool.get('description', 'No description')}")
            else:
                print(json.dumps(result, indent=2))
            return result
        else:
            print(f"❌ Error: Status {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Is the MCP server running on port 8081?")
        print("   Try running: ./run.sh")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def test_customer_workflow():
    """Test complete customer workflow"""
    
    print_section("CUSTOMER WORKFLOW TEST")
    
    # 1. Get all customers
    print_section("1. Get All Customers")
    call_mcp_tool("get_all_customers")
    
    # 2. Create a new customer
    print_section("2. Create New Customer")
    new_customer = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "555-1234"
    }
    result = call_mcp_tool("create_customer", new_customer)
    
    # Extract customer ID from response if available
    customer_id = None
    if result and "result" in result:
        # Try to parse the customer ID from the response
        try:
            content = result["result"]["content"][0]["text"]
            customer_data = json.loads(content)
            customer_id = customer_data.get("customerId") or customer_data.get("id")
        except:
            pass
    
    if customer_id:
        # 3. Get customer by ID
        print_section("3. Get Customer by ID")
        call_mcp_tool("get_customer_by_id", {"customerId": customer_id})
        
        # 4. Update customer
        print_section("4. Update Customer")
        updated_customer = {
            "customerId": customer_id,
            "name": "John Doe Updated",
            "email": "john.updated@example.com",
            "phone": "555-5678"
        }
        call_mcp_tool("update_customer", updated_customer)
        
        # 5. Delete customer
        print_section("5. Delete Customer")
        call_mcp_tool("delete_customer", {"customerId": customer_id})
    else:
        print("⚠️  Could not extract customer ID, skipping remaining tests")

def test_card_workflow():
    """Test complete card workflow"""
    
    print_section("CARD WORKFLOW TEST")
    
    # 1. Get all cards
    print_section("1. Get All Cards")
    call_mcp_tool("get_all_cards")
    
    # Note: To fully test cards, you'd need a valid customerId
    print("\n⚠️  To test card operations, you need a valid customerId from the CMS API")
    print("   Example:")
    print('   call_mcp_tool("create_card", {')
    print('       "customerId": "12345",')
    print('       "cardNumber": "4111111111111111",')
    print('       "cardType": "Credit",')
    print('       "expiryDate": "12/25"')
    print('   })')

def main():
    print_section("CMS Demo MCP Server - Test Client")
    print(f"Server URL: {MCP_SERVER_URL}")
    print(f"\nMake sure the MCP server is running!")
    print(f"   ./run.sh  OR  ./START_DEBUG.sh  OR  Press F5 in Cursor")
    
    # List available tools
    print_section("Available MCP Tools")
    list_tools()
    
    # Ask user what to test
    print("\n" + "="*60)
    print("What would you like to test?")
    print("="*60)
    print("1. Customer workflow (create, read, update, delete)")
    print("2. Card workflow (list cards)")
    print("3. List tools only")
    print("4. Custom tool call")
    print("0. Exit")
    
    choice = input("\nEnter your choice (0-4): ").strip()
    
    if choice == "1":
        test_customer_workflow()
    elif choice == "2":
        test_card_workflow()
    elif choice == "3":
        list_tools()
    elif choice == "4":
        tool_name = input("Enter tool name: ").strip()
        params_str = input("Enter parameters as JSON (or press Enter for none): ").strip()
        params = json.loads(params_str) if params_str else None
        call_mcp_tool(tool_name, params)
    elif choice == "0":
        print("Goodbye!")
        sys.exit(0)
    else:
        print("Invalid choice!")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nInterrupted by user. Goodbye!")
        sys.exit(0)

