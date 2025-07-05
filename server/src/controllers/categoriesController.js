const {
  findCategories,
  findSingleCategory,
} = require('../services/categoriesService');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const getCategories = asyncErrorHandler(async (req, res) => {
  const { limit = 10, offset = 0, name } = req.query;
  const categories = await findCategories({ limit, offset, name });
  res.json(categories);
});

const getCategoryById = asyncErrorHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await findSingleCategory(categoryId);
  if (category) {
    res.json(category);
  } else {
    const error = { message: `Category with ID ${categoryId} not found` };
    res.status(404).json(error);
  }
});

module.exports = { getCategories, getCategoryById };
