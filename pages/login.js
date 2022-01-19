import React from "react";
import { Center, Input, VStack, Avatar, Button } from "@chakra-ui/react";
import { useStore } from "../store";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [image, setImage] = React.useState("");
  const { setUser, fingerprint } = useStore();
  const router = useRouter();

  const login = () => {
    setUser({ username, image, id: fingerprint });
    const redirect = router.query?.redirect || "/";
    router.push(redirect);
  };

  return (
    <Center minHeight="100vh">
      <VStack justify={"center"} gap="1em">
        <Avatar size="xl" name={username} src={image} />

        <Input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="URL of your image here"
          w="auto"
        />

        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose your username"
          w="auto"
        />
        <Button onClick={login} colorScheme="blue">
          Login
        </Button>
      </VStack>
    </Center>
  );
};

export default Login;
