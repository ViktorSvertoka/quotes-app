const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const {
  getCategoriesValidators,
  getSingleCategoryValidators,
} = require('../middlewares/categoryValidators');

// Route to get multiple categories
router.get(
  '/',
  getCategoriesValidators,
  validationErrorHandler,
  categoriesController.getCategories
);

// Route to get a specific category by ID
router.get(
  '/:id',
  getSingleCategoryValidators,
  validationErrorHandler,
  categoriesController.getCategoryById
);

module.exports = router;
