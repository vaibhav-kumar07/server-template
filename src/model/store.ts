import mongoose from 'mongoose';
import { IStore } from '../interface/store';

const storeSchema = new mongoose.Schema<IStore>(
	{
		code: { type: String, required: true, unique: true },
		location: { type: String },
		current_balance: { type: Number, required: true, default: 0 },
		initial_balance: { type: Number, required: true, default: 0 },
		keeper_code: { type: String, required: true },
		is_active: { type: Boolean, default: true },
		created_by: { type: String, required: true },
		updated_by: { type: String, required: true },
		created_at: { type: Date, default: Date.now },
		updated_at: { type: Date, default: Date.now },
	},
	{
		collection: 'store',
	},
);

export default mongoose.model<IStore>('Store', storeSchema);
