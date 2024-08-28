import app from "@/lib/firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      // return error.code;
      throw error;
    });
};
