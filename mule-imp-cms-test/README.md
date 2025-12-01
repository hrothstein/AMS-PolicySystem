# CMS Demo API Implementation
## MuleSoft APIKit Router for Financial Services

### Overview

This project implements a complete Customer Management System (CMS) Demo API using MuleSoft APIKit Router. It demonstrates API-led connectivity principles and best practices for Financial Services use cases including retail banking, wealth management, and insurance.

**Key Features:**
- ✅ APIKit Router with automatic RAML-based endpoint generation
- ✅ 5 customer management endpoints (CRUD operations)
- ✅ Financial Services compliant data model (KYC, risk ratings, compliance fields)
- ✅ Comprehensive error handling (400, 404, 405, 406, 415, 500)
- ✅ Mock Financial Services customer data
- ✅ Query parameter filtering support
- ✅ Proper HTTP status codes and response formatting
- ✅ Request/response logging
- ✅ APIKit Console for testing

---

## Architecture

### Components

| Component | Description |
|-----------|-------------|
| **HTTP Listener** | Exposes REST endpoints on `0.0.0.0:8081` |
| **APIKit Router** | Routes requests to implementation flows based on RAML specification |
| **Implementation Flows** | Business logic for each customer operation |
| **Error Handlers** | Standardized APIKit error responses |
| **APIKit Console** | Interactive API testing interface |

### Technology Stack

- **Runtime:** Mule 4.10.0
- **JDK:** 17
- **API Specification:** RAML 1.0
- **Build Tool:** Maven
- **IDE Support:** Anypoint Studio, VS Code with Mule XML Debugger

---

## API Endpoints

### Base URL
```
http://localhost:8081/api
```

### Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/customers` | Retrieve all customers with optional filtering | 200, 400, 500 |
| `GET` | `/customers/{id}` | Retrieve specific customer by ID | 200, 404, 500 |
| `POST` | `/customers` | Create new customer record | 201, 400, 500 |
| `PUT` | `/customers/{id}` | Update existing customer | 200, 404, 400, 500 |
| `DELETE` | `/customers/{id}` | Delete customer record | 204, 404, 500 |

### Query Parameters (GET /customers)

- `accountType` - Filter by account type (CHECKING, SAVINGS, INVESTMENT, LOAN, CREDIT_CARD)
- `status` - Filter by customer status (ACTIVE, INACTIVE, SUSPENDED, CLOSED)
- `kycStatus` - Filter by KYC status (PENDING, VERIFIED, REJECTED, EXPIRED)

---

## Financial Services Data Model

### Customer Object

```json
{
  "customerId": "CUST-12345",
  "firstName": "John",
  "lastName": "Smith",
  "taxId": "123-45-6789",
  "dateOfBirth": "1985-03-15",
  "email": "john.smith@example.com",
  "phone": "+1-555-123-4567",
  "accountType": "CHECKING",
  "kycStatus": "VERIFIED",
  "riskRating": "LOW",
  "customerSince": "2020-01-15",
  "status": "ACTIVE",
  "address": {
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

### Field Descriptions

- **customerId** - Unique customer identifier (auto-generated)
- **taxId** - Tax identification number for compliance
- **accountType** - Primary account type (banking product)
- **kycStatus** - Know Your Customer verification status
- **riskRating** - Customer risk rating for AML compliance
- **customerSince** - Customer relationship start date
- **status** - Account status for lifecycle management

---

## Getting Started

### Prerequisites

- **Java JDK 17** installed and configured
- **Maven 3.x** installed
- **Anypoint Studio 7.x** or **VS Code** with MuleSoft extensions (optional)
- **Git** for version control

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd /Users/hrothstein/cursorrepos/mule-imp-cms-test/cms-demo-api-implementation
   ```

2. **Build the project:**
   ```bash
   mvn clean package
   ```

3. **Run the application:**
   ```bash
   mvn mule:run
   ```
   
   Or use the MuleSoft MCP server:
   ```bash
   # The application will start automatically
   ```

### Running with Debug Mode

The project includes a VS Code debug configuration at `.vscode/launch.json`:

1. Open the project in VS Code
2. Press `F5` or go to Run → Start Debugging
3. Select "Debug Mule Application"
4. Set breakpoints in flows as needed

---

## Testing the API

### Using APIKit Console

