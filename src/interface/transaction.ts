import { IPagination } from './pagination';

export interface ITransaction {
	_id?: string;
	id: string;
	amount: number;
	payment_mode: PaymentMode;
	transaction_type: TransactionType;
	status: TransactionStatus;
	project: string;
	store: string;
	party: string;
	notes?: string;
	initiated_by: string;
	initiated_at: Date;
	approved_by?: string;
	approved_at?: Date;
}

export enum TransactionStatus {
	PENDING = 'PENDING',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
}

export enum TransactionType {
	GIVEN = 'GIVEN',
	TAKEN = 'TAKEN',
	// TRANSFER = 'TRANSFER',
}

export enum PaymentMode {
	// BANK_TRANSFER = 'BANK_TRANSFER',
	CASH = 'CASH',
	CHEQUE = 'CHEQUE',
}

export interface ITransactionWithMeta {
	data: ITransaction[];
	meta: {
		totalOutward: number;
		totalInward: number;
		pagination: IPagination;
	};
}
