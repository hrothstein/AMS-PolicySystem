#!/bin/bash
# Final Automated CloudHub 2.0 Deployment
# This script runs Maven deployment in background and monitors progress

set -e

echo "🚀 Starting Automated CloudHub 2.0 Deployment"
echo "=============================================="
echo ""

cd /Users/hrothstein/cursorrepos/mule-imp-cms-test

echo "📦 Step 1: Clean build"
mvn clean package -DskipTests -q
echo "✅ Build complete"
echo ""

echo "📤 Step 2: Deploying to CloudHub 2.0 (this takes 8-12 minutes)..."
echo "   Target: us-east-2 (hbr-ps)"
echo "   Instance: mule.nano"
echo ""

# Run deployment in background with timeout
timeout 900 mvn deploy -DmuleDeploy \
  -Danypoint.username=hrothstein-mflex \
  -Danypoint.password=Proginet1 \
  -DskipTests 2>&1 | while read line; do
    if [[ "$line" == *"Uploading"* ]] || [[ "$line" == *"Deploying"* ]] || [[ "$line" == *"BUILD"* ]]; then
        echo "   $line"
    fi
done

EXIT_CODE=$?

echo ""
if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ DEPLOYMENT SUCCESSFUL!"
    echo ""
    echo "📍 Your API is now live at:"
    echo "   https://cms-demo-api-impl.us-e2.cloudhub.io/api/customers"
    echo "   https://cms-demo-api-impl.us-e2.cloudhub.io/api/cards"
    echo "   https://cms-demo-api-impl.us-e2.cloudhub.io/console/"
    echo ""
    echo "📊 Monitor at: https://anypoint.mulesoft.com/runtime-manager/"
else
    echo "⚠️  Deployment timed out or failed (exit code: $EXIT_CODE)"
    echo ""
    echo "The application JAR is built and ready at:"
    echo "  target/cms-demo-api-implementation-1.0.0-mule-application.jar"
    echo ""
    echo "Options to complete deployment:"
    echo "1. Wait and retry: ./deploy-final.sh"
    echo "2. Deploy via Runtime Manager UI (fastest - 2 minutes)"
    echo "3. Check Maven logs for details"
fi

