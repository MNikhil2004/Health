import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const userRole = localStorage.getItem("role"); // Get role
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">
        {userRole === "admin" ? "Welcome, Admin" : "Welcome, User"}
      </h1>
      <div>
        {userRole === "admin" && (
          <Link to="/admin-dashboard" className="px-4 py-2 bg-yellow-500 rounded mr-4">
            Admin Dashboard
          </Link>
        )}
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
