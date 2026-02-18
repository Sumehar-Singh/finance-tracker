import { motion, AnimatePresence } from 'framer-motion';

export default function TransactionList({ transactions }) {
    const { deleteDocument } = useRealtime();

    return (
        <ul className="space-y-4">
            <AnimatePresence>
                {transactions.map((transaction) => (
                    <motion.li
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        layout
                        whileHover={{ scale: 1.01, x: 4 }}
                        className="flex justify-between items-center p-5 bg-white/60 dark:bg-gray-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all rounded-2xl border border-white/20 dark:border-gray-800 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${transaction.type === 'income'
                                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                                    : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                                }`}>
                                {transaction.type === 'income' ? <div className="w-2 h-2 rounded-full bg-current" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                            </div>
                            <div>
                                <p className="text-base font-bold text-slate-800 dark:text-white group-hover:text-black dark:group-hover:text-gray-100 transition-colors">{transaction.name}</p>
                                <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">{transaction.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className={`text-base font-bold ${transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                                    }`}>
                                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                                </p>
                                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">
                                    {transaction.category}
                                </span>
                            </div>

                            <button
                                onClick={() => deleteDocument('transactions', transaction.id)}
                                className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    );
}
