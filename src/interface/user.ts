import { IPagination } from './pagination';

export interface IUser {
	_id?: string;
	code: string;
	name: string;
	pin: string; // encrypted - 6 digits
	device_id?: string;
	is_active?: boolean;
	is_logged_in?: boolean;
	forget_pin?: boolean;
	registration_date?: Date;
	role: Role;
	token?: string;
	created_by: string;
	created_at?: Date;
	updated_by: string;
	updated_at?: Date;
}

export interface IUserWithMeta {
	data: IUser[];
	meta: {
		pagination: IPagination;
	};
}

export enum Role {
	OWNER = 'OWNER',
	ADMIN = 'ADMIN',
	ACCOUNTANT = 'ACCOUNTANT',
}
