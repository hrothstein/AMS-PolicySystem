# Deploy to CloudHub - Instructions

## CloudHub Configuration
- **Region**: us-east-2 (US East - Ohio)
- **Environment**: Sandbox
- **Worker**: 1 x MICRO (0.1 vCores)
- **App Name**: cms-demo-api-impl

## Option 1: Deploy via Maven (Command Line)

### Step 1: Set Anypoint Platform Credentials

**Option A - Using Maven settings.xml (Recommended)**

Edit `~/.m2/settings.xml` and add:

```xml
<settings>
  <servers>
    <server>
      <id>anypoint-exchange-v2</id>
      <username>YOUR_ANYPOINT_USERNAME</username>
      <password>YOUR_ANYPOINT_PASSWORD</password>
    </server>
  </servers>
</settings>
```

**Option B - Using Environment Variables**

```bash
export ANYPOINT_USERNAME="your-username"
export ANYPOINT_PASSWORD="your-password"
```

### Step 2: Deploy

```bash
cd /Users/hrothstein/cursorrepos/mule-imp-cms-test

mvn clean package deploy -DmuleDeploy \
  -Danypoint.username=$ANYPOINT_USERNAME \
  -Danypoint.password=$ANYPOINT_PASSWORD
```

## Option 2: Deploy via Anypoint Platform UI

### Step 1: Build the Application

```bash
cd /Users/hrothstein/cursorrepos/mule-imp-cms-test
mvn clean package -DskipTests
```

This creates: `target/cms-demo-api-implementation-1.0.0-mule-application.jar`

### Step 2: Deploy via UI

1. Go to https://anypoint.mulesoft.com
2. Navigate to **Runtime Manager**
3. Click **Deploy Application**
4. Upload the JAR file from the target folder
5. Configure:
   - **Application Name**: `cms-demo-api-impl`
   - **Deployment Target**: CloudHub
   - **Environment**: Sandbox (or your preferred environment)
   - **Region**: US East (Ohio) - us-east-2
   - **Runtime**: Mule 4.9.10
   - **Worker Size**: Micro (0.1 vCores)
   - **Workers**: 1
6. Click **Deploy Application**

## Option 3: Quick Deploy Script

I've created a deployment script for you. Run:

```bash
./deploy-to-cloudhub.sh
```

(Make sure to set your credentials first!)

## After Deployment

Your API will be available at:
```
https://cms-demo-api-impl.us-e2.cloudhub.io/api/customers
https://cms-demo-api-impl.us-e2.cloudhub.io/api/cards
https://cms-demo-api-impl.us-e2.cloudhub.io/console/
```

## Verify Deployment

```bash
# Test customers endpoint
curl https://cms-demo-api-impl.us-e2.cloudhub.io/api/customers

# Test cards endpoint
curl https://cms-demo-api-impl.us-e2.cloudhub.io/api/cards

# Access console
open https://cms-demo-api-impl.us-e2.cloudhub.io/console/
```

## Troubleshooting

### Authentication Issues
- Verify your Anypoint Platform username/password
- Check if you have permission to deploy to the Sandbox environment
- Verify your account has CloudHub access

### Deployment Fails
- Check Runtime Manager logs in Anypoint Platform
- Verify the region us-east-2 is available for your account
- Try a different environment if Sandbox doesn't exist

### Application Not Starting
- Check logs in Runtime Manager → Applications → cms-demo-api-impl → Logs
- Verify backend connectivity to CMS server (Heroku)
- Check if properties are correctly loaded

## Configuration Properties

The app uses these configurations (already in config.properties):
- `cms.backend.url`: https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com
- `cms.backend.username`: admin
- `cms.backend.password`: admin123

These will work automatically on CloudHub!

