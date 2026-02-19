import { useAuth } from '../context/AuthContext';
import { useCollection } from '../hooks/useCollection';
import TransactionList from '../components/TransactionList';
import SummaryCards from '../components/SummaryCards';
import { WeeklyOverview, TodayExpenses } from '../components/DashboardCharts';
import BudgetWidget from '../components/BudgetWidget';
import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Dashboard() {
    const { currentUser } = useAuth();
    // Fetch User Profile
    const { documents: userDocs } = useCollection(
        'users',
        ['uid', '==', currentUser.uid] // This might fail if 'uid' field isn't in doc, but we are fetching by doc ID usually.
    );
    // Actually, useCollection uses a query. My previous setup saves doc with ID = uid.
    // Querying by field 'uid' implies the field exists in the document.
    // Let's rely on updateProfile for immediate feedback, but also fetch from DB if needed.
    // Since I saved 'email' and 'displayName' in the doc, I should query by email or something? 
    // Or just fetch the single document.
    // useCollection is for lists. I need a single document hook.
    // I can use useFirestore? No that's for actions.
    // Let's just use onSnapshot in a useEffect here for the single user doc.

    // BUT! I can just use currentUser.displayName since I updated the profile in AuthContext!
    // The user said "it is not fetching the user name from dtaabase".
    // If I update the Auth Profile, currentUser.displayName WILL contain the name.
    // This is the cleanest way. user.displayName is the standard way.
    // IF the user insists on "from database", maybe they mean they manually edited the DB?
    // I'll stick to currentUser.displayName first, which I just ensured is set during signup.

    // However, for existing users, they might not have it set.
    // I will try to fetch the user document just in case.

    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            if (doc.exists()) {
                setUserProfile(doc.data());
            }
        });
        return () => unsub();
    }, [currentUser.uid]);

    const displayName = userProfile?.displayName || currentUser.displayName || 'User';
    const { documents: transactions, error } = useCollection(
        'transactions',
        ['uid', '==', currentUser.uid]
    );
    const { documents: budgets } = useCollection(
        'budgets',
        ['uid', '==', currentUser.uid]
    );

    // Get recent transactions (first 5)
    // Manually sorting here to be safe
    const recentTransactions = useMemo(() => {
        if (!transactions) return [];
        return [...transactions]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
    }, [transactions]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
        >
            {/* Header with Greeting */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Here's your financial overview for today.
                    </p>
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {transactions && (
                <>
                    {/* 1. Summary Cards (Income -> Expense -> Balance) */}
                    <SummaryCards transactions={transactions} />

                    {/* 2. Horizontal Chart (This Week's Overview) */}
                    <div className="w-full">
                        <WeeklyOverview transactions={transactions} />
                    </div>

                    {/* 3. Grid: Budget Goals & Today's Expense */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="h-full">
                            <BudgetWidget budgets={budgets} transactions={transactions} />
                        </div>
                        <div className="h-full">
                            <TodayExpenses transactions={transactions} />
                        </div>
                    </div>

                    {/* 4. Recent Transactions */}
                    <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-800 shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-white/10 dark:border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Recent Transactions</h2>
                            <Link
                                to="/dashboard/transactions"
                                className="text-emerald-500 hover:text-emerald-600 font-semibold text-sm flex items-center gap-1 transition-colors"
                            >
                                Show All &rarr;
                            </Link>
                        </div>
                        <div className="p-6">
                            {recentTransactions.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                    No recent transactions.
                                </p>
                            ) : (
                                <TransactionList transactions={recentTransactions} />
                            )}
                        </div>
                    </div>
                </>
            )}
        </motion.div>
    );
}
