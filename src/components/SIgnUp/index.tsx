import FormInput from '../FormInput';
import FormButton from '../FormButton';
import StraightLine from '../StraightLine';
import { FaGithub } from 'react-icons/fa';

function SignUp() {
  function handleChange() {
    console.log('teste');
  }

  function handleSignUp(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  }
  return (
    <>
      <div className='flex flex-col gap-3'>
        <FormInput type='text' name='name' placeholder='Username' onChange={handleChange} />

        <FormInput type='email' name='email' placeholder='E-mail' onChange={handleChange} />

        <FormInput type='password' name='password' placeholder='Password' onChange={handleChange} />

        <FormInput type='password' name='confirmPassword' placeholder='Confirm password' onChange={handleChange} />

        <FormButton type='submit' text='Sign up' className='bg-blue-900 text-white' onClick={handleSignUp} />
      </div>

      <StraightLine />

      <FormButton type='button' text='Sign up with Github' icon={<FaGithub />} className='bg-black text-white'/>
    </>
  );
}

export default SignUp;
