import {userModel, filePermissionModel} from '../models';
import { successHandler, errorHandler } from '../helper/responseHandler';
import {allConstants} from '../constant';


export const userListing = async (req, res) => {
    try {
        const {_id} = req.userData 
        const result = await userModel.find({_id: {$ne: _id}}).select('-password');
        if (!result){
          return errorHandler(res, 404, allConstants.NOT_FOUND_RECORD);
        };
        return successHandler(res, 200, allConstants.FOUND_USER_LIST, result );
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, allConstants.ERR_MSG);
    };
};

export const userTruncate = async (req, res) => {
  try {
    await userModel.remove({});
    return successHandler(res, 200, allConstants.RECORD_TRUNCATED);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, allConstants.ERR_MSG);
  };
};

export const givePermission = async (req, res) => {
  try {
    const {_id} = req.userData;
    await filePermissionModel.findOneAndUpdate({userId: _id}, {userId: _id, allowedUser: req.body.userIds}, {new: true, upsert: true });
    return successHandler(res, 200, allConstants.PERMISSION_CHNG_SUCCESS);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, allConstants.ERR_MSG);
  }
};

export const seePermissionListing = async (req, res) => {
  try {
    const {_id} = req.userData
    const result = await filePermissionModel.find({userId: _id})
    return successHandler(res, 200, allConstants.PERMISSION_LIST_SUCCESS, result);
  } catch (error) {
   console.log(error);
   return errorHandler(res, 404, allConstants.NOT_FOUND_RECORD);
  };
};