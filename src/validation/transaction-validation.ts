import z from 'zod';
import { PaymentMode, TransactionStatus, TransactionType } from '../interface/transaction';
const mandatoryString = z.string().trim().min(1);
const mongooseId = mandatoryString.refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
	message: 'Invalid id format',
});

export class TransactionValidator {
	_id = mongooseId;
	store = mandatoryString;
	party = mandatoryString;
	amount = z.number().int();
	payment_mode = z.nativeEnum(PaymentMode);
	transaction_type = z.nativeEnum(TransactionType);
	status = z.nativeEnum(TransactionStatus);
	project = z.string().optional();
	notes = z.string().optional();
	initiated_by = mandatoryString;
	initiated_at = z.date();
	approved_by = mandatoryString.optional();
	approved_at = z.date().optional();
}
