// ** Libs
import { body, query, param } from "express-validator";

// ** Validate
import { validate } from "./validation-request.js";

// ** Helpers
import { message } from "../../utils/message.js";

export const productValidation = {
    create: () =>
        validate([
            body("productName")
                .trim()
                .notEmpty().withMessage(message.required("productName"))
                .matches(/^[a-zA-Z0-9 ]+$/).withMessage(message.specialCharacter("productName"))
                .isLength({ min: 2, max: 40 }).withMessage(message.stringLengthInRange({ min: 2, max: 40 })),

            body("type")
                .trim()
                .notEmpty().withMessage(message.required("type"))
                .isLength({ min: 2, max: 20 }).withMessage(message.stringLengthInRange({ min: 2, max: 20 })),

            body("description")
                .isLength({ min: 2, max: 1000 }).withMessage(message.stringLengthInRange({ min: 2, max: 1000 })),

            body("thumbnail")
                .notEmpty().withMessage(message.required("thumbnail")),

            body("price")
                .notEmpty().withMessage(message.required("price"))
                .isNumeric().withMessage(message.invalid("price"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("price", 0)),

            body("colourVariant.colourName")
                .notEmpty().withMessage(message.required("colourName"))
                .isLength({ min: 2, max: 20 }).withMessage(message.stringLengthInRange({ min: 2, max: 20 })),

            body("colourVariant.hex")
                .isHexColor().withMessage(message.invalid("hex"))
                .notEmpty().withMessage(message.required("hex")),

            body("colourVariant.sizeMetrics.*.size")
                .notEmpty().withMessage(message.required("size"))
                .isNumeric().withMessage(message.invalid("size"))
                .custom(value => value >= 36 && value <= 43).withMessage(message.mustBeOneOf({ field: "size", values: [36, 37, 38, 39, 40, 41, 42, 43] })),

            body("colourVariant.sizeMetrics.*.quantity")
                .notEmpty().withMessage(message.required("quantity"))
                .isNumeric().withMessage(message.invalid("quantity"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("quantity", 0)),
        ]),

    listProducts: () =>
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

    updateProduct: () =>
        validate([
            body("productName")
                .trim()
                .matches(/^[a-zA-Z0-9 ]+$/).withMessage(message.specialCharacter("productName"))
                .isLength({ min: 2, max: 40 }).withMessage(message.stringLengthInRange({ min: 2, max: 40 })),

            body("type")
                .trim()
                .isLength({ min: 2, max: 20 }).withMessage(message.stringLengthInRange({ min: 2, max: 20 })),

            body("description")
                .isLength({ min: 2, max: 1000 }).withMessage(message.stringLengthInRange({ min: 2, max: 1000 })),

            body("price")
                .isNumeric().withMessage(message.invalid("price"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("price", 0)),

            body("colourVariant.colourName")
                .isLength({ min: 2, max: 20 }).withMessage(message.stringLengthInRange({ min: 2, max: 20 })),

            body("colourVariant.hex")
                .isHexColor().withMessage(message.invalid("hex")),

            body("colourVariant.sizeMetrics.*.size")
                .notEmpty().withMessage(message.required("size"))
                .isNumeric().withMessage(message.invalid("size"))
                .custom(value => value >= 36 && value <= 43).withMessage(message.mustBeOneOf({ field: "size", values: [36, 37, 38, 39, 40, 41, 42, 43] })),

            body("colourVariant.sizeMetrics.*.quantity")
                .isNumeric().withMessage(message.invalid("quantity"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("quantity", 0)),
        ])
};