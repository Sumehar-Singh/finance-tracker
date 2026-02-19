import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilterDropdown({ label, icon: Icon, value, options, onChange, placeholder = "Select" }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="space-y-1 relative" ref={dropdownRef}>
            {label && <label className="text-xs font-semibold text-gray-500 ml-1">{label}</label>}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full pl-3 pr-4 py-2.5 rounded-xl border text-left flex items-center gap-2 transition-all shadow-sm
                    ${isOpen
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-white dark:bg-gray-800'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-500/50'
                    }
                `}
            >
                {Icon && <Icon size={16} className={`${isOpen ? 'text-emerald-500' : 'text-gray-400'} transition-colors`} />}
                <span className={`flex-1 text-sm font-medium ${selectedOption ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute top-full left-0 right-0 mt-1 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden max-h-60 overflow-y-auto"
                    >
                        <div className="p-1">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                                        ${value === option.value
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }
                                    `}
                                >
                                    {option.label}
                                    {value === option.value && <Check size={14} />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
