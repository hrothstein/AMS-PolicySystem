import React, { useState, useEffect } from 'react';
import { claimsAPI, policiesAPI } from '../services/api';
import Modal from '../components/Modal';

const Claims = () => {
  const [claims, setClaims] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClaim, setEditingClaim] = useState(null);
  const [formData, setFormData] = useState({
    policy_id: '',
    claim_type: '',
    claim_date: new Date().toISOString().split('T')[0],
    incident_date: new Date().toISOString().split('T')[0],
    description: '',
    claim_amount: '',
    status: 'PENDING',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [claimsRes, policiesRes] = await Promise.all([
        claimsAPI.getAll(),
        policiesAPI.getAll()
      ]);
      setClaims(claimsRes.data);
      setPolicies(policiesRes.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingClaim(null);
    setFormData({
      policy_id: '',
      claim_type: '',
      claim_date: new Date().toISOString().split('T')[0],
      incident_date: new Date().toISOString().split('T')[0],
      description: '',
      claim_amount: '',
      status: 'PENDING',
    });
    setModalOpen(true);
  };

  const handleEdit = (claim) => {
    setEditingClaim(claim);
    setFormData({
      policy_id: claim.policy_id,
      claim_type: claim.claim_type,
      claim_date: claim.claim_date.split('T')[0],
      incident_date: claim.incident_date.split('T')[0],
      description: claim.description,
      claim_amount: claim.claim_amount,
      status: claim.status,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id, claimNumber) => {
    if (!confirm(`Are you sure you want to delete claim ${claimNumber}?`)) return;
    
    try {
      await claimsAPI.delete(id);
      await fetchData();
      alert('Claim deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete claim');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingClaim) {
        await claimsAPI.update(editingClaim.claim_id, formData);
        alert('Claim updated successfully');
      } else {
        await claimsAPI.create(formData);
        alert('Claim created successfully');
      }
      setModalOpen(false);
      await fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to ${editingClaim ? 'update' : 'create'} claim`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="text-gray-500">Loading...</div></div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Claims ({claims.length})</h1>
        <button
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          + File New Claim
        </button>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Claim Number</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Policy</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {claims.map((claim) => (
              <tr key={claim.claim_id}>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{claim.claim_number}</td>
                <td className="px-3 py-4 text-sm text-gray-500">{claim.policy_number}</td>
                <td className="px-3 py-4 text-sm"><span className="badge bg-blue-100 text-blue-800">{claim.claim_type}</span></td>
                <td className="px-3 py-4 text-sm">
                  <span className={`badge ${claim.status === 'APPROVED' ? 'bg-green-100 text-green-800' : claim.status === 'DENIED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {claim.status}
                  </span>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">${parseFloat(claim.claim_amount).toLocaleString()}</td>
                <td className="px-3 py-4 text-sm space-x-2">
                  <button
                    onClick={() => handleEdit(claim)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(claim.claim_id, claim.claim_number)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingClaim ? 'Edit Claim' : 'File New Claim'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Policy</label>
            <select
              name="policy_id"
              value={formData.policy_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a policy...</option>
              {policies.map(policy => (
                <option key={policy.policy_id} value={policy.policy_id}>
                  {policy.policy_number} - {policy.policy_type} ({policy.business_name || `${policy.first_name} ${policy.last_name}`})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Claim Type</label>
            <select
              name="claim_type"
              value={formData.claim_type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select type...</option>
              <option value="AUTO_ACCIDENT">Auto Accident</option>
              <option value="AUTO_THEFT">Auto Theft</option>
              <option value="AUTO_DAMAGE">Auto Damage</option>
              <option value="HOME_FIRE">Home Fire</option>
              <option value="HOME_THEFT">Home Theft</option>
              <option value="HOME_WATER_DAMAGE">Home Water Damage</option>
              <option value="HOME_NATURAL_DISASTER">Home Natural Disaster</option>
              <option value="LIFE_DEATH">Life Death</option>
              <option value="HEALTH_MEDICAL">Health Medical</option>
              <option value="HEALTH_HOSPITALIZATION">Health Hospitalization</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Claim Date</label>
              <input
                type="date"
                name="claim_date"
                value={formData.claim_date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Incident Date</label>
              <input
                type="date"
                name="incident_date"
                value={formData.incident_date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Claim Amount</label>
            <input
              type="number"
              name="claim_amount"
              value={formData.claim_amount}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="DENIED">Denied</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              {editingClaim ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Claims;
