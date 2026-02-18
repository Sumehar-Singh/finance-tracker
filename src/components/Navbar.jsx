import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, User, Sun, Moon, LayoutDashboard, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Features', path: '#features' },
        { name: 'Services', path: '#services' },
    ];

    const handleScroll = (e, path) => {
        e.preventDefault();
        const elementId = path.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
            setIsMobileMenuOpen(false);
        } catch {
            console.error('Failed to log out');
        }
    }

    return (
        <nav className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
            <div className="w-[80%] max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group"
                        onClick={(e) => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        <div className="bg-emerald-900/50 p-2 rounded-xl group-hover:scale-110 transition-transform border border-emerald-500/20">
                            <LayoutDashboard size={24} className="text-emerald-400" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            FinanceTracker
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Nav Links & Auth */}
                        <div className="flex items-center space-x-10">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={(e) => handleScroll(e, link.path)}
                                    className="text-base font-medium text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer"
                                >
                                    {link.name}
                                </a>
                            ))}

                            {currentUser ? (
                                <>
                                    <Link to="/dashboard" className="text-base font-medium text-gray-300 hover:text-emerald-400 transition-colors">
                                        Dashboard
                                    </Link>
                                    <Link to="/profile" className="text-base font-medium text-gray-300 hover:text-emerald-400 transition-colors">
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 text-red-400 hover:text-red-300 bg-red-900/20 px-4 py-2 rounded-full transition-all hover:bg-red-900/40"
                                    >
                                        <LogOut size={18} />
                                        <span className="text-sm font-medium">Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-base font-medium text-gray-300 hover:text-emerald-400 transition-colors">
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-white text-black px-6 py-2.5 rounded-full hover:bg-gray-200 hover:scale-105 transition-all font-bold text-base shadow-lg hover:shadow-white/20"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="h-6 w-px bg-white/10" />

                        {/* Theme Toggle (Rightmost) */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-6 space-y-4 flex flex-col">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={(e) => handleScroll(e, link.path)}
                                    className="text-lg font-medium text-gray-200 hover:text-emerald-400 py-2 border-b border-white/10 cursor-pointer"
                                >
                                    {link.name}
                                </a>
                            ))}

                            {currentUser ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-gray-200 hover:text-white py-2 border-b border-white/10"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-gray-200 hover:text-white py-2 border-b border-white/10"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 text-red-400 py-2"
                                    >
                                        <LogOut size={20} />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-gray-200 hover:text-white py-2"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="bg-emerald-600 text-white text-center py-3 rounded-xl font-bold shadow-lg shadow-emerald-900/20"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
