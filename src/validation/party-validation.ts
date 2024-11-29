import z from 'zod';

const mandatoryString = z.string().trim().min(1);
const mongooseId = mandatoryString.refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
	message: 'Invalid id format',
});

export class PartyValidator {
	_id = mongooseId;
	code = mandatoryString.max(50);
	name = mandatoryString.max(50);
	contact_person = mandatoryString.max(50);
	contact_number = mandatoryString.max(13);
	atLeastOneFieldRequired = z
		.object({
			name: this.name.optional(),
			contact_person: this.contact_person.optional(),
			contact_number: this.contact_number.optional(),
		})
		.refine((data) => data.name || data.contact_person || data.contact_number, {
			message: 'At least one of name, contact_person, or contact_number must be provided',
		});
	boolean = z.boolean();
}
