import express from 'express';
const router = express.Router();
import uploadFile from "./../helper/fileUpload";
import {auth} from '../middleware'
import { fileController } from '../controller';
import canAccessFile from "./../middleware/checkPermission";

/**
 * 
 */
router.get('/file-list', auth.verifyToken, fileController.fileListing);
/**
 * 
 */
router.post('/file-upload', auth.verifyToken, uploadFile.single('file'), fileController.fileUpload)
/**
 * 
 */
router.get('/download/:fileName', auth.verifyToken, canAccessFile, fileController.fileDownload);

module.exports = router