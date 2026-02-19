import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AuthIllustration from '../components/AuthIllustration';

export default function AuthLayout() {
    return (
        <div className="flex h-screen w-full bg-white dark:bg-gray-900 overflow-hidden">
            {/* Left Side - Illustration (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 relative bg-emerald-600 items-center justify-center overflow-hidden">
                {/* Back Button (Desktop) */}
                <div className="absolute top-8 left-8 z-50">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-white hover:text-white transition-colors group"
                    >
                        <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors backdrop-blur-sm">
                            <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                        </div>
                        <span className="font-medium">Back to Home</span>
                    </Link>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700 opacity-90"></div>

                {/* Background Pattern Overlay */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

                {/* Content Container - Shifted up */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center px-12 pb-12">
                    {/* Custom SVG Illustration */}
                    <div className="w-full max-w-lg mb-4 transform hover:scale-105 transition-transform duration-700">
                        <AuthIllustration />
                    </div>

                    {/* Text */}
                    <div className="text-white max-w-md">
                        <h1 className="text-4xl font-bold mb-4 font-display">Master Your Finances</h1>
                        <p className="text-lg text-white">
                            Track, budget, and grow your wealth with our intuitive and secure platform.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form Content */}
            <div className="w-full lg:w-1/2 flex flex-col relative bg-white dark:bg-gray-900">
                {/* Back Button (Mobile Only) */}
                <div className="absolute top-8 left-8 z-50 lg:hidden">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors group"
                    >
                        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                            <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                        </div>
                        <span className="font-medium">Back to Home</span>
                    </Link>
                </div>

                {/* Centered Content - Shifted up */}
                <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 overflow-y-auto pb-12">
                    <div className="w-full max-w-md">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
