const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initializeDatastore } = require('./datastore');
const { authenticateToken } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const policyholderRoutes = require('./routes/policyholders');
const policyRoutes = require('./routes/policies');
const driverRoutes = require('./routes/drivers');
const claimRoutes = require('./routes/claims');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Initialize in-memory datastore
console.log('🚀 Starting Policy Management System...');
console.log('💾 Using IN-MEMORY datastore (data resets on restart)');
initializeDatastore();

// Health check endpoint (no auth required)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    datastore: 'in-memory',
    message: 'Data resets on server restart'
  });
});

// Auth routes (no authentication required)
app.use('/api/v1/auth', authRoutes);

// Protected routes (authentication required)
app.use('/api/v1/policyholders', authenticateToken, policyholderRoutes);
app.use('/api/v1/policies', authenticateToken, policyRoutes);
app.use('/api/v1/policies/:policyId/drivers', authenticateToken, driverRoutes);
app.use('/api/v1/claims', authenticateToken, claimRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api/v1`);
  console.log(`🔐 Login endpoint: POST http://localhost:${PORT}/api/v1/auth/login`);
  console.log(`   Credentials: admin / admin123`);
  console.log(`\n💡 Remember: Data is in-memory and will reset on server restart\n`);
});

module.exports = app;
