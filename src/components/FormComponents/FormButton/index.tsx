export interface FormButtonProps {
  text?: string;
  icon?: React.ReactElement | string;
  type: 'submit' | 'button';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
}

function FormButton({ text, type, icon, className, onClick, loading }: FormButtonProps) {
  return (
    <>
      <button
        type={type}
        className={`flex w-full items-center justify-center gap-2 py-2 rounded-md lg:py-3 ${className}`}
        onClick={onClick}
      >
        {loading && (
          <div
            className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]'
            role='status'
          >
            <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>Loading...</span>
          </div>
        )}
        {text} {icon}
      </button>
    </>
  );
}

export default FormButton;
