import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { 
  auth, 
  signInWithGooglePopup, 
  createUserDocumentFromAuth, 
  signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const Signin = () => {
  useEffect(() => {
    async function fetchAuthData () {
      const response = await getRedirectResult(auth);
      console.log(response);
      if (response){
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    } 
    fetchAuthData();
  }, []);

  const logGoogleUser = async () => {
    try{
      const {user} = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
      <SignUpForm/>
    </div>
  );
};

export default Signin;