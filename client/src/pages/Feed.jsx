import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Image as ImageIcon, Video, Smile, Home, Compass, Bell, Settings, User as UserIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts/feed');
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    try {
      const { data } = await api.post('/posts', { description: newPost, fileType: 'text' });
      setPosts([data, ...posts]);
      setNewPost('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-20 md:pb-4">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
        
        {/* Left Sidebar (Hidden on mobile) */}
        <div className="hidden md:block col-span-1 lg:col-span-1">
          <div className="sticky top-24 card p-4 flex flex-col gap-2">
            <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Home size={22} /> Home
            </NavLink>
            <NavLink to="/explore" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Compass size={22} /> Explore
            </NavLink>
            <NavLink to="/notifications" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Bell size={22} /> Notifications
            </NavLink>
            <NavLink to={`/profile/${user?.username}`} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}>
              <UserIcon size={22} /> Profile
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Settings size={22} /> Settings
            </NavLink>
          </div>
        </div>

        {/* Center Content (Feed) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-6">
          
          {/* Stories (Horizontal Scroll) */}
          <div className="card p-4 flex gap-4 overflow-x-auto hide-scrollbar">
            <div className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50">
                +
              </div>
              <span className="text-xs font-medium text-gray-600">Add Story</span>
            </div>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer">
                <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5">
                  <img src={`https://i.pravatar.cc/150?img=${i}`} alt="Story" className="w-full h-full rounded-full object-cover" />
                </div>
                <span className="text-xs font-medium text-gray-600">User {i}</span>
              </div>
            ))}
          </div>

          {/* Create Post Input */}
          <div className="card p-4">
            <div className="flex gap-3">
              {user?.profilePic ? (
                <img src={user.profilePic} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                  <UserIcon size={20} />
                </div>
              )}
              <form onSubmit={handleCreatePost} className="flex-1">
                <input 
                  type="text" 
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind?" 
                  className="w-full bg-gray-50 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary transition-all text-gray-800"
                />
              </form>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
              <div className="flex gap-2 sm:gap-4">
                <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium px-2 py-1 rounded-lg hover:bg-primary/5">
                  <ImageIcon size={18} className="text-green-500" /> Photo
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium px-2 py-1 rounded-lg hover:bg-primary/5">
                  <Video size={18} className="text-blue-500" /> Video
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium px-2 py-1 rounded-lg hover:bg-primary/5 hidden sm:flex">
                  <Smile size={18} className="text-yellow-500" /> Feeling
                </button>
              </div>
              <button onClick={handleCreatePost} className="btn-primary py-1.5 px-4 text-sm">Post</button>
            </div>
          </div>

          {/* Posts Feed */}
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="card p-4 animate-pulse">
                <div className="flex gap-3 items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-24 bg-gray-200 rounded-xl w-full"></div>
              </div>
            ))
          ) : (
            posts.map(post => (
              <motion.div 
                key={post._id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    {post.userId?.profilePic ? (
                      <img src={post.userId.profilePic} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <UserIcon size={20} />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.userId?.username || 'Unknown User'}</h3>
                      <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">•••</button>
                </div>
                
                <p className="text-gray-800 mb-4 whitespace-pre-wrap leading-relaxed">{post.description}</p>
                
                {post.mediaUrl && (
                  <img src={post.mediaUrl} alt="Post" className="w-full rounded-xl mb-4 object-cover max-h-96" />
                )}
                
                <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors font-medium">
                    <Heart size={20} /> 
                    <span>{post.likes?.length || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium">
                    <MessageCircle size={20} /> 
                    <span>{post.comments?.length || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium ml-auto">
                    <Share2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))
          )}

          {posts.length === 0 && !loading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-12 flex flex-col items-center justify-center text-center"
            >
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">You're all caught up!</h2>
              <p className="text-gray-500">Follow more users to see their posts here.</p>
            </motion.div>
          )}

        </div>

        {/* Right Panel (Suggestions) - Hidden on small screens */}
        <div className="hidden lg:block col-span-1">
          <div className="sticky top-24 card p-4">
            <h3 className="font-bold text-gray-800 mb-4">Suggested Users</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-8 h-8 rounded-full" />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-800">User_{i}</p>
                      <p className="text-xs text-gray-500">Suggested for you</p>
                    </div>
                  </div>
                  <button className="text-primary text-sm font-semibold hover:bg-primary/10 px-2 py-1 rounded transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Feed;
