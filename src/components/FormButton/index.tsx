export interface FormButtonProps {
  text?: string;
  icon?: React.ReactElement | string;
  type: 'submit' | 'button';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function FormButton({ text, type, icon, className, onClick }: FormButtonProps) {
  return (
    <button type={type} className={`flex w-full items-center justify-center gap-2 py-2 text-black  rounded-md ${className}`} onClick={onClick}>
      {text} {icon}
    </button>
  );
}

export default FormButton;
