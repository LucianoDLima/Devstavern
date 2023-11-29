import { FaGithub } from 'react-icons/fa';
import FormInput from '../FormInput';
import FormButton from '../FormButton';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import StraightLine from '../StraightLine';

interface CredentialsState {
  emptyEmail: boolean | null;
  emptyPassword: boolean | null;
  isWrong: boolean | null;
}

interface FormDataState {
  email: string | null;
  password: string | null;
}

function SignIn() {
  const [credentials, setCredentials] = useState<CredentialsState>({
    emptyEmail: null,
    emptyPassword: null,
    isWrong: null,
  });
  const [formData, setFormData] = useState<FormDataState>({
    email: null,
    password: null,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSignIn(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    e.preventDefault();
    if (handleEmptyInputs()) return;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email!,
        password: formData.password!,
      });

      const invalidInputs = error?.status === 400;

      setCredentials({
        emptyEmail: false,
        emptyPassword: false,
        isWrong: invalidInputs ? true : false,
      });
    } catch (error) {
      console.log(`HandleSignIn - Catch: ${error}`);
    }
  }

  // If either the password or the email inputs are empty, this function stops the sign in api from being called.
  function handleEmptyInputs(): boolean {
    const emailForm = formData.email === '';
    const passwordForm = formData.password === '';

    if (emailForm || passwordForm) {
      setCredentials({
        emptyEmail: emailForm ? true : false,
        emptyPassword: passwordForm ? true : false,
        isWrong: null,
      });
      return true;
    }
    return false;
  }

  function handleErrorMessageEmail() {
    return credentials.emptyEmail ? 'E-mail cannot be empty.' : credentials.isWrong ? 'Invalid e-mail and/or password' : '';
  }

  function handleErrorMessagePassword() {
    return credentials.emptyPassword ? 'Password cannot be empty.' : credentials.isWrong ? 'Invalid e-mail and/or password' : '';
  }

  return (
    <>
      <div className='flex flex-col gap-3'>
        <FormInput
          type='email'
          name='email'
          placeholder='E-mail'
          onChange={handleChange}
          errorMessage={handleErrorMessageEmail()}
        />

        <FormInput
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          errorMessage={handleErrorMessagePassword()}
        />

        <FormButton
          type='submit'
          text='Sign in'
          className='bg-blue-900 text-white'
          onClick={handleSignIn}
        />

        <a
          href='#'
          className='text-center text-xs text-blue-700 hover:underline'
        >
          Forgotten password?
        </a>
      </div>

      <StraightLine />

      <FormButton
        type='button'
        text='Sign in with Github'
        icon={<FaGithub />}
        className='bg-black text-white'
      />
    </>
  );
}

export default SignIn;
