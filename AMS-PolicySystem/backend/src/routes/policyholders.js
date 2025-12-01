const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { findAll, findById, create, update, deleteItem, findWhere } = require('../datastore');
const router = express.Router();

// GET /api/v1/policyholders - List all
router.get('/', (req, res, next) => {
  try {
    const policyholders = findAll('policyholders');
    res.json(policyholders);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/policyholders/:id - Get by ID
router.get('/:id', (req, res, next) => {
  try {
    const policyholder = findById('policyholders', req.params.id, 'policyholder_id');
    if (!policyholder) {
      return res.status(404).json({ error: 'Policyholder not found' });
    }
    res.json(policyholder);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/policyholders/:id/policies - Get policies for a policyholder
router.get('/:id/policies', (req, res, next) => {
  try {
    const policyholder = findById('policyholders', req.params.id, 'policyholder_id');
    if (!policyholder) {
      return res.status(404).json({ error: 'Policyholder not found' });
    }
    const policies = findWhere('policies', p => p.policyholder_id === req.params.id);
    res.json(policies);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/policyholders - Create
router.post('/', (req, res, next) => {
  try {
    const newPolicyholder = create('policyholders', {
      policyholder_id: uuidv4(),
      ...req.body
    });
    res.status(201).json(newPolicyholder);
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/policyholders/:id - Update
router.put('/:id', (req, res, next) => {
  try {
    const updated = update('policyholders', req.params.id, req.body, 'policyholder_id');
    if (!updated) {
      return res.status(404).json({ error: 'Policyholder not found' });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/policyholders/:id - Delete
router.delete('/:id', (req, res, next) => {
  try {
    const deleted = deleteItem('policyholders', req.params.id, 'policyholder_id');
    if (!deleted) {
      return res.status(404).json({ error: 'Policyholder not found' });
    }
    
    // Also delete related policies, drivers, and claims
    const policies = findWhere('policies', p => p.policyholder_id === req.params.id);
    policies.forEach(policy => {
      deleteItem('drivers', policy.policy_id, 'policy_id');
      deleteItem('claims', policy.policy_id, 'policy_id');
      deleteItem('policies', policy.policy_id, 'policy_id');
    });
    
    res.json({ message: 'Policyholder deleted successfully', policyholder: deleted });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
