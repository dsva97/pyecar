import { ChakraProvider } from "@chakra-ui/react";
import fgPromise from "@fingerprintjs/fingerprintjs";
import { useEffect } from "react";
import { useStore } from "../store";
import { useRouter } from "next/router";

const addFingerprint = async (setFG) => {
  const fg = await fgPromise.load();
  const result = await fg.get();
  const fingerprint = result.visitorId;
  setFG(fingerprint);
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { setFingerprint, user } = useStore();
  useEffect(() => {
    addFingerprint(setFingerprint);
  }, []);
  useEffect(() => {
    const redirect = router.asPath === "/login" ? "/" : router.asPath;
    if (!user) {
      router.push("/login?redirect=" + redirect);
    }
  }, [user]);
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
