// src/pages/Profile/Profile.jsx
import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthProvider"; // Use useAuth hook
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEdit, FaArrowLeft } from "react-icons/fa";

const MyProfile = () => {
  const { user, loading: authLoading } = useAuth(); // Use useAuth()

  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
  });
  const [saving, setSaving] = useState(false);

  // Page title
  useEffect(() => {
    document.title = "My Profile - MovieMaster";
  }, []);

  // Auto-fill from Firebase user
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.displayName.trim()) {
      toast.error("Name is required!");
      return;
    }
    setSaving(true);
    try {
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL || null,
      });
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  /* ------------------- Loading & Auth ------------------- */
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    toast.warn("Please log in to view your profile.");
    return <Navigate to="/login" replace />;
  }

  /* ------------------- UI ------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 px-4">
      {/* Back Button */}
      <div className="container mx-auto mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition"
        >
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-500/30 p-8"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="avatar mb-5 relative group">
              <div className="w-32 h-32 rounded-full ring-4 ring-orange-500 ring-offset-4 ring-offset-gray-900 shadow-xl overflow-hidden">
                <img
                  src={formData.photoURL || "/images/user.png"} // Use /images/user.png
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/128?text=You")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-full opacity-0 group-hover:opacity-100 transition flex items-end justify-center pb-2">
                  <FaEdit className="text-orange-400 text-xl" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              {user.displayName || "User"}
            </h1>
            <p className="text-orange-300 text-sm mt-2">
              <FaUser className="inline mr-1" />
              {user.email}
            </p>
          </div>

          <div className="divider divider-orange my-8"></div>

          {/* Edit Form */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-300">Full Name</span>
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-gray-800/50 text-white placeholder-gray-500 border-orange-500/30 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-300">Photo URL</span>
              </label>
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full bg-gray-800/50 text-white placeholder-gray-500 border-orange-500/30 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition"
              />
              <label className="label">
                <span className="label-text-alt text-xs text-gray-500">
                  Paste a direct image link (optional)
                </span>
              </label>
            </div>

            {/* Gradient Save Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </button>
          </form>

          {/* Live Photo Preview */}
          {formData.photoURL && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400 mb-3">Live Preview:</p>
              <img
                src={formData.photoURL}
                alt="Preview"
                className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-orange-500 shadow-md"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </motion.div>

        {/* Tagline */}
        <p className="mt-10 text-center text-gray-400 animate-pulse text-sm font-medium">
          Your movies, your story
        </p>
      </div>
    </div>
  );
};

export default MyProfile;