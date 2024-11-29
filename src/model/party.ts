import mongoose, { Schema } from 'mongoose';
import { IParty } from '../interface/party';

const PartySchema: Schema = new Schema(
    {
        code: { type: String, required: true, unique: true, editable: false },
        name: { type: String, required: true },
        contact_person: { type: String },
        contact_number: { type: String },
        is_active: { type: Boolean, required: true, default: true },
    },
    {
        collection: 'party',
    },
);

export default mongoose.model<IParty>('Party', PartySchema);
