import { useState, useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
);

export default function Charts({ transactions }) {
    const [viewMode, setViewMode] = useState('monthly'); // 'weekly', 'monthly', 'yearly'
    const [currentDate, setCurrentDate] = useState(new Date());

    // --- Date Helpers ---
    const getDateRange = (date, mode) => {
        const start = new Date(date);
        const end = new Date(date);

        if (mode === 'weekly') {
            const day = start.getDay(); // 0 is Sunday
            start.setDate(start.getDate() - day);
            start.setHours(0, 0, 0, 0);

            end.setDate(start.getDate() + 6);
            end.setHours(23, 59, 59, 999);
        } else if (mode === 'monthly') {
            start.setDate(1);
            start.setHours(0, 0, 0, 0);

            end.setMonth(end.getMonth() + 1);
            end.setDate(0);
            end.setHours(23, 59, 59, 999);
        } else if (mode === 'yearly') {
            start.setMonth(0, 1);
            start.setHours(0, 0, 0, 0);

            end.setMonth(11, 31);
            end.setHours(23, 59, 59, 999);
        }
        return { start, end };
    };

    const handleNavigate = (direction) => {
        const newDate = new Date(currentDate);
        if (viewMode === 'weekly') {
            newDate.setDate(newDate.getDate() + (direction * 7));
        } else if (viewMode === 'monthly') {
            newDate.setMonth(newDate.getMonth() + direction);
        } else if (viewMode === 'yearly') {
            newDate.setFullYear(newDate.getFullYear() + direction);
        }
        setCurrentDate(newDate);
    };

    const formatDateLabel = (start, end, mode) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        if (mode === 'yearly') return start.getFullYear().toString();
        if (mode === 'monthly') return start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    };

    const { start, end } = getDateRange(currentDate, viewMode);

    // --- Data Processing ---
    const processedData = useMemo(() => {
        if (!transactions) return { summary: {}, barChart: {}, lineChart: {} };

        const filtered = transactions.filter(t => {
            const tDate = new Date(t.date);
            return tDate >= start && tDate <= end;
        });

        // Summary
        const income = filtered.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
        const expense = filtered.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
        const net = income - expense;

        // Chart Data Generation
        const labels = [];
        const incomeData = [];
        const expenseData = [];
        const balanceData = [];

        let cumulativeBalance = 0;

        if (viewMode === 'yearly') {
            for (let i = 0; i < 12; i++) {
                const monthStart = new Date(start.getFullYear(), i, 1);
                const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });
                labels.push(monthName);

                const monthlyTxns = filtered.filter(t => new Date(t.date).getMonth() === i);
                const mIncome = monthlyTxns.filter(t => t.type === 'income').reduce((a, t) => a + Number(t.amount), 0);
                const mExpense = monthlyTxns.filter(t => t.type === 'expense').reduce((a, t) => a + Number(t.amount), 0);

                incomeData.push(mIncome);
                expenseData.push(mExpense);
                cumulativeBalance += (mIncome - mExpense);
                balanceData.push(cumulativeBalance);
            }
        } else {
            // Weekly & Monthly (Day-wise)
            const days = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
            for (let i = 0; i < days; i++) {
                const day = new Date(start);
                day.setDate(start.getDate() + i);
                const dayStr = day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                const dateKey = day.toISOString().split('T')[0];

                labels.push(viewMode === 'weekly' ? day.toLocaleDateString('en-US', { weekday: 'short' }) : day.getDate());

                const dailyTxns = filtered.filter(t => t.date === dateKey); // Assumes YYYY-MM-DD match
                const dIncome = dailyTxns.filter(t => t.type === 'income').reduce((a, t) => a + Number(t.amount), 0);
                const dExpense = dailyTxns.filter(t => t.type === 'expense').reduce((a, t) => a + Number(t.amount), 0);

                incomeData.push(dIncome);
                expenseData.push(dExpense);
                cumulativeBalance += (dIncome - dExpense);
                balanceData.push(cumulativeBalance);
            }
        }

        return {
            summary: { income, expense, net },
            labels,
            incomeData,
            expenseData,
            balanceData
        };
    }, [transactions, start, end, viewMode]);

    // --- Chart Options ---
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: { usePointStyle: true, boxWidth: 8, color: '#9CA3AF' }
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: (ctx) => `${ctx.dataset.label}: ₹${ctx.raw.toLocaleString('en-IN')}`
                }
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(156, 163, 175, 0.1)' },
                ticks: { color: '#9CA3AF', callback: (val) => '₹' + val },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#9CA3AF' },
                border: { display: false }
            }
        }
    };

    return (
        <div className="space-y-8">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-4 rounded-2xl border border-white/20 dark:border-gray-800 shadow-sm">
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                    {['weekly', 'monthly', 'yearly'].map(mode => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${viewMode === mode
                                    ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                                }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl">
                    <button onClick={() => handleNavigate(-1)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
                    </button>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200 min-w-[140px] text-center">
                        {formatDateLabel(start, end, viewMode)}
                    </span>
                    <button onClick={() => handleNavigate(1)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Total Income', value: processedData.summary.income, color: 'text-emerald-500', icon: ArrowUpRight, bg: 'bg-emerald-100 dark:bg-emerald-500/10' },
                    { title: 'Total Expenses', value: processedData.summary.expense, color: 'text-rose-500', icon: ArrowDownRight, bg: 'bg-rose-100 dark:bg-rose-500/10' },
                    { title: 'Net Change', value: processedData.summary.net, color: processedData.summary.net >= 0 ? 'text-emerald-500' : 'text-rose-500', icon: processedData.summary.net >= 0 ? ArrowUpRight : ArrowDownRight, bg: processedData.summary.net >= 0 ? 'bg-emerald-100 dark:bg-emerald-500/10' : 'bg-rose-100 dark:bg-rose-500/10' }
                ].map((card, i) => (
                    <div key={i} className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-gray-800 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{card.title}</p>
                            <h3 className={`text-2xl font-bold ${card.color}`}>₹{card.value.toLocaleString('en-IN')}</h3>
                        </div>
                        <div className={`p-3 rounded-xl ${card.bg}`}>
                            <card.icon className={card.color} size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Income vs Expense Graph */}
            <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-gray-800 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Income vs Expense</h3>
                <div className="h-[300px] w-full">
                    <Bar
                        data={{
                            labels: processedData.labels,
                            datasets: [
                                { label: 'Income', data: processedData.incomeData, backgroundColor: '#10B981', borderRadius: 4 },
                                { label: 'Expense', data: processedData.expenseData, backgroundColor: '#F43F5E', borderRadius: 4 }
                            ]
                        }}
                        options={commonOptions}
                    />
                </div>
            </div>

            {/* Balance Over Time Graph */}
            <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-gray-800 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Balance Over Time</h3>
                <div className="h-[300px] w-full">
                    <Line
                        data={{
                            labels: processedData.labels,
                            datasets: [
                                {
                                    label: 'Cumulative Balance',
                                    data: processedData.balanceData,
                                    borderColor: '#3B82F6',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    tension: 0.4,
                                    fill: true,
                                    pointRadius: 2
                                }
                            ]
                        }}
                        options={commonOptions}
                    />
                </div>
            </div>
        </div>
    );
}
