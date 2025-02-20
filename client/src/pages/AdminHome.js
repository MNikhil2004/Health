import Navbar from "../pages/Navbar";

function AdminHome() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-3xl font-bold">Welcome to Admin Home</h2>
      </div>
    </div>
  );
}

export default AdminHome;
