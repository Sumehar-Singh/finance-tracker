import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
);

export const WeeklyOverview = ({ transactions }) => {
    // Process current week (Sunday to Saturday)
    const currentWeekDays = [];
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek); // Go back to Sunday

    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        currentWeekDays.push(d);
    }

    // Use currentWeekDays
    const data = currentWeekDays.map(date => {
        const dateStr = date.toLocaleDateString();
        const dailyIncome = transactions
            .filter(t => new Date(t.date).toLocaleDateString() === dateStr && t.type === 'income')
            .reduce((sum, t) => sum + Number(t.amount), 0);
        const dailyExpense = transactions
            .filter(t => new Date(t.date).toLocaleDateString() === dateStr && t.type === 'expense')
            .reduce((sum, t) => sum + Number(t.amount), 0);
        return {
            date: date.toLocaleDateString('en-US', { weekday: 'short' }),
            income: dailyIncome,
            expense: dailyExpense
        };
    });

    const chartData = {
        labels: data.map(d => d.date),
        datasets: [
            {
                label: 'Income',
                data: data.map(d => d.income),
                backgroundColor: '#10B981', // Emerald-500 (Lighter, Vibrant)
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.8
            },
            {
                label: 'Expense',
                data: data.map(d => d.expense),
                backgroundColor: '#F43F5E', // Rose-500 (Lighter, Vibrant)
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.8
            }
        ]
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    color: '#9CA3AF',
                    font: { family: "'Inter', sans-serif", size: 12 }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                titleColor: '#F9FAFB',
                bodyColor: '#D1D5DB',
                padding: 12,
                cornerRadius: 8,
                displayColors: true,
                usePointStyle: true,
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(156, 163, 175, 0.1)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#9CA3AF',
                    font: { size: 11 },
                    callback: (value) => '₹' + value
                },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: '#9CA3AF',
                    font: { size: 11 }
                },
                border: { display: false }
            }
        }
    };

    return (
        <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-gray-800 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">This Week's Activity</h3>
                <Link to="/dashboard/charts" className="text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1">
                    View Detailed Charts &rarr;
                </Link>
            </div>
            <div className="flex-1 w-full min-h-[300px]">
                <Bar data={chartData} options={{ ...options, maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export const TodayExpenses = ({ transactions }) => {
    const todayStr = new Date().toLocaleDateString();
    const todayTxns = transactions.filter(t =>
        new Date(t.date).toLocaleDateString() === todayStr && t.type === 'expense'
    );

    const categoryData = {};
    todayTxns.forEach(t => {
        categoryData[t.category] = (categoryData[t.category] || 0) + Number(t.amount);
    });

    const chartData = {
        labels: Object.keys(categoryData),
        datasets: [{
            data: Object.values(categoryData),
            backgroundColor: [
                '#10B981', // Emerald
                '#3B82F6', // Blue
                '#F59E0B', // Amber
                '#EC4899', // Pink
                '#8B5CF6', // Violet
                '#06B6D4', // Cyan
                '#F97316', // Orange
                '#6366F1', // Indigo
            ],
            borderWidth: 0,
            hoverOffset: 0
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#9CA3AF',
                    usePointStyle: true,
                    boxWidth: 8,
                    font: { size: 11 }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                callbacks: {
                    label: (context) => {
                        const value = context.raw;
                        const label = context.label;
                        return `${label}: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}`;
                    }
                }
            }
        }
    };

    return (
        <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-gray-800 shadow-sm h-full flex flex-col">
            <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Today's Expenses</h3>
            <div className="flex-1 w-full flex justify-center items-center min-h-[250px]">
                {Object.keys(categoryData).length > 0 ? (
                    <Doughnut data={chartData} options={{ ...options, maintainAspectRatio: false }} />
                ) : (
                    <div className="text-center text-gray-400">
                        <p className="text-sm">No expenses recorded today.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
