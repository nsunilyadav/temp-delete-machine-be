import { check } from "express-validator";
import { userModel } from "../models";

export const userValidRule = () => {
    return [
        check('fullName').isAlpha('en-US', {ignore: ' '}).withMessage('Full name should be alpha char!'),
        check('email').isEmail().withMessage('Email should be email type')
        .custom(value => {
            return userModel.findOne({email: value}).then(data => {
                if (data) {
                    return Promise.reject('Email is already exist');
                }
            }) 
        }),
        check('password').isLength({min: 8}).withMessage('Please enter at least 8 char password')
    ]
};