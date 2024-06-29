import _ from "lodash";

export const message = {
  required: (field) => `${_.capitalize(field)} is required`,
  invalid: (field) => `${_.capitalize(field)} is invalid`,
  incorrect: (field) => `${_.capitalize(field)} is incorrect`,
  notFound: (field) => `${_.capitalize(field)} is not existed`,
  existed: (field) => `${_.capitalize(field)} is already exists`,
  new: (field) => `New ${_.capitalize(field)} must be different from old ${_.capitalize(field)}`,
  stringLengthInRange: ({ field, min, max }) =>
    `${_.capitalize(
      field
    )} must be greater or equal than ${min} and less or equal than ${max} characters`,
  mustBeOneOf: ({ field, values }) =>
    `${_.capitalize(field)} must be one of [${values}] and not duplicated`,
  mustBeNumberAndGreaterThanOrEqual: ({ field, value = 1 }) =>
    `${_.capitalize(field)} must be number and greater than or equal ${value}`,
  mustBeNumberAndGreaterThan: (field, value = 1) =>
    `${_.capitalize(field)} must be number and greater than ${value}`,
  exist: (field) => `${_.capitalize(field)} is already exists`,
  specialCharacter: (field) => `${_.capitalize(field)} must not contain special characters`,
  isHexColor: (field) => `${_.capitalize(field)} must be a valid hex color`,
  mustBeArray: (field) => `${_.capitalize(field)} must be an array`,
  mustBeLessThan: (field1, field2) => `${_.capitalize(field1)} must be less than ${_.capitalize(field2)}`,
};
