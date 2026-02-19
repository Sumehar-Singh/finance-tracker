import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BudgetWidget({ budgets, transactions }) {
    // Calculate spending per category for current month
    const categorySpending = useMemo(() => {
        if (!transactions) return {};

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const spending = {};

        transactions.forEach(t => {
            const tDate = new Date(t.date);
            if (t.type === 'expense' &&
                tDate.getMonth() === currentMonth &&
                tDate.getFullYear() === currentYear) {
                const cat = t.category.toLowerCase(); // Normalize
                spending[cat] = (spending[cat] || 0) + Number(t.amount);
            }
        });
        return spending;
    }, [transactions]);

    return (
        <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-gray-800 shadow-sm h-full overflow-y-auto max-h-[350px]">
            <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Budget Goals Status</h3>

            {(!budgets || budgets.length === 0) ? (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                    <p className="text-gray-400 text-sm mb-4">No budgets set yet.</p>
                    <Link
                        to="/dashboard/budget"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20"
                    >
                        Set Budget Goals
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {budgets.map(budget => {
                        const budgetCat = budget.category.toLowerCase();
                        const spent = categorySpending[budgetCat] || 0;
                        const percentage = Math.min((spent / budget.limit) * 100, 100);
                        const isOver = spent > budget.limit;

                        return (
                            <div key={budget.id} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{budget.category}</span>
                                    <span className={isOver ? "text-rose-500 font-bold" : "text-gray-500"}>
                                        ₹{spent} / ₹{budget.limit}
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        className={`h-full rounded-full ${isOver ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
