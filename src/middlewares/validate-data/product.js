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

            body("description")
                .isLength({ min: 2, max: 1000 }).withMessage(message.stringLengthInRange({ min: 2, max: 1000 })),

            body('categoryId')
                .notEmpty().withMessage(message.required("categoryId"))
                .isMongoId().withMessage(message.invalid("categoryId")),

            body("price")
                .notEmpty().withMessage(message.required("price"))
                .isNumeric().withMessage(message.invalid("price"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("price", 0)),


            // body("colourVariant")
            //     .notEmpty().withMessage(message.required("colourVariant"))
            //     .custom((value, { req }) => {
            //         const colourVariant = JSON.parse(value);
            //         const sizeMetrics = colourVariant.sizeMetrics;
            //         const size = sizeMetrics.map(item => item.size);
            //         return size.indexOf(value) === size.lastIndexOf(value) && value >= 36 && value <= 43;
            //     }).withMessage(message.mustBeOneOf({ field: "size", values: [36, 37, 38, 39, 40, 41, 42, 43] })),


            // colourVariant là 1 object đang được truyền vào dưới bằng form-data. T muốn validate các trường bên trong nó như sau
            // - size là 1 số nguyên từ 36 đến 43 và không được trùng lặp
            // - quantity là 1 số nguyên lớn hơn 0
            // - hex là 1 mã màu hex hợp lệ
            // bắt đầu làm đi
            body("colourVariant")
                .notEmpty().withMessage(message.required("colourVariant"))
                .custom((value) => {
                    let colourVariant;
                    try {
                        colourVariant = JSON.parse(value);
                    } catch (e) {
                        throw new Error('Invalid JSON');
                    }

                    const { sizeMetrics, hex } = colourVariant;

                    if (!Array.isArray(sizeMetrics) || sizeMetrics.length === 0) {
                        throw new Error(message.required('sizeMetrics'));
                    }

                    const sizes = sizeMetrics.map(item => item.size);
                    const uniqueSizes = new Set(sizes);

                    const allSizesInRange = sizes.every(size => size >= 36 && size <= 43);
                    const allSizesUnique = sizes.length === uniqueSizes.size;
                    const allQuantitiesValid = sizeMetrics.every(item => item.quantity > 0);

                    if (!allSizesInRange) {
                        throw new Error(message.mustBeOneOf({ field: 'size', values: [36, 37, 38, 39, 40, 41, 42, 43] }));
                    }
                    
                    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
                        throw new Error(message.isHexColor('hex'));
                    }

                    if (!allSizesUnique) {
                        throw new Error('Sizes must be unique');
                    }

                    if (!allQuantitiesValid) {
                        throw new Error(message.mustBeNumberAndGreaterThan({field: 'quantity', value: 0 }));
                    }

                    return true;
                }),
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

            query("minPrice")
                .optional()
                .isNumeric().withMessage(message.invalid("minPrice"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("minPrice", 0)),

            query("maxPrice")
                .optional()
                .isNumeric().withMessage(message.invalid("maxPrice"))
                .custom(value => value > 0).withMessage(message.mustBeNumberAndGreaterThan("maxPrice", 0)),

            query("minPrice")
                .optional()
                .custom((value, { req }) => {
                    if (req.query.maxPrice && value > req.query.maxPrice) {
                        throw new Error('minPriceMustBeLessThanMaxPrice');
                    }
                    return true;
                }),

            query("priceSort")
                .optional()
                .isIn([sortOptions.ASC, sortOptions.DESC]).withMessage(message.mustBeOneOf({ field: "priceSort", values: [sortOptions.ASC, sortOptions.DESC] })),
        ]),
};