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
                <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
                    {/* Base Tint to kill stark white */}
                    <div className="absolute inset-0 bg-emerald-50/50 dark:bg-emerald-950/20"></div>

                    {/* Strong Main Spotlight */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[800px] w-[1000px] bg-[radial-gradient(circle_at_50%_0%,#10b98140,transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,#10b98150,transparent_70%)] blur-[60px]"></div>

                    {/* Secondary Teal Glow (Right) */}
                    <div className="absolute top-0 right-[-10%] h-[600px] w-[600px] bg-[radial-gradient(circle_at_50%_0%,#2dd4bf30,transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,#2dd4bf20,transparent_60%)] blur-[80px]"></div>

                    {/* Tertiary Green Glow (Left) */}
                    <div className="absolute top-20 left-[-10%] h-[500px] w-[500px] bg-[radial-gradient(circle_at_50%_0%,#34d39930,transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,#34d39920,transparent_60%)] blur-[80px]"></div>
                </div>
                <div className="w-[80%] max-w-7xl mx-auto px-6 text-center relative z-10">
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
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black dark:bg-emerald-600 rounded-full hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-all transform hover:scale-105 shadow-lg shadow-emerald-900/20"
                        >
                            Start for Free <ArrowRight className="ml-2" />
                        </Link>
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black dark:text-white bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                        >
                            Log In
                        </Link>
                    </motion.div>
                </div>

                {/* Background Decorative Blobs */}
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-white dark:bg-black">
                <div className="w-[80%] max-w-7xl mx-auto px-6">
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
                        className="grid md:grid-cols-3 gap-8"
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
                <div className="w-[80%] max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            className="lg:w-1/2"
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
                            className="lg:w-1/2 grid grid-cols-2 gap-6"
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
                <div className="w-[80%] max-w-7xl mx-auto px-6">
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
                            Create Free Account
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
                <div className="w-[80%] max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">FinanceTracker</h3>
                        <p className="text-sm">Making financial freedom accessible to everyone.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-12 pt-8 border-t border-gray-800 text-sm opacity-50">
                    © {new Date().getFullYear()} Personal Finance Tracker. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
