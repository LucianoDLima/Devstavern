import FormFooter, { FormFooterProps } from '../FormFooter';
import SignUp from '../SIgnUp';
import SignIn from '../SignIn';

interface FormBaseProps extends FormFooterProps {}

function FormBase({ isSignIn, onClick }: FormBaseProps) {
  return (
    <div className='flex flex-col gap-3'>
      <form
        action='submit'
        className='text-sm lg:text-xl'
      >
        <fieldset className='px-5 py-7 rounded-sm bg-secondaryLight'>
          <legend>
            <h2 className='sr-only'>Fill in the login detail</h2>
          </legend>
          {isSignIn ? <SignIn /> : <SignUp />}
        </fieldset>
      </form>

      <FormFooter isSignIn={isSignIn} onClick={onClick} />
    </div>
  );
}

export default FormBase;
