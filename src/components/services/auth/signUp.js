import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "@/lib/firebase/firebase";

const auth = getAuth(app);

export const signUpWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      throw error;
    });
};
