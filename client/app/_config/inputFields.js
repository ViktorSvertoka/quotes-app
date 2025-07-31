// For new quote page form and edit existing quote page form
export const createQuoteInputFields = ({
  values,
  setValues,
  validationErrors,
}) => {
  const setValuesHanlder = (name, value) =>
    setValues({ ...values, [name]: value });

  return [
    {
      name: 'text',
      placeholder: 'Quote text',
      value: values.text,
      error: validationErrors.text,
      onChange: (e) => setValuesHanlder('text', e.target.value),
    },
    {
      name: 'author',
      placeholder: 'Author',
      value: values.author,
      error: validationErrors.author,
      onChange: (e) => setValuesHanlder('author', e.target.value),
    },
    {
      name: 'categories',
      placeholder: 'Categories (comma-separated)',
      value: values.categories,
      error: validationErrors.categories,
      onChange: (e) => setValuesHanlder('categories', e.target.value),
    },
  ];
};

// For search page form
export const createSearchInputFields = ({ searchValues, validationErrors }) => [
  {
    name: 'text',
    placeholder: 'Search by text',
    value: searchValues.text,
    error: validationErrors.text,
  },
  {
    name: 'author',
    placeholder: 'Search by author',
    value: searchValues.author,
    error: validationErrors.author,
  },
  {
    name: 'category',
    placeholder: 'Search by category',
    value: searchValues.category,
    error: validationErrors.category,
  },
  {
    name: 'limit',
    placeholder: 'Limit',
    value: searchValues.limit || '',
    error: null,
  }, // no error for limit
];
