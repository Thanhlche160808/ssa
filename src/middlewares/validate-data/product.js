// ** Libs
import { body, query, param } from "express-validator";

// ** Validate
import { validate } from "./validation-request.js";

// ** Helpers
import { message } from "../../utils/message.js";

// ** Constants
import { sortOptions } from "../../constants/query.constant.js";

export const productValidation = {
    body: () =>
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

            body("images")
                .isArray().withMessage(message.mustBeArray("images"))
                .notEmpty().withMessage(message.required("images"))
                .custom(value => value.every(url => url.match(/(http(s?):)([/|.|\w|\s|-]|[%])+(\.(jpg|gif|png))(?:\?.*)?$/i))).withMessage(message.invalid("images")),

            body("description")
                .isLength({ min: 2, max: 1000 }).withMessage(message.stringLengthInRange({ min: 2, max: 1000 })),

            body('categoryId')
                .notEmpty().withMessage(message.required("categoryId"))
                .isMongoId().withMessage(message.invalid("categoryId")),

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

    query: () =>
        validate([
            query("page")
                .optional()
                .isNumeric().withMessage(message.invalid("page"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("page", 0)),

            query("size")
                .optional()
                .isNumeric().withMessage(message.invalid("size"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("size", 0)),
            
            query("color")
                .optional()
                .isHexColor().withMessage(message.isHexColor("color")),
            
            query("minPrice")
                .optional()
                .isNumeric().withMessage(message.invalid("minPrice"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("minPrice", 0)),
            
            query("maxPrice")
                .optional()
                .isNumeric().withMessage(message.invalid("maxPrice"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("maxPrice", 0)),

            query("priceSort")
                .optional()
                .isIn([sortOptions.ASC, sortOptions.DESC]).withMessage(message.mustBeOneOf({ field: "priceSort", values: [sortOptions.ASC, sortOptions.DESC] })),
        ]),
};