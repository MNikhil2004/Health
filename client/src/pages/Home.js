import { Link } from "react-router-dom";
import "../css/Navbar.css"

function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-blue-500 p-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">My App</h1>
        <Link to="/login">
          <button className="bg-white text-blue-500 px-4 py-2 rounded">
            Login
          </button>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-3xl font-bold">Welcome to My App</h2>
      </div>
    </div>
  );
}

export default Home;
