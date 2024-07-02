// ** Libs
import { body } from "express-validator";

// ** Validate
import { validate } from "./validation-request.js";

// ** Helpers
import { message } from "../../utils/message.js";

export const cartValidation = {
    add: () =>
        validate([
            body("productCode")
                .trim()
                .notEmpty().withMessage(message.required("productCode")),

            body("size")
                .notEmpty().withMessage(message.required("size"))
                .isNumeric().withMessage(message.invalid("size"))
                .custom(value => value >= 36 && value <= 43).withMessage(message.mustBeOneOf({ field: "size", values: [36, 37, 38, 39, 40, 41, 42, 43] })),

            body("quantity")
                .notEmpty().withMessage(message.required("quantity"))
                .isNumeric().withMessage(message.invalid("quantity"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("quantity", 0)),
        ]),

    remove: () =>
        validate([
            body("productCode")
                .trim()
                .notEmpty().withMessage(message.required("productCode")),

            body("oldSize")
                .notEmpty().withMessage(message.required("oldSize"))
                .isNumeric().withMessage(message.invalid("oldSize"))
                .custom(value => value >= 36 && value <= 43).withMessage(message.mustBeOneOf({ field: "oldSize", values: [36, 37, 38, 39, 40, 41, 42, 43] })),

            body("newSize")
                .notEmpty().withMessage(message.required("newSize"))
                .isNumeric().withMessage(message.invalid("newSize"))
                .custom(value => value >= 36 && value <= 43).withMessage(message.mustBeOneOf({ field: "newSize", values: [36, 37, 38, 39, 40, 41, 42, 43] })),

            body("oldQuantity")
                .notEmpty().withMessage(message.required("oldQuantity"))
                .isNumeric().withMessage(message.invalid("oldQuantity"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("oldQuantity", 0)),

            body("newQuantity")
                .notEmpty().withMessage(message.required("newQuantity"))
                .isNumeric().withMessage(message.invalid("newQuantity"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("newQuantity", 0)),
        ]),

    update: () =>
        validate([
            body("productCode")
                .trim()
                .notEmpty().withMessage(message.required("productCode")),

            body("oldSize")
                .notEmpty().withMessage(message.required("oldSize"))
                .isNumeric().withMessage(message.invalid("oldSize"))
                .custom(value => value >= 36 && value <= 43).withMessage(message.mustBeOneOf({ field: "oldSize", values: [36, 37, 38, 39, 40, 41, 42, 43] })),

            body("newSize")
                .notEmpty().withMessage(message.required("newSize"))
                .isNumeric().withMessage(message.invalid("newSize"))
                .custom(value => value >= 36 && value <= 43).withMessage(message.mustBeOneOf({ field: "newSize", values: [36, 37, 38, 39, 40, 41, 42, 43] })),

            body("oldQuantity")
                .notEmpty().withMessage(message.required("oldQuantity"))
                .isNumeric().withMessage(message.invalid("oldQuantity"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("newQuantity", 0)),

            body("newQuantity")
                .notEmpty().withMessage(message.required("newQuantity"))
                .isNumeric().withMessage(message.invalid("newQuantity"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("newQuantity", 0)),

        ]),
};