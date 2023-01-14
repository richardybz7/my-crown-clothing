import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component'

import { 
  signInWithGooglePopup, 
  createUserDocumentFromAuth, 
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
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
    <div className="sign-up-container">
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
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;