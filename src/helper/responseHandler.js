/**
 * 
 * @param {*} res 
 * @param {*} statusCode 
 * @param {*} message 
 * @param {*} result 
 */
export const successHandler = (res, statusCode, message, result) => {
    res.status(statusCode).json({message, result});
};

/**
 * 
 * @param {*} res 
 * @param {*} statusCode 
 * @param {*} message 
 * @param {*} error 
 */
export const errorHandler = (res, statusCode, message, error) => {
    res.status(statusCode).json({message, error});
};