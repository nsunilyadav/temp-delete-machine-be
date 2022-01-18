import { Schema, model } from 'mongoose';

const filePermissionModel = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    allowedUser: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
}, {timestamps: true})

module.exports = model('FilePermission', filePermissionModel, 'FilePermission')