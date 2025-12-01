# HBR CMS Card Agent Network

## Overview

The HBR CMS Card Agent is a sophisticated agent broker network designed to securely retrieve customer credit card information from a CMS server using MCP (Model Context Protocol) server integration and Azure OpenAI for intelligent processing.

## Architecture

### Components

1. **Broker**: `hbr-cms-card-agent`
   - Main orchestrator for credit card information retrieval
   - Handles secure data processing and PCI DSS compliance
   - Provides JSON-based API endpoints

2. **MCP Server**: `cms-mcp`
   - Integrates with CMS systems for data retrieval
   - Provides secure connection to customer databases
   - Handles authentication and data validation

3. **Agent**: `cmsagent2`
   - Specialized agent for customer information processing
   - Implements business logic for credit card data handling
   - Ensures data masking and security compliance

4. **LLM Provider**: `azure-openai`
   - Uses Azure OpenAI GPT-4 for intelligent processing
   - Provides natural language understanding capabilities
   - Ensures enterprise-grade security and compliance

## Features

### Security & Compliance
- **PCI DSS Compliance**: All credit card data handling follows PCI DSS standards
- **Data Masking**: Automatically masks sensitive data (shows only last 4 digits)
- **Encrypted Connections**: All communications use encrypted channels
- **Audit Logging**: Comprehensive logging for all access attempts
- **Access Control**: Validates customer authorization before data release

### Capabilities
- **Multi-format Input**: Supports JSON and plain text inputs
- **Customer Identification**: Retrieves data by customer ID, email, or account number
- **Structured Output**: Returns data in standardized JSON format
- **Error Handling**: Comprehensive error handling and validation
- **Real-time Processing**: Immediate response to credit card information requests

## Configuration

### Environment Variables

The following variables need to be configured in your deployment environment:

#### Azure OpenAI Configuration
- `azure.apiKey`: Azure OpenAI API key (secret)
- `azure.resourceName`: Azure OpenAI resource name

#### CMS Agent Configuration
- `cmsagent2.cardUrl`: URL endpoint for the CMS Agent 2 service

#### MCP Server Configuration
- `cms-mcp.url`: URL endpoint for the CMS MCP server

### Security Configuration

1. **API Keys**: Store all API keys as encrypted secrets
2. **Network Security**: Ensure all endpoints use HTTPS/TLS
3. **Access Control**: Implement proper authentication mechanisms
4. **Data Encryption**: Enable encryption at rest and in transit

## Usage Examples

### Retrieve Credit Card Information by Customer ID
```json
{
  "request": "Get credit card information for customer ID 12345",
  "customerId": "12345"
}
```

### Retrieve Payment Details by Account Holder Name
```json
{
  "request": "Retrieve payment details for account holder John Doe",
  "accountHolder": "John Doe"
}
```

### Fetch Card Details by Email
```json
{
  "request": "Fetch card details for customer with email john.doe@example.com",
  "email": "john.doe@example.com"
}
```

## Response Format

The agent returns credit card information in the following JSON structure:

```json
{
  "customerId": "12345",
  "customerName": "John Doe",
  "cardType": "Visa",
  "maskedCardNumber": "****-****-****-1234",
  "expirationDate": "12/25",
  "billingAddress": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zipCode": "12345"
  },
  "status": "Active",
  "lastUpdated": "2024-01-15T10:30:00Z"
}
```

**Note**: Complete card numbers and CVV codes are never included in responses for security compliance.

## Deployment

### Prerequisites
1. Azure OpenAI service configured and accessible
2. CMS MCP server deployed and running
3. CMS Agent 2 service available
4. Proper network connectivity between all components

### Deployment Steps
1. Configure environment variables
2. Deploy the agent network to your target environment
3. Test connectivity to all external services
4. Validate security configurations
5. Perform end-to-end testing

### Monitoring & Maintenance
- Monitor API response times and error rates
- Regularly update security certificates
- Review audit logs for compliance
- Update API keys and credentials as needed
- Monitor Azure OpenAI usage and costs

## Security Considerations

### Data Protection
- Never log complete credit card numbers
- Implement proper data retention policies
- Use secure key management systems
- Regular security audits and penetration testing

### Compliance Requirements
- PCI DSS Level 1 compliance for card data handling
- SOC 2 Type II compliance for service operations
- GDPR compliance for customer data protection
- Regular compliance assessments and certifications

## Troubleshooting

### Common Issues
1. **Connection Timeouts**: Check network connectivity and firewall rules
2. **Authentication Failures**: Verify API keys and credentials
3. **Data Validation Errors**: Ensure proper input format and required fields
4. **Performance Issues**: Monitor resource usage and scaling requirements

### Support Contacts
- Technical Support: [Your support contact]
- Security Issues: [Your security team contact]
- Compliance Questions: [Your compliance team contact]

## Version History

- **v1.0.0**: Initial release with basic credit card retrieval functionality
  - Azure OpenAI integration
  - CMS MCP server connectivity
  - PCI DSS compliant data handling
  - Comprehensive security features

---

**Important**: This system handles sensitive financial data. Ensure all security protocols are followed and regularly reviewed for compliance with industry standards.
