import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Payments from './pages/Payments';
import Notifications from './pages/Notifications';

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
