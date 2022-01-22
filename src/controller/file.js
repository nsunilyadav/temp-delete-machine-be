import { fileModel, filePermissionModel} from "../models";
import { successHandler, errorHandler } from "../helper/responseHandler";
import { allConstants } from "../constant";

export const fileListing = async (req, res) => {
    try {
        const {_id} = req.userData;
    let allUser = await filePermissionModel.find({
      allowedUser: {
        $in: [_id]
      }
    });
    let ids = [_id];
    for (const user of allUser) {
        ids.push(user.userId);
    }
    const fileResult = await fileModel.find({userId: {$in: `${ids}`}});
        successHandler(res, 200, allConstants.UPLOAD_FILE_RECORD_FOUND, fileResult);
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG);
    };
};

export const fileUpload = async (req, res) => {
  try {
        const fileName = req.file.filename;
        await fileModel.create({name: fileName, userId: req.userData._id});
        successHandler(res, 201, allConstants.FILE_UPLOAD_SUCCESS_MSG)
    } catch (error) {
        console.log(error);
        return errorHandler(res, 500, allConstants.ERR_MSG);
    };
};

export const fileDownload = async (req, res) => {
    try {
        const file = req.params.fileName
        if (!file){
            return errorHandler(res, 404, allConstants.FILE_DOES_NOT_EXIST);
        }else{
            return res.download(`./uploads/${file}`);
        }
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG);
    };
};