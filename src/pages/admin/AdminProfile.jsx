// src/pages/admin/AdminProfile.jsx
import { useState, useEffect } from 'react';
import {
  UserIcon,
  EnvelopeIcon,
  KeyIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'; // BellIcon removed
import api from '../../services/api';

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: 'ADMIN',
  });
  const [formData, setFormData] = useState(profile);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const response = await api.get('/admin/profile');
      setProfile(response.data.data);
      setFormData(response.data.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.data || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Show loading indicator while fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-lg text-gray-600">Loading Profile...</p>
      </div>
    );
  }

  // Save profile changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/admin/profile', {
        name: formData.name,
        email: formData.email,
      });
      alert(response.data.data || 'Profile updated successfully');
      await fetchProfile();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.data || 'Update failed');
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  // Password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await api.put('/admin/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmNew: passwordData.confirmPassword,
      });

      alert(response.data.data || 'Password updated successfully');

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.data || 'Password change failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Admin Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-24"></div>
        <div className="px-6 pb-6 relative">
          {/* Avatar – generated from name */}
          <div className="flex justify-center -mt-12 mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile.name || 'Admin'
              )}&background=8b5cf6&color=fff&bold=true&size=128`}
              alt={profile.name}
              className="h-24 w-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>

          {!isEditing ? (
            // View Mode
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <p className="text-gray-500 capitalize">
                  {profile.role === 'ADMIN' ? 'Administrator' : profile.role}
                </p>
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <EnvelopeIcon className="h-5 w-5" />
                  <span>{profile.email}</span>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
                >
                  <PencilIcon className="h-5 w-5" />
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    formData.name || 'Admin'
                  )}&background=8b5cf6&color=fff&bold=true&size=128`}
                  alt="Preview"
                  className="h-20 w-20 rounded-full mx-auto border-2 border-gray-200"
                />
                <p className="text-xs text-gray-500 mt-1">Avatar from name</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
                >
                  <CheckIcon className="h-5 w-5" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-400"
                >
                  <XMarkIcon className="h-5 w-5" />
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <KeyIcon className="h-6 w-6 text-gray-600" />
          <h2 className="text-lg font-semibold">Change Password</h2>
        </div>
        <form onSubmit={handlePasswordChange} className="space-y-3">
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}