import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">My App</h1>
      <div>
        <Link to="/login" className="px-4 py-2 bg-blue-500 rounded" id="login">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
