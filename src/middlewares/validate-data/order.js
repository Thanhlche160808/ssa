// ** Libs
import { body } from "express-validator";

// ** Validate
import { validate } from "./validation-request.js";

// ** Helpers
import { message } from "../../utils/message.js";

export const orderValidation = {
    create: () => 
        validate([
            body("receiverName")
                .trim()
                .notEmpty().withMessage(message.required("receiverName")),

            body("receiverPhone")
                .trim()
                .notEmpty().withMessage(message.required("receiverPhone"))
                .isMobilePhone('vi-VN').withMessage(message.invalid("receiverPhone")),

            body("email")
                .trim()
                .notEmpty().withMessage(message.required("email"))
                .isEmail().withMessage(message.invalid("email")),

            body("deliveryAddress")
                .notEmpty().withMessage(message.required("deliveryAddress"))
                .isObject().withMessage(message.invalid("deliveryAddress"))
                .custom(value => value.address).withMessage(message.required("address"))
                .custom(value => value.city).withMessage(message.required("city"))
                .custom(value => value.district).withMessage(message.required("district"))
                .custom(value => value.ward).withMessage(message.required("ward")),

            // body("paymentMethod")
            //     .notEmpty().withMessage(message.required("paymentMethod"))
            //     .isIn(['COD', 'VNPAY']).withMessage(message.mustBeOneOf({ field: "paymentMethod", values: ['COD', 'VNPAY'] })),

            body("shippingFee")
                .notEmpty().withMessage(message.required("shippingFee"))
                .isNumeric().withMessage(message.invalid("shippingFee"))
                .custom(value => value >= 0).withMessage(message.mustBeNumberAndGreaterThan("shippingFee", 0)),

            body("totalPrice")
                .notEmpty().withMessage(message.required("totalPrice"))
                .isNumeric().withMessage(message.invalid("totalPrice"))
                .custom(value => value >= 0).withMessage(message.mustBeNumberAndGreaterThan("totalPrice", 0))
        ])
};