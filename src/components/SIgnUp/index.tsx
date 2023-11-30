import FormInput from '../FormInput';
import FormButton from '../FormButton';
import StraightLine from '../StraightLine';
import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';
import { supabase } from '../../service/supabase';

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

function SignUp() {
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

  function handleChange(e: any) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSignUp(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    e.preventDefault();
    if (!handleInvalidInputs()) return;
    console.log('Form complete! Here the account would have been created should server be running');

    return;
    /* Code below creates an account. I'll not run it since there's a rate limit of 4 emaisl per hour and I don't wanna go overboard by mistake before setting up my own custom SMTP */
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email!,
        password: formData.password!,
        options: {
          data: {
            username: formData.name,
          },
        },
      });

      console.log(data, error);
    } catch (error) {
      console.log(`HandleSignUp error: ${error}`);
    }
  }

  function handleInvalidInputs(): boolean {
    // Handles all the invalid inputs, if any single one of them returns false, it prevents the user from creating a new account
    const name = handleInvalidName();
    const email = handleInvalidEmail();
    const password = handleInvalidPassword();
    const confirmPassword = handleInvalidConfirmPassword();

    if (name && email && password && confirmPassword) {
      return true;
    }

    return false;
  }

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
    <>
      <div className='flex flex-col gap-3'>
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
          text='Sign up'
          className='bg-blue-900 text-white'
          onClick={handleSignUp}
        />
      </div>

      <StraightLine />

      <FormButton
        type='button'
        text='Sign up with Github'
        icon={<FaGithub />}
        className='bg-black text-white'
      />
    </>
  );
}

export default SignUp;
