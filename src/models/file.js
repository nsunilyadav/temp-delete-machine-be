import { Schema, model } from 'mongoose';

const fileModel = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: Schema.Types.String
    }
}, {timestamps: true})

module.exports = model('File', fileModel, 'File')