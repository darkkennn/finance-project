import Transaction from '../models/Transaction.js';

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { description, amount, type, category } = req.body;

    const newTransaction = new Transaction({
      description,
      amount,
      type,
      category,
      user: req.user._id,
    });

    const transaction = await newTransaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Security check: Ensure the user owns the transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await transaction.deleteOne();

    res.status(200).json({ message: 'Transaction removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check if the user owns the transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const { description, amount, type, category } = req.body;

    transaction.description = description || transaction.description;
    transaction.amount = amount || transaction.amount;
    transaction.type = type || transaction.type;
    transaction.category = category || transaction.category;

    const updatedTransaction = await transaction.save();
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add updateTransaction to your exports
export { getTransactions, addTransaction, deleteTransaction, updateTransaction };
