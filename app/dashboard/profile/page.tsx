"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Calendar,
  Trophy,
  Camera,
  Upload,
} from "lucide-react";
import { useToast } from "@/components/ToastProvider";

export default function ProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [playerProfile, setPlayerProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const profileImageRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
  });
  const [playerFormData, setPlayerFormData] = useState({
    age: "",
    dateOfBirth: "",
    gender: "",
    beltCategory: "",
    city: "",
    country: "",
    weight: "",
    height: "",
    profileImage: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.push("/auth/login");
        return;
      }
      const data = await res.json();
      setUser(data.user);
      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        phoneNumber: data.user.phoneNumber || "",
        address: data.user.address || "",
        city: data.user.city || "",
        country: data.user.country || "",
      });

      // If player, fetch player profile
      if (data.user.role === "player") {
        const profileRes = await fetch("/api/players");
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          const profile = profileData.players.find(
            (p: any) => p.userId === data.user.id,
          );
          if (profile) {
            setPlayerProfile(profile);
            setPlayerFormData({
              age: profile.age?.toString() || "",
              dateOfBirth: profile.dateOfBirth || "",
              gender: profile.gender || "",
              beltCategory: profile.beltCategory || "",
              city: profile.city || "",
              country: profile.country || "",
              weight: profile.weight?.toString() || "",
              height: profile.height?.toString() || "",
              profileImage: profile.profileImage || "",
            });
          }
        }
      }
    } catch (error) {
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image too large. Maximum 5MB.', 'error');
      return;
    }

    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;

        // Save to player profile
        const res = await fetch("/api/players", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            playerId: playerProfile.id,
            profileImage: base64String,
          }),
        });

        if (res.ok) {
          setPlayerFormData({ ...playerFormData, profileImage: base64String });
          setPlayerProfile({ ...playerProfile, profileImage: base64String });
          showToast("Profile picture updated!", "success");
        } else {
          showToast("Failed to update profile picture", "error");
        }
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      showToast('Failed to upload image', 'error');
      setUploadingImage(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlayerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setPlayerFormData({
      ...playerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      city: user.city || "",
      country: user.country || "",
    });
  };

  const handleEditPlayer = () => {
    setEditingPlayer(true);
  };

  const handleCancelPlayer = () => {
    setEditingPlayer(false);
    setPlayerFormData({
      age: playerProfile.age?.toString() || "",
      dateOfBirth: playerProfile.dateOfBirth || "",
      gender: playerProfile.gender || "",
      beltCategory: playerProfile.beltCategory || "",
      city: playerProfile.city || "",
      country: playerProfile.country || "",
      weight: playerProfile.weight?.toString() || "",
      height: playerProfile.height?.toString() || "",
      profileImage: playerProfile.profileImage || "",
    });
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setEditing(false);
        showToast("Profile updated successfully!", "success");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Failed to update profile", "error");
    }
  };

  const handleSavePlayer = async () => {
    try {
      const res = await fetch("/api/players", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId: playerProfile.id,
          name: user.name,
          age: parseInt(playerFormData.age),
          dateOfBirth: playerFormData.dateOfBirth,
          gender: playerFormData.gender,
          beltCategory: playerFormData.beltCategory,
          city: playerFormData.city,
          country: playerFormData.country,
          weight: playerFormData.weight
            ? parseFloat(playerFormData.weight)
            : undefined,
          height: playerFormData.height
            ? parseFloat(playerFormData.height)
            : undefined,
          dojoId: playerProfile.dojoId,
          profileImage: playerFormData.profileImage || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPlayerProfile(data.player);
        setEditingPlayer(false);
        showToast("Player profile updated successfully!", "success");
        // Refresh the page data
        checkAuth();
      }
    } catch (error) {
      console.error("Error updating player profile:", error);
      showToast("Failed to update player profile", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEFEFE] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {playerFormData.profileImage ? (
                  <div className="relative w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src={playerFormData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => profileImageRef.current?.click()}
                      className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center relative">
                    <User className="w-10 h-10 text-white" />
                    <button
                      onClick={() => profileImageRef.current?.click()}
                      className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition rounded-full"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                  </div>
                )}
                <input
                  ref={profileImageRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageUpload}
                  disabled={uploadingImage}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {editing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-3 py-2"
                    />
                  ) : (
                    user.name
                  )}
                </h1>
                <p className="text-gray-600 mt-1 capitalize">
                  {user.role.replace("_", " ")}
                </p>
              </div>
            </div>
            <div>
              {editing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition"
                >
                  <Edit2 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
          {(playerFormData.profileImage || user.role === "player") && (
            <div className="mt-3">
              <button
                onClick={() => profileImageRef.current?.click()}
                disabled={uploadingImage}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition"
              >
                <Upload className="w-4 h-4" />
                <span>{uploadingImage ? "Uploading..." : "Change Profile Picture"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Profile Information
          </h2>
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </div>
              </label>
              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  disabled
                />
              ) : (
                <p className="text-gray-900">{user.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </div>
              </label>
              {editing ? (
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="+1 (555) 000-0000"
                />
              ) : (
                <p className="text-gray-900">
                  {user.phoneNumber || "Not provided"}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Address</span>
                </div>
              </label>
              {editing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Street address"
                />
              ) : (
                <p className="text-gray-900">
                  {user.address || "Not provided"}
                </p>
              )}
            </div>

            {/* City & Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="City"
                  />
                ) : (
                  <p className="text-gray-900">{user.city || "Not provided"}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Country"
                  />
                ) : (
                  <p className="text-gray-900">
                    {user.country || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Player Profile Section (if user is a player) */}
        {user.role === "player" && playerProfile && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  Player Profile
                </h2>
              </div>
              {!editingPlayer ? (
                <button
                  onClick={handleEditPlayer}
                  className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <Edit2 className="w-5 h-5" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSavePlayer}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancelPlayer}
                    className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                {editingPlayer ? (
                  <input
                    type="number"
                    name="age"
                    value={playerFormData.age}
                    onChange={handlePlayerChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-900">
                    {playerProfile.age || "Not set"}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                {editingPlayer ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={playerFormData.dateOfBirth}
                    onChange={handlePlayerChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-900">
                    {playerProfile.dateOfBirth || "Not set"}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                {editingPlayer ? (
                  <select
                    name="gender"
                    value={playerFormData.gender}
                    onChange={handlePlayerChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-900 capitalize">
                    {playerProfile.gender || "Not set"}
                  </p>
                )}
              </div>

              {/* Belt Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Belt Category
                </label>
                {editingPlayer ? (
                  <input
                    type="text"
                    name="beltCategory"
                    value={playerFormData.beltCategory}
                    onChange={handlePlayerChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Black Belt 1st Dan"
                  />
                ) : (
                  <p className="text-gray-900">
                    {playerProfile.beltCategory || "Not set"}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                {editingPlayer ? (
                  <input
                    type="text"
                    name="city"
                    value={playerFormData.city}
                    onChange={handlePlayerChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-900">
                    {playerProfile.city || "Not set"}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                {editingPlayer ? (
                  <input
                    type="text"
                    name="country"
                    value={playerFormData.country}
                    onChange={handlePlayerChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-900">
                    {playerProfile.country || "Not set"}
                  </p>
                )}
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                {editingPlayer ? (
                  <input
                    type="number"
                    name="weight"
                    value={playerFormData.weight}
                    onChange={handlePlayerChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    step="0.1"
                  />
                ) : (
                  <p className="text-gray-900">
                    {playerProfile.weight || "Not set"}
                  </p>
                )}
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                {editingPlayer ? (
                  <input
                    type="number"
                    name="height"
                    value={playerFormData.height}
                    onChange={handlePlayerChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    step="0.1"
                  />
                ) : (
                  <p className="text-gray-900">
                    {playerProfile.height || "Not set"}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Account Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Account Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  User ID
                </span>
              </div>
              <span className="text-sm text-gray-900">{user.id}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Member Since
                </span>
              </div>
              <span className="text-sm text-gray-900">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  Account Status
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.isApproved
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {user.isApproved ? "Active" : "Pending Approval"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}