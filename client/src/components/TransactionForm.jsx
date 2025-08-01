import React, { useState } from 'react';
import API from '../services/api';

const TransactionForm = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(''); // 1. Add state for category

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || !category) { // Add category to validation
      return alert('Please fill out all fields');
    }

    const newTransaction = {
      description,
      amount: parseFloat(amount),
      type,
      category, // 2. Include category in the new transaction object
    };

    try {
      const response = await API.post('/transactions', newTransaction);
      onAddTransaction(response.data);
      // Reset form
      setDescription('');
      setAmount('');
      setCategory(''); // 3. Reset category state
      setType('expense');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="e.g., Salary, Groceries"
            required
          />
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="0.00"
            required
          />
        </div>
        
        {/* Category Input (The new field) */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="e.g., Food, Transport, Salary"
            required
          />
        </div>
        
        {/* Type Select */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;