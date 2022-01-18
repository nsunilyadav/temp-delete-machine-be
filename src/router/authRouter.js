import express from 'express';
const router =  express.Router();
import {userValidRule, valid} from '../validation';
import {authController} from '../controller';

/**
 * 
 */
router.post('/signup', userValidRule.userValidRule(), valid.validate, authController.addUser);
/**
 * 
 */
router.post('/login', authController.userLogin)

module.exports = router