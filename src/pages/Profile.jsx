import { useAuth } from '../context/AuthContext';
import { User, Mail } from 'lucide-react';

export default function Profile() {
    const { currentUser } = useAuth();

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">User Profile</h1>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full">
                        <User size={48} className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold dark:text-white">Welcome!</h2>
                        <p className="text-gray-500 dark:text-gray-400">Manage your account details here.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Mail className="text-gray-500 dark:text-gray-300" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Email Address</p>
                            <p className="text-lg font-medium dark:text-white">{currentUser?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">User ID</p>
                            <p className="text-sm font-mono dark:text-gray-300">{currentUser?.uid}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
