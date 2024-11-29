import { IPagination } from './pagination';

export interface IStore {
	_id?: string;
	code: string;
	location: string;
	current_balance: number;
	initial_balance: number;
	keeper_code: string;
	is_active: boolean;
	totalOutward?: number;
	totalInward?: number;
	created_at: Date;
	created_by: string;
	updated_at: Date;
	updated_by: string;
}

export interface IStoreWithMeta {
	data: IStore[];
	meta: {
		pagination: IPagination;
	};
}
