import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User as UserIcon, Home, Compass, MessageCircle, Bell, Search } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
        {/* Left - Logo & Search */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-primary tracking-tight">Socio Plus</Link>
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none focus:outline-none ml-2 text-sm w-48 text-gray-700" />
          </div>
        </div>
        
        {/* Center - Icons (Hidden on desktop, feed has sidebar) */}
        <div className="flex md:hidden w-full justify-between sm:justify-end gap-6 items-center px-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-primary" : "text-gray-400"}><Home size={24} /></NavLink>
          <NavLink to="/explore" className={({ isActive }) => isActive ? "text-primary" : "text-gray-400"}><Compass size={24} /></NavLink>
          <NavLink to="/chat" className={({ isActive }) => isActive ? "text-primary" : "text-gray-400"}><MessageCircle size={24} /></NavLink>
          <NavLink to="/notifications" className={({ isActive }) => isActive ? "text-primary" : "text-gray-400"}><Bell size={24} /></NavLink>
        </div>
        
        {/* Right - Profile */}
        <div className="hidden md:flex items-center gap-4 pl-6">
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors font-medium text-sm flex items-center gap-1">
            <LogOut size={18} /> Logout
          </button>
          <NavLink to={`/profile/${user?.username}`} className="flex items-center gap-2 border-l border-gray-200 pl-4">
            {user?.profilePic ? (
              <img src={user.profilePic} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <UserIcon size={20} />
              </div>
            )}
            <span className="font-semibold text-gray-700 text-sm">{user?.username}</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
