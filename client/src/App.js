// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Registration from "./pages/Registration";
// import Home from "./pages/Home";
// import AdminDashboard from "./pages/AdminDashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Registration />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import UserHome from "./pages/UserHome";
import AdminHome from "./pages/AdminHome";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setUserRole(localStorage.getItem("role")); // Set role on app load
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        
        {/* Protected Routes */}
        <Route path="/user-home" element={userRole === "user" ? <UserHome /> : <Navigate to="/login" />} />
        <Route path="/admin-home" element={userRole === "admin" ? <AdminHome /> : <Navigate to="/login" />} />
        <Route path="/admin-dashboard" element={userRole === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
