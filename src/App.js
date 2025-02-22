import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Customers from "./pages/Customers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [notificationCount, setNotificationCount] = useState(0);

  const handleNotificationClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/notifications", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) throw new Error("Failed to fetch notifications");

      const data = await response.json();
      setNotificationCount(data.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <>
      <Header
        onNotificationClick={handleNotificationClick}
        notificationCount={notificationCount}
      />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
