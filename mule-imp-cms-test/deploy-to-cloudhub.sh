#!/bin/bash
# CloudHub Deployment Script for CMS Demo API

echo "🚀 CloudHub Deployment Script"
echo "=============================="
echo ""

# Check if credentials are set
if [ -z "$ANYPOINT_USERNAME" ] || [ -z "$ANYPOINT_PASSWORD" ]; then
    echo "⚠️  Credentials not found in environment variables"
    echo ""
    read -p "Enter your Anypoint Platform username: " ANYPOINT_USERNAME
    read -s -p "Enter your Anypoint Platform password: " ANYPOINT_PASSWORD
    echo ""
    echo ""
fi

echo "📦 Building application..."
mvn clean package -DskipTests -q

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""
echo "🌐 Deploying to CloudHub..."
echo "   Region: us-east-2"
echo "   Environment: Sandbox"
echo "   App Name: cms-demo-api-impl"
echo ""

mvn deploy -DmuleDeploy \
  -Danypoint.username="$ANYPOINT_USERNAME" \
  -Danypoint.password="$ANYPOINT_PASSWORD" \
  -DskipTests

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🎉 Your API is deploying to CloudHub!"
    echo ""
    echo "📍 Once deployed, your API will be available at:"
    echo "   https://cms-demo-api-impl.us-e2.cloudhub.io/api/customers"
    echo "   https://cms-demo-api-impl.us-e2.cloudhub.io/api/cards"
    echo "   https://cms-demo-api-impl.us-e2.cloudhub.io/console/"
    echo ""
    echo "📊 Monitor deployment at:"
    echo "   https://anypoint.mulesoft.com/cloudhub/#/console/home/applications"
    echo ""
else
    echo ""
    echo "❌ Deployment failed!"
    echo ""
    echo "Troubleshooting tips:"
    echo "1. Verify your Anypoint Platform credentials"
    echo "2. Check if you have access to the Sandbox environment"
    echo "3. Ensure the app name 'cms-demo-api-impl' is available"
    echo "4. Check Runtime Manager for more details"
    exit 1
fi

