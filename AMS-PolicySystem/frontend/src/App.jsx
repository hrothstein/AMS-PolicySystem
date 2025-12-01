import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Policyholders from './pages/Policyholders';
import Policies from './pages/Policies';
import Claims from './pages/Claims';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
        <Route path="/policyholders" element={<PrivateRoute><Layout><Policyholders /></Layout></PrivateRoute>} />
        <Route path="/policies" element={<PrivateRoute><Layout><Policies /></Layout></PrivateRoute>} />
        <Route path="/claims" element={<PrivateRoute><Layout><Claims /></Layout></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
