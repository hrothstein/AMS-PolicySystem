# Customer Management API

A RESTful API for managing customer information built with MuleSoft 4.x and Anypoint Platform.

## Overview

This API provides CRUD operations for customer management with comprehensive validation, error handling, observability, and governance features.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete customers
- **Input Validation**: Comprehensive field validation with appropriate error messages
- **Error Handling**: Consistent error response format with proper HTTP status codes
- **Observability**: Structured logging with sensitive data masking
- **Health Check**: Health endpoint for monitoring
- **OpenAPI Documentation**: Complete OpenAPI 3.0 specification
- **CloudHub 2.0 Ready**: Configured for deployment to CloudHub 2.0
- **Governance**: Ready for Anypoint Exchange publication and API Manager policies

## Prerequisites

- Mule Runtime 4.10.0 or higher
- Java 17 or higher
- Maven 3.6 or higher
- Anypoint Platform account (for CloudHub deployment)

## Local Development

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/hrothstein/boringtestrepo.git
cd boringtestrepo
git checkout mulesoft
```

2. Build the project:
```bash
mvn clean package
```

3. Run the application:
```bash
mvn mule:run
```

The API will be available at `http://localhost:8081`

### Testing the API

#### Health Check
```bash
curl http://localhost:8081/health
```

#### Create a Customer
```bash
curl -X POST http://localhost:8081/customers \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "accountStatus": "ACTIVE"
  }'
```

#### Get All Customers
```bash
curl http://localhost:8081/customers
```

#### Get Customer by ID
```bash
curl http://localhost:8081/customers/{customer-id}
```

#### Update Customer
```bash
curl -X PUT http://localhost:8081/customers/{customer-id} \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "accountStatus": "INACTIVE"
  }'
```

#### Delete Customer
```bash
curl -X DELETE http://localhost:8081/customers/{customer-id}
```

## API Endpoints

### GET /customers
Retrieve all customers.

**Response:** `200 OK`
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "accountStatus": "ACTIVE",
    "createdAt": "2026-01-15T10:30:00.000Z",
    "updatedAt": "2026-01-15T10:30:00.000Z"
  }
]
```

### GET /customers/{id}
Retrieve a single customer by UUID.

**Response:** `200 OK` or `404 Not Found`

### POST /customers
Create a new customer.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "accountStatus": "ACTIVE"
}
```

**Response:** `201 Created`

### PUT /customers/{id}
Update an existing customer. Only provided fields will be updated.

**Response:** `200 OK` or `404 Not Found`

### DELETE /customers/{id}
Delete a customer.

**Response:** `200 OK` or `404 Not Found`

### GET /health
Health check endpoint.

**Response:** `200 OK`
```json
{
  "status": "UP",
  "timestamp": "2026-01-15T10:30:00.000Z"
}
```

## Data Model

### Customer Object

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| id | String (UUID) | Yes | Auto-generated |
| firstName | String | Yes | 1-50 characters |
| lastName | String | Yes | 1-50 characters |
| email | String | Yes | Valid email format, unique |
| phone | String | No | E.164 format (e.g., +1234567890) |
| accountStatus | Enum | Yes | ACTIVE, INACTIVE, SUSPENDED |
| createdAt | DateTime | Yes | Auto-generated, ISO 8601 |
| updatedAt | DateTime | Yes | Auto-generated, ISO 8601 |

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error Type",
  "message": "Error description"
}
```

### HTTP Status Codes

- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Validation error
- `404 Not Found` - Resource not found
- `405 Method Not Allowed` - HTTP method not supported
- `415 Unsupported Media Type` - Invalid Content-Type
- `500 Internal Server Error` - Server error

## Configuration

Configuration is managed through `src/main/resources/config.properties`:

```properties
http.port=8081
http.host=0.0.0.0
app.name=customer-management-api
app.version=1.0.0
```

## Deployment to CloudHub 2.0

### Prerequisites

1. Anypoint Platform account with CloudHub 2.0 access
2. Anypoint CLI installed and configured
3. Maven configured with Anypoint credentials

### Deployment Steps

1. Build the application:
```bash
mvn clean package
```

2. Deploy to CloudHub 2.0:
```bash
mvn deploy -DmuleDeploy
```

Or use Anypoint Runtime Manager UI:
1. Log in to Anypoint Platform
2. Navigate to Runtime Manager
3. Click "Deploy Application"
4. Upload the JAR file from `target/customer-management-api-1.0.0-mule-application.jar`
5. Configure environment variables if needed
6. Deploy

### Environment Variables

For CloudHub deployment, configure these environment variables:

- `HTTP_PORT` - HTTP listener port (default: 8081)
- `HTTP_HOST` - HTTP listener host (default: 0.0.0.0)

## Governance

### Publishing to Anypoint Exchange

1. Navigate to Anypoint Exchange in Anypoint Platform
2. Click "Publish Asset"
3. Select "API Specification"
4. Upload `docs/openapi.yaml`
5. Fill in asset details and publish

### Applying Rate Limiting Policy

1. Navigate to API Manager in Anypoint Platform
2. Create or select API Instance for this API
3. Go to Policies tab
4. Click "Apply Policy"
5. Select "Rate Limiting" policy
6. Configure: 100 requests per minute
7. Apply policy

### API Discovery

Once published to Exchange, the API is discoverable by:
- Other teams via Anypoint Exchange search
- AI agents via MCP server (Phase 8)
- Anypoint API Manager

## Testing

### Running Unit Tests

```bash
mvn test
```

### Test Results

Test results are output to `results/test-results.json`

## Observability

### Logging

The API uses structured JSON logging with sensitive data masking:
- Email addresses are masked (e.g., `john***@example.com`)
- Phone numbers show only last 4 digits (e.g., `***7890`)

### Log Format

```json
{
  "event": "create_customer",
  "method": "POST",
  "path": "/customers",
  "customerId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john***@example.com",
  "phone": "***7890",
  "status": "success",
  "timestamp": "2026-01-15T10:30:00.000Z"
}
```

## Agent Invocation (MCP)

This API is exposed via MCP (Model Context Protocol) for AI agent discovery and invocation. See Phase 8 implementation for details.

## Project Structure

```
customer-management-api/
├── src/
│   ├── main/
│   │   ├── mule/
│   │   │   ├── customer-management-api.xml  # Main API flows
│   │   │   └── global.xml                    # Global configurations
│   │   └── resources/
│   │       ├── config.properties            # Configuration properties
│   │       └── log4j2.xml                  # Logging configuration
│   └── test/
│       └── munit/                           # MUnit test files
├── docs/
│   ├── openapi.yaml                         # OpenAPI 3.0 specification
│   └── transcript.md                        # Development transcript
├── results/
│   ├── test-results.json                    # Test execution results
│   ├── phases.json                          # Phase timing data
│   └── build.log                            # Build logs
├── pom.xml                                  # Maven configuration
└── README.md                                # This file
```

## License

Internal - MuleSoft POV Development

## Support

For issues or questions, contact the development team.

