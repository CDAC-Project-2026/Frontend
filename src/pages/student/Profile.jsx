import React, { useState } from 'react';
import { UserCircleIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const [profile, setProfile] = useState({
    student_name: "Eshita Chaskar",
    email: "eshita@example.com",
    phone: "+91 9876543210",
    city: "Pune",
    grade: "A+",
    rank: "1"
  });

  const [editFields, setEditFields] = useState({ ...profile });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmNew: "" });
  const [deleteConfirmationPassword, setDeleteConfirmationPassword] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeletingProfile, setIsDeletingProfile] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...editFields });
    setIsEditing(false);
    alert("Profile info successfully saved!");
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNew) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ currentPassword: "", newPassword: "", confirmNew: "" });
    setIsChangingPassword(false);
  };

  const handleDeleteAccountSubmit = (e) => {
    e.preventDefault();
    if (!deleteConfirmationPassword) return;
    alert(`Account drop authorized for database verification. Password checked: ${deleteConfirmationPassword}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      
      
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-60"></div>
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
            <UserCircleIcon className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{profile.student_name}</h2>
            <p className="text-sm font-medium text-blue-600 mt-1">
              Class Rank: #{profile.rank} <span className="text-gray-300 mx-2">|</span> Grade Status: {profile.grade}
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto relative z-10">
          <button 
            onClick={() => { setIsEditing(!isEditing); setIsChangingPassword(false); setIsDeletingProfile(false); }}
            className="flex-1 sm:flex-none text-center px-6 py-2.5 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
          >
            {isEditing ? "Cancel Edit" : "Edit Profile"}
          </button>
          <button 
            onClick={() => { setIsChangingPassword(!isChangingPassword); setIsEditing(false); setIsDeletingProfile(false); }}
            className="flex-1 sm:flex-none text-center px-6 py-2.5 text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 rounded-full border border-gray-200 shadow-sm transition-colors"
          >
            Security
          </button>
        </div>
      </div>

      
      {!isChangingPassword && !isDeletingProfile && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-5">
            <h3 className="font-bold text-gray-900">Account Information</h3>
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Full Name</label>
                  <input type="text" value={editFields.student_name} onChange={(e) => setEditFields({...editFields, student_name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Email ID</label>
                  <input type="email" value={editFields.email} onChange={(e) => setEditFields({...editFields, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Phone</label>
                  <input type="text" value={editFields.phone} onChange={(e) => setEditFields({...editFields, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">City Location</label>
                  <input type="text" value={editFields.city} onChange={(e) => setEditFields({...editFields, city: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition-all" />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" className="px-8 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md transition-all hover:-translate-y-0.5">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</span>
                <span className="text-gray-900 font-semibold text-lg">{profile.student_name}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Registered Email</span>
                <span className="text-gray-900 font-semibold text-lg">{profile.email}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Reference</span>
                <span className="text-gray-900 font-semibold text-lg">{profile.phone}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">City Metro</span>
                <span className="text-gray-900 font-semibold text-lg">{profile.city}</span>
              </div>
            </div>
          )}
        </div>
      )}

      
      {isChangingPassword && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 max-w-2xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Modify Security Key</h3>
          <form onSubmit={handleChangePasswordSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Current Password</label>
              <input type="password" value={passwords.currentPassword} onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">New Secure Password</label>
              <input type="password" value={passwords.newPassword} onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Confirm New Password</label>
              <input type="password" value={passwords.confirmNew} onChange={(e) => setPasswords({...passwords, confirmNew: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
            </div>
            <div className="flex gap-3 pt-4">
              <button type="submit" className="px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md transition-all hover:-translate-y-0.5">Update Password</button>
              <button type="button" onClick={() => setIsChangingPassword(false)} className="px-6 py-3 text-sm font-bold text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}
      
      
      <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8 mt-12 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <ShieldExclamationIcon className="w-6 h-6 text-red-600" />
          <h3 className="text-xl font-bold text-red-900">Danger Zone</h3>
        </div>
        <p className="text-sm text-red-600/80 mb-6 font-medium max-w-2xl">Actions here permanently remove system table instances associated with your profile ID. This cannot be undone.</p>
        
        {isDeletingProfile ? (
          <form onSubmit={handleDeleteAccountSubmit} className="space-y-5 max-w-xl bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
            <p className="text-sm font-bold text-gray-800">To confirm, please provide your current account access password:</p>
            <input 
              type="password" 
              placeholder="Enter your security password" 
              value={deleteConfirmationPassword}
              onChange={(e) => setDeleteConfirmationPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 text-sm border border-red-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              required 
            />
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-6 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-full shadow-md">Confirm Permanent Delete</button>
              <button type="button" onClick={() => setIsDeletingProfile(false)} className="px-6 py-3 text-sm font-bold text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">Cancel</button>
            </div>
          </form>
        ) : (
          <button 
            onClick={() => { setIsDeletingProfile(true); setIsEditing(false); setIsChangingPassword(false); }}
            className="px-6 py-3 text-sm font-bold text-red-600 bg-white border border-red-200 rounded-full shadow-sm hover:bg-red-50 transition-colors"
          >
            Delete Student Profile
          </button>
        )}
      </div>

    </div>
  );
};

export default Profile;