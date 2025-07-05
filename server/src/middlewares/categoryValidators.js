const { query, param } = require('express-validator');

// Allows lowercase letters, numbers and dashes
const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/;
// Allows any letters, numbers and dashes
const CATEGORY_NAME_I_REGEX = /^[a-z0-9\-]+$/i;

const getCategoriesValidators = [
  query('limit').optional().trim().isInt({ min: 1, max: 50 }),
  query('offset').optional().trim().isInt({ min: 0 }),
  query('name')
    .optional()
    .trim()
    .escape()
    .custom((value) =>
      CATEGORY_NAME_I_REGEX.test(value)
        ? Promise.resolve()
        : Promise.reject('Category can only contain letters and dashes')
    ),
];

const getSingleCategoryValidators = [param('id').trim().isInt({ min: 1 })];

module.exports = {
  CATEGORY_NAME_REGEX,
  getCategoriesValidators,
  getSingleCategoryValidators,
};
