import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-green-50/90 backdrop-blur-md sticky top-0 z-50 border-b border-green-100 shadow-sm px-8 py-4 flex justify-between items-center"
        >
            <Link to="/" className="flex items-center gap-3 group">
                <ShieldCheck className="text-green-800 transition-transform group-hover:scale-110" size={32} />
                <h1 className="text-2xl font-serif text-green-900 tracking-wide font-bold">
                    Civil<span className="text-yellow-600">Grievance</span>
                </h1>
            </Link>

            <div className="flex items-center gap-6">
                {!user ? (
                    <>
                        <Link to="/" className="text-gray-600 hover:text-green-800 font-medium transition-colors">Home</Link>
                        <Link to="/login" className="px-5 py-2 border-2 border-green-800 text-green-800 rounded-lg hover:bg-green-800 hover:text-white transition-all font-semibold">
                            Login
                        </Link>
                        <Link to="/register" className="px-5 py-2 bg-green-800 text-white rounded-lg shadow-lg shadow-green-900/20 hover:bg-green-900 hover:-translate-y-0.5 transition-all font-semibold">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="text-gray-600 font-medium">Hello, {user.fullName || 'Citizen'}</span>
                        {user.role === 'ADMIN' ? (
                            <Link to="/admin" className="text-gray-700 hover:text-green-900 font-medium">Admin Panel</Link>
                        ) : (
                            <Link to="/dashboard" className="text-gray-700 hover:text-green-900 font-medium">Dashboard</Link>
                        )}
                        <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium ml-4">
                            <LogOut size={18} /> Logout
                        </button>
                    </>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;
