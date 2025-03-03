import "@/styles/globals.css";
import { SocketProvider } from "@/utils/socketContext";

export default function App({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}
