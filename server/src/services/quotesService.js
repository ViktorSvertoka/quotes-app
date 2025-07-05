const { Op } = require('sequelize');
const sequelize = require('../config/db');
const Quote = require('../models/Quote');
const Category = require('../models/Category');

const attributes = { exclude: ['createdAt', 'updatedAt'] };
const includeCategoryConfig = {
  model: Category,
  attributes: ['name'],
  through: { attributes: [] },
};

const findQuotes = async ({ limit, offset, author, text, category }) => {
  const whereClause = {};
  if (author) whereClause.author = { [Op.iLike]: `%${author}%` };
  if (text) whereClause.text = { [Op.iLike]: `%${text}%` };

  const quotes = await Quote.findAll({
    attributes,
    limit,
    offset,
    order: [['id', 'ASC']],
    include: {
      ...includeCategoryConfig,
      where: category ? { name: category } : {},
    },
    where: whereClause,
  });

  // TODO: Try to find the way to filter by category name and find
  // names of all categories for the quote in one DB request
  if (!category) {
    return quotes;
  } else {
    const quotesIds = quotes.map((quote) => quote.id);
    const quotesByIds = await Quote.findAll({
      attributes,
      order: [['id', 'ASC']],
      include: includeCategoryConfig,
      where: { id: quotesIds },
    });
    return quotesByIds;
  }
};

const findRandomQuotes = async (limit) =>
  await Quote.findAll({
    attributes,
    limit,
    order: sequelize.random(),
    include: includeCategoryConfig,
  });

const findSingleQuote = async (id) =>
  await Quote.findByPk(id, {
    attributes,
    include: includeCategoryConfig,
  });

const deleteSingleQuote = async (id) => {
  const count = await Quote.destroy({ where: { id } });
  if (count) return id;
};

const findOrCreateCategories = async (categoryNames, transaction) =>
  await Promise.all(
    categoryNames.map((name) =>
      Category.findOrCreate({
        where: { name },
        transaction,
      }).then(([category]) => category)
    )
  );

const createQuote = async ({ text, author, categories }) => {
  const createdQuoteId = await sequelize.transaction(async (t) => {
    const quote = await Quote.create({ text, author }, { transaction: t });
    const categoryInstances = await findOrCreateCategories(categories, t);
    await quote.setCategories(categoryInstances, { transaction: t });

    return quote.id;
  });

  return await findSingleQuote(createdQuoteId);
};

const modifySingleQuote = async (id, { text, author, categories }) => {
  const modifiedQuoteId = await sequelize.transaction(async (t) => {
    const quote = await Quote.findByPk(id, { transaction: t });

    if (!quote) {
      return null;
    }

    if (text) quote.text = text;
    if (author) quote.author = author;

    await quote.save({ transaction: t });

    if (categories) {
      const categoryInstances = await findOrCreateCategories(categories, t);
      await quote.setCategories(categoryInstances, { transaction: t });
    }

    return quote.id;
  });

  return await findSingleQuote(modifiedQuoteId);
};

module.exports = {
  findQuotes,
  findRandomQuotes,
  findSingleQuote,
  createQuote,
  deleteSingleQuote,
  modifySingleQuote,
};
