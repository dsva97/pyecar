import React from "react";
import { Center, Input, VStack, Avatar, Button } from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = React.useState("");
  return (
    <Center minHeight="100vh">
      <VStack justify={"center"} gap="1em">
        <Avatar
          size="xl"
          name={username}
          src="https://bit.ly/tioluwani-kolawole"
        />
        <input type="file" />

        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose your username"
          w="auto"
        />
        <Button colorScheme="blue">Login</Button>
      </VStack>
    </Center>
  );
};

export default Login;
