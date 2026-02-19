import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PieChart, ShieldCheck, Zap, TrendingUp, Smartphone, Globe, CheckCircle } from 'lucide-react';

export default function LandingPage() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-sans overflow-x-hidden">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Rich Professional Background */}
                {/* Organic Aurora Background - FIXED VISIBILITY */}
                <div className="absolute inset-0 z-0 h-full w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 60%, #ecfdf5 100%)' }}>
                    {/* Dark Mode Overlay */}
                    <div className="absolute inset-0 bg-black/0 dark:bg-black/90 transition-colors"></div>

                    {/* Moving Mesh Gradients - Softer & Lighter */}
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-300/30 rounded-full blur-[80px] animate-blob mix-blend-multiply dark:mix-blend-screen"></div>
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-300/30 rounded-full blur-[80px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-green-300/30 rounded-full blur-[80px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen"></div>
                </div>
                <div className="w-[90%] md:w-[80%] max-w-7xl mx-auto px-6 text-center relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 text-sm font-semibold mb-6 border border-emerald-200 dark:border-emerald-800"
                    >
                        #1 Personal Finance App
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-black dark:text-white"
                    >
                        Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">Money</span>,<br />
                        Construct Your Future.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
                    >
                        Stop guessing where your money goes. Track, analyze, and optimize your spending with our professional-grade financial dashboard.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex flex-col sm:flex-row justify-center gap-4 items-center"
                    >
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black dark:bg-emerald-600 rounded-full hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-all transform hover:scale-105 shadow-lg shadow-emerald-900/20 w-full sm:w-auto"
                        >
                            Create New Account <ArrowRight className="ml-2" />
                        </Link>
                    </motion.div>
                </div>

            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <div className="w-[90%] md:w-[80%] max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">How It Works</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Three simple steps to financial freedom.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 dark:from-emerald-900 dark:via-emerald-700 dark:to-emerald-900 -z-10"></div>

                        {[
                            {
                                step: "01",
                                title: "Create Account",
                                desc: "Sign up in seconds and set up your secure profile.",
                                icon: <ShieldCheck size={28} className="text-emerald-600 dark:text-emerald-400" />
                            },
                            {
                                step: "02",
                                title: "Track Spending",
                                desc: "Log your daily transactions easily or import data.",
                                icon: <Zap size={28} className="text-emerald-600 dark:text-emerald-400" />
                            },
                            {
                                step: "03",
                                title: "See Insights",
                                desc: "Visualize your habits with beautiful, interactive charts.",
                                icon: <PieChart size={28} className="text-emerald-600 dark:text-emerald-400" />
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="relative flex flex-col items-center text-center"
                            >
                                <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full border-4 border-emerald-50 dark:border-emerald-900/30 flex items-center justify-center mb-6 shadow-lg z-10 relative group hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                                        {item.step}
                                    </div>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed px-4">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>


                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-white dark:bg-black">
                <div className="w-[90%] md:w-[80%] max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">Professional Services</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            We provide the tools you need to take control of your financial life.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            {
                                icon: <TrendingUp size={32} className="text-white" />,
                                bg: "bg-black",
                                title: "Expense Content",
                                desc: "Categorize every penny. Know exactly how much you spend on groceries, entertainment, and bills."
                            },
                            {
                                icon: <PieChart size={32} className="text-white" />,
                                bg: "bg-emerald-600",
                                title: "Income Analytics",
                                desc: "Track multiple income streams. Visualize your earnings growth over time with intuitive charts."
                            },
                            {
                                icon: <Globe size={32} className="text-white" />,
                                bg: "bg-gray-800",
                                title: "Global Access",
                                desc: "Access your financial data from anywhere in the world, on any device, securely and instantly."
                            }
                        ].map((service, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow group"
                            >
                                <div className={`w-14 h-14 ${service.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-gray-50 dark:bg-black border-t border-gray-100 dark:border-gray-900">
                <div className="w-[90%] md:w-[80%] max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            className="lg:w-1/2 w-full"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white">Why Choose Us?</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Designed for modern professionals who demand precision and speed. Our platform is built on cutting-edge technology to ensure your data is always accurate and available.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Real-time Data Synchronization",
                                    "Bank-grade Security Encryption",
                                    "Mobile-First Responsive Design",
                                    "Exportable Financial Reports"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                                        <CheckCircle className="text-emerald-500 mr-3" size={20} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transform translate-y-8">
                                <Zap className="text-emerald-500 mb-4" size={40} />
                                <h4 className="font-bold text-lg mb-2 text-black dark:text-white">Fast</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Lightning fast updates.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <ShieldCheck className="text-black dark:text-white mb-4" size={40} />
                                <h4 className="font-bold text-lg mb-2 text-black dark:text-white">Secure</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Your data is safe.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transform translate-y-8">
                                <Smartphone className="text-gray-700 dark:text-gray-300 mb-4" size={40} />
                                <h4 className="font-bold text-lg mb-2 text-black dark:text-white">Mobile</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Works on all devices.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <TrendingUp className="text-emerald-600 mb-4" size={40} />
                                <h4 className="font-bold text-lg mb-2 text-black dark:text-white">Scalable</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Grows with your wealth.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-black text-white text-center">
                <div className="w-[90%] md:w-[80%] max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to take control?</h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Join thousands of users who are already saving more and stressing less.
                        </p>
                        <Link
                            to="/register"
                            className="inline-block px-10 py-4 bg-emerald-600 text-white text-lg font-bold rounded-full hover:bg-emerald-700 transition-colors shadow-2xl shadow-emerald-900/50"
                        >
                            Create New Account
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-6 border-t border-gray-800">
                <div className="w-[90%] md:w-[80%] max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-white text-xl font-bold mb-2">FinanceTracker</h3>
                        <p className="text-sm text-gray-400 max-w-md">Making financial freedom accessible to everyone with powerful tools and insights.</p>
                    </div>
                    <div className="flex gap-8">
                        <a href="#how-it-works" className="text-sm font-medium hover:text-emerald-400 transition-colors">How it Works</a>
                        <a href="#services" className="text-sm font-medium hover:text-emerald-400 transition-colors">Services</a>
                        <a href="#features" className="text-sm font-medium hover:text-emerald-400 transition-colors">Features</a>
                    </div>
                </div>
                <div className="text-center mt-6 pt-6 border-t border-gray-800 text-sm opacity-50">
                    © {new Date().getFullYear()} Personal Finance Tracker. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
