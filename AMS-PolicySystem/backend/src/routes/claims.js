const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { findAll, findById, create, update, deleteItem, findWhere } = require('../datastore');
const router = express.Router();

// GET /api/v1/claims - List all
router.get('/', (req, res, next) => {
  try {
    const claims = findAll('claims');
    // Join with policy and policyholder data
    const enrichedClaims = claims.map(claim => {
      const policy = findById('policies', claim.policy_id, 'policy_id');
      const policyholder = policy ? findById('policyholders', policy.policyholder_id, 'policyholder_id') : null;
      return {
        ...claim,
        policy_number: policy?.policy_number,
        policy_type: policy?.policy_type,
        first_name: policyholder?.first_name,
        last_name: policyholder?.last_name,
        business_name: policyholder?.business_name
      };
    });
    res.json(enrichedClaims);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/claims/:id - Get by ID
router.get('/:id', (req, res, next) => {
  try {
    const claim = findById('claims', req.params.id, 'claim_id');
    if (!claim) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    
    // Join with policy and policyholder data
    const policy = findById('policies', claim.policy_id, 'policy_id');
    const policyholder = policy ? findById('policyholders', policy.policyholder_id, 'policyholder_id') : null;
    const enriched = {
      ...claim,
      policy_number: policy?.policy_number,
      policy_type: policy?.policy_type,
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

// GET /api/v1/policies/:id/claims - Get claims for a policy
router.get('/policy/:id', (req, res, next) => {
  try {
    const claims = findWhere('claims', c => c.policy_id === req.params.id);
    res.json(claims);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/claims - File new claim
router.post('/', (req, res, next) => {
  try {
    const newClaim = create('claims', {
      claim_id: uuidv4(),
      ...req.body
    });
    res.status(201).json(newClaim);
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/claims/:id - Update claim
router.put('/:id', (req, res, next) => {
  try {
    const updated = update('claims', req.params.id, req.body, 'claim_id');
    if (!updated) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/claims/:id - Delete claim
router.delete('/:id', (req, res, next) => {
  try {
    const deleted = deleteItem('claims', req.params.id, 'claim_id');
    if (!deleted) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.json({ message: 'Claim deleted successfully', claim: deleted });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
