import FormFooter, { FormFooterProps } from '../FormFooter';

interface FormBaseProps extends FormFooterProps {
  children: React.ReactNode;
}

function FormBase({ children, text, anchor, redirect }: FormBaseProps) {
  return (
    <section className='flex flex-col gap-3 '>
      <form
        action='submit'
        className='text-base lg:text-xl'
      >
        <fieldset className='flex flex-col gap-3 px-5 py-7 rounded-sm bg-secondaryLight'>
          <legend>
            <h2 className='sr-only'>Fill in the login detail</h2>
          </legend>
          {children}
        </fieldset>
      </form>

      <FormFooter
        text={text}
        anchor={anchor}
        redirect={redirect}
      />
    </section>
  );
}

export default FormBase;
