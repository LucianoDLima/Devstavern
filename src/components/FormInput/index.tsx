import FormError from '../FormError';

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
}

function FormInput({ type, name, placeholder, onChange, errorMessage }: FormInputProps) {
  return (
    <div className='border-b-gray-400 border-t-transparent border-x-transparent border relative'>
      <input
        className='w-full px-3 py-1 bg-inherit placeholder:text-inherit placeholder:opacity-75'
        required
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      <FormError text={errorMessage} />
    </div>
  );
}

export default FormInput;
