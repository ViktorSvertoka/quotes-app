import CategoryTag from '@components/CategoryTag';

const MAX_VISIBLE_CATEGORIES = 10;

export default function CategoryTags({
  categories,
  selectedCategory,
  isSingleQuotePage,
}) {
  // Ensure that selectedCategory is always visible in the list
  // If it is beyond MAX_VISIBLE_CATEGORIES then replace last in the visible list with selectedCategory
  let displayedCategories = categories.slice(0, MAX_VISIBLE_CATEGORIES);

  if (selectedCategory && categories.includes(selectedCategory)) {
    const selectedIndex = categories.indexOf(selectedCategory);

    if (selectedIndex >= MAX_VISIBLE_CATEGORIES) {
      displayedCategories = [
        ...displayedCategories.slice(0, MAX_VISIBLE_CATEGORIES - 1),
        selectedCategory,
      ];
    }
  }

  return (
    <div
      className={`${
        isSingleQuotePage && 'justify-center gap-3'
      } flex flex-wrap mt-2`}
    >
      {displayedCategories.map((category) => (
        <CategoryTag
          key={category}
          category={category}
          selectedCategory={selectedCategory}
          isSingleQuotePage={isSingleQuotePage}
        />
      ))}
      {categories.length > MAX_VISIBLE_CATEGORIES && (
        <span className="text-3xl">...</span>
      )}
    </div>
  );
}
