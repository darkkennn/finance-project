import React, { useState, useEffect } from 'react';
import API from '../services/api';

const EditTransactionModal = ({ transaction, onClose, onTransactionUpdated }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
  });

  // This effect runs when the 'transaction' prop changes, pre-filling the form
  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
      });
    }
  }, [transaction]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(`/transactions/${transaction._id}`, formData);
      onTransactionUpdated(response.data);
      onClose(); // Close the modal on success
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };
  
  // Don't render anything if there's no transaction to edit
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Transaction</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields (similar to TransactionForm) */}
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text" name="description" value={formData.description} onChange={onChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number" name="amount" value={formData.amount} onChange={onChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text" name="category" value={formData.category} onChange={onChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select name="type" value={formData.type} onChange={onChange} className="w-full p-2 border rounded">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;