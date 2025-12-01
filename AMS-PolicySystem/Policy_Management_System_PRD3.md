# Policy Management System - Product Requirements Document

## 1. Executive Summary

### 1.1 Purpose
Build a simple Policy Management System for demo purposes that showcases insurance policy workflows for MuleSoft and Salesforce Financial Services Cloud integrations.

### 1.2 Scope
- **Policy Types:** Home, Auto, Life
- **Core Entities:** Policies, Policyholders, Claims, Drivers (for Auto policies)
- **Tech Stack:** React frontend, Node.js/Express backend, **in-memory datastore**
- **Deployment:** Heroku
- **Future:** MCP integration will be added later

### 1.3 Key Features
- Full CRUD operations for all entities (data persists while running, resets on restart)
- Admin portal for policy management
- RESTful APIs with bearer token authentication
- Pre-loaded with 50 customers from bankingcoredemo on startup
- Driver management for auto policies (add/remove/change)

---

## 2. Technical Architecture

### 2.1 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Policy Management System                  │
│                                                              │
│  ┌──────────────────┐         ┌──────────────────────────┐  │
│  │   React Frontend │         │   Node.js/Express API    │  │
│  │   (Admin Portal) │ ──────▶ │   /api/v1/*              │  │
│  │   Port: 3000     │         │   Port: 3001             │  │
│  └──────────────────┘         └──────────────────────────┘  │
│                                         │                    │
│                                         ▼                    │
│                               ┌──────────────────────────┐  │
│                               │   In-Memory Datastore    │  │
│                               │   (resets on restart)    │  │
│                               └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 18, Tailwind CSS |
| Backend | Node.js, Express.js |
| Data Storage | In-memory JavaScript objects (no database) |
| Authentication | JWT Bearer Tokens |
| Deployment | Heroku |

---

## 3. Data Models

### 3.1 Policyholders

Use the **exact 50 customers from bankingcoredemo** as policyholders.

```javascript
{
  policyholder_id: "uuid",
  customer_type: "INDIVIDUAL | BUSINESS",
  first_name: "string",          // for INDIVIDUAL
  last_name: "string",           // for INDIVIDUAL
  business_name: "string",       // for BUSINESS
  email: "string",
  phone: "string",
  date_of_birth: "date",         // for INDIVIDUAL
  address_line1: "string",
  address_line2: "string",
  city: "string",
  state: "string",
  postal_code: "string",
  country: "string",
  created_at: "timestamp",
  updated_at: "timestamp"
}
```

### 3.2 Policies

```javascript
{
  policy_id: "uuid",
  policyholder_id: "uuid",       // FK to policyholders
  policy_number: "string",       // e.g., "POL-HOME-001234"
  policy_type: "HOME | AUTO | LIFE",
  status: "ACTIVE | PENDING | CANCELLED | EXPIRED",
  effective_date: "date",
  expiration_date: "date",
  premium_amount: "decimal",     // monthly premium
  coverage_amount: "decimal",    // total coverage
  deductible: "decimal",
  created_at: "timestamp",
  updated_at: "timestamp"
}
```

### 3.3 Drivers (Auto Policies Only)

```javascript
{
  driver_id: "uuid",
  policy_id: "uuid",             // FK to policies (must be AUTO type)
  first_name: "string",
  last_name: "string",
  date_of_birth: "date",
  license_number: "string",
  license_state: "string",
  is_primary: "boolean",         // primary driver on policy
  created_at: "timestamp",
  updated_at: "timestamp"
}
```

### 3.4 Claims

```javascript
{
  claim_id: "uuid",
  policy_id: "uuid",             // FK to policies
  claim_number: "string",        // e.g., "CLM-001234"
  claim_type: "string",          // e.g., "COLLISION", "THEFT", "WATER_DAMAGE", "DEATH"
  status: "OPEN | IN_REVIEW | APPROVED | DENIED | CLOSED",
  filed_date: "date",
  incident_date: "date",
  description: "string",
  claim_amount: "decimal",       // requested amount
  approved_amount: "decimal",    // approved payout (null if pending)
  created_at: "timestamp",
  updated_at: "timestamp"
}
```

---

## 4. API Endpoints

### 4.1 Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/v1/auth/login | POST | Login, returns JWT token |

**Credentials:** admin / admin123

### 4.2 Policyholders

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/v1/policyholders | GET | List all policyholders |
| /api/v1/policyholders/:id | GET | Get policyholder by ID |
| /api/v1/policyholders | POST | Create policyholder |
| /api/v1/policyholders/:id | PUT | Update policyholder |
| /api/v1/policyholders/:id | DELETE | Delete policyholder |

### 4.3 Policies

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/v1/policies | GET | List all policies |
| /api/v1/policies/:id | GET | Get policy by ID |
| /api/v1/policies | POST | Create policy |
| /api/v1/policies/:id | PUT | Update policy |
| /api/v1/policies/:id | DELETE | Delete policy |
| /api/v1/policyholders/:id/policies | GET | Get policies for a policyholder |

### 4.4 Drivers (Auto Policies)

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/v1/policies/:policyId/drivers | GET | List drivers on a policy |
| /api/v1/policies/:policyId/drivers | POST | Add driver to policy |
| /api/v1/policies/:policyId/drivers/:driverId | GET | Get driver details |
| /api/v1/policies/:policyId/drivers/:driverId | PUT | Update driver |
| /api/v1/policies/:policyId/drivers/:driverId | DELETE | Remove driver from policy |

### 4.5 Claims

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/v1/claims | GET | List all claims |
| /api/v1/claims/:id | GET | Get claim by ID |
| /api/v1/claims | POST | File a new claim |
| /api/v1/claims/:id | PUT | Update claim |
| /api/v1/claims/:id | DELETE | Delete claim |
| /api/v1/policies/:id/claims | GET | Get claims for a policy |

---

## 5. Admin Portal (Frontend)

### 5.1 Pages

| Page | Description |
|------|-------------|
| Login | Admin login (admin/admin123) |
| Dashboard | Overview with policy counts by type/status |
| Policyholders | List, search, view policyholder details |
| Policies | List, create, edit policies |
| Policy Detail | View policy with drivers (for auto) and claims |
| Claims | List, create, update claims |

### 5.2 Key Features

- **Policyholder View:** See all policies for a customer
- **Policy View:** See policy details, drivers (if auto), and claims
- **Driver Management:** Add/edit/remove drivers on auto policies
- **Claim Filing:** File claims against any policy
- **Simple Filters:** Filter by policy type, status

---

## 6. Seed Data

### 6.1 Policyholders
Use the **exact 50 customers from bankingcoredemo** (https://github.com/hrothstein/bankingcoredemo):
- 40 INDIVIDUAL customers
- 10 BUSINESS customers

### 6.2 Policies
Auto-generate policies for policyholders on seed:

| Policy Type | Count | Details |
|-------------|-------|---------|
| HOME | ~20 | Coverage: $150K-$500K, Premium: $100-$300/mo |
| AUTO | ~25 | Coverage: $25K-$100K, Premium: $80-$250/mo |
| LIFE | ~15 | Coverage: $100K-$1M, Premium: $50-$200/mo |

- Each policyholder gets 1-3 random policies
- Mix of ACTIVE, PENDING, and a few EXPIRED

### 6.3 Drivers
For each AUTO policy, generate 1-3 drivers:
- Primary driver (is_primary: true) - often the policyholder
- Additional drivers with realistic names

### 6.4 Claims
Generate ~20 sample claims across policies:
- Mix of OPEN, IN_REVIEW, APPROVED, DENIED, CLOSED
- Variety of claim types based on policy type

---

## 7. Project Structure

```
policy-management-system/
├── backend/
│   ├── src/
│   │   ├── datastore/
│   │   │   ├── index.js         # In-memory data store
│   │   │   └── seed-data.js     # Initial seed data (50 customers, etc.)
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── policyholders.js
│   │   │   ├── policies.js
│   │   │   ├── drivers.js
│   │   │   └── claims.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── tailwind.config.js
├── Dockerfile
└── README.md
```

---

## 8. Implementation Prompt for Coding Agent

### 8.1 Agent Instructions

```
You are a full-stack developer. Build a simple Policy Management System for demo purposes.

GIT WORKFLOW - START HERE:
1. Create a new repository named "policy-management-system"
2. Initialize with README.md
3. Create a feature branch for implementation:
   git checkout -b feature/initial-implementation

PROJECT SETUP:
4. Create the project structure as defined in Section 7
5. Initialize backend with Node.js/Express
6. Initialize frontend with React + Tailwind CSS

IN-MEMORY DATASTORE SETUP:
7. Create an in-memory datastore (src/datastore/index.js) that:
   - Stores policyholders, policies, drivers, claims in memory
   - Initializes with seed data on server startup
   - Supports full CRUD operations
   - Data persists while server is running
   - Data resets on server restart (this is fine for demos)
   - Uses simple JavaScript objects/arrays
   - Generates UUIDs for new records

   Example structure:
   ```javascript
   const datastore = {
     policyholders: [],  // Seeded with 50 bankingcoredemo customers
     policies: [],       // Auto-generated for policyholders
     drivers: [],        // Auto-generated for AUTO policies
     claims: []          // Sample claims
   };
   ```

SEED DATA - CRITICAL:
8. Use the EXACT 50 customers from bankingcoredemo as policyholders
   Reference: https://github.com/hrothstein/bankingcoredemo
    
9. Auto-generate policies for each policyholder:
   - 1-3 policies per policyholder
   - Mix of HOME, AUTO, LIFE types
   - Realistic premiums and coverage amounts
    
10. For each AUTO policy, generate 1-3 drivers:
    - Primary driver (is_primary: true)
    - Additional drivers with realistic names
    
11. Generate ~20 sample claims across various policies

BACKEND IMPLEMENTATION:
12. Implement authentication:
    - POST /api/v1/auth/login
    - Credentials: admin / admin123
    - Return JWT bearer token

13. Implement all CRUD endpoints from Section 4:
    - Policyholders (5 endpoints)
    - Policies (6 endpoints)
    - Drivers (5 endpoints)
    - Claims (6 endpoints)

14. All endpoints except /auth/login require Authorization: Bearer <token>

15. Implement proper error handling:
    - 400 Bad Request for validation errors
    - 401 Unauthorized for missing/invalid token
    - 404 Not Found for missing resources
    - 500 Server Error with logging

FRONTEND IMPLEMENTATION:
16. Create React app with Tailwind CSS
17. Implement pages:
    - Login page
    - Dashboard with policy counts
    - Policyholders list and detail
    - Policies list and detail
    - Claims list and detail

18. Policy detail page must show:
    - Policy information
    - Drivers section (for AUTO policies) with add/edit/remove
    - Claims section with ability to file new claim

19. Keep UI simple and functional - this is for demos

DOCKER SETUP:
20. Create single Dockerfile for the application (no database needed)

DOCUMENTATION:
21. Create README.md with:
    - Project description
    - Note that data is in-memory and resets on restart
    - How to run locally
    - How to run with Docker
    - API documentation summary
    - Admin credentials

GIT WORKFLOW - FINISH:
22. Commit all changes:
    git add .
    git commit -m "feat: Initial Policy Management System implementation"

23. Push feature branch:
    git push origin feature/initial-implementation

24. Create a Pull Request for review

DELIVERABLES:
- Complete Node.js/Express backend with all endpoints
- In-memory datastore with seed data
- React frontend with admin portal
- Docker configuration (single container, no database)
- README documentation
- All 50 bankingcoredemo customers as policyholders
- Auto-generated policies, drivers, and claims

CRITICAL REQUIREMENTS:
- Use IN-MEMORY datastore (no PostgreSQL or other database)
- Data resets on restart - this is OK for demos
- Use the EXACT 50 customers from bankingcoredemo
- Drivers only apply to AUTO policies
- Bearer token authentication on all endpoints (except login)
- Simple, functional UI for demos
- ALWAYS use feature branches - never commit to main directly
```

### 8.2 Validation Checklist

**Git Workflow:**
- [ ] New repository created: policy-management-system
- [ ] Feature branch used for implementation
- [ ] All changes pushed to feature branch
- [ ] Pull Request created for review

**In-Memory Datastore:**
- [ ] Datastore initializes with seed data on startup
- [ ] 50 policyholders seeded from bankingcoredemo
- [ ] Policies auto-generated for policyholders
- [ ] Drivers generated for AUTO policies only
- [ ] Sample claims generated
- [ ] CRUD operations work (create, read, update, delete)
- [ ] New records get UUIDs generated
- [ ] Data resets on server restart

**Backend API:**
- [ ] Login endpoint works (admin/admin123)
- [ ] JWT token returned and required on all other endpoints
- [ ] Policyholder CRUD works
- [ ] Policy CRUD works
- [ ] Driver CRUD works (add/edit/remove on AUTO policies)
- [ ] Claim CRUD works
- [ ] Proper error responses (400, 401, 404, 500)

**Frontend:**
- [ ] Login page works
- [ ] Dashboard shows policy counts
- [ ] Policyholder list and detail pages work
- [ ] Policy list and detail pages work
- [ ] Can add/edit/remove drivers on AUTO policies
- [ ] Can file and view claims
- [ ] UI is simple and functional

**Docker:**
- [ ] Dockerfile builds successfully
- [ ] Single container runs (no database container needed)
- [ ] App accessible at localhost:3000 (frontend) and :3001 (API)

---

## 9. Deployment

### 9.1 Heroku Deployment

After implementation is complete and reviewed:

1. Create Heroku app
2. Set environment variables
3. Deploy from main branch

Note: No database addon needed - data is in-memory and resets on dyno restart.

### 9.2 Environment Variables

```
JWT_SECRET=<random-secret>
ADMIN_PASSWORD=admin123
NODE_ENV=production
```

---

## 10. Future Enhancements

### 10.1 MCP Integration (Phase 2)
Add MCP server capabilities for AI agent interaction:
- Policy lookup tools
- Claim filing tools
- Driver management tools
- Policy status updates

### 10.2 MuleSoft Integration
- Webhook endpoints for MuleSoft
- Sync with Salesforce Financial Services Cloud

---

**End of Document**

*Confidential - Salesforce/MuleSoft Financial Services*
