const { Op } = require('sequelize');
const Category = require('../models/Category');

const attributes = { exclude: ['createdAt', 'updatedAt'] };

const findCategories = async ({ limit, offset, name }) => {
  const whereClause = {};
  if (name) whereClause.name = { [Op.iLike]: `%${name}%` };

  const categories = await Category.findAll({
    attributes,
    limit,
    offset,
    order: [['id', 'ASC']],
    where: whereClause,
  });
  return categories;
};

const findSingleCategory = async (id) =>
  await Category.findByPk(id, {
    attributes,
  });

module.exports = { findCategories, findSingleCategory };
