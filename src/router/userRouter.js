const express = require('express');
const router = express.Router();

import { auth } from '../middleware';
import {userController} from '../controller'

/**
 * 
 */
router.get('/user-list', auth.verifyToken, userController.userListing);
/**
 * 
 */
router.post("/allow-permission", auth.verifyToken, userController.givePermission);
/**
 * 
 */
router.delete('/truncate', auth.verifyToken, userController.userTruncate);

module.exports = router