import { useState, useEffect } from 'react';
import API from '../services/api.jsx';
import TransactionForm from '../components/TransactionForm.jsx';
import Summary from '../components/Summary.jsx';
import ExpenseChart from '../components/ExpenseCharts.jsx';

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await API.get('/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const handleAddTransaction = (newTransaction) => {
    // This line is crucial. It creates a new array.
    setTransactions([newTransaction, ...transactions]);
  };
  
  const handleDeleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      setTransactions(transactions.filter((transaction) => transaction._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };
  
  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions(transactions.map(t => 
      t._id === updatedTransaction._id ? updatedTransaction : t
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <Summary transactions={transactions} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <TransactionForm onAddTransaction={handleAddTransaction} />
        <ExpenseChart transactions={transactions} />
      </div>
      <div className="bg-white shadow-md rounded p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">History</h2>
        <ul>
          {/* Transaction list mapping remains the same */}
          {transactions.map((transaction) => (
            <li 
              key={transaction._id} 
              className={`flex justify-between items-center p-3 mb-2 rounded ${
                transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <span className="font-medium">{transaction.description}</span>
              <div className="flex items-center">
                <span className={`font-bold mr-4 ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount)}
                </span>
                {/* Edit button would go here if implemented */}
                <button 
                  onClick={() => handleDeleteTransaction(transaction._id)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold text-xs py-1 px-2 rounded"
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
        {transactions.length === 0 && <p className="text-gray-500 mt-4">No transactions yet.</p>}
      </div>
      {/* Edit modal would go here if implemented */}
    </div>
  );
};

export default DashboardPage;