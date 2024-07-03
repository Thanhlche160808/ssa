// ** Libs
import { body, query } from "express-validator";

// ** Validate
import { validate } from "./validation-request.js";

// ** Helpers
import { message } from "../../utils/message.js";

// ** Constants
import { VOUCHER_STATUS } from "../../constants/model.constant.js";

export const voucherValidation = {
    body: () =>
        validate([
            body("title")
                .trim()
                .notEmpty().withMessage(message.required("title"))
                .isLength({ min: 6, max: 50 }).withMessage(message.stringLengthInRange({ min: 6, max: 50 })),

            body("description")
                .optional()
                .isLength({ min: 6, max: 1000 }).withMessage(message.stringLengthInRange({ min: 6, max: 1000 })),

            body("discount")
                .notEmpty().withMessage(message.required("discount"))
                .isNumeric().withMessage(message.invalid("discount")),

            body("minOrderPrice")
                .notEmpty().withMessage(message.required("minOrderPrice"))
                .isNumeric().withMessage(message.invalid("minOrderPrice")),

            body("maxDiscountValue")
                .notEmpty().withMessage(message.required("minOrderPrice"))
                .isNumeric().withMessage(message.invalid("maxDiscountValue")),

            body("expiredDate")
                .notEmpty().withMessage(message.required("expiredDate"))
                .isNumeric().withMessage(message.invalid("expiredDate")),

            body("isPublish")
                .optional()
                .isBoolean().withMessage(message.invalid("isPublish")),
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

            query("status")
                .optional()
                .isIn([VOUCHER_STATUS.AVAILABLE, VOUCHER_STATUS.EXPIRED]).withMessage(message.mustBeOneOf({ field: "status", values: [VOUCHER_STATUS.AVAILABLE, VOUCHER_STATUS.EXPIRED] })),
        ]),
};