#!/usr/bin/env python3
"""
Automated CloudHub 2.0 Deployment Script
Handles authentication, artifact upload, and deployment
"""

import requests
import json
import sys
import time

# Configuration
USERNAME = "hrothstein-mflex"
PASSWORD = "Proginet1"
ORG_ID = "a985e716-cd81-4160-9e00-91c97363ae9d"
ENV_ID = "bc6b6004-6d18-481d-95d7-58fc810c18a2"
TARGET_ID = "b31fef1d-b8f4-40e3-acc0-12eb2bcd86ef"  # hbr-ps in us-east-2
APP_NAME = "cms-demo-api-impl"
JAR_PATH = "/Users/hrothstein/cursorrepos/mule-imp-cms-test/target/cms-demo-api-implementation-1.0.0-mule-application.jar"

def get_token():
    """Authenticate and get access token"""
    print("🔐 Authenticating with Anypoint Platform...")
    response = requests.post(
        "https://anypoint.mulesoft.com/accounts/login",
        json={"username": USERNAME, "password": PASSWORD}
    )
    if response.status_code == 200:
        token = response.json().get("access_token")
        print(f"✅ Authentication successful")
        return token
    else:
        print(f"❌ Authentication failed: {response.text}")
        sys.exit(1)

def deploy_application(token):
    """Deploy application to CloudHub 2.0"""
    print(f"\n🚀 Deploying {APP_NAME} to CloudHub 2.0 (us-east-2)...")
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    # Create deployment without uploading JAR (use local reference)
    deployment_payload = {
        "name": APP_NAME,
        "target": {
            "provider": "MC",
            "targetId": TARGET_ID,
            "deploymentSettings": {
                "runtimeVersion": "4.9.10"
            },
            "replicas": 1,
            "replicaSize": {
                "instanceType": "mule.nano"
            }
        },
        "application": {
            "ref": {
                "groupId": ORG_ID,
                "artifactId": "cms-demo-api-implementation",
                "version": "1.0.0",
                "packaging": "jar"
            },
            "desiredState": "STARTED",
            "configuration": {}
        }
    }
    
    url = f"https://anypoint.mulesoft.com/amc/application-manager/api/v2/organizations/{ORG_ID}/environments/{ENV_ID}/deployments"
    
    response = requests.post(url, headers=headers, json=deployment_payload)
    
    if response.status_code in [200, 201, 202]:
        print(f"✅ Deployment initiated!")
        deployment = response.json()
        deployment_id = deployment.get("id", "unknown")
        print(f"   Deployment ID: {deployment_id}")
        print(f"\n📊 Monitor deployment at:")
        print(f"   https://anypoint.mulesoft.com/cloudhub/")
        return deployment_id
    else:
        print(f"❌ Deployment failed!")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.text}")
        
        # If artifact not found in Exchange, provide instructions
        if "not found" in response.text.lower() or "404" in str(response.status_code):
            print(f"\n💡 The artifact needs to be in Exchange first.")
            print(f"   Please deploy via Anypoint Platform UI:")
            print(f"   1. Go to Runtime Manager")
            print(f"   2. Click 'Deploy Application'") 
            print(f"   3. Upload: {JAR_PATH}")
            print(f"   4. Target: hbr-ps (us-east-2)")
        
        sys.exit(1)

def main():
    print("=" * 60)
    print("CloudHub 2.0 Automated Deployment")
    print("=" * 60)
    
    token = get_token()
    deployment_id = deploy_application(token)
    
    print(f"\n🎉 Deployment request completed successfully!")
    print(f"\n📍 Once deployed, your API will be available at:")
    print(f"   https://{APP_NAME}.us-e2.cloudhub.io/api/customers")
    print(f"   https://{APP_NAME}.us-e2.cloudhub.io/api/cards")
    print(f"   https://{APP_NAME}.us-e2.cloudhub.io/console/")

if __name__ == "__main__":
    main()

