import React, { useRef } from "react";
import { Input as Field, Button, Flex } from "@chakra-ui/react";

export const Input = ({ message, setMessage, submit }) => {
  const ref = useRef();
  const send = () => {
    message && submit() && setMessage("");
    ref.current?.focus();
  };
  const handleKey = (e) => e.key === "Enter" && send();
  return (
    <Flex width="100%">
      <Field
        ref={ref}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={handleKey}
      />
      <Button onClick={send}>Send</Button>
    </Flex>
  );
};
