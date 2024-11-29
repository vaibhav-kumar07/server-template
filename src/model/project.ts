import mongoose, { Schema } from 'mongoose';
import { IProject } from '../interface/project';

const ProjectSchema: Schema = new Schema(
    {
        code: { type: String, required: true, unique: true, editable: false },
        name: { type: String, required: true },
        is_active: { type: Boolean, required: true, default: true },
    },
    {
        collection: 'project',
    },
);

export default mongoose.model<IProject>('Project', ProjectSchema);
