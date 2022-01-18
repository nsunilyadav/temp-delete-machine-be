import { errorHandler } from '../helper/responseHandler';
import jwt from 'jsonwebtoken';
import {allConstants} from '../constant';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const {data} = await jwt.verify(token, process.env.SECRET_KEY);
        req.userData = data
        next ()
    } catch (error) {
        console.log(error)
        return errorHandler(res, 404, allConstants.INVALID_TOKEN)
    };
};

