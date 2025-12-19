import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import GrievanceForm from './pages/GrievanceForm';
import HowItWorks from './pages/HowItWorks';

import DepartmentDetails from './pages/DepartmentDetails';
import Footer from './components/Footer';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="App font-sans text-gray-900 bg-gray-50 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
              <Breadcrumbs />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/raise-grievance" element={<GrievanceForm />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/department/:id" element={<DepartmentDetails />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
