const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AMS Policy Management System API',
      version: '1.0.0',
      description: 'Full-stack Policy Management System with in-memory datastore. Perfect for demos!',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001/api/v1',
        description: 'Development server',
      },
      {
        url: 'https://ams-policy-system-eacbed23e276.herokuapp.com/api/v1',
        description: 'Production server (Heroku)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Policyholder: {
          type: 'object',
          properties: {
            policyholder_id: { type: 'string', format: 'uuid' },
            customer_type: { type: 'string', enum: ['INDIVIDUAL', 'BUSINESS'] },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            business_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            address_line1: { type: 'string' },
            address_line2: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            zip_code: { type: 'string' },
            date_of_birth: { type: 'string', format: 'date' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Policy: {
          type: 'object',
          properties: {
            policy_id: { type: 'string', format: 'uuid' },
            policyholder_id: { type: 'string', format: 'uuid' },
            policy_number: { type: 'string' },
            policy_type: { type: 'string', enum: ['AUTO', 'HOME', 'LIFE', 'HEALTH'] },
            status: { type: 'string', enum: ['ACTIVE', 'EXPIRED', 'CANCELLED'] },
            start_date: { type: 'string', format: 'date' },
            end_date: { type: 'string', format: 'date' },
            premium_amount: { type: 'number' },
            coverage_amount: { type: 'number' },
            deductible_amount: { type: 'number' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Driver: {
          type: 'object',
          properties: {
            driver_id: { type: 'string', format: 'uuid' },
            policy_id: { type: 'string', format: 'uuid' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            date_of_birth: { type: 'string', format: 'date' },
            license_number: { type: 'string' },
            license_state: { type: 'string' },
            relationship_to_policyholder: { type: 'string', enum: ['PRIMARY', 'SPOUSE', 'CHILD', 'OTHER'] },
          },
        },
        Claim: {
          type: 'object',
          properties: {
            claim_id: { type: 'string', format: 'uuid' },
            policy_id: { type: 'string', format: 'uuid' },
            claim_number: { type: 'string' },
            claim_type: { type: 'string' },
            claim_date: { type: 'string', format: 'date' },
            incident_date: { type: 'string', format: 'date' },
            description: { type: 'string' },
            claim_amount: { type: 'number' },
            status: { type: 'string', enum: ['PENDING', 'APPROVED', 'DENIED'] },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string', example: 'admin' },
            password: { type: 'string', example: 'admin123' },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                username: { type: 'string' },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;

