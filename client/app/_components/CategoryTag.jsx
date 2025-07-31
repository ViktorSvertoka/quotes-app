import Link from 'next/link';

export default function CategoryTag({
  category,
  selectedCategory,
  isSingleQuotePage,
}) {
  const baseClasses = 'transition-colors duration 400';
  const pageSpecificClasses = isSingleQuotePage
    ? 'text-base bg-violet-200 text-violet-900 py-2 px-4 rounded-lg dark:bg-violet-700 dark:text-violet-100 hover:bg-violet-300 hover:dark:bg-violet-800'
    : `${
        category === selectedCategory
          ? 'bg-yellow-200'
          : 'bg-blue-200 hover:bg-blue-500 hover:text-gray-100'
      } text-lg text-gray-700 dark:text-gray-800 px-2 py-1 rounded-full mr-2 mb-2`;

  return (
    <Link
      href={`/search?category=${category}`}
      className={`${baseClasses} ${pageSpecificClasses}`}
    >
      {category}
    </Link>
  );
}
