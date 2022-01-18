import { body } from "express-validator";
import { userModel } from "../models";

export const userValidRule = () => {
    return [
        body('fullName').notEmpty().isAlpha('en-US', {ignore: ' '})
        .custom(value => {
            return userModel.findOne({fullName: value}).then(data => {
                if(data) {
                    return Promise.reject({message: 'Full name is already exist'});
                };
            });
        }),
        body('email').notEmpty().isEmail()
        .custom(value => {
            return userModel.findOne({email: value}).then(data => {
                if (data) {
                    return Promise.reject({message: 'Email is already exist'});
                }
            }) 
        }),
        body('password').notEmpty().isLength({min: 8}),
    ]
}
