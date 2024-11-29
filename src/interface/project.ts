import { IPagination } from './pagination';

export interface IProject {
	_id?: string;
	name: string;
	code: string;
	is_active: boolean;
	totalOutward?: number;
	totalInward?: number;
}

export interface IProjectWithMeta {
	data: IProject[];
	meta: {
		pagination: IPagination;
	};
}

export interface IProjectWithTransactionMeta extends IProject {
	totalOutward: number;
	totalInward: number;
}
