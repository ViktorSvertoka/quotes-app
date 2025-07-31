'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import QuoteForm from '@components/QuoteForm';
import { editQuote, findQuoteById } from '@utils/quoteApiHandlers';

const INITIAL_FORM_VALUES = {
  text: '',
  author: '',
  categories: '',
};

export default function EditQuotePage({ params }) {
  const { id } = params;
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const formatFormValues = ({ text, author, categories }) => ({
    text,
    author,
    categories: categories.join(', '), // Assuming categories is an array
  });

  useEffect(() => {
    findQuoteById({
      id,
      setIsLoading,
      setData: setFormValues,
      formatData: formatFormValues,
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} color="#4A90E2" />
      </div>
    );
  }

  const handleSubmit = () =>
    editQuote({
      formValues,
      setValidationErrors,
      router,
      quoteId: id,
    });

  return (
    <QuoteForm
      values={formValues}
      setValues={setFormValues}
      validationErrors={validationErrors}
      handleSubmit={handleSubmit}
      buttonText="Update"
    />
  );
}
