import React, { useState, useEffect } from 'react';
import API from '../services/api';
import TransactionForm from '../components/TransactionForm';

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
    setTransactions([newTransaction, ...transactions]);
  };

  // 1. Create a handler function to delete a transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      // 2. Update the state by filtering out the deleted transaction
      setTransactions(transactions.filter((transaction) => transaction._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <TransactionForm onAddTransaction={handleAddTransaction} />
      
      <div className="bg-white shadow-md rounded p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">History</h2>
        <ul>
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
                {/* 3. Add the delete button */}
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
        {transactions.length === 0 && <p>No transactions yet.</p>}
      </div>
    </div>
  );
};

export default DashboardPage;