import { useState, useEffect } from 'react';
import { useRealtime } from '../hooks/useRealtime';

export default function TransactionForm({ uid, closeForm }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('Groceries');
    const [type, setType] = useState('expense');
    const { addDocument, response } = useRealtime();

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument('transactions', {
            uid,
            name,
            amount: parseFloat(amount),
            date,
            category,
            type
        });
    };

    useEffect(() => {
        if (response.success) {
            setName('');
            setAmount('');
            setDate('');
            setCategory('Groceries');
            if (closeForm) closeForm();
        }
    }, [response.success, closeForm]);

    return (
        <>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Add Transaction</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Transaction Name</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                        placeholder="e.g. Grocery Shopping"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Amount ($)</label>
                        <input
                            type="number"
                            required
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Date</label>
                        <input
                            type="date"
                            required
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Type</label>
                        <select
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Category</label>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                        >
                            <option value="Groceries">Groceries</option>
                            <option value="Rent">Rent</option>
                            <option value="Salary">Salary</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Transport">Transport</option>
                            <option value="Health">Health</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                    Add Transaction
                </button>
            </form>
        </>
    );
}
