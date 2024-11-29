import z from 'zod';

const mandatoryString = z.string().trim().min(1);
const mongooseId = mandatoryString.refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
	message: 'Invalid id format',
});

export class ProjectValidator {
	_id = mongooseId;
	code = mandatoryString.max(50);
	name = mandatoryString.max(50);
	boolean = z.boolean();
}
