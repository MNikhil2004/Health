import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Unauthorized: No token found. Please log in.");
            setLoading(false);
            return;
        }

        fetch("http://localhost:5000/api/admin/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => { throw new Error(err.message || "Failed to fetch users"); });
            }
            return res.json();
        })
        .then(data => {
            setUsers(data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching users:", err);
            setError(err.message);
            setLoading(false);
        });
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading users...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            {users.length > 0 ? (
                <table className="table-auto w-full border mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="border hover:bg-gray-100">
                                <td className="border p-2">{user.username}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center p-4">No users found</p>
            )}
        </div>
    );
};

export default AdminDashboard;
