// ** Libs
import { body } from "express-validator";

// ** Validate
import { validate } from "./validation-request.js";

// ** Helpers
import { message } from "../../utils/message.js";

export const accountValidation = {
    assign: () =>
        validate([
            body("username")
                .trim()
                .notEmpty().withMessage(message.required("username"))
                .isLength({ min: 6, max: 20 }).withMessage(message.stringLengthInRange({ min: 6, max: 20 })),

            body("email")
                .trim()
                .notEmpty().withMessage(message.required("email"))
                .isEmail().withMessage(message.invalid("email")),

            body("role")
                .trim()
                .notEmpty().withMessage(message.required("role"))
                .custom((value) => { // Custom validator for role
                    const allowedRoles = ["User", "Admin", "Warehouse Staff", "Marketing Staff", "Shop Owner"];
                    if (!allowedRoles.includes(value)) {
                        throw new Error(message.invalid("role")); // Use a specific error message
                    }
                    return value;
                }),

            // validate tối thiểu 8 kí tự, ít nhất 1 chữ hoa 1 chữ thường
            body("password")
                .notEmpty().withMessage(message.required("password"))
                .isLength({ min: 6, max: 30 }).withMessage(message.stringLengthInRange({ min: 6, max: 30 }))
                .matches(/^(?=.*[A-Z])(?=.*[0-9])/).withMessage('Your password should contain at least one uppercase letter and one number'),
        ]),

    editRole: () =>
        validate([
            body("role")
                .trim()
                .notEmpty().withMessage(message.required("role"))
                .custom((value) => { // Custom validator for role
                    const allowedRoles = ["User", "Admin", "Warehouse Staff", "Marketing Staff", "Shop Owner"];
                    if (!allowedRoles.includes(value)) {
                        throw new Error(message.invalid("role")); // Use a specific error message
                    }
                    return value;
                }),
        ]),
};