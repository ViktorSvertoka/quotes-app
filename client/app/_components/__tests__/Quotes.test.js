import { render } from '@testing-library/react';
import Quotes from '@components/Quotes'; // Adjust the import path as needed

// Mock the Quote component
jest.mock('@components/Quote', () => ({ quote }) => (
  <div data-testid="quote">{quote.text}</div>
));

describe('Tests for Quotes Component', () => {
  const mockQuotes = [
    {
      id: 1,
      text: 'First test quote',
      author: 'Author 1',
      categories: ['cat1'],
    },
    {
      id: 2,
      text: 'Second test quote',
      author: 'Author 2',
      categories: ['cat2'],
    },
    {
      id: 3,
      text: 'Third test quote',
      author: 'Author 3',
      categories: ['cat3'],
    },
  ];

  it('renders the correct number of Quote components', () => {
    const { getAllByTestId } = render(
      <Quotes quotes={mockQuotes} selectedCategory="" searchText="" />
    );

    // Expect the number of rendered Quote components to match the mockQuotes length
    expect(getAllByTestId('quote')).toHaveLength(mockQuotes.length);
  });

  it('renders quotes with the correct text', () => {
    const { getByText } = render(
      <Quotes quotes={mockQuotes} selectedCategory="" searchText="" />
    );

    // Check if all the quote texts are rendered
    mockQuotes.forEach((quote) => {
      expect(getByText(quote.text)).toBeTruthy();
    });
  });

  it('renders without crashing when no quotes are provided', () => {
    const { container } = render(
      <Quotes quotes={[]} selectedCategory="" searchText="" />
    );

    // Check if the component renders without any errors
    expect(container).toBeTruthy();
  });
});
