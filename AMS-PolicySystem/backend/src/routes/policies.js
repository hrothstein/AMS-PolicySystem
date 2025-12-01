const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { findAll, findById, create, update, deleteItem, findWhere } = require('../datastore');
const router = express.Router();

// GET /api/v1/policies - List all
router.get('/', (req, res, next) => {
  try {
    const policies = findAll('policies');
    // Join with policyholder data
    const enrichedPolicies = policies.map(policy => {
      const policyholder = findById('policyholders', policy.policyholder_id, 'policyholder_id');
      return {
        ...policy,
        customer_type: policyholder?.customer_type,
        first_name: policyholder?.first_name,
        last_name: policyholder?.last_name,
        business_name: policyholder?.business_name
      };
    });
    res.json(enrichedPolicies);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/policies/:id - Get by ID
router.get('/:id', (req, res, next) => {
  try {
    const policy = findById('policies', req.params.id, 'policy_id');
    if (!policy) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    
    // Join with policyholder data
    const policyholder = findById('policyholders', policy.policyholder_id, 'policyholder_id');
    const enriched = {
      ...policy,
      customer_type: policyholder?.customer_type,
      first_name: policyholder?.first_name,
      last_name: policyholder?.last_name,
      business_name: policyholder?.business_name,
      email: policyholder?.email
    };
    
    res.json(enriched);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/policies - Create
router.post('/', (req, res, next) => {
  try {
    const newPolicy = create('policies', {
      policy_id: uuidv4(),
      ...req.body
    });
    res.status(201).json(newPolicy);
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/policies/:id - Update
router.put('/:id', (req, res, next) => {
  try {
    const updated = update('policies', req.params.id, req.body, 'policy_id');
    if (!updated) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/policies/:id - Delete
router.delete('/:id', (req, res, next) => {
  try {
    const deleted = deleteItem('policies', req.params.id, 'policy_id');
    if (!deleted) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    
    // Also delete related drivers and claims
    findWhere('drivers', d => d.policy_id === req.params.id).forEach(driver => {
      deleteItem('drivers', driver.driver_id, 'driver_id');
    });
    findWhere('claims', c => c.policy_id === req.params.id).forEach(claim => {
      deleteItem('claims', claim.claim_id, 'claim_id');
    });
    
    res.json({ message: 'Policy deleted successfully', policy: deleted });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
