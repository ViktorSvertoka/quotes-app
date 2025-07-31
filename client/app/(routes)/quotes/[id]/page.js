'use client';

import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@components/Button';
import CategoryTags from '@components/CategoryTags';
import { deleteQuoteById, findQuoteById } from '@utils/quoteApiHandlers';

export default function QuotePage(props) {
  const { id } = props.params;
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    findQuoteById({ id, setIsLoading, setData: setQuote });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} color="#4A90E2" />
      </div>
    );
  }

  if (!quote) {
    return (
      <p className="text-center text-2xl mt-10">{`Quote with id ${id} not found.`}</p>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 mt-7 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-violet-900 dark:text-violet-300">
          {quote.text}
        </h2>
        <p className="text-2xl text-center text-gray-600 dark:text-gray-300 mb-10">
          <Link href={`/search?author=${quote.author}`}>
            —{' '}
            <span className="hover:underline hover:text-blue-600 hover:dark:text-blue-300">
              {quote.author}
            </span>
          </Link>
        </p>
        <CategoryTags categories={quote.categories} isSingleQuotePage={true} />
      </div>
      <div className="flex justify-center mb-6">
        <Link href={`/quotes/${quote.id}/edit`}>
          <Button text="Edit" variant="primary" />
        </Link>
        <Button
          onClick={() => deleteQuoteById({ id, router })}
          text="Delete"
          variant="danger"
        />
      </div>
    </div>
  );
}
