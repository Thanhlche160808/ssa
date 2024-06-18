// ** Libs
import { body } from "express-validator";

// ** Validate
import { validate } from "./validation-request.js";

// ** Helpers
import { message } from "../../utils/message.js";

export const authValidation = {
    register: () =>
        validate([
            body("username")
                .trim()
                .notEmpty().withMessage(message.required("username"))
                .isLength({ min: 6, max: 20 }).withMessage(message.stringLengthInRange({ min: 6, max: 20 })),

            body("email")
                .trim()
                .notEmpty().withMessage(message.required("email"))
                .isEmail().withMessage(message.invalid("email")),

            // validate tối thiểu 8 kí tự, ít nhất 1 chữ hoa 1 chữ thường
            body("password")
                .notEmpty().withMessage(message.required("password"))
                .isLength({ min: 6, max: 30 }).withMessage(message.stringLengthInRange({ min: 6, max: 30 }))
                .matches(/^(?=.*[A-Z])(?=.*[0-9])/).withMessage('Your password should contain at least one uppercase letter and one number'),

            body("firstName")
                .notEmpty().withMessage(message.required("firstName"))
                .isLength({ min: 2, max: 15 }).withMessage(message.stringLengthInRange({ min: 2, max: 15 })),

            body("lastName")
                .notEmpty().withMessage(message.required("lastName"))
                .isLength({ min: 2, max: 15 }).withMessage(message.stringLengthInRange({ min: 2, max: 15 })),
        ]),

    login: () =>
        validate([
            body("username")
                .notEmpty()
                .withMessage(message.required("username")),
            body("password")
                .notEmpty()
                .withMessage(message.required("password"))
                .isLength({ min: 6, max: 30 })
                .withMessage(message.stringLengthInRange({ min: 6, max: 30 })),
        ]),

    // changePassword: () =>
    //     validate([
    //         body("currentPassword")
    //             .notEmpty()
    //             .withMessage(message.required("currentPassword")),
    //         body("newPassword")
    //             .notEmpty()
    //             .withMessage(message.required("newPassword"))
    //             .isLength({ min: 6, max: 30 })
    //             .withMessage(message.stringLengthInRange({ min: 6, max: 30 })),
    //     ]),
};