// src/pages/admin/ManageUsers.jsx
import { useState, useEffect } from "react";
import api from "../../services/api";
import { 
  UserPlusIcon, 
  PencilIcon, 
  TrashIcon, 
  XMarkIcon,
  CheckIcon 
} from '@heroicons/react/24/outline';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filterRole, setFilterRole] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    role: "STUDENT"
  });

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || error.response?.data?.data || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Name is required");
      return false;
    }
    if (!formData.phone.trim()) {
      alert("Phone is required");
      return false;
    }
    if (formData.role === "STUDENT" && !formData.city.trim()) {
      alert("City is required for students");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.role === "STUDENT" ? formData.city : null,
        role: formData.role.toUpperCase()
      };

      if (editingUser) {
        const response = await api.put("/admin/users", payload);
        alert(response.data.data || "User updated successfully");
      } else {
        const response = await api.post("/admin/users", payload);
        alert(response.data.data || "User created successfully");
      }
      await fetchUsers();
      setShowForm(false);
      setEditingUser(null);
      setFormData({ name: "", email: "", phone: "", city: "", role: "STUDENT" });
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        error.response?.data?.data ||
        "Operation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      city: user.city || "",
      role: user.role
    });
    setShowForm(true);
  };

  const handleDelete = async (email) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const response = await api.delete(`/admin/users/${email}`);
      alert(response.data.data || "User deleted");
      await fetchUsers();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        error.response?.data?.data ||
        "Delete failed"
      );
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", phone: "", city: "", role: "STUDENT" });
  };

  const filteredUsers = filterRole === "ALL"
    ? users
    : users.filter(user => user.role === filterRole);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <div className="flex gap-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Users</option>
            <option value="STUDENT">Students</option>
            <option value="ADMIN">Admins</option>
          </select>
          <button
            onClick={() => {
              setEditingUser(null);
              setFormData({
                name: "",
                email: "",
                phone: "",
                city: "",
                role: "STUDENT"
              });
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
          >
            <UserPlusIcon className="h-5 w-5" />
            Add User
          </button>
        </div>
      </div>

      {/* Add/Edit User Form */}
      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">{editingUser ? 'Edit User' : 'New User'}</h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={editingUser}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {formData.role === "STUDENT" && (
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}
            <select
              value={formData.role}
              disabled={!!editingUser}
              onChange={(e) => {
                const newRole = e.target.value;
                setFormData({ 
                  ...formData, 
                  role: newRole,
                  city: newRole === "STUDENT" ? formData.city : ""
                });
              }}
              className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                editingUser ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className={`bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <CheckIcon className="h-4 w-4" />
                {loading ? "Saving..." : (editingUser ? 'Update' : 'Create')}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table – Phone & City columns removed */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.email} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff&bold=true`} 
                    alt={user.name} 
                    className="h-10 w-10 rounded-full object-cover" 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'ADMIN' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}