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

function AppContent() {
  const location = useLocation();

  const exactHideRoutes = ['/register', '/login'];
  const prefixHideRoutes = ['/dashboard', '/inventory', '/add-inventory-item', '/ready-for-pickup'];

  const shouldHideHeader =
    exactHideRoutes.includes(location.pathname) ||
    prefixHideRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen">
      {!shouldHideHeader && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/payment" element={<Payment />} />
        <Route path="/dashboard/pending" element={<PendingRecords />} />
        <Route path="/dashboard/pending-payments" element={<PendingPayments />} />
        <Route path="/dashboard/insert-record" element={<InsertRecord />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/history" element={<History />} />
        <Route path="/dashboard/Laundryinfo" element={<CustomerLaundryInfo />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/add-inventory-item" element={<AddInventoryItem />} />
        <Route path="/ready-for-pickup" element={<ReadyForPickup />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;