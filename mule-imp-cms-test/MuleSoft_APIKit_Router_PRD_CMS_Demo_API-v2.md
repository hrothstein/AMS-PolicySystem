# Product Requirements Document
## MuleSoft APIKit Router Implementation
### CMS Demo API for Financial Services

**Version:** 1.0  
**Date:** October 2025  
**Status:** Draft for Review

---

## Document Information

| Field | Value |
|-------|-------|
| **Author** | Solutions Engineer, Financial Services Operating Unit |
| **Organization** | Salesforce/MuleSoft Financial Services |
| **Status** | Draft for Review |
| **Target Audience** | Financial Services Institutions, Technical Teams, Solutions Engineers |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Business Context & Financial Services Use Cases](#2-business-context--financial-services-use-cases)
3. [Product Overview](#3-product-overview)
4. [Technical Architecture](#4-technical-architecture)
5. [Implementation Guide](#5-implementation-guide)
6. [Debug Configuration](#6-debug-configuration)
7. [CMS Demo API Specification](#7-cms-demo-api-specification)
8. [Implementation Flows](#8-implementation-flows)
9. [Testing Strategy](#9-testing-strategy)
10. [Deployment Strategy](#10-deployment-strategy)
11. [Success Metrics & KPIs](#11-success-metrics--kpis)
12. [Implementation Timeline](#12-implementation-timeline)
13. [Risks & Mitigation Strategies](#13-risks--mitigation-strategies)
14. [Backend Integration Quick Reference](#14-backend-integration-quick-reference)
15. [Conclusion & Next Steps](#15-conclusion--next-steps)
16. [Implementation Prompt for Coding Agent](#16-implementation-prompt-for-coding-agent)

---

## 1. Executive Summary

This Product Requirements Document defines the implementation of a MuleSoft integration solution using APIKit Router to expose the CMS Demo API from Anypoint Exchange. The solution demonstrates core MuleSoft capabilities for Financial Services institutions, showcasing API-led connectivity, standardized routing patterns, backend system integration with bearer token authentication, and enterprise integration best practices. The implementation connects to a live CMS production backend server, providing real-world customer and card management capabilities.

### 1.1 Purpose

To create a reference implementation that demonstrates MuleSoft APIKit Router capabilities for Financial Services use cases, enabling solutions engineers to showcase platform value and accelerate customer adoption.

### 1.2 Scope

- Implementation of APIKit Router component with CMS Demo API
- Integration with CMS production backend server on Heroku
- Bearer token authentication implementation
- Configuration of Mule runtime debugging environment
- Financial Services-specific use case examples for customers and cards
- Documentation and demonstration materials

### 1.3 Key Benefits

- **Standardized API routing:** Consistent request handling across all endpoints
- **Rapid development:** RAML-driven development accelerates API creation
- **Real backend integration:** Live connection to production CMS server demonstrates real-world scenarios
- **Secure authentication:** Bearer token authentication pattern for API security
- **Financial Services compliance:** Built-in validation and error handling
- **Reusability:** Demonstrates patterns applicable across banking, insurance, and wealth management

---

## 2. Business Context & Financial Services Use Cases

### 2.1 Financial Services Industry Challenges

Financial institutions face unique integration challenges including legacy system modernization, regulatory compliance requirements, real-time processing demands, and the need for secure, scalable API architectures. MuleSoft APIKit Router addresses these challenges through standardized API patterns and enterprise-grade routing capabilities.

### 2.2 Target Use Cases

#### Customer Management Systems

- Unified customer data access across retail banking, wealth management, and insurance divisions
- 360-degree customer view aggregation from multiple core systems
- Real-time customer profile synchronization

#### Retail Banking

- Account inquiry and balance checking APIs
- Transaction history and statement retrieval
- Customer onboarding and KYC data management

#### Wealth Management

- Portfolio management system integration
- Client relationship management APIs
- Investment product catalog services

#### Insurance

- Policy holder information management
- Claims processing and status tracking
- Agent and broker portal APIs

### 2.3 Regulatory and Compliance Considerations

- **Data Privacy:** GDPR, CCPA compliance through controlled data access
- **Security:** SOC 2, PCI-DSS alignment through secure API patterns
- **Audit Trail:** Built-in logging for regulatory reporting
- **Data Residency:** Support for regional deployment requirements

---

## 3. Product Overview

### 3.1 Solution Architecture

The solution implements a MuleSoft Mule 4 application that leverages APIKit Router to automatically generate REST API endpoints based on the CMS Demo API specification from Anypoint Exchange. The architecture follows API-led connectivity principles with clear separation of concerns. The implementation integrates with a live CMS production backend server hosted on Heroku, demonstrating real-world system integration patterns including bearer token authentication, error handling, and data transformation between the API layer and backend systems.

### 3.2 Core Components

| Component | Description |
|-----------|-------------|
| **APIKit Router** | Core routing component that maps HTTP requests to flow implementations based on RAML specification |
| **HTTP Listener** | Exposes REST endpoints on configured host and port |
| **Implementation Flows** | Business logic handlers for each API operation defined in CMS Demo API |
| **Backend Integration** | HTTP Request connectors to CMS production server on Heroku |
| **Authentication Handler** | Bearer token authentication flow for backend API access |
| **Error Handler** | Standardized error handling for consistent API responses |

### 3.3 Technology Stack

- **Runtime:** Mule 4.x
- **Development IDE:** Anypoint Studio 7.x
- **API Specification:** RAML 1.0
- **API Source:** Anypoint Exchange (CMS Demo API)
- **Debug Configuration:** Mule XML Debugger
- **Backend Server:** CMS Production Server (Heroku)
- **Authentication:** Bearer Token (JWT)
- **Protocol:** HTTPS/TLS

---

## 4. Technical Architecture

### 4.1 APIKit Router Architecture

APIKit Router provides automatic REST endpoint generation based on RAML specifications. It performs request validation, content negotiation, and automatic routing to implementation flows. The router acts as the central hub for all API traffic, ensuring consistent behavior across all endpoints.

### 4.2 Request Processing Flow

1. Client sends HTTP request to API endpoint
2. HTTP Listener receives request and passes to APIKit Router
3. APIKit Router validates request against RAML specification
4. Router maps request to appropriate implementation flow
5. Implementation flow checks for valid bearer token (obtain if needed)
6. HTTP Request made to CMS backend server with bearer token
7. Backend server processes request and returns response
8. Response transformed and formatted according to RAML schema
9. Response returned to client through HTTP Listener

### 4.3 Configuration Components

#### HTTP Listener Configuration

- **Host:** 0.0.0.0 (all interfaces)
- **Port:** 8081 (configurable)
- **Base Path:** /api (from RAML)
- **Protocol:** HTTP (HTTPS for production)

#### APIKit Router Configuration

- **API Definition:** CMS Demo API from Exchange
- **Router Type:** REST Router
- **Validation:** Strict RAML validation enabled
- **Console:** Enabled for development

### 4.4 Backend Integration Configuration

#### CMS Production Server Details

The implementation connects to a live CMS backend server hosted on Heroku:

**Base URL:** `https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com`

**Endpoints:**
- **Cards:** `/admin/cards`
- **Customers:** `/admin/customers`
- **Login:** `/admin/login`

**Authentication:**
- **Type:** Bearer Token
- **Username:** admin
- **Password:** admin123
- **Flow:** Login to obtain bearer token, then include token in Authorization header for all subsequent requests

**Authentication Sequence:**
1. POST to `/admin/login` with credentials
2. Extract bearer token from response
3. Include token in `Authorization: Bearer <token>` header for all API calls
4. Implement token refresh logic for expired tokens

#### HTTP Request Configuration

- **Protocol:** HTTPS
- **Host:** cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com
- **Port:** 443
- **Timeout:** 30 seconds
- **TLS:** TLS 1.2 or higher

---

## 5. Implementation Guide

### 5.1 Prerequisites

- Anypoint Studio 7.x or later installed
- JDK 8 or 11 installed and configured
- Access to Anypoint Platform and Exchange
- Maven 3.x installed
- Git for version control

### 5.2 Project Setup Steps

#### Step 1: Create New Mule Project

1. Open Anypoint Studio
2. File → New → Mule Project
3. **Project Name:** cms-demo-api-implementation
4. **Runtime:** Mule 4.x

#### Step 2: Import API from Exchange

1. Right-click project in Package Explorer
2. Select Anypoint Platform → Search in Exchange
3. Search for "CMS Demo API"
4. Click "Add to project"
5. Select "Scaffold flows from this API specification"

#### Step 3: Configure APIKit Router

APIKit automatically generates the following:

- Main flow with HTTP Listener and APIKit Router
- Implementation flows for each API endpoint
- Error handling flows
- API Console endpoint

### 5.3 XML Configuration Structure

The generated Mule configuration follows this structure:

**File:** `cms-demo-api-implementation.xml`

The project structure includes:
- Main APIKit Router flow
- Individual implementation flows for each endpoint
- Error handling configuration
- Global configuration elements

---

## 6. Debug Configuration

### 6.1 VS Code Launch Configuration

For debugging the Mule application in Visual Studio Code or Anypoint Studio, create the following launch.json configuration in the `.vscode` directory:

**File:** `.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "mule-xml-debugger",
      "request": "launch",
      "name": "Debug Mule Application",
      "mule.project": "${workspaceFolder}",
      "mule.runtime.args": "${config:mule.runtime.defaultArguments}"
    }
  ]
}
```

### 6.2 Debug Configuration Parameters

| Parameter | Description |
|-----------|-------------|
| `type` | Specifies the debugger type for Mule XML applications |
| `request` | Launch mode initiates a new debug session |
| `mule.project` | Points to the workspace folder containing the Mule project |
| `mule.runtime.args` | References runtime arguments from workspace configuration |

### 6.3 Debugging Best Practices

- Set breakpoints in flow processors before running debug
- Use Message Inspector to examine payload and variables
- Monitor console output for APIKit routing decisions
- Test API Console for quick endpoint validation

---

## 7. CMS Demo API Specification

### 7.1 API Overview

The CMS Demo API from Anypoint Exchange provides a standardized interface for customer management operations in financial services environments. It demonstrates common patterns for customer data access, modification, and lifecycle management.

### 7.2 Expected Endpoints

#### Customer Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/customers` | Retrieve all customers with optional filtering |
| `GET` | `/customers/{id}` | Retrieve specific customer by ID |
| `POST` | `/customers` | Create new customer record |
| `PUT` | `/customers/{id}` | Update existing customer |
| `DELETE` | `/customers/{id}` | Delete customer record |

#### Card Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cards` | Retrieve all cards with optional filtering |
| `GET` | `/cards/{id}` | Retrieve specific card by ID |
| `POST` | `/cards` | Create new card record |
| `PUT` | `/cards/{id}` | Update existing card |
| `DELETE` | `/cards/{id}` | Delete card record |

**Backend Mapping:**
- All customer endpoints proxy to: `https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/customers`
- All card endpoints proxy to: `https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/cards`
- Authentication via: `https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/login`

### 7.3 Financial Services Data Model

#### Customer Data Structure

Customer data typically includes:

- **Identification:** Customer ID, Tax ID, Government ID
- **Personal Information:** Name, Date of Birth, Contact Details
- **Account Relationships:** Linked accounts, products, services
- **Compliance:** KYC status, AML flags, risk rating
- **Preferences:** Communication preferences, service options

#### Card Data Structure

Card data typically includes:

- **Card Identification:** Card ID, Card Number (masked), Card Type
- **Customer Link:** Associated Customer ID
- **Card Details:** Expiration Date, CVV (secured), Card Status
- **Limits:** Credit Limit, Available Credit, Transaction Limits
- **Security:** Fraud Alerts, Block Status, Activation Status

**Data Source:** All data is retrieved from and persisted to the CMS production backend server.

---

## 8. Implementation Flows

### 8.1 Main APIKit Flow

The main flow contains the HTTP Listener and APIKit Router:

- **Flow Name:** `cms-demo-api-main`
- **Source:** HTTP Listener on port 8081
- **Processor:** APIKit Router component
- **Error Handler:** APIKit error mappings

### 8.2 Implementation Flow Pattern

Each API operation maps to an implementation flow following this pattern:

1. **Logger:** Log incoming request details
2. **Transform:** Extract and validate input parameters
3. **Authentication Check:** Verify bearer token exists or obtain new token via login flow
4. **Backend Request:** HTTP Request to CMS production server with bearer token
5. **Error Handling:** Handle backend errors and map to appropriate HTTP status codes
6. **Transform Response:** Format backend response according to RAML schema
7. **Logger:** Log response details

#### Authentication Flow

A separate sub-flow handles authentication:

1. Check if bearer token exists and is valid
2. If not, call `/admin/login` endpoint with credentials (admin/admin123)
3. Extract and store bearer token from response
4. Return token for use in subsequent requests
5. Implement retry logic if token expires during operation

### 8.3 Error Handling Flow

APIKit automatically generates error handlers for common scenarios:

| Error Type | HTTP Status & Description |
|------------|---------------------------|
| BAD_REQUEST | 400 - Invalid request format or parameters |
| NOT_FOUND | 404 - Resource not found |
| METHOD_NOT_ALLOWED | 405 - HTTP method not supported for endpoint |
| NOT_ACCEPTABLE | 406 - Requested content type not available |
| UNSUPPORTED_MEDIA_TYPE | 415 - Request content type not supported |

---

## 9. Testing Strategy

### 9.1 Testing Approach

Comprehensive testing ensures APIKit Router correctly handles all scenarios defined in the RAML specification. Testing should cover functional correctness, error handling, and performance characteristics.

### 9.2 Unit Testing

- Use MUnit framework for automated testing
- Test each implementation flow independently
- Mock backend systems for isolated testing
- Validate request and response transformations

### 9.3 API Console Testing

1. Start Mule application in debug mode
2. Access API Console at `http://localhost:8081/console`
3. Execute each endpoint with sample data
4. Verify responses match RAML specifications

### 9.4 Integration Testing

- Test with actual CMS backend server (https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com)
- Verify end-to-end data flow from API to backend
- Test authentication flow and token management
- Test error scenarios and recovery (401, 404, 500, timeouts)
- Validate data transformation between API and backend formats
- Test all CRUD operations for both customers and cards
- Verify backend connectivity and HTTPS/TLS

### 9.5 Performance Testing

- **Load Testing:** Verify throughput under expected load
- **Stress Testing:** Identify breaking points
- **Response Time:** Measure latency for all endpoints
- **Concurrency:** Test multiple simultaneous requests

---

## 10. Deployment Strategy

### 10.1 Deployment Options

#### CloudHub Deployment

- Anypoint Platform cloud-native deployment
- Automatic scaling and high availability
- Integrated monitoring and alerting

#### Runtime Fabric Deployment

- Container-based deployment for on-premises or cloud
- Kubernetes orchestration for enterprise control
- Suitable for regulated financial services environments

#### Standalone Runtime

- Traditional server deployment model
- Full control over infrastructure
- May be required for air-gapped environments

### 10.2 Environment Strategy

| Environment | Purpose | Configuration |
|-------------|---------|---------------|
| **Development** | Active development | Local Anypoint Studio, debug enabled, mock backends |
| **Test** | Quality assurance | CloudHub/RTF, integrated test systems |
| **Staging** | Pre-production validation | Production-like configuration, real integrations |
| **Production** | Live operations | HA configuration, monitoring, production backends |

### 10.3 CI/CD Pipeline

1. **Source Control:** Git repository with feature branches
2. **Build:** Maven compilation and unit tests
3. **Quality Gates:** Code coverage, security scans
4. **Deployment:** Automated deployment to target environment
5. **Smoke Tests:** Post-deployment validation

---

## 11. Success Metrics & KPIs

### 11.1 Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| API Response Time | < 500ms (p95) | Anypoint Monitoring |
| Availability | 99.9% | Uptime monitoring |
| Error Rate | < 1% | API Analytics |
| Test Coverage | > 80% | MUnit reports |

### 11.2 Business Metrics

- **Time to Market:** Reduction in API development time
- **Developer Productivity:** Increase in API delivery velocity
- **Reusability:** Number of reused integration patterns
- **Customer Satisfaction:** API consumer feedback scores

### 11.3 Demonstration Success Criteria

- Successfully showcase APIKit Router auto-generation capabilities
- Demonstrate Financial Services use case scenarios
- Explain API-led connectivity principles
- Highlight compliance and security features

---

## 12. Implementation Timeline

### 12.1 Phased Approach

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 1** | Week 1 | Project setup, API import, initial scaffolding |
| **Phase 2** | Week 2 | Implementation of core flows, basic testing |
| **Phase 3** | Week 3 | Error handling, comprehensive testing, documentation |
| **Phase 4** | Week 4 | Demo preparation, deployment, knowledge transfer |

### 12.2 Key Milestones

- **M1 (End Week 1):** Project setup complete, API imported
- **M2 (End Week 2):** Core flows implemented and unit tested
- **M3 (End Week 3):** Full integration testing passed
- **M4 (End Week 4):** Demo-ready solution with documentation

---

## 13. Risks & Mitigation Strategies

| Risk | Impact | Mitigation |
|------|--------|------------|
| API specification changes | Medium - Requires flow regeneration | Version control API specs, use semantic versioning |
| Performance bottlenecks | High - Impacts user experience | Early performance testing, caching strategies |
| Integration complexity | Medium - Extended timeline | Phased approach, mock services for development |
| Compliance requirements | High - Regulatory issues | Early compliance review, security by design |

---

## 14. Backend Integration Quick Reference

### CMS Production Server Details

**Base URL:** `https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com`

**Endpoints:**

| Purpose | URL |
|---------|-----|
| Login | `https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/login` |
| Customers | `https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/customers` |
| Cards | `https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/cards` |

**Authentication:**
- **Method:** POST to `/admin/login`
- **Credentials:**
  - Username: `admin`
  - Password: `admin123`
- **Token Type:** Bearer Token
- **Usage:** Include in `Authorization: Bearer <token>` header for all API calls

**Example Login Request:**
```json
POST /admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Example Authenticated Request:**
```
GET /admin/customers
Authorization: Bearer <token-from-login>
```

---

## 15. Conclusion & Next Steps

### 15.1 Summary

This PRD defines a comprehensive implementation of MuleSoft APIKit Router with the CMS Demo API, specifically tailored for Financial Services use cases. The solution demonstrates best practices in API-led connectivity, showcasing how MuleSoft enables rapid API development while maintaining enterprise-grade standards for security, compliance, and performance. The implementation includes live integration with a CMS production backend server, demonstrating real-world authentication patterns, error handling, and system-to-system integration.

### 15.2 Immediate Next Steps

1. Review and approve this PRD with stakeholders
2. Set up development environment and tools
3. Import CMS Demo API from Anypoint Exchange
4. Configure debug environment using provided launch.json
5. Test connectivity to CMS backend server (https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com)
6. Verify authentication flow with provided credentials
7. Begin Phase 1 implementation

### 15.3 Future Enhancements

- **Advanced Security:** OAuth 2.0, JWT validation, API throttling
- **Analytics:** Custom dashboards, business metrics tracking
- **Additional Use Cases:** Payment processing, loan origination, fraud detection
- **Enterprise Patterns:** Circuit breaker, retry policies, message queuing

### 15.4 Resources & References

- **MuleSoft Documentation:** https://docs.mulesoft.com
- **Anypoint Exchange:** https://www.anypoint.mulesoft.com/exchange
- **APIKit Documentation:** https://docs.mulesoft.com/apikit
- **Financial Services Resources:** https://www.mulesoft.com/solutions/financial-services

---

## 16. Implementation Prompt for Coding Agent

### 16.1 Agent Implementation Instructions

The following prompt should be used to instruct a coding agent to implement this solution:

```
You are a MuleSoft development expert. Based on the PRD above, please implement the following:

PROJECT SETUP:
1. Create a new Mule 4 project named "cms-demo-api-implementation"
2. Set up the project structure with proper pom.xml configuration
3. Configure Maven dependencies for Mule 4.x runtime, APIKit, and HTTP Connector

API CONFIGURATION:
4. Import or create the CMS Demo API specification (RAML 1.0)
5. If the exact CMS Demo API is not available in Exchange, create a representative RAML that includes:
   - Base URI: /api
   - Customer resource endpoints: GET /customers, GET /customers/{id}, POST /customers, PUT /customers/{id}, DELETE /customers/{id}
   - Card resource endpoints: GET /cards, GET /cards/{id}, POST /cards, PUT /cards/{id}, DELETE /cards/{id}
   - Proper data types and examples for Financial Services customer and card data
   - Error response schemas

BACKEND INTEGRATION CONFIGURATION:
6. Configure HTTP Request config for the CMS production server:
   - Base URL: https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com
   - Protocol: HTTPS
   - Port: 443
   - Timeout: 30 seconds

BACKEND ENDPOINTS:
   - Cards: /admin/cards
   - Customers: /admin/customers
   - Login: /admin/login

AUTHENTICATION IMPLEMENTATION:
7. Create an authentication sub-flow that:
   - Sends POST request to https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/login
   - Uses credentials: username="admin", password="admin123"
   - Extracts the bearer token from the login response
   - Stores the token in a variable for reuse
   - Returns the token for use in API calls

8. Implement token management:
   - Check if token exists before making backend calls
   - If no token or token expired, call authentication flow
   - Include token in Authorization header as "Bearer <token>"
   - Handle 401 Unauthorized by refreshing token

APIKIT ROUTER IMPLEMENTATION:
9. Generate APIKit Router scaffolding from the RAML specification
10. Configure HTTP Listener on port 8081 with base path /api
11. Implement the main APIKit Router flow with proper error handling

IMPLEMENTATION FLOWS:
12. Implement each endpoint with the following pattern:
   - Logger component for request logging
   - Call authentication sub-flow to get bearer token
   - DataWeave transformations for request mapping
   - HTTP Request to backend CMS server with:
     * Full backend URL (e.g., https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/customers)
     * Authorization header with bearer token
     * Appropriate HTTP method (GET, POST, PUT, DELETE)
     * Request body for POST/PUT operations
   - Handle backend responses and errors
   - Transform backend response to match RAML schema
   - Logger component for response logging

13. Implement the following endpoint mappings:

    GET /api/customers → GET https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/customers
    GET /api/customers/{id} → GET https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/customers/{id}
    POST /api/customers → POST https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/customers
    PUT /api/customers/{id} → PUT https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/customers/{id}
    DELETE /api/customers/{id} → DELETE https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/customers/{id}
    
    GET /api/cards → GET https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/cards
    GET /api/cards/{id} → GET https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/cards/{id}
    POST /api/cards → POST https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/cards
    PUT /api/cards/{id} → PUT https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/cards/{id}
    DELETE /api/cards/{id} → DELETE https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/cards/{id}

ERROR HANDLING:
14. Configure APIKit error handlers for: BAD_REQUEST, NOT_FOUND, METHOD_NOT_ALLOWED, NOT_ACCEPTABLE, UNSUPPORTED_MEDIA_TYPE
15. Implement custom error handling for backend failures:
    - 401 Unauthorized: Trigger token refresh and retry
    - 404 Not Found: Return proper 404 response to client
    - 500 Server Error: Log error and return standardized error response
    - Connection timeout: Return 503 Service Unavailable
    - Network errors: Proper error logging and client response

DEBUG CONFIGURATION:
16. Create .vscode/launch.json with the exact configuration specified in section 6.1:
    - type: "mule-xml-debugger"
    - request: "launch"
    - name: "Debug Mule Application"
    - mule.project: "${workspaceFolder}"
    - mule.runtime.args: "${config:mule.runtime.defaultArguments}"

CONFIGURATION PROPERTIES:
17. Create a properties file (config.yaml or config.properties) with:
    - cms.backend.url=https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com
    - cms.backend.username=admin
    - cms.backend.password=admin123
    - http.port=8081

TESTING:
18. Create MUnit test cases covering:
    - Authentication flow (login and token retrieval)
    - Successful GET /customers request
    - Successful GET /customers/{id} request
    - Successful POST /customers request
    - 404 error handling for non-existent customer
    - 401 error handling and token refresh
    - Backend connection failure scenarios

DOCUMENTATION:
19. Create a README.md with:
    - Project description
    - Backend server information and credentials
    - How to run the application
    - API endpoint documentation
    - Authentication flow explanation
    - Testing instructions
    - Troubleshooting guide
    - Reference to this PRD

DELIVERABLES:
- Complete Mule project with all XML configuration files
- pom.xml with all dependencies (HTTP Connector, APIKit, etc.)
- RAML API specification for customers and cards endpoints
- Authentication sub-flow implementation
- HTTP Request configurations for backend integration
- .vscode/launch.json for debugging
- Configuration properties file
- MUnit test files
- README.md documentation

CRITICAL REQUIREMENTS:
- All backend calls MUST include the bearer token in Authorization header
- Token must be obtained via login endpoint before first backend call
- Implement proper error handling for authentication failures
- Use externalized configuration for credentials (not hardcoded)
- Log all backend requests and responses for debugging
- Ensure proper HTTPS/TLS configuration

Ensure all components follow MuleSoft best practices and the architecture described in this PRD.
```

### 16.2 Validation Checklist

After implementation, verify:

- [ ] Project builds successfully with Maven
- [ ] APIKit Router correctly routes all customer and card endpoints
- [ ] Authentication flow successfully obtains bearer token from login endpoint
- [ ] Bearer token is included in all backend API requests
- [ ] Backend integration works for all CRUD operations (GET, POST, PUT, DELETE)
- [ ] Customers endpoint connects to https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/customers
- [ ] Cards endpoint connects to https://cms-backend-cards-fixed-8b8fe49bfe37.herokuapp.com/admin/cards
- [ ] 401 errors trigger token refresh and retry
- [ ] Debug configuration works in VS Code/Anypoint Studio
- [ ] API Console is accessible at http://localhost:8081/console
- [ ] All MUnit tests pass including authentication tests
- [ ] Error handling returns proper HTTP status codes for backend failures
- [ ] Configuration properties externalize credentials and URLs
- [ ] Backend requests and responses are properly logged
- [ ] HTTPS/TLS connection to backend works correctly

---

**End of Document**

*Confidential - Salesforce/MuleSoft Financial Services*
