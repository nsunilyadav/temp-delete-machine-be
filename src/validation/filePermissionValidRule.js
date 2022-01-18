import { body } from "express-validator"

export const filePermissionValidRule = () => {
    return [
        body('allowedUser')
    ]
};