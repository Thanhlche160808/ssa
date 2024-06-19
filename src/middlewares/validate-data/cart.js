// ** Libs
import { body } from "express-validator";

// ** Validate
import { validate } from "./validation-request.js";

// ** Helpers
import { message } from "../../utils/message.js";

export const cartValidation = {
    add: () =>
        validate([
            body("code")
                .trim()
                .notEmpty().withMessage(message.required("code")),

            body("color")
                .trim()
                .isHexColor().withMessage(message.invalid("color"))
                .notEmpty().withMessage(message.required("color")),

            body("size")
                .notEmpty().withMessage(message.required("size"))
                .isNumeric().withMessage(message.invalid("size"))
                .custom(value => value >= 36 && value <= 43).withMessage(message.mustBeOneOf({ field: "size", values: [36, 37, 38, 39, 40, 41, 42, 43] })),

            body("quantity")
                .notEmpty().withMessage(message.required("quantity"))
                .isNumeric().withMessage(message.invalid("quantity"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("quantity", 0)),
        ])
};