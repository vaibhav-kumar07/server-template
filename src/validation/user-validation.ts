import z from 'zod';
import { Role } from '../interface/user';

const mandatoryString = z.string().trim().min(1);
const mongooseId = mandatoryString.refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
	message: 'Invalid id format',
});

export class UserValidator {
	_id = mongooseId;
	code = mandatoryString.max(50);
	name = mandatoryString.max(50);
	device_id = mandatoryString;
	pin = mandatoryString.min(6).max(6);
	is_active = z.boolean();
	role = z.enum([Role.ACCOUNTANT, Role.ADMIN, Role.OWNER]);
}