1. Start the Mule application
2. Open your browser and navigate to:
   ```
   http://localhost:8081/console
   ```
3. The interactive console will display all available endpoints with documentation
4. Test each endpoint directly from the browser

### Using cURL

**Get all customers:**
```bash
curl -X GET http://localhost:8081/api/customers
```

**Get customer by ID:**
```bash
curl -X GET http://localhost:8081/api/customers/CUST-12345
```

**Filter customers by account type:**
```bash
curl -X GET "http://localhost:8081/api/customers?accountType=CHECKING"
```

**Create new customer:**
```bash
curl -X POST http://localhost:8081/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Williams",
    "email": "alice.williams@example.com",
    "accountType": "SAVINGS"
  }'
```

**Update customer:**
```bash
curl -X PUT http://localhost:8081/api/customers/CUST-12345 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Smith-Updated",
    "email": "john.updated@example.com",
    "accountType": "INVESTMENT"
  }'
```

**Delete customer:**
```bash
curl -X DELETE http://localhost:8081/api/customers/CUST-12345
```

### Using Postman

1. Import the RAML specification from `src/main/resources/api/cms-demo-api.raml`
2. Postman will automatically generate all API requests
3. Set base URL to `http://localhost:8081/api`
4. Execute requests and view responses

---

## Mock Data

The implementation includes three sample customers demonstrating Financial Services use cases:

| Customer ID | Name | Account Type | KYC Status | Risk Rating | Location |
|-------------|------|--------------|------------|-------------|----------|
| CUST-12345 | John Smith | CHECKING | VERIFIED | LOW | New York, NY |
| CUST-67890 | Jane Doe | SAVINGS | VERIFIED | LOW | Boston, MA |
| CUST-11111 | Robert Johnson | INVESTMENT | PENDING | MEDIUM | Chicago, IL |

---

## Project Structure

```
cms-demo-api-implementation/
├── .vscode/
│   └── launch.json                    # Debug configuration
├── src/
│   ├── main/
│   │   ├── mule/
│   │   │   ├── cms-demo-api-implementation.xml  # Main flows and endpoints
│   │   │   └── global.xml                       # Global configurations
│   │   └── resources/
│   │       ├── api/
│   │       │   └── cms-demo-api.raml            # API specification
│   │       ├── config.properties                # Environment properties
│   │       └── log4j2.xml                       # Logging configuration
│   └── test/
│       ├── munit/                     # MUnit test files (future)
│       └── resources/
├── pom.xml                            # Maven project configuration
├── mule-artifact.json                 # Mule artifact descriptor
└── README.md                          # This file
```

---

## Configuration

### Environment Properties

Edit `src/main/resources/config.properties` to configure:

```properties
# HTTP Listener Configuration
http.host=0.0.0.0
http.port=8081

# APIKit Configuration
apikit.outboundHeadersMapName=outboundHeaders
apikit.httpStatusVarName=httpStatus
```

### Changing the Port

To run on a different port:
1. Edit `config.properties` and change `http.port`
2. Restart the application
3. Access API at `http://localhost:{NEW_PORT}/api`

---

## Error Handling

The API implements comprehensive error handling for all APIKit scenarios:

| Error Type | HTTP Status | Description |
|------------|-------------|-------------|
| `BAD_REQUEST` | 400 | Invalid request format or parameters |
| `NOT_FOUND` | 404 | Resource not found (endpoint or data) |
| `METHOD_NOT_ALLOWED` | 405 | HTTP method not supported for endpoint |
| `NOT_ACCEPTABLE` | 406 | Requested content type not available |
| `UNSUPPORTED_MEDIA_TYPE` | 415 | Request content type not supported |

### Error Response Format

All errors return a consistent JSON structure:

```json
{
  "error": "NOT_FOUND",
  "message": "Customer with ID CUST-99999 not found",
  "timestamp": "2025-10-09T10:30:00Z",
  "path": "/api/customers/CUST-99999"
}
```

---

## Logging

The application logs all requests and responses:

- **Request logging:** Logs incoming request details and parameters
- **Response logging:** Logs operation results and response data
- **Error logging:** Logs warnings for 404s and errors for exceptions

View logs in the console output or configure log4j2.xml for file output.

---

## Financial Services Use Cases

This implementation demonstrates patterns applicable to:

