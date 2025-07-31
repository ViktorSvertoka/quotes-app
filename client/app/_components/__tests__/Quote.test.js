import { render } from '@testing-library/react';
import Quote from '@components/Quote'; // Adjust the import path as needed

// Mock the CategoryTags component
jest.mock('@components/CategoryTags', () => () => (
  <div data-testid="category-tags" />
));

describe('Tests for Quote Component', () => {
  const mockQuote = {
    id: 1,
    text: 'This is a test quote text which is greater than 200 characters. This is really very long text which is displayed on the quuotes page in the quotes application which helps to work with different quotes!',
    author: 'Test Author',
    categories: ['category1', 'category2'],
  };

  it('renders the quote text and author', () => {
    const { getByText } = render(
      <Quote quote={mockQuote} selectedCategory="category1" searchText="" />
    );

    // Check if the quote text is rendered
    expect(getByText(/This is a test quote text which/)).toBeTruthy();
    expect(getByText(/Test Author/)).toBeTruthy();
  });

  it('truncates the quote text if it is too long', () => {
    const { getByText } = render(
      <Quote quote={mockQuote} selectedCategory="category1" searchText="" />
    );

    // Check if the quote text is truncated
    expect(
      getByText(
        /This is a test quote text which is greater than 200 characters. This is really very long text which is displayed on the quuotes page in the quotes application which helps to work with different quotes\.\.\./
      )
    ).toBeTruthy();
  });

  it('renders the CategoryTags component', () => {
    const { getByTestId } = render(
      <Quote quote={mockQuote} selectedCategory="category1" searchText="" />
    );

    // Check if CategoryTags component is rendered
    expect(getByTestId('category-tags')).toBeTruthy();
  });

  it('highlights the search text in the quote', () => {
    const searchText = 'test quote text';
    const { getByText } = render(
      <Quote
        quote={mockQuote}
        selectedCategory="category1"
        searchText={searchText}
      />
    );

    // Check if the highlighted text is rendered in a span
    const highlightedText = getByText(/test quote text/i);
    expect(highlightedText).toBeTruthy();
    expect(highlightedText.tagName).toBe('SPAN'); // Ensure it's in a <span>

    // Check if the surrounding span has the bg-yellow-300 class
    expect(highlightedText.className).toContain('bg-yellow-300');

    // Check if the surrounding text is rendered correctly
    expect(getByText(/This is a /)).toBeTruthy();
    expect(
      getByText(/This is really very long text which is displayed/)
    ).toBeTruthy();
  });
});
