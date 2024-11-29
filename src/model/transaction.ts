import { Schema, model } from 'mongoose';
import { ITransaction, PaymentMode, TransactionStatus, TransactionType } from '../interface/transaction';

const transactionSchema = new Schema<ITransaction>({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	payment_mode: {
		type: String,
		required: true,
		enum: PaymentMode,
	},
	transaction_type: {
		type: String,
		required: true,
		enum: TransactionType,
	},
	status: {
		type: String,
		required: true,
		enum: TransactionStatus,
		default: TransactionStatus.PENDING,
	},
	project: {
		type: String,
		// ref: 'Project',
		required: true,
	},
	store: {
		type: String,
		// ref: 'Store',
		required: true,
	},
	party: {
		type: String,
		// ref: 'Party',
		required: true,
	},
	notes: {
		type: String,
	},
	initiated_by: {
		type: String,
		required: true,
	},
	initiated_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
	approved_by: {
		type: String,
	},
	approved_at: {
		type: Date,
	},
});

const Transaction = model<ITransaction>('Transaction', transactionSchema);

const CounterSchema = new Schema({
	model: { type: String, required: true },
	seq: { type: Number, default: 0 },
});

const Counter = model('Counter', CounterSchema);
export { Counter };

export default Transaction;
