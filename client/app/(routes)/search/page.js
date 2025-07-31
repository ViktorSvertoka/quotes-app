'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import deepEqual from 'deep-equal';
import Button from '@components/Button';
import InputField from '@components/InputField';
import Quotes from '@components/Quotes';
import { createSearchInputFields } from '@config/inputFields';
import { getSearchInputValidationMessage } from '@utils/validation';
import { findQuotes } from '@utils/quoteApiHandlers';
import {
  createSearchQueryString,
  createSearchValuesFromQueryString,
} from '@utils/queryString';

const INITIAL_SEARCH_VALUES = {
  text: '',
  author: '',
  category: '',
  limit: '',
  offset: '',
};

export default function SearchQuotesPage() {
  const [searchValues, setSearchValues] = useState(INITIAL_SEARCH_VALUES);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchValuesFromQueryString =
      createSearchValuesFromQueryString(searchParams);

    const newSearchValues = {
      ...INITIAL_SEARCH_VALUES,
      ...searchValuesFromQueryString,
    };

    if (!deepEqual(newSearchValues, searchValues)) {
      setSearchValues(newSearchValues);

      if (Object.keys(searchValuesFromQueryString).length === 0) {
        setQuotes([]);
      } else handleSearch(searchValuesFromQueryString);
    }
  }, [searchParams]); // Run on the first render and each time when searchParams changes

  const handleSearch = async (inputSearchValues) => {
    setSearchButtonClicked(true);

    if (Object.keys(validationErrors).length > 0) {
      return; // Exit early if there are validation errors
    }

    const queryParams = { ...inputSearchValues };
    const query = createSearchQueryString(queryParams);
    // Update the query string in the URL
    router.push(`?${query}`);

    setSearchSubmitted(true);
    findQuotes({ setQuotes, setIsLoading, queryParams });
  };

  const clearSearch = () => {
    setSearchValues({ ...INITIAL_SEARCH_VALUES });
    setSearchButtonClicked(false);
    setSearchSubmitted(false);
    setQuotes([]);
    router.push(window.location.pathname);
  };

  const handleInputChange = (name, value) => {
    setSearchValues({ ...searchValues, [name]: value });

    const errorMessage = getSearchInputValidationMessage(name, value);
    const newValidationErrors = { ...validationErrors };
    if (errorMessage) {
      newValidationErrors[name] = errorMessage;
    } else {
      delete newValidationErrors[name]; // Remove the error if there is none
    }
    setValidationErrors(newValidationErrors);
  };

  const searchInputFields = createSearchInputFields({
    searchValues,
    validationErrors,
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6 text-center dark:text-white">
        Search Quotes
      </h1>

      <div className="text-xl grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_0.3fr] gap-4 mb-6">
        {searchInputFields.map(({ name, placeholder, value, error }) => (
          <InputField
            key={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            error={error}
            showError={searchButtonClicked}
          />
        ))}
      </div>

      <div className="flex justify-center mb-6">
        <Button onClick={() => handleSearch(searchValues)} text="Search" />
        <Button onClick={clearSearch} text="Clear" variant="secondary" />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={60} color="#4A90E2" />
        </div>
      ) : quotes.length > 0 ? (
        <Quotes
          quotes={quotes}
          selectedCategory={searchValues.category}
          searchText={searchValues.text}
        />
      ) : (
        searchSubmitted && (
          <p className="text-2xl pt-10 text-center text-gray-600 dark:text-gray-400">
            No quotes found.
          </p>
        )
      )}
    </div>
  );
}
