import { FaGithub } from 'react-icons/fa';
import FormInput from '../FormInput';
import FormButton from '../FormButton';
import { useState } from 'react';
import { supabase } from '../../../service/supabase';
import StraightLine from '../StraightLine';
import { useNavigate } from 'react-router-dom';
import FormBase from '../FormBase';
import { FormFooterProps } from '../FormFooter';

interface FormDataState {
  email: string;
  password: string;
}

interface InvalidInputState {
  email: string;
  password: string;
}

interface FormSignInProps extends FormFooterProps {}

function FormSignIn({ text, anchor, redirect }: FormSignInProps) {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataState>({
    email: '',
    password: '',
  });

  const [invalidInput, setInvalidInput] = useState<InvalidInputState>({
    email: '',
    password: '',
  });

  /**
   * Handle email sign in
   */
  async function handleEmailSignIn(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    e.preventDefault();
    // Check for invalid inputs (empty or just wrong format)
    if (!handleInvalidInputs()) return;

    setLoading(true);

    try {
      // The sign in attempt
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email!,
        password: formData.password!,
      });

      // Debug - [DELETE REMINDER]
      console.log(data, error);

      setLoading(false);

      // Check if the e-mail or password was invalid
      if (error) {
        setInvalidInput({
          email: error.message,
          password: error.message,
        });

        return;
      }
      navigate('/home');
    } catch (error) {
      console.log(`handleEmailSignIn - Catch: ${error}`);
    }
  }

  /**
   * Handle Github sign in
   * If successful, redirect the user to the main page
   */
  async function handleGithubSignIn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      // The sign in attempt. Redirect if successful
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: 'http://localhost:5173/home',
        },
      });

      // Debug - [DELETE REMINDER]
      console.log(data, error);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *  Update the formData based on user input
   */
  function handleInputChanges(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  /**
   * Call both email and password validation functions
   *
   * @returns {boolean} - If both functions return true, then this one returns true too
   */
  function handleInvalidInputs(): boolean {
    const email = handleInvalidEmail();
    const password = handleInvalidPassword();

    if (email && password) {
      return true;
    }
    return false;
  }

  /**
   * Check if email is not empty and is valid format
   *
   * @returns {boolean} - True if both is true, false otherwise
   */
  function handleInvalidEmail(): boolean {
    const email = formData.email?.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!email) {
      setInvalidInput((prevInvalidInput) => ({
        ...prevInvalidInput,
        email: 'Cannot be empty',
      }));
      return false;
    }

    if (!emailPattern.test(email)) {
      setInvalidInput((prevInvalidInput) => ({
        ...prevInvalidInput,
        email: 'Invalid email',
      }));
      return false;
    }

    setInvalidInput((prevInvalidInput) => ({
      ...prevInvalidInput,
      email: '',
    }));

    return true;
  }

  /**
   * Check if password is not empty and is valid format
   *
   * @returns {boolean} - True if both is true, false otherwise
   */
  function handleInvalidPassword(): boolean {
    const password = formData.password?.trim();
    const passwordLength = password?.length!;

    if (!password) {
      setInvalidInput((prevInvalidInput) => ({
        ...prevInvalidInput,
        password: 'Cannot be empty',
      }));
      return false;
    }

    if (passwordLength > 0 && passwordLength < 6) {
      setInvalidInput((prevInvalidInput) => ({
        ...prevInvalidInput,
        password: 'Must be at least 6 characters long',
      }));
      return false;
    }

    setInvalidInput((prevInvalidInput) => ({
      ...prevInvalidInput,
      password: '',
    }));
    return true;
  }

  /**
   * Map <FormInput> element
   */
  const inputDetails = [
    {
      type: 'email',
      name: 'email',
      placeholder: 'E-mail',
      onChange: handleInputChanges,
      errorMessage: invalidInput.email,
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      onChange: handleInputChanges,
      errorMessage: invalidInput.password,
    },
  ];

  return (
    <FormBase
      text={text}
      anchor={anchor}
      redirect={redirect}
    >
      {inputDetails.map((input, index) => (
        <FormInput
          key={index}
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          onChange={input.onChange}
          errorMessage={input.errorMessage}
        />
      ))}

      <FormButton
        type='submit'
        text={loading ? 'Loading...' : 'Sign in'}
        className='bg-blue-900 text-white'
        onClick={handleEmailSignIn}
        loading={loading}
      />

      <a
        href='#'
        className='text-center text-xs text-blue-700 hover:underline lg:text-base'
      >
        Forgotten password?
      </a>

      <StraightLine />

      <FormButton
        type='button'
        text='Sign in with Github'
        icon={<FaGithub />}
        className='bg-black text-white'
        onClick={handleGithubSignIn}
      />
    </FormBase>
  );
}

export default FormSignIn;
