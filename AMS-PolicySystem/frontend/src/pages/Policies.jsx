import React, { useState, useEffect } from 'react';
import { policiesAPI, policyholdersAPI, driversAPI } from '../services/api';
import Modal from '../components/Modal';

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [policyholders, setPolicyholders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const [drivers, setDrivers] = useState({});
  const [loadingDrivers, setLoadingDrivers] = useState({});
  
  // Policy modal
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [policyFormData, setPolicyFormData] = useState({
    policyholder_id: '',
    policy_type: 'AUTO',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    premium_amount: '',
    coverage_amount: '',
    deductible_amount: '',
    status: 'ACTIVE',
  });

  // Driver modal
  const [driverModalOpen, setDriverModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [currentPolicyForDriver, setCurrentPolicyForDriver] = useState(null);
  const [driverFormData, setDriverFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    license_number: '',
    license_state: '',
    relationship_to_policyholder: 'PRIMARY',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [policiesRes, policyholdersRes] = await Promise.all([
        policiesAPI.getAll(),
        policyholdersAPI.getAll()
      ]);
      setPolicies(policiesRes.data);
      setPolicyholders(policyholdersRes.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const togglePolicy = async (policyId, policyType) => {
    if (expandedPolicy === policyId) {
      setExpandedPolicy(null);
      return;
    }

    setExpandedPolicy(policyId);

    if (policyType === 'AUTO' && !drivers[policyId]) {
      setLoadingDrivers({ ...loadingDrivers, [policyId]: true });
      try {
        const response = await driversAPI.getByPolicyId(policyId);
        setDrivers({ ...drivers, [policyId]: response.data });
      } catch (error) {
        console.error('Error loading drivers:', error);
      } finally {
        setLoadingDrivers({ ...loadingDrivers, [policyId]: false });
      }
    }
  };

  // Policy CRUD
  const handleAddPolicy = () => {
    setEditingPolicy(null);
    setPolicyFormData({
      policyholder_id: '',
      policy_type: 'AUTO',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      premium_amount: '',
      coverage_amount: '',
      deductible_amount: '',
      status: 'ACTIVE',
    });
    setPolicyModalOpen(true);
  };

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy);
    setPolicyFormData({
      policyholder_id: policy.policyholder_id,
      policy_type: policy.policy_type,
      start_date: policy.start_date.split('T')[0],
      end_date: policy.end_date.split('T')[0],
      premium_amount: policy.premium_amount,
      coverage_amount: policy.coverage_amount,
      deductible_amount: policy.deductible_amount,
      status: policy.status,
    });
    setPolicyModalOpen(true);
  };

  const handleDeletePolicy = async (id, policyNumber) => {
    if (!confirm(`Are you sure you want to delete policy ${policyNumber}?`)) return;
    
    try {
      await policiesAPI.delete(id);
      await fetchData();
      alert('Policy deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete policy');
    }
  };

  const handlePolicySubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingPolicy) {
        await policiesAPI.update(editingPolicy.policy_id, policyFormData);
        alert('Policy updated successfully');
      } else {
        await policiesAPI.create(policyFormData);
        alert('Policy created successfully');
      }
      setPolicyModalOpen(false);
      await fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to ${editingPolicy ? 'update' : 'create'} policy`);
    }
  };

  // Driver CRUD
  const handleAddDriver = (policyId) => {
    setEditingDriver(null);
    setCurrentPolicyForDriver(policyId);
    setDriverFormData({
      first_name: '',
      last_name: '',
      date_of_birth: '',
      license_number: '',
      license_state: '',
      relationship_to_policyholder: 'PRIMARY',
    });
    setDriverModalOpen(true);
  };

  const handleEditDriver = (driver, policyId) => {
    setEditingDriver(driver);
    setCurrentPolicyForDriver(policyId);
    setDriverFormData({
      first_name: driver.first_name,
      last_name: driver.last_name,
      date_of_birth: driver.date_of_birth.split('T')[0],
      license_number: driver.license_number,
      license_state: driver.license_state,
      relationship_to_policyholder: driver.relationship_to_policyholder,
    });
    setDriverModalOpen(true);
  };

  const handleDeleteDriver = async (policyId, driverId, driverName) => {
    if (!confirm(`Are you sure you want to remove driver ${driverName}?`)) return;
    
    try {
      await driversAPI.delete(policyId, driverId);
      // Refresh drivers for this policy
      const response = await driversAPI.getByPolicyId(policyId);
      setDrivers({ ...drivers, [policyId]: response.data });
      alert('Driver removed successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to remove driver');
    }
  };

  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingDriver) {
        await driversAPI.update(currentPolicyForDriver, editingDriver.driver_id, driverFormData);
        alert('Driver updated successfully');
      } else {
        await driversAPI.create(currentPolicyForDriver, driverFormData);
        alert('Driver added successfully');
      }
      setDriverModalOpen(false);
      
      // Refresh drivers for this policy
      const response = await driversAPI.getByPolicyId(currentPolicyForDriver);
      setDrivers({ ...drivers, [currentPolicyForDriver]: response.data });
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to ${editingDriver ? 'update' : 'add'} driver`);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="text-gray-500">Loading...</div></div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Policies ({policies.length})</h1>
        <button
          onClick={handleAddPolicy}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          + Add Policy
        </button>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Policy Number</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Policyholder</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Premium</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {policies.map((policy) => (
              <React.Fragment key={policy.policy_id}>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{policy.policy_number}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {policy.business_name || `${policy.first_name} ${policy.last_name}`}
                  </td>
                  <td className="px-3 py-4 text-sm"><span className="badge bg-blue-100 text-blue-800">{policy.policy_type}</span></td>
                  <td className="px-3 py-4 text-sm"><span className={`badge badge-${policy.status.toLowerCase()}`}>{policy.status}</span></td>
                  <td className="px-3 py-4 text-sm text-gray-500">${parseFloat(policy.premium_amount).toFixed(2)}/mo</td>
                  <td className="px-3 py-4 text-sm space-x-2">
                    <button
                      onClick={() => togglePolicy(policy.policy_id, policy.policy_type)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {expandedPolicy === policy.policy_id ? '▼' : '▶'} Details
                    </button>
                    <button
                      onClick={() => handleEditPolicy(policy)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePolicy(policy.policy_id, policy.policy_number)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedPolicy === policy.policy_id && (
                  <tr>
                    <td colSpan="6" className="px-8 py-6 bg-gray-50">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Start Date:</p>
                            <p className="text-sm text-gray-900">{new Date(policy.start_date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">End Date:</p>
                            <p className="text-sm text-gray-900">{new Date(policy.end_date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Coverage Amount:</p>
                            <p className="text-sm text-gray-900">${parseFloat(policy.coverage_amount).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Deductible:</p>
                            <p className="text-sm text-gray-900">${parseFloat(policy.deductible_amount).toLocaleString()}</p>
                          </div>
                        </div>

                        {policy.policy_type === 'AUTO' && (
                          <div className="mt-6 border-t pt-4">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-lg font-medium text-gray-900">Drivers</h3>
                              <button
                                onClick={() => handleAddDriver(policy.policy_id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs font-medium"
                              >
                                + Add Driver
                              </button>
                            </div>
                            {loadingDrivers[policy.policy_id] ? (
                              <p className="text-sm text-gray-500">Loading drivers...</p>
                            ) : drivers[policy.policy_id] && drivers[policy.policy_id].length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-white">
                                    <tr>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">License #</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date of Birth</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Relationship</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {drivers[policy.policy_id].map((driver) => (
                                      <tr key={driver.driver_id}>
                                        <td className="px-3 py-2 text-sm text-gray-900">{driver.first_name} {driver.last_name}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{driver.license_number}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{new Date(driver.date_of_birth).toLocaleDateString()}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{driver.relationship_to_policyholder}</td>
                                        <td className="px-3 py-2 text-sm space-x-2">
                                          <button
                                            onClick={() => handleEditDriver(driver, policy.policy_id)}
                                            className="text-indigo-600 hover:text-indigo-900 text-xs"
                                          >
                                            Edit
                                          </button>
                                          <button
                                            onClick={() => handleDeleteDriver(policy.policy_id, driver.driver_id, `${driver.first_name} ${driver.last_name}`)}
                                            className="text-red-600 hover:text-red-900 text-xs"
                                          >
                                            Remove
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">No drivers found for this policy.</p>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Policy Modal */}
      <Modal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        title={editingPolicy ? 'Edit Policy' : 'Add New Policy'}
      >
        <form onSubmit={handlePolicySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Policyholder</label>
            <select
              name="policyholder_id"
              value={policyFormData.policyholder_id}
              onChange={(e) => setPolicyFormData({ ...policyFormData, policyholder_id: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a policyholder...</option>
              {policyholders.map(ph => (
                <option key={ph.policyholder_id} value={ph.policyholder_id}>
                  {ph.customer_type === 'INDIVIDUAL' ? `${ph.first_name} ${ph.last_name}` : ph.business_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Policy Type</label>
            <select
              name="policy_type"
              value={policyFormData.policy_type}
              onChange={(e) => setPolicyFormData({ ...policyFormData, policy_type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="AUTO">Auto</option>
              <option value="HOME">Home</option>
              <option value="LIFE">Life</option>
              <option value="HEALTH">Health</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={policyFormData.start_date}
                onChange={(e) => setPolicyFormData({ ...policyFormData, start_date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="end_date"
                value={policyFormData.end_date}
                onChange={(e) => setPolicyFormData({ ...policyFormData, end_date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Premium (Monthly)</label>
              <input
                type="number"
                name="premium_amount"
                value={policyFormData.premium_amount}
                onChange={(e) => setPolicyFormData({ ...policyFormData, premium_amount: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Coverage Amount</label>
              <input
                type="number"
                name="coverage_amount"
                value={policyFormData.coverage_amount}
                onChange={(e) => setPolicyFormData({ ...policyFormData, coverage_amount: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deductible</label>
              <input
                type="number"
                name="deductible_amount"
                value={policyFormData.deductible_amount}
                onChange={(e) => setPolicyFormData({ ...policyFormData, deductible_amount: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={policyFormData.status}
              onChange={(e) => setPolicyFormData({ ...policyFormData, status: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="ACTIVE">Active</option>
              <option value="EXPIRED">Expired</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setPolicyModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              {editingPolicy ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Driver Modal */}
      <Modal
        isOpen={driverModalOpen}
        onClose={() => setDriverModalOpen(false)}
        title={editingDriver ? 'Edit Driver' : 'Add New Driver'}
      >
        <form onSubmit={handleDriverSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="first_name"
                value={driverFormData.first_name}
                onChange={(e) => setDriverFormData({ ...driverFormData, first_name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={driverFormData.last_name}
                onChange={(e) => setDriverFormData({ ...driverFormData, last_name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={driverFormData.date_of_birth}
              onChange={(e) => setDriverFormData({ ...driverFormData, date_of_birth: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">License Number</label>
              <input
                type="text"
                name="license_number"
                value={driverFormData.license_number}
                onChange={(e) => setDriverFormData({ ...driverFormData, license_number: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">License State</label>
              <input
                type="text"
                name="license_state"
                value={driverFormData.license_state}
                onChange={(e) => setDriverFormData({ ...driverFormData, license_state: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                maxLength="2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Relationship to Policyholder</label>
            <select
              name="relationship_to_policyholder"
              value={driverFormData.relationship_to_policyholder}
              onChange={(e) => setDriverFormData({ ...driverFormData, relationship_to_policyholder: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="PRIMARY">Primary</option>
              <option value="SPOUSE">Spouse</option>
              <option value="CHILD">Child</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setDriverModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              {editingDriver ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Policies;
