import InputField from '@components/InputField';
import { createQuoteInputFields } from '@config/inputFields';

export default function QuoteFormFields({
  values,
  setValues,
  validationErrors,
}) {
  const quoteInputFields = createQuoteInputFields({
    values,
    setValues,
    validationErrors,
  });

  return (
    <div className="text-xl grid grid-cols-1 gap-4 mx-auto mb-6 md:w-3/4 lg:w-1/2">
      {quoteInputFields.map(({ name, placeholder, value, error, onChange }) => (
        <InputField
          key={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          showError={true}
        />
      ))}
    </div>
  );
}
