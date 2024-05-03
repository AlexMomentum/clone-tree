import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, clearUser } from './userSlice';

const useAuthenticateUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          // any other user info
        }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe(); // Clean up subscription
  }, [dispatch]);

  return null;
};

export default useAuthenticateUser;
