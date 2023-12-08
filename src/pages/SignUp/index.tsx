import Hero from '../../components/Hero';
import MainWrapper from '../../components/MainWrapper';
import FormSignUp from '../../components/FormComponents/FormSignUp';

function SignUp() {
  return (
    <MainWrapper>
      <Hero />
      <FormSignUp
        text='Have an account?'
        anchor='Sign in here!'
        redirect='/'
      />
    </MainWrapper>
  );
}

export default SignUp;
