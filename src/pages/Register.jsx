import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, ArrowRight, User, Mail, Lock } from 'lucide-react';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            await signup(email, password);
            navigate('/dashboard');
        } catch {
            setError('Failed to create an account');
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
            {/* Rich Professional Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
                {/* Base Tint */}
                <div className="absolute inset-0 bg-emerald-50/50 dark:bg-emerald-950/20"></div>
                {/* Spotlights */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-[radial-gradient(circle_at_50%_0%,#10b98130,transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,#10b98140,transparent_70%)] blur-[60px]"></div>
                <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-[radial-gradient(circle_at_50%_0%,#2dd4bf20,transparent_60%)] blur-[80px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700 p-8 relative overflow-hidden"
            >
                {/* Decorative top accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500"></div>

                <div className="mb-8 text-center">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                        <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
                            <LayoutDashboard size={24} className="text-emerald-500" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">FinanceTracker</span>
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
                    <p className="text-gray-500 dark:text-gray-400">Join thousands of users mastering their finances</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 rounded-xl text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none placeholder:text-gray-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none placeholder:text-gray-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none placeholder:text-gray-400"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group mt-2"
                    >
                        Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
