import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { User as UserIcon, Camera, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { username } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/users/${username}`);
        setProfileUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  if (loading) return <div className="min-h-screen pt-24 text-center">Loading...</div>;
  if (!profileUser) {
    return (
      <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center bg-background">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-12 text-center max-w-lg"
        >
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Oops! No user found</h2>
          <p className="text-gray-500 mb-8 text-lg">Join now and start connecting with others!</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="btn-primary">
              Create Account
            </Link>
            <Link to="/login" className="px-6 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-xl font-bold transition-all">
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const isOwnProfile = currentUser && currentUser.username === profileUser.username;

  return (
    <div className="min-h-screen bg-background pt-20 pb-20 sm:pb-4 flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 mt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card overflow-hidden"
        >
          {/* Cover Section */}
          <div className="h-48 sm:h-64 bg-gradient-to-r from-primary to-secondary relative">
            {isOwnProfile && (
              <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-lg flex items-center gap-2 transition-all">
                <Camera size={18} /> <span className="hidden sm:inline text-sm font-medium">Edit Cover</span>
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8 relative">
            {/* Avatar */}
            <div className="absolute -top-16 border-4 border-white rounded-full bg-white shadow-md w-32 h-32 flex items-center justify-center overflow-hidden">
              {profileUser.profilePic ? (
                <img src={profileUser.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <UserIcon size={64} />
                </div>
              )}
              {isOwnProfile && (
                <button className="absolute bottom-2 right-2 bg-gray-800 text-white p-1.5 rounded-full hover:bg-primary transition-colors border-2 border-white">
                  <Camera size={14} />
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pt-20 sm:pt-4 sm:ml-36 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{profileUser.username}</h2>
                <p className="text-gray-500 font-medium">@{profileUser.username.toLowerCase()}</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                {isOwnProfile ? (
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold transition-all">
                    <Edit3 size={18} /> Edit Profile
                  </button>
                ) : (
                  <button className="flex-1 sm:flex-none btn-primary px-8">
                    Follow
                  </button>
                )}
              </div>
            </div>

            <p className="mt-6 text-gray-700 max-w-2xl">{profileUser.about || "No bio available."}</p>

            {/* Stats */}
            <div className="flex gap-8 mt-6 pt-6 border-t border-gray-100">
              <div className="text-center">
                <span className="block text-2xl font-bold text-gray-900">0</span>
                <span className="text-sm text-gray-500 font-medium">Posts</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-gray-900">{profileUser.followers?.length || 0}</span>
                <span className="text-sm text-gray-500 font-medium">Followers</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-gray-900">{profileUser.following?.length || 0}</span>
                <span className="text-sm text-gray-500 font-medium">Following</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Posts Grid Placeholder */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Recent Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">Post</div>
            <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">Post</div>
            <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">Post</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
