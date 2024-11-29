import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interface/user';

const UserSchema: Schema = new Schema(
	{
		code: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		pin: { type: String, required: true },
		device_id: { type: String },
		is_active: { type: Boolean, required: true, default: false },
		is_logged_in: { type: Boolean, required: true, default: false },
		forget_pin: { type: Boolean, default: false },
		registration_date: { type: Date },
		role: { type: String, required: true },
		token: { type: String },
		created_by: { type: String, required: true },
		created_at: { type: Date, required: true, default: Date.now },
		updated_by: { type: String, required: true },
		updated_at: { type: Date, required: true, default: Date.now },
	},
	{
		collection: 'user',
	},
);

export default mongoose.model<IUser>('User', UserSchema);
