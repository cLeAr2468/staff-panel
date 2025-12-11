import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/header';
import Home from './components/layout/home';
import About from './components/layout/about';
import Services from './components/layout/services';
import Prices from './components/layout/prices';
import Register from './components/layout/register';
import Login from './components/layout/Login';
import Dashboard from './components/layout/Dashboard';
import Payment from './components/layout/payment';
import Profile from './components/layout/Profile';
import History from './components/layout/History';
import PendingRecords from './components/layout/PendingRecords';
import PendingPayments from './components/layout/PendingPayments';
import InsertRecord from './components/layout/InsertRecord';
import CustomerLaundryInfo from './components/layout/CustomerLaundryInfo';
import Inventory from './components/layout/Inventory';
import AddInventoryItem from './components/layout/AddInventoryItem';
import ReadyForPickup from './components/layout/ReadyForPickup';
import Ongoing from './components/layout/ongoing';
import PublicLayout from './components/layout/PublicLayout';
import { Toaster as SonnerToaster } from "sonner";
import ResetPassword from './modals/ResetPassword';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const location = useLocation();

  const exactHideRoutes = ['/register', '/login'];
  const prefixHideRoutes = ['/dashboard', '/inventory', '/add-inventory-item', '/ready-for-pickup', '/ongoing'];

  // Check if path ends with /login, /register, or /reset-password (handles slug-based routes)
  const endsWithAuthRoute = location.pathname.endsWith('/login') ||
    location.pathname.endsWith('/register') ||
    location.pathname.endsWith('/reset-password');

  const shouldHideHeader =
    exactHideRoutes.includes(location.pathname) ||
    endsWithAuthRoute ||
    prefixHideRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen">
      {/* {!shouldHideHeader && <Header />} */}
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/:slug?" element={<Home />} />
          <Route path="/:slug?/about" element={<About />} />
          <Route path="/:slug?/services" element={<Services />} />
          <Route path="/:slug?/prices" element={<Prices />} />
          <Route path="/:slug?/login" element={<Login />} />
          <Route path="/:slug?/reset-password" element={<ResetPassword />} />
          <Route path="/:slug?/register" element={<Register />} />
        </Route>
        {/* Protected Routes */}
        <Route path="/:slug?/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/dashboard/pending" element={<ProtectedRoute><PendingRecords /></ProtectedRoute>} />
        <Route path="/dashboard/pending-payments" element={<ProtectedRoute><PendingPayments /></ProtectedRoute>} />
        <Route path="/dashboard/insert-record" element={<ProtectedRoute><InsertRecord /></ProtectedRoute>} />
        <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/dashboard/Laundryinfo" element={<ProtectedRoute><CustomerLaundryInfo /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        <Route path="/add-inventory-item" element={<ProtectedRoute><AddInventoryItem /></ProtectedRoute>} />
        <Route path="/ready-for-pickup" element={<ProtectedRoute><ReadyForPickup /></ProtectedRoute>} />
        <Route path="/ongoing" element={<ProtectedRoute><Ongoing /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <AppContent />
    </Router>
  );
}

export default App;