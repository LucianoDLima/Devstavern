export interface FormFooterProps {
  isSignIn: boolean,
  onClick: () => void
}

function FormFooter({isSignIn, onClick}: FormFooterProps) {
  return (
    <div className='px-5 py-2 rounded-sm bg-secondaryLight font-white text-sm lg:text-xl flex justify-center gap-2'>
        <p>{isSignIn ? "Don't have an account?" : 'Have an account?'}</p>
        <button
          className='text-blue-700 hover:underline'
          onClick={onClick}
        >
          {isSignIn ? 'Create here!' : 'Sign in now!'}
        </button>
      </div>
  )
}

export default FormFooter