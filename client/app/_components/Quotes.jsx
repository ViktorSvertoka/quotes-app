import Quote from '@components/Quote';

export default function Quotes({ quotes, selectedCategory, searchText }) {
  return (
    <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotes.map((quote) => (
        <Quote
          key={quote.id}
          quote={quote}
          selectedCategory={selectedCategory}
          searchText={searchText}
        />
      ))}
    </div>
  );
}
