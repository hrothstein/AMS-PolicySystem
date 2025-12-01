# Policy Management System (In-Memory Demo)

A simple insurance policy management system with **in-memory data storage** for quick demos. Perfect for showcasing MuleSoft and Salesforce Financial Services Cloud integrations.

## ✨ Key Features

- **In-Memory Storage** - No database setup required!
- **50 Pre-loaded Customers** from bankingcoredemo
- **~80 Auto-generated Policies** (HOME, AUTO, LIFE)
- **~50 Drivers** for AUTO policies
- **20 Sample Claims**
- **Full CRUD APIs** with JWT authentication
- **Modern React UI** with Tailwind CSS

⚠️ **Note:** All data is stored in-memory and **resets when the server restarts**. This is perfect for demos!

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Option 1: Quick Start (2 commands!)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open: **http://localhost:3000**  
Login: `admin` / `admin123`

### Option 2: Docker

```bash
docker build -t policy-management .
docker run -p 3001:3001 policy-management
```

Then open the frontend separately or build a static version.

---

## 📊 What You Get

After starting the servers:
- **50 Policyholders** (40 individuals, 10 businesses)
- **~80 Insurance Policies** across HOME, AUTO, and LIFE types
- **~50 Drivers** automatically assigned to AUTO policies
- **20 Sample Claims** with various statuses

---

## 🔑 Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

---

## 📡 API Endpoints

All endpoints require `Authorization: Bearer <token>` except `/auth/login`

### Authentication
- `POST /api/v1/auth/login` - Login (returns JWT token)

### Policyholders (6 endpoints)
- `GET /api/v1/policyholders` - List all
- `GET /api/v1/policyholders/:id` - Get by ID
- `GET /api/v1/policyholders/:id/policies` - Get customer's policies
- `POST /api/v1/policyholders` - Create new
- `PUT /api/v1/policyholders/:id` - Update
- `DELETE /api/v1/policyholders/:id` - Delete

### Policies (5 endpoints)
- `GET /api/v1/policies` - List all
- `GET /api/v1/policies/:id` - Get by ID
- `POST /api/v1/policies` - Create new
- `PUT /api/v1/policies/:id` - Update
- `DELETE /api/v1/policies/:id` - Delete

### Drivers (5 endpoints) - AUTO policies only
- `GET /api/v1/policies/:policyId/drivers` - List drivers
- `GET /api/v1/policies/:policyId/drivers/:driverId` - Get driver
- `POST /api/v1/policies/:policyId/drivers` - Add driver
- `PUT /api/v1/policies/:policyId/drivers/:driverId` - Update
- `DELETE /api/v1/policies/:policyId/drivers/:driverId` - Remove

### Claims (6 endpoints)
- `GET /api/v1/claims` - List all
- `GET /api/v1/claims/:id` - Get by ID
- `GET /api/v1/claims/policy/:id` - Get claims for policy
- `POST /api/v1/claims` - File new claim
- `PUT /api/v1/claims/:id` - Update
- `DELETE /api/v1/claims/:id` - Delete

---

## 🧪 Testing the API

### 1. Login
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 2. Get Policies (with token)
```bash
curl http://localhost:3001/api/v1/policies \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 💾 In-Memory Data Storage

This system uses **in-memory JavaScript objects** for data storage:

```javascript
const datastore = {
  policyholders: [],  // 50 from bankingcoredemo
  policies: [],       // ~80 auto-generated
  drivers: [],        // ~50 for AUTO policies
  claims: []          // 20 samples
};
```

**Benefits:**
- ✅ No database installation needed
- ✅ Instant startup
- ✅ Perfect for demos
- ✅ Clean slate on restart

**Limitations:**
- ⚠️ Data resets when server restarts
- ⚠️ Not suitable for production
- ⚠️ Single server instance only

---

## 🏗️ Project Structure

```
AMS-PolicySystem/
├── backend/
│   ├── src/
│   │   ├── datastore/
│   │   │   ├── index.js        # In-memory data store
│   │   │   └── seed-data.js    # 50 customers + generators
│   │   ├── middleware/
│   │   │   ├── auth.js         # JWT authentication
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── policyholders.js
│   │   │   ├── policies.js
│   │   │   ├── drivers.js
│   │   │   └── claims.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
├── Dockerfile
└── README.md
```

---

## 🎯 Features Demo

### 1. Dashboard
- View policy counts by type (HOME, AUTO, LIFE)
- See policy status distribution
- Quick navigation to main sections

### 2. Policyholders
- Browse all 50 pre-loaded customers
- View individuals and businesses
- See contact information

### 3. Policies
- View all insurance policies
- See policy details (type, status, premium, coverage)
- Linked to policyholders

### 4. Claims
- Browse all filed claims
- View claim status (OPEN, IN_REVIEW, APPROVED, DENIED, CLOSED)
- See claim amounts

---

## 🔒 Security

- JWT bearer token authentication
- All endpoints protected (except login)
- Token required in header: `Authorization: Bearer <token>`
- 24-hour token expiration
- Simple admin credentials for demo

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001 (backend)
lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Need Fresh Data?
Just restart the backend server! Data auto-regenerates on startup.

---

## 📝 Environment Variables

Create `backend/.env`:
```
JWT_SECRET=your-secret-key
ADMIN_PASSWORD=admin123
NODE_ENV=development
PORT=3001
```

---

## 🚢 Deployment

### Heroku (No database addon needed!)

```bash
# Create app
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your-production-secret
heroku config:set ADMIN_PASSWORD=admin123
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

**Note:** Data will reset on dyno restart - perfect for demos!

---

## 🔮 Future Enhancements

- MCP integration for AI agents
- MuleSoft webhook endpoints
- Salesforce FSC synchronization
- Optional PostgreSQL persistence

---

## 💡 Why In-Memory?

This demo system uses in-memory storage because:
- **Zero Setup** - No database installation required
- **Fast Demos** - Instant startup with pre-loaded data
- **Clean Testing** - Fresh data on every restart
- **Simple Deployment** - One container, no dependencies
- **Perfect for POCs** - Show functionality without infrastructure

---

## 📖 Tech Stack

- **Backend:** Node.js, Express.js, In-Memory Storage
- **Frontend:** React 18, Vite, Tailwind CSS
- **Auth:** JWT Bearer Tokens
- **Data:** 50 customers from bankingcoredemo

---

## ✅ Quick Test Checklist

- [ ] Start backend (`npm run dev` in backend/)
- [ ] Start frontend (`npm run dev` in frontend/)
- [ ] Login at http://localhost:3000 (admin/admin123)
- [ ] View Dashboard - see stats
- [ ] Browse 50 Policyholders
- [ ] View ~80 Policies
- [ ] Check Claims list
- [ ] Restart backend - data resets! ✨

---

**Built for MuleSoft/Salesforce Financial Services Demos**

**Status:** ✅ Production Ready (for demos!)

💾 **Remember:** Data is in-memory and resets on restart!
