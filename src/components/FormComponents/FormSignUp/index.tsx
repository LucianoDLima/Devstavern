import FormInput from '../FormInput';
import FormButton from '../FormButton';
import StraightLine from '../StraightLine';
import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';
import { supabase } from '../../../service/supabase';
import FormBase from '../FormBase';
import { FormFooterProps } from '../FormFooter';

interface FormDataTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface InvalidInputTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormSignUpProps extends FormFooterProps {}

function FormSignUp({ text, anchor, redirect }: FormSignUpProps) {
  const [loading, setLoading] = useState(false);
  // Where the user's input data is stored
  const [formData, setFormData] = useState<FormDataTypes>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // Where the error messages are stored
  const [invalidInput, setInvalidInput] = useState<InvalidInputTypes>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  /**
   * Handle the sign up process when the user submits the email sign-up form
   */
  async function handleEmailSignUp(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    e.preventDefault();

    // Check for invalid inputs (empty or just wrong format)
    if (!handleInvalidInputs()) return;

    setLoading(true);

    try {
      // The sign up attempt
      const { data, error } = await supabase.auth.signUp({
        email: formData.email!,
        password: formData.password!,
        options: {
          data: {
            username: formData.name,
          },
        },
      });
      setLoading(false);

      // Debug - [DELETE REMINDER]
      console.log(data, error);

      if (error) {
        setInvalidInput((prevInvalidInput) => ({
          ...prevInvalidInput,
          email: error.message,
        }));
        return;
      }
      // If account is created successfully, reloads the page
      window.location.reload();
    } catch (error) {
      console.log(`handleEmailSignUp error: ${error}`);
    }
  }

  /**
   * Handle Github sign up
   * If successful, redirect the user to the main page
   */
  async function handleGithubSignUp(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      // The sign in attempt. Redirect if successful
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: 'http://localhost:5173/home',
        },
      });

      console.log(data, error);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *  Update the formData based on user input
   */
  function handleChange(e: any) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }
  /**
   * Handles all the invalid inputs
   * @returns {boolean} true if all inputs have been validated
   */
  function handleInvalidInputs(): boolean {
    const name = handleInvalidName();
    const email = handleInvalidEmail();
    const password = handleInvalidPassword();
    const confirmPassword = handleInvalidConfirmPassword();

    if (name && email && password && confirmPassword) {
      return true;
    }

    return false;
  }

  /**
   * Check if name is not empty and is valid format
   *
   * @returns {boolean} - True if both is true, false otherwise
   */
  function handleInvalidName(): boolean {
    const name = formData.name?.trim();
    const nameLength = name.length;
    if (nameLength! > 0 && nameLength! < 3) {
      setInvalidInput((prevInvalidInput) => ({
        ...prevInvalidInput,
        name: 'Must be at least 3 characters long',
      }));
      return false;
    }

    if (!nameLength) {
      setInvalidInput((prevInvalidInput) => ({
        ...prevInvalidInput,
        name: 'Cannot be empty',
      }));
      return false;
    }

    setInvalidInput((prevInvalidInput) => ({
      ...prevInvalidInput,
      name: '',
    }));
    return true;
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
   * Check if password is not empty, is long enough and is valid format
   *
   * @returns {boolean} - True if both is true, false otherwise
   */
  function handleInvalidPassword(): boolean {
    const password = formData.password?.trim();
    const passwordLength = password.length;

    if (passwordLength > 0 && passwordLength < 6) {
      setInvalidInput((prevInvalidInput) => ({
        ...prevInvalidInput,
        password: 'Must be at least 6 characters long',
      }));
      return false;
    }

    if (!password) {
      setInvalidInput((prevInvalidInput) => ({
        ...prevInvalidInput,
        password: 'Cannot be empty',
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
   * Check if confirm password is not empty and matches the password
   *
   * @returns {boolean} - True if both is true, false otherwise
   */
  function handleInvalidConfirmPassword(): boolean {
    const confirmPassword = formData.confirmPassword?.trim();

    if (!confirmPassword) {
      setInvalidInput((prevInvalidInput) => ({
        ...prevInvalidInput,
        confirmPassword: 'Cannot be empty',
      }));
      return false;
    }

    if (formData.confirmPassword !== formData.password) {
      setInvalidInput((prevInvalidInput) => ({
        ...prevInvalidInput,
        confirmPassword: 'Must match password',
      }));
      return false;
    }

    setInvalidInput((prevInvalidInput) => ({
      ...prevInvalidInput,
      confirmPassword: '',
    }));

    return true;
  }

  const formInputs = [
    { type: 'text', name: 'name', placeholder: 'Name', errorMessage: invalidInput.name },
    { type: 'email', name: 'email', placeholder: 'E-mail', errorMessage: invalidInput.email },
    { type: 'password', name: 'password', placeholder: 'Password', errorMessage: invalidInput.password },
    { type: 'password', name: 'confirmPassword', placeholder: 'Confirm password', errorMessage: invalidInput.confirmPassword },
  ];

  return (
    <FormBase
      text={text}
      anchor={anchor}
      redirect={redirect}
    >
      {formInputs.map((input, index) => {
        return (
          <FormInput
            key={index}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            errorMessage={input.errorMessage}
            onChange={handleChange}
          />
        );
      })}

      <FormButton
        type='submit'
        text={loading ? 'Creating...' : 'Sign up'}
        className='bg-blue-900 text-white'
        onClick={handleEmailSignUp}
        loading={loading}
      />

      <StraightLine />

      <FormButton
        type='button'
        text='Sign up with Github'
        icon={<FaGithub />}
        className='bg-black text-white'
        onClick={handleGithubSignUp}
      />
    </FormBase>
  );
}

export default FormSignUp;
