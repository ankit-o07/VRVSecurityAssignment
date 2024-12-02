import React, { useState, useEffect } from "react";
import { handleSuccess, handleError } from "../../Helper/Utils";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/admin/users", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const result = await response.json();
        console.log(result);
        if (result.success) {
          // Filter out users with the role "Admin"
          const nonAdminUsers = result.users.filter((user) => user.role !== "Admin");
          setUsers(nonAdminUsers);
        } else {
          console.error("Failed to fetch users:", result.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        const details = error?.details[0].message;
        handleError(details)
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const makeModerator = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ role: "Moderator" }),
      });

      const result = await response.json();
      console.log(result)
      if (result.success) {
        handleSuccess(`User successfully updated to Moderator!`);
        // Update local state to reflect the new role
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, role: "Moderator" } : user
          )
        );
      } 

    } catch (error) {
      console.error("Error updating user role:", error);
      handleError("An error occurred while updating the user's role.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : users.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-gray-500">Email: {user.email}</p>
              <p className="text-gray-500">Role: {user.role}</p>
              {user.role !== "Moderator" && (
                <button
                  onClick={() => makeModerator(user._id)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Make Moderator
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No users found.</p>
      )}
    </div>
  );
}

export default AdminDashboard;
