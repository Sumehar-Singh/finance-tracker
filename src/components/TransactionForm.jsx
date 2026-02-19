import { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';

export default function TransactionForm({ uid, closeForm, initialData, existingCategories = [] }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState(''); // No default category
    const [type, setType] = useState('expense');
    const { addDocument, updateDocument, response } = useFirestore('transactions');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setAmount(initialData.amount);
            setDate(initialData.date);
            setCategory(initialData.category);
            setType(initialData.type);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const doc = {
            uid,
            name, // Description
            amount: parseFloat(amount),
            date,
            category: category.trim().toLowerCase(), // Normalize category
            type
        };

        if (initialData) {
            updateDocument(initialData.id, doc);
        } else {
            addDocument(doc);
        }

        // Optimistically close form
        if (closeForm) closeForm();
    };

    // Reset form after successful submission (if not closed)
    useEffect(() => {
        if (response.success) {
            setName('');
            setAmount('');
            setDate('');
            setCategory('');
            setType('expense');
        }
    }, [response.success]);

    return (
        <>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                {initialData ? 'Edit Transaction' : 'Add Transaction'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* 1. Transaction Type */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Transaction Type</label>
                    <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setType('expense')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === 'expense'
                                ? 'bg-white dark:bg-gray-700 text-rose-500 shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                            Expense
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('income')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === 'income'
                                ? 'bg-white dark:bg-gray-700 text-emerald-500 shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                            Income
                        </button>
                    </div>
                </div>

                {/* 2. Amount and Date */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Amount (₹)</label>
                        <input
                            type="number"
                            required
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-gray-400"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Date</label>
                        <input
                            type="date"
                            required
                            max={new Date().toISOString().split('T')[0]} // Disable future dates
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* 3. Category (Free Text with Datalist) */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Category</label>
                    <input
                        type="text"
                        required
                        list="category-suggestions"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-gray-400"
                        placeholder="e.g. Food, Salary, Travel..."
                    />
                    <datalist id="category-suggestions">
                        {existingCategories.map(cat => (
                            <option key={cat} value={cat} />
                        ))}
                    </datalist>
                </div>

                {/* 4. Description (Optional) */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-gray-400"
                        placeholder="Add a note..."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                    {initialData ? 'Update Transaction' : 'Add Transaction'}
                </button>
            </form>
        </>
    );
}
