import express from 'express';
// Import deleteTransaction
import { getTransactions, addTransaction, deleteTransaction } from '../controllers/TransactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTransactions)
  .post(protect, addTransaction);

router.route('/:id').delete(protect, deleteTransaction);

export default router;