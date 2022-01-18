import { ChakraProvider } from "@chakra-ui/react";
import fgPromise from "@fingerprintjs/fingerprintjs";
import { useEffect } from "react";
import { useStore } from "../store";

const addFingerprint = async (setFG) => {
  const fg = await fgPromise.load();
  const result = await fg.get();
  const fingerprint = result.visitorId;
  setFG(fingerprint);
};

function MyApp({ Component, pageProps }) {
  const { setFingerprint } = useStore();
  useEffect(() => {
    addFingerprint(setFingerprint);
  }, []);
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
