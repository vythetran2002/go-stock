import useSWR from "swr";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import app from "@/lib/firebase/firebase";

const auth = getAuth(app);

const fetcher = async (token) => {
  if (!token) return null;

  try {
    const userCredential = await signInWithCustomToken(auth, token);
    const user = userCredential.user;
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

function useUser(token) {
  const { data, error, isLoading } = useSWR(
    token ? ["userInfo", token] : null,
    () => fetcher(token)
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export default useUser;
