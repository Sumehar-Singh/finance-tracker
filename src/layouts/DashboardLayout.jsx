import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

export default function DashboardLayout() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
            {/* Rich Background (simplified for dashboard) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">FinanceTracker</span>
                </div>
            </div>

            {/* Sidebar with Mobile Props */}
            <Sidebar
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="pt-20 md:pt-8 p-8 md:ml-64 relative z-10 transition-all duration-300">
                <Outlet />
            </div>

            {/* Mobile Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}
        </div>
    );
}
