// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user"); // Default role is "user"
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/login", {
//         email,
//         password,
//         role, // Send selected role to backend
//       });

//       console.log("Login successful:", response.data);

//       // Save JWT token and role in local storage
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("role", response.data.role);

//       alert("Login successful!");

//       // Redirect based on selected role
//       if (response.data.role === "admin") {
//         navigate("/admin-home"); // Redirect admin to Dashboard
//       } else {
//         navigate("/user-home"); // Redirect user to Home page
//       }
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Login failed. Try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       {error && <p className="text-red-500">{error}</p>}

//       <form className="flex flex-col gap-4" onSubmit={handleLogin}>
//         {/* Email Input */}
//         <input
//           type="email"
//           placeholder="Email"
//           className="p-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         {/* Password Input */}
//         <input
//           type="password"
//           placeholder="Password"
//           className="p-2 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {/* Role Selection */}
//         <div className="flex space-x-4">
//           <label className="flex items-center">
//             <input
//               type="radio"
//               value="user"
//               checked={role === "user"}
//               onChange={() => setRole("user")}
//               className="mr-2"
//             />
//             User
//           </label>

//           <label className="flex items-center">
//             <input
//               type="radio"
//               value="admin"
//               checked={role === "admin"}
//               onChange={() => setRole("admin")}
//               className="mr-2"
//             />
//             Admin
//           </label>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="p-2 bg-blue-500 text-white rounded">
//           Login
//         </button>
//       </form>

//       {/* Signup Link */}
//       <p className="mt-4">
//         Don't have an account?{" "}
//         <Link to="/register" className="text-blue-500">Sign up</Link>
//       </p>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role = user
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Backend only checks email & password, not role
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);

      // Save token & role in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role); // Use selected role from frontend

      alert("Login successful!");

      // Navigate instantly based on selected role
      navigate(role === "admin" ? "/admin-home" : "/user-home");
      
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role Selection */}
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
              className="mr-2"
            />
            User
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
              className="mr-2"
            />
            Admin
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>

      {/* Signup Link */}
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
