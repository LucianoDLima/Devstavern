import { Link } from 'react-router-dom';

export interface FormFooterProps {
  text: string;
  anchor: string;
  redirect: string;
}

function FormFooter({ text, anchor, redirect }: FormFooterProps) {
  return (
    <div className='px-5 py-2 rounded-sm bg-secondaryLight font-white text-sm lg:text-xl flex justify-center gap-2'>
      <p>{text}</p>
      <Link
        to={redirect}
        className='text-blue-700 hover:underline'
      >
        {anchor}
      </Link>
    </div>
  );
}

export default FormFooter;
