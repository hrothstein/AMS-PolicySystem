import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { policiesAPI, claimsAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPolicies: 0,
    byType: { HOME: 0, AUTO: 0, LIFE: 0 },
    byStatus: { ACTIVE: 0, PENDING: 0, CANCELLED: 0, EXPIRED: 0 },
    totalClaims: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [policiesRes, claimsRes] = await Promise.all([policiesAPI.getAll(), claimsAPI.getAll()]);
        const policies = policiesRes.data;
        const claims = claimsRes.data;

        const byType = { HOME: 0, AUTO: 0, LIFE: 0 };
        const byStatus = { ACTIVE: 0, PENDING: 0, CANCELLED: 0, EXPIRED: 0 };

        policies.forEach((policy) => {
          byType[policy.policy_type]++;
          byStatus[policy.status]++;
        });

        setStats({ totalPolicies: policies.length, byType, byStatus, totalClaims: claims.length });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="text-gray-500">Loading dashboard...</div></div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">Overview of your policy management system (In-Memory Demo)</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Policies Overview</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card"><div className="text-sm font-medium text-gray-500">Total Policies</div><div className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalPolicies}</div></div>
          <div className="card"><div className="text-sm font-medium text-gray-500">Home Policies</div><div className="mt-1 text-3xl font-semibold text-blue-600">{stats.byType.HOME}</div></div>
          <div className="card"><div className="text-sm font-medium text-gray-500">Auto Policies</div><div className="mt-1 text-3xl font-semibold text-green-600">{stats.byType.AUTO}</div></div>
          <div className="card"><div className="text-sm font-medium text-gray-500">Life Policies</div><div className="mt-1 text-3xl font-semibold text-purple-600">{stats.byType.LIFE}</div></div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Policy Status</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card"><div className="text-sm font-medium text-gray-500">Active</div><div className="mt-1 text-2xl font-semibold text-green-600">{stats.byStatus.ACTIVE}</div></div>
          <div className="card"><div className="text-sm font-medium text-gray-500">Pending</div><div className="mt-1 text-2xl font-semibold text-yellow-600">{stats.byStatus.PENDING}</div></div>
          <div className="card"><div className="text-sm font-medium text-gray-500">Total Claims</div><div className="mt-1 text-2xl font-semibold text-blue-600">{stats.totalClaims}</div></div>
          <div className="card"><div className="text-sm font-medium text-gray-500">Expired</div><div className="mt-1 text-2xl font-semibold text-gray-600">{stats.byStatus.EXPIRED}</div></div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link to="/policyholders" className="card hover:shadow-lg transition-shadow cursor-pointer"><div className="text-base font-medium text-gray-900">View Policyholders</div><div className="mt-1 text-sm text-gray-500">50 customers loaded</div></Link>
          <Link to="/policies" className="card hover:shadow-lg transition-shadow cursor-pointer"><div className="text-base font-medium text-gray-900">View Policies</div><div className="mt-1 text-sm text-gray-500">Browse and manage policies</div></Link>
          <Link to="/claims" className="card hover:shadow-lg transition-shadow cursor-pointer"><div className="text-base font-medium text-gray-900">View Claims</div><div className="mt-1 text-sm text-gray-500">Review and process claims</div></Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
