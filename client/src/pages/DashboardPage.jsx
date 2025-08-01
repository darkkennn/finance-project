import React, { useState, useEffect } from 'react';
import API from '../services/api';
import TransactionForm from '../components/TransactionForm';
import Summary from '../components/Summary';
import ExpenseChart from '../components/ExpenseChart';
import EditTransactionModal from '../components/EditTransactionModal'; // 1. Import the modal

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null); // 2. State for the modal

  // ... (useEffect and handleAddTransaction functions remain the same)
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
  
  const handleDeleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      setTransactions(transactions.filter((transaction) => transaction._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };
  
  // 3. Function to update the list after an edit
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
          {transactions.map((transaction) => (
            <li key={transaction._id} className="...">
              {/* ... (description and amount spans) ... */}
              <span className="font-medium">{transaction.description}</span>
              <div className="flex items-center">
                <span className={`font-bold mr-4 ...`}>
                   {/* ... amount text ... */}
                  {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount)}
                </span>
                
                {/* 4. Add the Edit button */}
                <button 
                  onClick={() => setEditingTransaction(transaction)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-xs py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>

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
        {transactions.length === 0 && <p>...</p>}
      </div>
      
      {/* 5. Render the modal conditionally */}
      <EditTransactionModal 
        transaction={editingTransaction}
        onClose={() => setEditingTransaction(null)}
        onTransactionUpdated={handleUpdateTransaction}
      />
    </div>
  );
};

export default DashboardPage;