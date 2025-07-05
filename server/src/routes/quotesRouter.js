const express = require('express');
const router = express.Router();
const quotesController = require('../controllers/quotesController');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const {
  getQuotesValidators,
  postQuoteValidators,
  getRandomQuotesValidators,
  deleteSingleQuoteValidators,
  getSingleQuoteValidators,
  patchSingleQuoteValidators,
} = require('../middlewares/quoteValidators');

// Route to get multiple quotes
router.get(
  '/',
  getQuotesValidators,
  validationErrorHandler,
  quotesController.getQuotes
);

// Route to create a new quote
router.post(
  '/',
  postQuoteValidators,
  validationErrorHandler,
  quotesController.postQuote
);

// Route to get several random quotes
router.get(
  '/random',
  getRandomQuotesValidators,
  validationErrorHandler,
  quotesController.getRandomQuotes
);

// Route to get a specific quote by ID
router.get(
  '/:id',
  getSingleQuoteValidators,
  validationErrorHandler,
  quotesController.getQuoteById
);

// Route to delete specific quote by ID
router.delete(
  '/:id',
  deleteSingleQuoteValidators,
  validationErrorHandler,
  quotesController.deleteQuoteById
);

// Route to modify specific quote by ID
router.patch(
  '/:id',
  patchSingleQuoteValidators,
  validationErrorHandler,
  quotesController.patchQuoteById
);

module.exports = router;
