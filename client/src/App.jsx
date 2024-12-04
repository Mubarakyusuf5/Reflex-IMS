// App.jsx
import React from 'react';
import { Login } from './pages/login/Login';
import { Frgt } from './pages/login/Frgt';
import { UserDashboard } from './pages/dashboard/UserDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { Product } from './pages/AdminPages/AppProduct/Product';
import { User } from './pages/AdminPages/AddUser/User';
import { Category } from './pages/AdminPages/Category';
import { Supplier } from './pages/AdminPages/Supplier';
import { Report } from './pages/AdminPages/Report';
// import { Receipt } from './components/Printable/Receipt';
// import { UserReport } from './pages/UserPages/UserReport';
import { Sales } from './pages/UserPages/Sales';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './Context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/forgotPassword" element={<Frgt />} />

        {/* User routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<UserDashboard />} allowedRoles={['user']} />} />
        {/* <Route path="/receipt" element={<ProtectedRoute element={<Receipt />} allowedRoles={['user']} />} /> */}
        <Route path="/sales" element={<ProtectedRoute element={<Sales />} allowedRoles={['user', 'admin']} />} />
        {/* <Route path="/report" element={<ProtectedRoute element={<UserReport />} allowedRoles={['user']} />} /> */}

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />} />
        <Route path="/admin/products" element={<ProtectedRoute element={<Product />} allowedRoles={['admin']} />} />
        <Route path="/admin/users" element={<ProtectedRoute element={<User />} allowedRoles={['admin']} />} />
        <Route path="/admin/categories" element={<ProtectedRoute element={<Category />} allowedRoles={['admin']} />} />
        <Route path="/admin/suppliers" element={<ProtectedRoute element={<Supplier />} allowedRoles={['admin']} />} />
        <Route path="/admin/report" element={<ProtectedRoute element={<Report />} allowedRoles={['admin']} />} />

        {/* Undefined page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />

      </Routes>
    </AuthProvider>
  );
};
