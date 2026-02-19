import Charts from '../components/Charts';
import { useCollection } from '../hooks/useCollection';
import { useAuth } from '../context/AuthContext';

export default function ChartsPage() {
    const { currentUser } = useAuth();
    const { documents: transactions } = useCollection(
        'transactions',
        ['uid', '==', currentUser.uid]
    );

    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-white mb-8">Analytics & Charts</h1>
            {transactions && <Charts transactions={transactions} />}
        </div>
    );
}
