import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
    LayoutDashboard,
    Receipt,
    PiggyBank,
    Calculator,
    PieChart,
    FileText,
    LogOut,
    Sun,
    Moon,
    X
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ isOpen, onClose }) {
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const links = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Transactions', path: '/dashboard/transactions', icon: Receipt },
        { name: 'Budget Goals', path: '/dashboard/budget', icon: PiggyBank },
        { name: 'Loan Calculator', path: '/dashboard/loan-calculator', icon: Calculator },
        { name: 'Charts', path: '/dashboard/charts', icon: PieChart },
        { name: 'Reports', path: '/dashboard/reports', icon: FileText },
    ];

    return (
        <div
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border-r border-white/20 dark:border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="p-6 flex items-center justify-between border-b border-white/10 dark:border-gray-800/50">
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-500/10 p-2 rounded-xl">
                        <LayoutDashboard className="text-emerald-500 w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
                        FinanceTracker
                    </span>
                </div>
                {/* Mobile Close Button */}
                <button
                    onClick={onClose}
                    className="md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.path === '/dashboard'} // Only exact match for dashboard root
                        onClick={onClose} // Close sidebar on mobile when link clicked
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:text-emerald-600 dark:hover:text-emerald-400'
                            }`
                        }
                    >
                        <link.icon size={20} />
                        <span className="font-medium">{link.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10 dark:border-gray-800/50 space-y-2">
                <button
                    onClick={toggleTheme}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    <span className="font-medium">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </button>

                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-colors duration-200"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
