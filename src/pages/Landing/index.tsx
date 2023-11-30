import { useState } from 'react';
import Hero from '../../components/Hero';
import SignUp from '../../components/SIgnUp';
import SignIn from '../../components/SignIn';

function Landing() {
  const [isSignIn, setIsSignIn] = useState(true);

  function handleIsSignIn() {
    setIsSignIn((prev) => !prev);
  }

  return (
    <main className='px-6 py-6 font-main grid grid-cols-1 gap-4'>
      <Hero />

      <form
        action='submit'
        className='text-sm'
      >
        <fieldset className='px-5 py-7 rounded-sm bg-secondaryLight'>
          <legend>
            <h2 className='sr-only'>Fill in the login detail</h2>
          </legend>
          {isSignIn ? <SignIn /> : <SignUp />}
        </fieldset>
      </form>

      <div className='px-5 py-2 rounded-sm bg-secondaryLight font-white flex justify-center gap-2 text-sm '>
        <p>{isSignIn ? "Don't have an account?" : 'Have an account?'}</p>
        <button
          className='text-blue-700 hover:underline'
          onClick={handleIsSignIn}
        >
          {isSignIn ? 'Create here!' : 'Sign in now!'}
        </button>
      </div>
    </main>
  );
}

export default Landing;
