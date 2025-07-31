import { ALLOWED_SEARCH_PARAM_NAMES } from '@config/config';
import {
  createSearchQueryString,
  createSearchValuesFromQueryString,
} from '@utils/queryString';

describe('Tests for the createSearchQueryString function', () => {
  test('should return a valid query string with allowed params', () => {
    const queryParams = {
      text: 'life',
      author: 'Albert Einstein',
      category: 'inspiration',
      limit: 10,
      offset: 5,
    };
    const result = createSearchQueryString(queryParams);
    expect(result).toBe(
      'text=life&author=Albert+Einstein&category=inspiration&limit=10&offset=5'
    );
  });

  test('should filter out disallowed params', () => {
    const queryParams = {
      text: 'life',
      author: 'Albert Einstein',
      foo: 'bar', // This param is not allowed
    };
    const result = createSearchQueryString(queryParams);
    expect(result).toBe('text=life&author=Albert+Einstein');
  });

  test('should filter out empty string, undefined, and null values', () => {
    const queryParams = {
      text: '',
      author: undefined,
      category: null,
      limit: 10,
    };
    const result = createSearchQueryString(queryParams);
    expect(result).toBe('limit=10');
  });

  test('should return an empty string when no valid params are provided', () => {
    const queryParams = {
      foo: 'bar', // Disallowed param
      bar: 'baz', // Disallowed param
    };
    const result = createSearchQueryString(queryParams);
    expect(result).toBe('');
  });

  test('should keep 0 as param value and not omit it', () => {
    const queryParams = {
      author: 'Alice',
      limit: 50,
      offset: 0,
    };
    const result = createSearchQueryString(queryParams);
    expect(result).toBe('author=Alice&limit=50&offset=0');
  });
});

describe('Tests for the createSearchValuesFromQueryString function', () => {
  test('should correctly create an object with allowed params from searchParams', () => {
    // Mock searchParams object
    const mockSearchParams = {
      get: jest.fn((param) => {
        const params = {
          text: 'some text',
          author: 'John Doe',
          category: 'category1',
          limit: '10',
          offset: '20',
        };
        return params[param] || null;
      }),
    };

    const result = createSearchValuesFromQueryString(mockSearchParams);

    expect(result).toEqual({
      text: 'some text',
      author: 'John Doe',
      category: 'category1',
      limit: '10',
      offset: '20',
    });

    // Check that the get method was called for each allowed param name
    ALLOWED_SEARCH_PARAM_NAMES.forEach((param) => {
      expect(mockSearchParams.get).toHaveBeenCalledWith(param);
    });
  });

  test('should return empty strings for missing searchParams', () => {
    // Mock searchParams with only some params
    const mockSearchParams = {
      get: jest.fn((param) => {
        const params = {
          text: 'another text',
        };
        return params[param] || null;
      }),
    };

    const result = createSearchValuesFromQueryString(mockSearchParams);

    expect(result).toEqual({
      text: 'another text',
    });
  });

  test('should ignore unsupported params', () => {
    const mockSearchParams = {
      get: jest.fn((param) => {
        const params = {
          text: 'valid text',
          author: 'Jane Doe',
          unsupportedParam1: 'value1', // Unsupported param
          unsupportedParam2: 'value2', // Unsupported param
        };
        return params[param] || null;
      }),
    };

    const result = createSearchValuesFromQueryString(mockSearchParams);

    expect(result).toEqual({
      text: 'valid text',
      author: 'Jane Doe',
    });

    // Ensure only allowed param names are queried
    ALLOWED_SEARCH_PARAM_NAMES.forEach((param) => {
      expect(mockSearchParams.get).toHaveBeenCalledWith(param);
    });

    // Ensure unsupported params are ignored
    expect(mockSearchParams.get).not.toHaveBeenCalledWith('unsupportedParam1');
    expect(mockSearchParams.get).not.toHaveBeenCalledWith('unsupportedParam2');
  });
});
