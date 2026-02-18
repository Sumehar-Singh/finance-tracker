import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRealtimeCollection } from '../hooks/useRealtimeCollection';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import SummaryCards from '../components/SummaryCards';
import Charts from '../components/Charts';
import { PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
    const { currentUser } = useAuth();
    const { documents: transactions, error } = useRealtimeCollection(
        'transactions',
        ['uid', '==', currentUser.uid]
    );

    const [showModal, setShowModal] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-24 pb-12 relative overflow-hidden"
        >
            {/* Rich Professional Background (Same as Landing) */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black fixed">
                {/* Base Tint */}
                <div className="absolute inset-0 bg-emerald-50/50 dark:bg-emerald-950/20"></div>
                {/* Spotlights */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-[radial-gradient(circle_at_50%_0%,#10b98130,transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,#10b98140,transparent_70%)] blur-[60px]"></div>
                <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-[radial-gradient(circle_at_50%_0%,#2dd4bf20,transparent_60%)] blur-[80px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                            Dashboard
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, {currentUser.displayName || 'User'}</p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl hover:bg-emerald-900 dark:hover:bg-emerald-50 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all font-semibold"
                    >
                        <PlusCircle size={20} />
                        Add Transaction
                    </motion.button>
                </div>

                {error && <p className="text-red-500 mb-4 bg-red-100 p-2 rounded">{error}</p>}

                {transactions && (
                    <div className="space-y-8">
                        <SummaryCards transactions={transactions} />
                        <Charts transactions={transactions} />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-3">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                                    <button className="text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:underline">View All</button>
                                </div>
                                {transactions.length === 0 ? (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-16 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20">
                                        No transactions yet. Add one to get started!
                                    </p>
                                ) : (
                                    <TransactionList transactions={transactions} />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for Add Transaction */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-2xl relative border border-white/20 dark:border-gray-700 ring-1 ring-black/5"
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-black dark:hover:text-white transition-colors bg-gray-100 dark:bg-gray-800 p-2 rounded-full"
                            >
                                ✕
                            </button>
                            <TransactionForm uid={currentUser.uid} closeForm={() => setShowModal(false)} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
