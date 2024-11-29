import z from 'zod';

const mandatoryString = z.string().trim().min(1);
const mongooseId = mandatoryString.refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
	message: 'Invalid id format',
});

export class StoreValidator {
	_id = mongooseId;
	code = mandatoryString.max(50);
	location = mandatoryString.max(50);
	current_balance = z.number().int();
	initial_balance = z.number().int();
	keeper_code = mandatoryString.max(50);
	is_active = z.boolean();
}
