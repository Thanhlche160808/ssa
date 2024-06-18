// ** Libs
import { body, query, param } from "express-validator";

// ** Validate
import { validate } from "./validation-request.js";

// ** Helpers
import { message } from "../../utils/message.js";

export const categoryValidation = {
    create: () => 
        validate([
            // k được chứa kí tu dac biet
            body("name")
            .trim()
            .notEmpty().withMessage(message.required("name"))
            .matches(/^[a-zA-Z0-9 ]+$/).withMessage(message.specialCharacter("name"))
            .isLength({ min: 2, max: 40 }).withMessage(message.stringLengthInRange({ min: 2, max: 40 })),

            body("description")
            .isLength({ min: 2, max: 1000 }).withMessage(message.stringLengthInRange({ min: 2, max: 1000 })),

            body("isHide")
            .isBoolean().withMessage(message.invalid("isHide")),
        ]),
    
    update: () =>
        validate([
            body("name")
            .trim()
            .matches(/^[a-zA-Z0-9 ]+$/).withMessage(message.specialCharacter("name"))
            .isLength({ min: 2, max: 40 }).withMessage(message.stringLengthInRange({ min: 2, max: 40 })),

            body("description")
            .isLength({ min: 2, max: 1000 }).withMessage(message.stringLengthInRange({ min: 2, max: 1000 })),

            body("isHide")
            .isBoolean().withMessage(message.invalid("isHide")),
        ]),
    
    list: () =>
        validate([
            query("page")
            .notEmpty().withMessage(message.required("page"))
            .isNumeric().withMessage(message.invalid("page"))
            .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("page", 0)),

            query("size")
            .notEmpty().withMessage(message.required("size"))
            .isNumeric().withMessage(message.invalid("size"))
            .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("size", 0)),
        ]),
};