interface FormErrorProps {
  text: string;
}


function FormError({text}: FormErrorProps) {
  return (
    <p className='text-red-600 text-xs italic'>{text}</p>
  )
}

export default FormError