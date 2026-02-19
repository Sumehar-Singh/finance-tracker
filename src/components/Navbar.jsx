import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, User, Sun, Moon, LayoutDashboard, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    // Navbar Background Logic
    const navbarClasses = `fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled || !isHome
        ? 'bg-white/80 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-white/10 shadow-sm'
        : 'bg-transparent border-transparent'
        }`;

    // Text Color Logic (Dark text on light home hero, unless dark mode or scrolled)
    const textColorClass = scrolled || !isHome
        ? 'text-gray-900 dark:text-gray-100'
        : 'text-gray-900 dark:text-white'; // Dark text on transparent light hero background

    const navLinks = [
        { name: 'How it Works', path: '#how-it-works' },
        { name: 'Services', path: '#services' },
        { name: 'Features', path: '#features' },
    ];

    const handleScrollLink = (e, path) => {
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
        <nav className={navbarClasses}>
            <div className="w-[90%] md:w-[80%] max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    {/* Logo (Left, with flex-1 to allow centering of middle) */}
                    <div className="flex-1 flex items-center">
                        <Link
                            to="/"
                            className="flex items-center gap-2 group"
                            onClick={(e) => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            <div className={`p-2 rounded-xl group-hover:scale-110 transition-transform ${scrolled || !isHome ? 'bg-emerald-100 dark:bg-emerald-900/50' : 'bg-white shadow-sm ring-1 ring-emerald-50 dark:bg-emerald-900/50 dark:ring-emerald-800'}`}>
                                <LayoutDashboard size={24} className="text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <span className={`text-xl font-bold tracking-tight ${textColorClass}`}>
                                FinanceTracker
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links (Absolute Center) */}
                    <div className="hidden md:flex items-center justify-center space-x-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                onClick={(e) => handleScrollLink(e, link.path)}
                                className={`text-base font-medium transition-colors cursor-pointer ${textColorClass} hover:text-emerald-500`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Actions (Right: Auth ONLY) */}
                    <div className="hidden md:flex flex-1 items-center justify-end space-x-6">
                        {currentUser ? (
                            <>
                                <Link to="/dashboard" className={`text-base font-medium transition-colors ${textColorClass} hover:text-emerald-500`}>
                                    Dashboard
                                </Link>
                                <Link to="/profile" className={`text-base font-medium transition-colors ${textColorClass} hover:text-emerald-500`}>
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full transition-all hover:bg-red-100 dark:hover:bg-red-900/40"
                                >
                                    <LogOut size={18} />
                                    <span className="text-sm font-medium">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={`text-base font-medium transition-colors ${textColorClass} hover:text-emerald-500`}>
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className={`px-6 py-2.5 rounded-full hover:scale-105 transition-all font-bold text-base shadow-lg ${scrolled || !isHome
                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                        : 'bg-black dark:bg-emerald-600 text-white dark:text-white hover:bg-gray-800 dark:hover:bg-emerald-500' // High contrast button on transparent
                                        }`}
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`${textColorClass} focus:outline-none`}
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
                        className="md:hidden bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl"
                    >
                        <div className="px-6 py-6 space-y-4 flex flex-col">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={(e) => handleScrollLink(e, link.path)}
                                    className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-emerald-500 py-2 border-b border-gray-100 dark:border-gray-800 cursor-pointer"
                                >
                                    {link.name}
                                </a>
                            ))}

                            {currentUser ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-emerald-500 py-2 border-b border-gray-100 dark:border-gray-800"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-emerald-500 py-2 border-b border-gray-100 dark:border-gray-800"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 text-red-500 py-2"
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
                                        className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-emerald-500 py-2"
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
