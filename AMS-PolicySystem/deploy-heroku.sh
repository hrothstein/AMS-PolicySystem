#!/bin/bash
set -e

echo "🚀 Deploying AMS Policy System to Heroku (heroku-dta-demos team)..."

# Check if logged in to Heroku
if ! heroku auth:whoami > /dev/null 2>&1; then
    echo "❌ Not logged in to Heroku. Please run: heroku login"
    exit 1
fi

# App name
APP_NAME="ams-policy-system"

# Check if app exists
if heroku apps:info --app=$APP_NAME > /dev/null 2>&1; then
    echo "✅ App $APP_NAME already exists"
else
    echo "📦 Creating Heroku app: $APP_NAME in heroku-dta-demos team..."
    heroku create $APP_NAME --team heroku-dta-demos
fi

# Set environment variables
echo "⚙️  Setting environment variables..."
heroku config:set NODE_ENV=production --app=$APP_NAME
heroku config:set JWT_SECRET=$(openssl rand -base64 32) --app=$APP_NAME

# Add Heroku remote if not exists
if ! git remote | grep -q heroku; then
    echo "🔗 Adding Heroku remote..."
    heroku git:remote --app=$APP_NAME
fi

# Deploy to Heroku
echo "🚢 Deploying to Heroku..."
git push heroku main

# Open the app
echo "✅ Deployment complete!"
echo "🌐 Opening app..."
heroku open --app=$APP_NAME

echo ""
echo "📊 Admin credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "🔍 View logs: heroku logs --tail --app=$APP_NAME"
echo "📱 Open app: heroku open --app=$APP_NAME"

