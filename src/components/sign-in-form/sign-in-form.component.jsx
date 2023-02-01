import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

// import { 
//   //signInWithGooglePopup, 
//   //createUserDocumentFromAuth, 
//   signInAuthUserWithEmailAndPassword
// } from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from './sign-in-form.styles';
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    //await signInWithGooglePopup();
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      // const {user} = await signInAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch(err){
      switch(err.code){
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({...formFields, [name]: value});
  };
  return (
    <SignUpContainer>
      <h2 className="">Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Email'
          type="email" 
          required 
          onChange={handleChange} 
          name="email" 
          value={email}
        />
        <FormInput
          label='Password' 
          type="password" 
          required 
          onChange={handleChange} 
          name="password" 
          value={password}
        />
        <div className="buttons-container">
          <Button type='submit'>Sign in</Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>Google Sign in</Button>
        </div>
      </form>
    </SignUpContainer>
  )
}

export default SignInForm;