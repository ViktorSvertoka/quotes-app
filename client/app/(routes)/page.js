'use client';

import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Button from '@components/Button';
import Quotes from '@components/Quotes';
import { findRandomQuotes } from '@utils/quoteApiHandlers';

export default function RandomQuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    findRandomQuotes({ setQuotes, setIsLoading });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6 text-center dark:text-white">
        Random Quotes
      </h1>
      <Button
        onClick={() => findRandomQuotes({ setQuotes, setIsLoading })}
        text="Get Random Quotes"
      />

      {isLoading ? (
        <div className="flex mt-20 justify-center items-center">
          <ClipLoader size={60} color="#4A90E2" />
        </div>
      ) : (
        <Quotes quotes={quotes} />
      )}
    </div>
  );
}
