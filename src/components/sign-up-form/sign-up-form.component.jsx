import { useContext, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { SignUpContainer } from './sign-up-form.styles';
import Button from '../button/button.component'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formFields;
    if( password != confirmPassword ){
      alert('Passwords are not the same!');
      return;
    }

    try{
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      
      await createUserDocumentFromAuth(user, {displayName});
      resetFormFields();
    } catch(err){
      if(err.code == 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use');
      }
      else {
        console.log('User creation encountered an error: ', err);
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({...formFields, [name]: value});
  };
  return (
    <SignUpContainer>
      <h2 className="">Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Display Name'
          type="text" 
          required 
          onChange={handleChange} 
          name="displayName" 
          value={displayName}
        />
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
        <FormInput 
          label='Confirm Password'
          type="password" 
          required 
          onChange={handleChange} 
          name="confirmPassword" 
          value={confirmPassword}
        />
        <Button type='submit'>Sign up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm;