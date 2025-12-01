const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { findById, create, update, deleteItem, findWhere } = require('../datastore');
const router = express.Router({ mergeParams: true });

// GET /api/v1/policies/:policyId/drivers - List drivers
router.get('/', (req, res, next) => {
  try {
    const drivers = findWhere('drivers', d => d.policy_id === req.params.policyId);
    res.json(drivers);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/policies/:policyId/drivers/:driverId - Get driver
router.get('/:driverId', (req, res, next) => {
  try {
    const driver = findById('drivers', req.params.driverId, 'driver_id');
    if (!driver || driver.policy_id !== req.params.policyId) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.json(driver);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/policies/:policyId/drivers - Add driver
router.post('/', (req, res, next) => {
  try {
    // Verify policy exists and is AUTO type
    const policy = findById('policies', req.params.policyId, 'policy_id');
    if (!policy) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    
    if (policy.policy_type !== 'AUTO') {
      return res.status(400).json({ error: 'Drivers can only be added to AUTO policies' });
    }
    
    const newDriver = create('drivers', {
      driver_id: uuidv4(),
      policy_id: req.params.policyId,
      ...req.body
    });
    
    res.status(201).json(newDriver);
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/policies/:policyId/drivers/:driverId - Update driver
router.put('/:driverId', (req, res, next) => {
  try {
    const driver = findById('drivers', req.params.driverId, 'driver_id');
    if (!driver || driver.policy_id !== req.params.policyId) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    
    const updated = update('drivers', req.params.driverId, req.body, 'driver_id');
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/policies/:policyId/drivers/:driverId - Delete driver
router.delete('/:driverId', (req, res, next) => {
  try {
    const driver = findById('drivers', req.params.driverId, 'driver_id');
    if (!driver || driver.policy_id !== req.params.policyId) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    
    const deleted = deleteItem('drivers', req.params.driverId, 'driver_id');
    res.json({ message: 'Driver removed successfully', driver: deleted });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
