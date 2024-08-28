import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

export const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Toaster />
      <Component {...pageProps} />
    </main>
  );
}
