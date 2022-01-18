import {Schema, model} from 'mongoose';

const UserModel = new Schema ({
    fullName: {
        type: Schema.Types.String
    },
    email: {
        type: Schema.Types.String
    },
    password: {
        type: Schema.Types.String
    }
}, {timestamps: true})

module.exports = model('User', UserModel, 'User')