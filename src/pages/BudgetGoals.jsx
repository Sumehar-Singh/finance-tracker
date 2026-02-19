import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCollection } from '../hooks/useCollection';
import { useFirestore } from '../hooks/useFirestore';
import { PlusCircle, Trash2, AlertCircle, CheckCircle, Calendar, Clock, Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BudgetGoals() {
    const { currentUser } = useAuth();
    const { documents: transactions } = useCollection(
        'transactions',
        ['uid', '==', currentUser.uid]
    );
    const { documents: budgets } = useCollection(
        'budgets',
        ['uid', '==', currentUser.uid]
    );
    const { addDocument, deleteDocument, updateDocument } = useFirestore('budgets');

    const getStartOfPeriod = (period) => {
        const now = new Date();
        if (period === 'weekly') {
            const day = now.getDay();
            const diff = now.getDate() - day; // Adjust to Sunday
            const startOfWeek = new Date(now.setDate(diff));
            return startOfWeek.toISOString().split('T')[0];
        } else if (period === 'monthly') {
            return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        } else if (period === 'yearly') {
            return new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];
        }
        return new Date().toISOString().split('T')[0];
    };

    const getTodayString = () => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newBudget, setNewBudget] = useState({
        category: '',
        limit: '',
        startDate: getTodayString(),
        period: 'monthly'
    });

    const resetForm = () => {
        setNewBudget({
            category: '',
            limit: '',
            startDate: getTodayString(),
            period: 'monthly'
        });
        setEditingId(null);
    };

    const handlePeriodChange = (e) => {
        const period = e.target.value;
        setNewBudget(prev => ({
            ...prev,
            period
        }));
    };

    // Extract used categories for suggestions
    const usedCategories = useMemo(() => {
        if (!transactions) return [];
        return [...new Set(transactions.map(t => t.category))].filter(Boolean).sort();
    }, [transactions]);

    const calculateProgress = (budget) => {
        if (!transactions) return 0;

        // Helper to parse YYYY-MM-DD to Local Midnight Date object
        const parseLocally = (dateStr) => {
            if (!dateStr) return new Date();
            const [y, m, d] = dateStr.split('-').map(Number);
            return new Date(y, m - 1, d);
        };

        const now = new Date();
        now.setHours(23, 59, 59, 999); // End of today

        const startDate = parseLocally(budget.startDate);

        // Determine start of the period (Weekly/Monthly/Yearly)
        const currentPeriodStart = new Date();
        currentPeriodStart.setHours(0, 0, 0, 0); // Start of today

        if (budget.period === 'weekly') {
            const day = currentPeriodStart.getDay(); // 0 is Sunday
            currentPeriodStart.setDate(currentPeriodStart.getDate() - day);
        } else if (budget.period === 'monthly') {
            currentPeriodStart.setDate(1);
        } else if (budget.period === 'yearly') {
            currentPeriodStart.setMonth(0, 1);
        }

        // Effective Start: Max(Budget Start Date, Current Period Start)
        // We use the LATEST of the two dates.
        const effectiveStart = startDate > currentPeriodStart ? startDate : currentPeriodStart;

        const totalSpent = transactions.reduce((acc, t) => {
            const tDate = parseLocally(t.date);

            if (
                t.type === 'expense' &&
                t.category.toLowerCase() === budget.category.toLowerCase() &&
                tDate >= effectiveStart &&
                tDate <= now
            ) {
                return acc + Number(t.amount);
            }
            return acc;
        }, 0);

        return totalSpent;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const budgetData = {
            uid: currentUser.uid,
            category: newBudget.category.trim().toLowerCase(), // Normalize category
            limit: Number(newBudget.limit),
            startDate: newBudget.startDate,
            period: newBudget.period,
        };

        if (editingId) {
            updateDocument(editingId, budgetData);
        } else {
            addDocument({
                ...budgetData,
                createdAt: new Date().toISOString()
            });
        }

        resetForm();
        setShowModal(false);
    };

    const handleEditClick = (budget) => {
        setNewBudget({
            category: budget.category,
            limit: budget.limit,
            startDate: budget.startDate,
            period: budget.period
        });
        setEditingId(budget.id);
        setShowModal(true);
    };

    const [selectedPeriod, setSelectedPeriod] = useState('monthly');

    const filteredBudgets = useMemo(() => {
        if (!budgets) return [];
        return budgets.filter(b => b.period === selectedPeriod);
    }, [budgets, selectedPeriod]);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white">Budget Goals</h1>
                    <p className="text-gray-500 dark:text-gray-400">Track your spending limits</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                >
                    <PlusCircle size={20} />
                    Set Budget
                </button>
            </div>

            {/* Period Selection Tabs */}
            <div className="grid grid-cols-3 gap-4">
                {['weekly', 'monthly', 'yearly'].map((period) => (
                    <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`p-4 rounded-2xl border transition-all duration-200 capitalize font-bold text-lg ${selectedPeriod === period
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/20 shadow-lg scale-105'
                            : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        {period}
                    </button>
                ))}
            </div>

            {/* Budget List - Horizontal Cards */}
            <div className="space-y-4">
                {filteredBudgets.map(budget => {
                    const spent = calculateProgress(budget);
                    const percentage = Math.min((spent / budget.limit) * 100, 100);
                    const remaining = budget.limit - spent;

                    let statusColor = 'bg-emerald-500';
                    let textColor = 'text-emerald-500';
                    let statusMessage = 'On Track';
                    let cardIconColor = 'bg-emerald-100 text-emerald-500';

                    if (spent > budget.limit) {
                        statusColor = 'bg-rose-500';
                        textColor = 'text-rose-500';
                        statusMessage = 'Over Budget';
                        cardIconColor = 'bg-rose-100 text-rose-500';
                    } else if (spent >= budget.limit) {
                        statusColor = 'bg-rose-500';
                        textColor = 'text-rose-500';
                        statusMessage = 'Limit Reached';
                        cardIconColor = 'bg-rose-100 text-rose-500';
                    } else if (percentage >= 80) {
                        statusColor = 'bg-amber-400';
                        textColor = 'text-amber-500';
                        statusMessage = 'Approaching Limit';
                        cardIconColor = 'bg-amber-100 text-amber-500';
                    }

                    return (
                        <motion.div
                            key={budget.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            layout
                            className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/20 dark:border-gray-800 shadow-sm group relative overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-1 h-full transition-opacity opacity-0 group-hover:opacity-100 ${statusColor}`} />

                            <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                                {/* Left: Category & Period Info */}
                                <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
                                    <div className={`p-3 rounded-xl ${cardIconColor} dark:bg-gray-800`}>
                                        <Clock size={24} />
                                    </div>
                                    <div className="flex justify-between md:block w-full">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 capitalize">{budget.category}</h3>
                                            <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1 mt-0.5">
                                                <Calendar size={12} /> Starts {budget.startDate}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => deleteDocument(budget.id)}
                                            className="md:hidden text-gray-400 hover:text-rose-500"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleEditClick(budget)}
                                            className="md:hidden text-gray-400 hover:text-emerald-500 mr-2"
                                        >
                                            <Pencil size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Middle: Stats Grid */}
                                <div className="grid grid-cols-3 gap-8 flex-1 w-full md:w-auto text-center md:text-left border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 pt-4 md:pt-0 md:pl-8">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Spent</p>
                                        <p className={`font-bold text-lg ${spent > budget.limit ? 'text-rose-500' : 'text-gray-800 dark:text-white'}`}>
                                            ₹{spent.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Remaining</p>
                                        <p className={`font-bold text-lg ${remaining < 0 ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                            ₹{Math.max(0, remaining).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Limit</p>
                                        <p className="font-bold text-lg text-gray-600 dark:text-gray-300">
                                            ₹{budget.limit.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Progress & Status */}
                                <div className="flex-1 w-full md:w-auto min-w-[200px]">
                                    <div className="flex justify-between mb-2 text-sm font-medium">
                                        <span className={textColor}>
                                            {percentage.toFixed(0)}% Used
                                        </span>
                                        <span className={textColor}>
                                            {statusMessage}
                                        </span>
                                    </div>
                                    <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            className={`h-full rounded-full ${statusColor}`}
                                        />
                                    </div>
                                </div>

                                <div className="hidden md:flex items-center gap-2">
                                    <button
                                        onClick={() => handleEditClick(budget)}
                                        className="p-2 text-gray-300 hover:text-emerald-500 transition-colors"
                                    >
                                        <Pencil size={20} />
                                    </button>
                                    <button
                                        onClick={() => deleteDocument(budget.id)}
                                        className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {filteredBudgets.length === 0 && (
                    <div className="text-center py-16 bg-white/30 dark:bg-white/5 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
                        <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">No {selectedPeriod} budgets</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Create a goal to start saving!</p>
                        <button
                            onClick={() => {
                                setEditingId(null);
                                setNewBudget({
                                    category: '',
                                    limit: '',
                                    period: selectedPeriod,
                                    startDate: getTodayString()
                                });
                                setShowModal(true);
                            }}
                            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-xl font-bold transition-colors"
                        >
                            Create {selectedPeriod} Budget
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/20 dark:border-gray-700"
                        >
                            <h2 className="text-xl font-bold items-center justify-between flex dark:text-white">
                                {editingId ? 'Edit Budget' : 'Set New Budget'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Category Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                    <input
                                        type="text"
                                        required
                                        list="budget-categories"
                                        value={newBudget.category}
                                        onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                                        placeholder="e.g. Groceries"
                                    />
                                    <datalist id="budget-categories">
                                        {usedCategories.map(cat => (
                                            <option key={cat} value={cat} />
                                        ))}
                                    </datalist>
                                </div>

                                {/* Limit & Period */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Limit (₹)</label>
                                        <input
                                            type="number"
                                            required
                                            value={newBudget.limit}
                                            onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                                            placeholder="500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Period</label>
                                        <select
                                            value={newBudget.period}
                                            onChange={handlePeriodChange}
                                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-emerald-500 dark:text-white cursor-pointer"
                                        >
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="yearly">Yearly</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Start Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        required
                                        min={!editingId ? getTodayString() : undefined}
                                        value={newBudget.startDate}
                                        onChange={(e) => setNewBudget({ ...newBudget, startDate: e.target.value })}
                                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                                    >
                                        {editingId ? 'Update Budget' : 'Save Budget'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
