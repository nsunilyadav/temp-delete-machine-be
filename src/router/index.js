const express = require('express');
const router = express.Router();

/**
 * 
 */
router.use('/user', require('./userRouter'));
/**
 * 
 */
router.use('/auth', require('./authRouter'));
/**
 * 
 */
router.use('/file', require('./fileRouter'))


module.exports = router