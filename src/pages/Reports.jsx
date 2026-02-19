import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCollection } from '../hooks/useCollection';
import { Download, FileText, Search, Filter, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Reports() {
    const { currentUser } = useAuth();
    const { documents: transactions } = useCollection(
        'transactions',
        ['uid', '==', currentUser.uid]
    );

    // Default to current month
    const getFirstDayOfMonth = () => {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
    };

    const getToday = () => {
        return new Date().toISOString().split('T')[0];
    };

    const [startDate, setStartDate] = useState(getFirstDayOfMonth());
    const [endDate, setEndDate] = useState(getToday());
    const [reportData, setReportData] = useState(null);

    const handleViewReport = () => {
        if (!transactions) return;

        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        const filtered = transactions.filter(t => {
            const tDate = new Date(t.date);
            return tDate >= start && tDate <= end;
        });

        // Sort by date descending
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        setReportData(filtered);
    };

    // Auto-generate report when transactions load for the first time
    useMemo(() => {
        if (transactions && !reportData) {
            handleViewReport();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions]);


    const downloadCSV = () => {
        if (!reportData || reportData.length === 0) return;

        // Add BOM for Excel UTF-8 compatibility
        let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
        csvContent += "Date,Description,Category,Type,Amount\n";

        reportData.forEach(t => {
            const date = t.date ? `"${t.date}"` : '""';
            const description = t.name ? `"${t.name.replace(/"/g, '""')}"` : '""';
            const category = t.category ? `"${t.category.replace(/"/g, '""')}"` : '""';
            const type = t.type ? `"${t.type}"` : '""';
            const amount = t.amount ? `"${t.amount}"` : '"0"';

            const row = `${date},${description},${category},${type},${amount}`;
            csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `finance_report_${startDate}_to_${endDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Calculate totals for the viewed report
    const summary = useMemo(() => {
        if (!reportData) return { income: 0, expense: 0, net: 0 };
        const income = reportData.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
        const expense = reportData.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
        return { income, expense, net: income - expense };
    }, [reportData]);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold dark:text-white">Financial Reports</h1>

            {/* Filter Card */}
            <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-gray-800 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full pl-10 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full pl-10 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button
                            onClick={handleViewReport}
                            className="flex-1 md:flex-none px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <Search size={20} />
                            View Report
                        </button>
                        <button
                            onClick={downloadCSV}
                            disabled={!reportData || reportData.length === 0}
                            className="flex-1 md:flex-none px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download size={20} />
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <AnimatePresence mode='wait'>
                {reportData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        {/* Mini Summary for Report */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/20 dark:border-gray-800 shadow-sm">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
                                <p className="text-2xl font-bold text-emerald-500">₹{summary.income.toLocaleString()}</p>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/20 dark:border-gray-800 shadow-sm">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
                                <p className="text-2xl font-bold text-rose-500">₹{summary.expense.toLocaleString()}</p>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/20 dark:border-gray-800 shadow-sm">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Net Period Change</p>
                                <p className={`text-2xl font-bold ${summary.net >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {summary.net >= 0 ? '+' : ''}₹{summary.net.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Transaction List */}
                        <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                    <FileText className="text-emerald-500" size={24} />
                                    Transaction History
                                </h3>
                                <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                                    {reportData.length} Records
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Category</th>
                                            <th className="p-4">Description</th>
                                            <th className="p-4">Type</th>
                                            <th className="p-4 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                                        {reportData.length > 0 ? (
                                            reportData.map((t) => (
                                                <tr key={t.id} className="hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
                                                    <td className="p-4 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{t.date}</td>
                                                    <td className="p-4 text-gray-600 dark:text-gray-400">
                                                        <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs font-medium capitalize border border-gray-200 dark:border-gray-700">
                                                            {t.category}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-gray-800 dark:text-white font-medium">{t.name}</td>
                                                    <td className="p-4">
                                                        <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${t.type === 'income'
                                                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                            : 'bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
                                                            }`}>
                                                            {t.type}
                                                        </span>
                                                    </td>
                                                    <td className={`p-4 text-right font-bold ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                                                        }`}>
                                                        {t.type === 'income' ? '+' : '-'}₹{Number(t.amount).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="p-12 text-center text-gray-400">
                                                    No transactions found for this date range.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
