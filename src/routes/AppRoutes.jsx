import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import CustomerBreakdownPage from '../pages/CustomerBreakdownPage';
import TransactionDetailsPage from '../pages/TransactionDetailsPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Dashboard - lists all customers with search/sort/pagination */}
      <Route path="/" element={<DashboardPage />} />

      {/* Monthly breakdown for a specific customer */}
      <Route path="/customer/:customerId" element={<CustomerBreakdownPage />} />

      {/* Transaction details for a customer's specific month */}
      <Route
        path="/customer/:customerId/transactions/:month"
        element={<TransactionDetailsPage />}
      />
    </Routes>
  );
};

export default AppRoutes;
