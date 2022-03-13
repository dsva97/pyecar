import React, { useState, useEffect } from "react";
import Ably from "ably/promises";
import { Input } from "../components/Input";
import { Box, VStack } from "@chakra-ui/react";
import { useStore } from "../store";

const key = process.env.NEXT_PUBLIC_ABLY_KEY;
const client = new Ably.Realtime(key);

export const Chat = ({ room: { title, url, image } }) => {
  const { user, openChat } = useStore();
  const myId = user?.id;
  const channel = client.channels.get(url);
  const [messages, updateMessages] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    async function subscribe() {
      await channel.subscribe((message) => {
        const newMessages = messages.slice();
        newMessages.push(message.data.text);

        updateMessages(newMessages);
      });
    }

    subscribe();

    return function cleanup() {
      channel.unsubscribe();
    };
  });
  const sendMessage = async () => {
    try {
      await channel.publish({
        name: "chat",
        data: { text: { user, message } },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <VStack overflow={"hidden"} width={openChat ? "auto" /*"300px" */ : 0}>
      <VStack flexGrow={1} width={"100%"}>
        {messages.map(({ user, message }, index) => (
          <Box
            key={"item" + index}
            width={"100%"}
            textAlign={user.id === myId ? "right" : "left"}
          >
            <strong>{user.username}</strong>
            <p>{message}</p>
          </Box>
        ))}
      </VStack>
      <Input message={message} setMessage={setMessage} submit={sendMessage} />
    </VStack>
  );
};