### Retail Banking
- Customer account management
- Profile updates and KYC verification
- Account status lifecycle management

### Wealth Management
- Client relationship management
- Investment account tracking
- Risk assessment and compliance

### Insurance
- Policy holder information management
- Customer onboarding workflows
- Agent and broker portal integration

---

## Performance & Scalability

### Current Implementation
- Mock in-memory data (3 customers)
- Synchronous processing
- Single instance deployment

### Production Recommendations
- Replace mock data with database connector (MySQL, PostgreSQL)
- Implement caching for frequently accessed data
- Add API throttling and rate limiting
- Deploy to CloudHub 2.0 or Runtime Fabric with multiple replicas
- Enable persistent Object Store for stateful operations
- Implement Circuit Breaker pattern for backend failures

---

## Deployment

### Local Development
Already configured - just run `mvn mule:run`

### CloudHub 2.0 Deployment
```bash
# Configure Anypoint credentials first
mvn deploy -DmuleDeploy \
  -Dmule.artifact=cms-demo-api-implementation \
  -Danypoint.environment=Sandbox \
  -Danypoint.businessGroup=YourBusinessGroup
```

### Runtime Fabric Deployment
1. Package application: `mvn clean package`
2. Deploy through Anypoint Runtime Manager
3. Configure environment variables
4. Set replica count for high availability

---

## Compliance & Security

### Built-in Compliance Features
- **KYC Status Tracking** - Know Your Customer verification
- **Risk Rating** - AML compliance risk assessment
- **Audit Logging** - Full request/response logging
- **Data Validation** - RAML-enforced schema validation

### Production Security Enhancements
- Implement OAuth 2.0 or JWT authentication
- Enable HTTPS/TLS for all endpoints
- Add API key validation
- Implement field-level encryption for PII (tax ID, SSN)
- Configure IP whitelisting
- Enable DDoS protection

---

## Troubleshooting

### Application won't start
- **Check port availability:** `lsof -i :8081`
- **Verify Java version:** `java -version` (should be 17)
- **Check Maven build:** `mvn clean compile`

### RAML parsing errors
- Validate RAML syntax at https://www.ramlplayground.com/
- Ensure RAML file is in `src/main/resources/api/`
- Check for proper indentation (YAML format)

### 404 errors on all endpoints
- Verify base path is `/api` in global.xml
- Check HTTP Listener configuration
- Ensure APIKit Router is properly configured

### Debugging issues
- Check `.vscode/launch.json` exists
- Install Mule XML Debugger extension for VS Code
- Set breakpoints and inspect flow variables

---

## Testing Strategy (Future Enhancements)

### Unit Testing with MUnit
Create test files in `src/test/munit/`:
- Test each endpoint independently
- Mock DataWeave transformations
- Validate response schemas
- Test error scenarios

### Integration Testing
- Test with actual backend systems in lower environments
- Verify end-to-end data flow
- Performance testing with load generation tools
- Security testing (penetration testing)

---

## References & Documentation

- **Product Requirements Document:** `MuleSoft_APIKit_Router_PRD_CMS_Demo_API.md`
- **MuleSoft APIKit Documentation:** https://docs.mulesoft.com/apikit
- **RAML Specification:** https://raml.org/
- **Mule 4 Documentation:** https://docs.mulesoft.com/mule-runtime/4.4/
- **DataWeave Reference:** https://docs.mulesoft.com/dataweave/2.4/
- **Financial Services Solutions:** https://www.mulesoft.com/solutions/financial-services

---

## Contributing

This is a demonstration project. To extend functionality:

1. Fork the project
2. Create a feature branch
3. Implement new endpoints or integrations
4. Add MUnit tests
5. Update this README
6. Submit a pull request

---

## License

This project is created for demonstration and educational purposes as part of MuleSoft Financial Services solutions engineering.

---

## Support & Contact

For questions or issues:
- **Internal:** Contact MuleSoft Financial Services Operating Unit
- **Documentation:** Refer to PRD and linked resources
- **Technical Support:** Anypoint Platform Support Portal

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | October 2025 | Initial implementation with 5 customer endpoints |

---

**Status:** ✅ Production-Ready Demo  
**Last Updated:** October 9, 2025  
**Maintained By:** Solutions Engineer, Financial Services Operating Unit

