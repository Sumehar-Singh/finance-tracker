import { useState } from 'react';
import { Calculator, IndianRupee, Percent, Calendar, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoanCalculator() {
    const [inputs, setInputs] = useState({
        amount: '',
        rate: '',
        years: ''
    });
    const [result, setResult] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [viewMode, setViewMode] = useState('monthly'); // 'monthly' or 'yearly'

    const handleCalculate = (e) => {
        e.preventDefault();
        const principal = parseFloat(inputs.amount);
        const rate = parseFloat(inputs.rate) / 100 / 12;
        const months = parseFloat(inputs.years) * 12;

        if (!principal || !rate || !months) return;

        const x = Math.pow(1 + rate, months);
        const emi = (principal * x * rate) / (x - 1);
        const totalPayment = emi * months;
        const totalInterest = totalPayment - principal;

        setResult({
            emi: emi.toFixed(2),
            principal: principal.toFixed(2),
            interest: totalInterest.toFixed(2),
            total: totalPayment.toFixed(2)
        });

        // Generate Schedule
        let balance = principal;
        let yearlyData = {};
        const newSchedule = [];

        for (let i = 1; i <= months; i++) {
            const interestPayment = balance * rate;
            const principalPayment = emi - interestPayment;
            balance -= principalPayment;

            // Monthly Data
            newSchedule.push({
                period: i,
                emi: emi,
                principal: principalPayment,
                interest: interestPayment,
                balance: Math.max(0, balance)
            });
        }
        setSchedule(newSchedule);
    };

    const handleReset = () => {
        setInputs({ amount: '', rate: '', years: '' });
        setResult(null);
        setSchedule([]);
    };

    const getDisplayedSchedule = () => {
        if (viewMode === 'monthly') return schedule;

        // Aggregate to Yearly
        const yearly = [];
        let currentYear = 1;
        let yearPrincipal = 0;
        let yearInterest = 0;
        let yearEmi = 0;

        schedule.forEach((month, index) => {
            yearPrincipal += month.principal;
            yearInterest += month.interest;
            yearEmi += month.emi;

            if ((index + 1) % 12 === 0 || index === schedule.length - 1) {
                yearly.push({
                    period: currentYear,
                    emi: yearEmi,
                    principal: yearPrincipal,
                    interest: yearInterest,
                    balance: month.balance
                });
                currentYear++;
                yearPrincipal = 0;
                yearInterest = 0;
                yearEmi = 0;
            }
        });
        return yearly;
    };

    const displayedSchedule = getDisplayedSchedule();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold dark:text-white">Loan Calculator</h1>

            {/* Input Section - Horizontal Card */}
            <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-gray-800 shadow-sm">
                <form onSubmit={handleCalculate} className="flex flex-col lg:flex-row gap-6 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loan Amount</label>
                        <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="number"
                                required
                                value={inputs.amount}
                                onChange={(e) => setInputs({ ...inputs, amount: e.target.value })}
                                className="w-full pl-10 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 dark:text-white outline-none"
                                placeholder="e.g. 500000"
                            />
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interest Rate (%)</label>
                        <div className="relative">
                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="number"
                                step="0.1"
                                required
                                value={inputs.rate}
                                onChange={(e) => setInputs({ ...inputs, rate: e.target.value })}
                                className="w-full pl-10 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 dark:text-white outline-none"
                                placeholder="e.g. 8.5"
                            />
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loan Term (Years)</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="number"
                                required
                                value={inputs.years}
                                onChange={(e) => setInputs({ ...inputs, years: e.target.value })}
                                className="w-full pl-10 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 dark:text-white outline-none"
                                placeholder="e.g. 5"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 w-full lg:w-auto">
                        <button
                            type="submit"
                            className="flex-1 lg:flex-none px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                        >
                            Calculate
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-rose-500 rounded-xl transition-colors"
                        >
                            <RefreshCw size={20} />
                        </button>
                    </div>
                </form>
            </div>

            {/* Results Section */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        {/* 4 Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Monthly EMI', value: result.emi, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-500/10' },
                                { label: 'Total Principal', value: result.principal, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/10' },
                                { label: 'Total Interest', value: result.interest, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-500/10' },
                                { label: 'Total Payment', value: result.total, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-500/10' },
                            ].map((card, idx) => (
                                <div key={idx} className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-gray-800 shadow-sm">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">{card.label}</p>
                                    <h3 className={`text-2xl font-bold ${card.color}`}>₹{Number(card.value).toLocaleString('en-IN')}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Amortization Schedule */}
                        <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Amortization Schedule</h3>
                                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('monthly')}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'monthly' ? 'bg-white dark:bg-gray-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        onClick={() => setViewMode('yearly')}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'yearly' ? 'bg-white dark:bg-gray-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                                    >
                                        Yearly
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                                            <th className="p-4 font-medium">{viewMode === 'monthly' ? 'Month' : 'Year'}</th>
                                            <th className="p-4 font-medium">EMI</th>
                                            <th className="p-4 font-medium">Principal</th>
                                            <th className="p-4 font-medium">Interest</th>
                                            <th className="p-4 font-medium">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {displayedSchedule.map((row, index) => (
                                            <tr key={index} className="text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="p-4 font-medium">{row.period}</td>
                                                <td className="p-4">₹{row.emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                                                <td className="p-4 text-emerald-600 dark:text-emerald-400">₹{row.principal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                                                <td className="p-4 text-rose-500">₹{row.interest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                                                <td className="p-4 text-gray-500">₹{row.balance.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                                            </tr>
                                        ))}
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
