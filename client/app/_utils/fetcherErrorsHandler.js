import { toast } from 'react-toastify';

export const handleErrors = async (response) => {
  if (!response.ok) {
    let errorMessage = 'Some error occurred';
    let inputValidationErrors;

    try {
      const errorData = await response.json();

      // handle such server side errors
      // {
      //   "message": "Quote with ID 418417 not found"
      // }
      if (errorData?.message) {
        errorMessage = errorData.message;
      }

      // Processing of the potential server-side input validation errors
      // Sample server response with input validation errors
      // {
      //   "errors": [
      //       {
      //           "type": "field",
      //           "value": "100",
      //           "msg": "Limit must be in range 1..50",
      //           "path": "limit",
      //           "location": "query"
      //       }
      //   ]
      // }
      if (errorData.errors && Array.isArray(errorData.errors)) {
        inputValidationErrors = errorData.errors
          .filter((err) => err.type === 'field')
          .map((err) => `${err.msg} (${err.path}, ${err.value})`);
      }
    } catch {
      errorMessage = 'JSON parsing error';
    }

    if (inputValidationErrors) {
      inputValidationErrors.forEach((errorMessage) => {
        console.log(errorMessage);
        toast.error(errorMessage);
      });
    } else {
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  }
};
