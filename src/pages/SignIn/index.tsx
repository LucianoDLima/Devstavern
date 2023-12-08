import FormSignIn from '../../components/FormComponents/FormSignIn';
import Hero from '../../components/Hero';
import MainWrapper from '../../components/MainWrapper';

function SignIn() {
  return (
    <MainWrapper>
      <Hero />
      <FormSignIn
        text="Don't have an account?"
        anchor='Create here!'
        redirect='/signup'
      />
    </MainWrapper>
  );
}

export default SignIn;
