const { v4: uuidv4 } = require('uuid');
const {
  seedPolicyholders,
  randomDate,
  randomAmount,
  randomChoice,
  generatePolicyNumber,
  generateClaimNumber,
  firstNames,
  lastNames,
  claimTypes
} = require('./seed-data');

// In-memory datastore - resets on server restart
const datastore = {
  policyholders: [],
  policies: [],
  drivers: [],
  claims: []
};

// Initialize datastore with seed data
function initializeDatastore() {
  console.log('🌱 Initializing in-memory datastore...');
  
  // Add policyholders with UUIDs
  datastore.policyholders = seedPolicyholders.map(ph => ({
    policyholder_id: uuidv4(),
    ...ph,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));
  
  console.log(`✅ Loaded ${datastore.policyholders.length} policyholders`);
  
  // Generate policies
  const policyTypes = ['HOME', 'AUTO', 'LIFE'];
  const statuses = ['ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'PENDING', 'EXPIRED'];
  let policyCounter = 1;
  
  datastore.policyholders.forEach(policyholder => {
    const numPolicies = Math.floor(Math.random() * 3) + 1; // 1-3 policies
    
    for (let i = 0; i < numPolicies; i++) {
      const policyType = randomChoice(policyTypes);
      const effectiveDate = randomDate(new Date(2022, 0, 1), new Date(2024, 0, 1));
      const expirationDate = new Date(effectiveDate);
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      
      let premiumAmount, coverageAmount, deductible;
      
      if (policyType === 'HOME') {
        coverageAmount = randomAmount(150000, 500000);
        premiumAmount = randomAmount(100, 300);
        deductible = randomAmount(500, 2000);
      } else if (policyType === 'AUTO') {
        coverageAmount = randomAmount(25000, 100000);
        premiumAmount = randomAmount(80, 250);
        deductible = randomAmount(250, 1000);
      } else { // LIFE
        coverageAmount = randomAmount(100000, 1000000);
        premiumAmount = randomAmount(50, 200);
        deductible = 0;
      }
      
      datastore.policies.push({
        policy_id: uuidv4(),
        policyholder_id: policyholder.policyholder_id,
        policy_number: generatePolicyNumber(policyType, policyCounter++),
        policy_type: policyType,
        status: randomChoice(statuses),
        effective_date: effectiveDate.toISOString().split('T')[0],
        expiration_date: expirationDate.toISOString().split('T')[0],
        premium_amount: parseFloat(premiumAmount),
        coverage_amount: parseFloat(coverageAmount),
        deductible: parseFloat(deductible),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  });
  
  console.log(`✅ Generated ${datastore.policies.length} policies`);
  
  // Generate drivers for AUTO policies
  const autoPolicies = datastore.policies.filter(p => p.policy_type === 'AUTO');
  autoPolicies.forEach(policy => {
    const numDrivers = Math.floor(Math.random() * 3) + 1; // 1-3 drivers
    
    for (let i = 0; i < numDrivers; i++) {
      const isPrimary = i === 0;
      const dob = randomDate(new Date(1960, 0, 1), new Date(2005, 0, 1));
      const licenseNumber = `DL${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const states = ['CA', 'TX', 'NY', 'FL', 'IL'];
      
      datastore.drivers.push({
        driver_id: uuidv4(),
        policy_id: policy.policy_id,
        first_name: randomChoice(firstNames),
        last_name: randomChoice(lastNames),
        date_of_birth: dob.toISOString().split('T')[0],
        license_number: licenseNumber,
        license_state: randomChoice(states),
        is_primary: isPrimary,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  });
  
  console.log(`✅ Generated ${datastore.drivers.length} drivers`);
  
  // Generate claims
  const claimStatuses = ['OPEN', 'IN_REVIEW', 'APPROVED', 'DENIED', 'CLOSED'];
  const numClaims = 20;
  
  for (let i = 0; i < numClaims; i++) {
    const policy = randomChoice(datastore.policies);
    const status = randomChoice(claimStatuses);
    const incidentDate = randomDate(new Date(policy.effective_date), new Date());
    const filedDate = new Date(incidentDate);
    filedDate.setDate(filedDate.getDate() + Math.floor(Math.random() * 5));
    
    const claimType = randomChoice(claimTypes[policy.policy_type]);
    const claimAmount = randomAmount(1000, policy.coverage_amount * 0.5);
    const approvedAmount = (status === 'APPROVED' || status === 'CLOSED') 
      ? randomAmount(claimAmount * 0.7, claimAmount) 
      : null;
    
    datastore.claims.push({
      claim_id: uuidv4(),
      policy_id: policy.policy_id,
      claim_number: generateClaimNumber(i + 1),
      claim_type: claimType,
      status: status,
      filed_date: filedDate.toISOString().split('T')[0],
      incident_date: incidentDate.toISOString().split('T')[0],
      description: `Claim for ${claimType.toLowerCase().replace('_', ' ')} incident on ${incidentDate.toDateString()}`,
      claim_amount: parseFloat(claimAmount),
      approved_amount: approvedAmount ? parseFloat(approvedAmount) : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  
  console.log(`✅ Generated ${datastore.claims.length} claims`);
  console.log('✅ In-memory datastore initialized successfully!');
  console.log(`📊 Total records: ${datastore.policyholders.length + datastore.policies.length + datastore.drivers.length + datastore.claims.length}`);
}

// Helper functions for CRUD operations
function findById(collection, id, idField = 'id') {
  return datastore[collection].find(item => item[idField] === id);
}

function findAll(collection) {
  return datastore[collection];
}

function create(collection, data) {
  const newItem = {
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  datastore[collection].push(newItem);
  return newItem;
}

function update(collection, id, data, idField = 'id') {
  const index = datastore[collection].findIndex(item => item[idField] === id);
  if (index === -1) return null;
  
  datastore[collection][index] = {
    ...datastore[collection][index],
    ...data,
    updated_at: new Date().toISOString()
  };
  return datastore[collection][index];
}

function deleteItem(collection, id, idField = 'id') {
  const index = datastore[collection].findIndex(item => item[idField] === id);
  if (index === -1) return null;
  
  const deleted = datastore[collection][index];
  datastore[collection].splice(index, 1);
  return deleted;
}

function findWhere(collection, predicate) {
  return datastore[collection].filter(predicate);
}

module.exports = {
  datastore,
  initializeDatastore,
  findById,
  findAll,
  create,
  update,
  deleteItem,
  findWhere
};

