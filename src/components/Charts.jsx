import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

export default function Charts({ transactions }) {

    // Process data for Pie Chart (Expenses by Category)
    const categoryData = {};
    transactions.forEach(t => {
        if (t.type === 'expense') {
            if (categoryData[t.category]) {
                categoryData[t.category] += t.amount;
            } else {
                categoryData[t.category] = t.amount;
            }
        }
    });

    const pieData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                data: Object.values(categoryData),
                backgroundColor: [
                    '#10B981', // Emerald
                    '#000000', // Black
                    '#525252', // Neutral-600
                    '#34D399', // Emerald-400
                    '#A3A3A3', // Neutral-400
                    '#065F46'  // Emerald-800
                ],
                borderWidth: 1,
            },
        ],
    };

    // Process data for Bar Chart (Income vs Expense)
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach(t => {
        if (t.type === 'income') totalIncome += t.amount;
        else totalExpense += t.amount;
    });

    const barData = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                label: 'Amount ($)',
                data: [totalIncome, totalExpense],
                backgroundColor: ['#10B981', '#F43F5E'], // Emerald, Rose
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#64748B' // Slate-500
                }
            }
        },
        scales: {
            y: {
                ticks: { color: '#64748B' },
                grid: { color: '#E2E8F0' } // Slate-200
            },
            x: {
                ticks: { color: '#64748B' },
                grid: { display: false }
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-sm border border-white/20 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                    Expenses by Category
                </h3>
                <div className="h-64 flex justify-center">
                    {Object.keys(categoryData).length > 0 ? (
                        <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                    ) : (
                        <p className="text-slate-400 self-center">No expenses yet</p>
                    )}
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-sm border border-white/20 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-black dark:bg-white rounded-full"></span>
                    Income vs Expense
                </h3>
                <div className="h-64">
                    <Bar data={barData} options={{ ...options, maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    );
}
