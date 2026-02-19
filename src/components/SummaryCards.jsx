import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function SummaryCards({ transactions }) {
    const summary = useMemo(() => {
        let income = 0;
        let expense = 0;

        transactions.forEach(t => {
            if (t.type === 'income') income += t.amount;
            else expense += t.amount;
        });

        return {
            income,
            expense,
            balance: income - expense
        };
    }, [transactions]);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl border border-white/20 dark:border-gray-800 hover:border-emerald-500/30 transition-all hover:shadow-lg group shadow-sm"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider group-hover:text-emerald-500 transition-colors">Total Income</h3>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                </div>
                <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2 group-hover:scale-105 transition-transform origin-left">₹{summary.income.toFixed(2)}</p>
            </motion.div>

            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl border border-white/20 dark:border-gray-800 hover:border-rose-500/30 transition-all hover:shadow-lg group shadow-sm"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider group-hover:text-rose-500 transition-colors">Total Expense</h3>
                    <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e]"></div>
                </div>
                <p className="text-3xl font-extrabold text-rose-500 dark:text-rose-400 mt-2 group-hover:scale-105 transition-transform origin-left">₹{summary.expense.toFixed(2)}</p>
            </motion.div>

            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl border border-white/20 dark:border-gray-800 hover:border-emerald-500/30 transition-all hover:shadow-lg group shadow-sm"
            >
                <h3 className="text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider group-hover:text-emerald-500 transition-colors">Total Balance</h3>
                <p className="text-3xl font-extrabold text-black dark:text-white mt-2 group-hover:scale-105 transition-transform origin-left">₹{summary.balance.toFixed(2)}</p>
            </motion.div>
        </div>
    );
}
