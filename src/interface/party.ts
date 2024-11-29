import { IPagination } from './pagination';

export interface IParty {
	_id?: string;
	code: string;
	name: string;
	contact_person?: string;
	contact_number?: string;
	is_active: boolean;
}

export interface IPartyWithMeta {
	data: IParty[];
	meta: {
		pagination: IPagination;
	};
}

export interface IPartyWithTransactionMeta extends IParty {
	totalOutward: number;
	totalInward: number;
}
