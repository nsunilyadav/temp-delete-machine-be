import { fileModel, filePermissionModel } from "../models"
import { errorHandler } from "../helper/responseHandler";
import { allConstants } from "../constant";

const  canAccessFile = async (req, res, next) =>{
    try {
        const {fileName} = req.params;
        const fileDetails = await fileModel.findOne({name: fileName}); 
        if(!fileDetails) {
            return errorHandler(res, 404, allConstants.FILE_NOT_FOUND)
        }
        const permissionDetails = await filePermissionModel.findOne({userId: fileDetails.userId, allowedUser: req.userData._id}); 
        if(fileDetails.userId == req.userData._id || permissionDetails) {
            next();
            return false;
        }
        return errorHandler(res, 403, allConstants.DONT_ACCESS_FOR_FILE)
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG)
    }
}
export default canAccessFile;