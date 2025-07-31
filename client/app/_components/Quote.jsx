import Link from 'next/link';
import CategoryTags from '@components/CategoryTags';

const MAX_VISIBLE_TEXT_LENGTH = 200;

// Function to split and highlight the searchText
function highlightText(text, searchText) {
  if (!searchText || searchText.length < 3) {
    return text;
  }

  const parts = text.split(new RegExp(`(${searchText})`, 'gi')); // Split text by searchText (case insensitive)
  return parts.map((part, index) =>
    part.toLowerCase() === searchText.toLowerCase() ? (
      <span
        key={index}
        className="bg-yellow-300 dark:bg-yellow-200 dark:text-gray-800 -m-0.5 p-0.5"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function Quote({ quote, selectedCategory, searchText }) {
  const quoteText =
    quote.text.length > MAX_VISIBLE_TEXT_LENGTH
      ? `${quote.text.slice(0, MAX_VISIBLE_TEXT_LENGTH)}...`
      : quote.text;

  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-4 shadow-md rounded-lg hover:-translate-y-1.5 hover:bg-gray-100 hover:dark:bg-gray-700 transition-transform duration 400">
      <Link href={`/quotes/${quote.id}`}>
        <p className="mb-4 text-xl italic text-gray-900 dark:text-gray-100">
          "{highlightText(quoteText, searchText)}"
        </p>
      </Link>
      <p className="mb-10 text-right text-xl font-semibold text-gray-700 dark:text-gray-300">
        <Link href={`/search?author=${quote.author}`}>
          —{' '}
          <span className="hover:underline hover:text-blue-600 hover:dark:text-blue-300">
            {quote.author}
          </span>
        </Link>
      </p>

      <CategoryTags
        categories={quote.categories}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
