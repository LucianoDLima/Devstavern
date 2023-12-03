import { useState } from 'react';
import Hero from '../../components/Hero';
import FormBase from '../../components/FormBase';

function Landing() {
  const [isSignIn, setIsSignIn] = useState(true);

  function handleIsSignIn() {
    setIsSignIn((prev) => !prev);
  }

  return (
    <main className='px-6 py-6 font-main grid grid-cols-1 gap-4 max-w-md ms-auto me-auto items-center h-screen lg:grid-cols-2 lg:max-w-5xl'>
      <Hero />

      <FormBase
        isSignIn={isSignIn}
        onClick={handleIsSignIn}
      />
    </main>
  );
}

export default Landing;
