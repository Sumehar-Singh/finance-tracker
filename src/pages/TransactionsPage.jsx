import TransactionList from '../components/TransactionList';
import FilterBar from '../components/FilterBar';
import SUMMARY_CARDS from '../components/SummaryCards'; // Renamed to avoid naming conflict with potential local variable if I had one, but it's fine.
import TransactionForm from '../components/TransactionForm';
import { useCollection } from '../hooks/useCollection';
import { useAuth } from '../context/AuthContext';
import { useState, useMemo, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Reusing the same SummaryCards component
const SummaryCards = SUMMARY_CARDS;

export default function TransactionsPage() {
    const { currentUser } = useAuth();
    const { documents: transactions } = useCollection(
        'transactions',
        ['uid', '==', currentUser.uid]
    );

    // Initial Filter State
    const [filters, setFilters] = useState({
        type: 'all',
        category: 'All',
        dateFrom: '',
        dateTo: '',
        sortBy: 'dateDesc'
    });

    // Applied Filters (initially same as filters)
    const [appliedFilters, setAppliedFilters] = useState(filters);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const handleApplyFilters = () => {
        setAppliedFilters({ ...filters });
    };

    // Filter Logic using appliedFilters
    const filteredTransactions = useMemo(() => {
        if (!transactions) return [];

        let result = transactions.filter(t => {
            const matchesType = appliedFilters.type === 'all' || t.type === appliedFilters.type;
            const matchesCategory = appliedFilters.category === 'All' || t.category === appliedFilters.category;

            // Date Range Filtering
            let matchesDate = true;
            const tDate = new Date(t.date);

            if (appliedFilters.dateFrom) {
                const from = new Date(appliedFilters.dateFrom);
                from.setHours(0, 0, 0, 0);
                matchesDate = matchesDate && tDate >= from;
            }
            if (appliedFilters.dateTo) {
                const to = new Date(appliedFilters.dateTo);
                to.setHours(23, 59, 59, 999);
                matchesDate = matchesDate && tDate <= to;
            }

            return matchesType && matchesCategory && matchesDate;
        });

        // Sorting
        result.sort((a, b) => {
            const dateA = new Date(a.date).getTime() || 0;
            const dateB = new Date(b.date).getTime() || 0;

            // Secondary Sort: CreatedAt (if available) for stable sorting of same-date items
            // createdAt is a Firestore Timestamp, so use .seconds or .toMillis()
            const createdA = a.createdAt?.seconds || 0;
            const createdB = b.createdAt?.seconds || 0;

            const amountA = parseFloat(a.amount) || 0;
            const amountB = parseFloat(b.amount) || 0;

            switch (appliedFilters.sortBy) {
                case 'dateAsc':
                    if (dateA === dateB) return createdA - createdB; // Oldest created first
                    return dateA - dateB;
                case 'dateDesc':
                    if (dateA === dateB) return createdB - createdA; // Newest created first
                    return dateB - dateA;
                case 'amountAsc': return amountA - amountB;
                case 'amountDesc': return amountB - amountA;
                default: return dateB - dateA;
            }
        });

        return result;
    }, [transactions, appliedFilters]);

    // Extract unique categories from existing transactions for the FILTER
    const usedCategories = useMemo(() => {
        if (!transactions) return [];
        return [...new Set(transactions.map(t => t.category))].filter(Boolean).sort();
    }, [transactions]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white">Transactions</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage and view your financial history</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                >
                    <PlusCircle size={20} />
                    Add Transaction
                </button>
            </div>

            {/* Filter Bar with Used Categories */}
            <FilterBar
                filters={filters}
                setFilters={setFilters}
                onApply={handleApplyFilters}

                categories={usedCategories}
            />

            {/* Summary Cards (Based on Filtered Data) */}
            <div className="mb-8">
                <SummaryCards transactions={filteredTransactions} />
            </div>

            {/* Transaction Table */}
            {transactions && (
                <TransactionList
                    transactions={filteredTransactions}
                    onEdit={(t) => {
                        setEditingTransaction(t);
                        setShowModal(true);
                    }}
                />
            )}

            {/* Add/Edit Modal */}
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
                                onClick={() => { setShowModal(false); setEditingTransaction(null); }}
                                className="absolute top-6 right-6 text-gray-400 hover:text-black dark:hover:text-white transition-colors bg-gray-100 dark:bg-gray-800 p-2 rounded-full"
                            >
                                ✕
                            </button>
                            <TransactionForm
                                uid={currentUser.uid}
                                closeForm={() => { setShowModal(false); setEditingTransaction(null); }}
                                initialData={editingTransaction}
                                existingCategories={usedCategories}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
