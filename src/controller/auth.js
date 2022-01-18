import {userModel} from '../models';
import { successHandler, errorHandler } from '../helper/responseHandler';
import {allConstants} from '../constant';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const addUser = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, allConstants.ROUND);
        const user = await new userModel(req.body);
        await user.save();
        return successHandler(res, 201, allConstants.SIGNUP_SUCCESS_MSG);
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG);
    };
};

const generateToken = (user) => {
  return jwt.sign({data: user}, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

export const userLogin = async (req, res) => {
  try {
    const data = await userModel.findOne({email: req.body.email});
    if (!data){
      return errorHandler(res, 404, allConstants.EMAIL_NOT_FOUND);
    };
    const checkPassword = await bcrypt.compare(req.body.password, data.password);
    if (!checkPassword){
      return errorHandler(res, 400, allConstants.PASSWORD_DOES_NOT_MATCH);
    };
    return successHandler(res, 200, allConstants.LOGIN_SUCCESS_MSG, {
      token: generateToken(data),
      data
    });
  } catch (error) {
    return errorHandler(res, 500, allConstants.ERR_MSG);
  };
}; 

