import {
  isQuoteFormValid,
  getSearchInputValidationMessage,
} from '@utils/validation';

describe('Tests for the isQuoteFormValid function', () => {
  let setValidationErrors;

  beforeEach(() => {
    setValidationErrors = jest.fn();
  });

  it('validates valid input and returns true', () => {
    const values = {
      text: 'This is a valid quote text.',
      author: 'Author Name',
      categories: 'category1, category2',
    };

    const isValid = isQuoteFormValid({ values, setValidationErrors });

    expect(isValid).toBe(true);
    expect(setValidationErrors).toHaveBeenCalledWith({});
  });

  it('returns false if text is too short', () => {
    const values = {
      text: 'Short',
      author: 'Author Name',
      categories: 'category1',
    };

    const isValid = isQuoteFormValid({ values, setValidationErrors });

    expect(isValid).toBe(false);
    expect(setValidationErrors).toHaveBeenCalledWith({
      text: 'Text must be at least 10 characters long.',
    });
  });

  it('returns false if author length is invalid', () => {
    const values = {
      text: 'This is a valid quote text.',
      author: 'A',
      categories: 'category1',
    };

    const isValid = isQuoteFormValid({ values, setValidationErrors });

    expect(isValid).toBe(false);
    expect(setValidationErrors).toHaveBeenCalledWith({
      author: 'Author must be between 2 and 255 characters long.',
    });
  });

  it('returns false if no categories are provided', () => {
    const values = {
      text: 'This is a valid quote text.',
      author: 'Author Name',
      categories: '',
    };

    const isValid = isQuoteFormValid({ values, setValidationErrors });

    expect(isValid).toBe(false);
    expect(setValidationErrors).toHaveBeenCalledWith({
      categories: 'There must be at least one category.',
    });
  });

  it('returns false if categories contain invalid names', () => {
    const values = {
      text: 'This is a valid quote text.',
      author: 'Author Name',
      categories: 'invalid-category@, category2',
    };

    const isValid = isQuoteFormValid({ values, setValidationErrors });

    expect(isValid).toBe(false);
    expect(setValidationErrors).toHaveBeenCalledWith({
      categories:
        'Invalid categories: invalid-category@. Category names can only contain lowercase letters, numbers, and dashes.',
    });
  });

  it('returns false if text, author, and categories are invalid', () => {
    const values = {
      text: 'Short', // Invalid: less than 10 characters
      author: 'A', // Invalid: less than 2 characters
      categories: '', // Invalid: empty category name
    };

    const isValid = isQuoteFormValid({ values, setValidationErrors });

    expect(isValid).toBe(false);
    expect(setValidationErrors).toHaveBeenCalledWith({
      text: 'Text must be at least 10 characters long.',
      author: 'Author must be between 2 and 255 characters long.',
      categories: 'There must be at least one category.',
    });
  });
});

describe('Tests for the getSearchInputValidationMessage function', () => {
  it('returns error message for text less than 3 characters', () => {
    const result = getSearchInputValidationMessage('text', 'ab');
    expect(result).toBe('Text must be at least 3 characters long.');
  });

  it('returns no message for valid text length', () => {
    const result = getSearchInputValidationMessage('text', 'abc');
    expect(result).toBeUndefined();
  });

  it('returns error message for author less than 2 characters', () => {
    const result = getSearchInputValidationMessage('author', 'A');
    expect(result).toBe('Author must be at least 2 characters long.');
  });

  it('returns no message for valid author length', () => {
    const result = getSearchInputValidationMessage('author', 'AB');
    expect(result).toBeUndefined();
  });

  it('returns error message for invalid category', () => {
    const result = getSearchInputValidationMessage(
      'category',
      'invalid-category@'
    );
    expect(result).toBe(
      'Category can only contain lowercase letters, numbers, and dashes.'
    );
  });

  it('returns no message for valid category', () => {
    const result = getSearchInputValidationMessage(
      'category',
      'valid-category'
    );
    expect(result).toBeUndefined();
  });
});
