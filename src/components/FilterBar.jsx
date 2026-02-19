import { Filter, Calendar, Tag, Wallet, ArrowUpDown, Search } from 'lucide-react';
import FilterDropdown from './FilterDropdown';

export default function FilterBar({ filters, setFilters, onApply, categories = [] }) {

    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const typeOptions = [
        { value: 'all', label: 'All Types' },
        { value: 'income', label: 'Income' },
        { value: 'expense', label: 'Expense' }
    ];

    const categoryOptions = [
        { value: 'All', label: 'All Categories' },
        ...categories.map(cat => ({ value: cat, label: cat }))
    ];

    const sortOptions = [
        { value: 'dateDesc', label: 'Newest First' },
        { value: 'dateAsc', label: 'Oldest First' },
        { value: 'amountDesc', label: 'Highest Amount' },
        { value: 'amountAsc', label: 'Lowest Amount' }
    ];

    return (
        <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-white/20 dark:border-gray-800 mb-8 z-40 relative">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-bold mb-4">
                <Filter size={20} className="text-emerald-500" />
                <span>Filter & Sort</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {/* Type Filter */}
                <FilterDropdown
                    label="Type"
                    icon={Wallet}
                    value={filters.type}
                    options={typeOptions}
                    onChange={(val) => handleChange('type', val)}
                />

                {/* Category Filter */}
                <FilterDropdown
                    label="Category"
                    icon={Tag}
                    value={filters.category}
                    options={categoryOptions}
                    onChange={(val) => handleChange('category', val)}
                />

                {/* From Date */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 ml-1">From Date</label>
                    <div className="relative group">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                        <input
                            type="date"
                            value={filters.dateFrom || ''}
                            onChange={(e) => handleChange('dateFrom', e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer hover:border-emerald-500/50 transition-all text-gray-700 dark:text-gray-200 font-medium shadow-sm placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* To Date */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 ml-1">To Date</label>
                    <div className="relative group">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                        <input
                            type="date"
                            value={filters.dateTo || ''}
                            onChange={(e) => handleChange('dateTo', e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer hover:border-emerald-500/50 transition-all text-gray-700 dark:text-gray-200 font-medium shadow-sm"
                        />
                    </div>
                </div>

                {/* Sort By */}
                <FilterDropdown
                    label="Sort By"
                    icon={ArrowUpDown}
                    value={filters.sortBy || 'dateDesc'}
                    options={sortOptions}
                    onChange={(val) => handleChange('sortBy', val)}
                />
                {/* Apply Button */}
                <div className="flex items-end">
                    <button
                        onClick={onApply}
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <Search size={18} />
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>
    );
}
