#!/bin/bash
# Start Mule Application with Debug Port Enabled

echo "🚀 Starting Mule Application with Debug Port..."
echo "📍 Debug port: 5005"
echo "🌐 API will be available at: http://localhost:8081/api"
echo "📊 API Console: http://localhost:8081/console"
echo ""
echo "⏳ Starting... (this may take 30-60 seconds)"
echo ""

cd "$(dirname "$0")"
mvn clean package -DskipTests
mvn mule:run -Dmule.debug.enable=true -Dmule.debug.port=5005 -Dmule.debug.suspend=false

echo ""
echo "✅ Mule is running with debug enabled!"
echo "👉 Now press F5 in VS Code and select 'Debug Mule (Attach)'"


