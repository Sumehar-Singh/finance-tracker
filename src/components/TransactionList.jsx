import { Trash2, Edit2 } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransactionList({ transactions, onEdit }) {
    const { deleteDocument } = useFirestore('transactions');

    return (
        <div className="overflow-x-auto rounded-3xl border border-white/20 dark:border-gray-700 shadow-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                        <th className="p-6 font-bold">Date</th>
                        <th className="p-6 font-bold">Category</th>
                        <th className="p-6 font-bold">Description</th>
                        <th className="p-6 font-bold">Type</th>
                        <th className="p-6 font-bold text-right">Amount</th>
                        <th className="p-6 font-bold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <AnimatePresence mode='popLayout'>
                        {transactions.map((transaction) => (
                            <motion.tr
                                key={transaction.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                layout
                                className="group hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                                <td className="p-6 text-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap">
                                    {transaction.date}
                                </td>
                                <td className="p-6">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                                        {transaction.category}
                                    </span>
                                </td>
                                <td className="p-6 text-sm font-bold text-gray-800 dark:text-white">
                                    {transaction.name}
                                </td>
                                <td className="p-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${transaction.type === 'income'
                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                        : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                                        }`}>
                                        {transaction.type}
                                    </span>
                                </td>
                                <td className={`p-6 text-right font-bold text-base whitespace-nowrap ${transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                                    }`}>
                                    {transaction.type === 'income' ? '+' : ''}₹{transaction.amount}
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-3">
                                        {onEdit && (
                                            <button
                                                onClick={() => onEdit(transaction)}
                                                className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteDocument(transaction.id)}
                                            className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>
            {transactions.length === 0 && (
                <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                    No transactions found.
                </div>
            )}
        </div>
    );
}
