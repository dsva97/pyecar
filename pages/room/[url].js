import React from "react";
import { VStack, HStack, Box, Image, Heading, Button } from "@chakra-ui/react";
import { Channel } from "../../channel";
import { Chat } from "../../components/Chat";
import dbConnect from "../../channel/connect";
import { useStore } from "../../store";
import { useRouter } from "next/router";

const Room = ({ room }) => {
  const router = useRouter();
  const { setUser, setOpenChat, openChat } = useStore();
  const logout = () => {
    setUser(null);
    router.push("/login");
  };

  const cam = () => {
    navigator.getUserMedia({ video: true, audio: true }, (stream) => {
      console.log(stream);
      // const video = document.querySelector("video");
      // video.srcObject = stream;
      // video.onloadedmetadata = () => {
      //   video.play();
      // };
    });
  };

  return (
    <VStack height={"100vh"}>
      <HStack justify="space-between" width="100%">
        <Button onClick={() => router.push("/")}>Home</Button>
        <HStack>
          <Heading>{room.title}</Heading>
          <Image height="40px" src={room.image} />
        </HStack>
        <HStack>
          <Button onClick={cam}>Cam</Button>
          <Button onClick={() => setOpenChat(!openChat)}>Chat</Button>
          <Button onClick={logout}>Logout</Button>
        </HStack>
      </HStack>
      <HStack flexGrow={1} width="100%" alignItems="stretch">
        <Box flexGrow={1}>Game</Box>
        <Chat room={room} />
      </HStack>
    </VStack>
  );
};

export const getServerSideProps = async (ctx) => {
  const { url } = ctx.query;
  await dbConnect();
  let channel = await Channel.findOne({ url });
  channel = JSON.parse(JSON.stringify(channel));
  return channel
    ? {
        props: {
          room: channel,
        },
      }
    : {
        redirect: {
          destination: "/",
        },
      };
};

export default Room;
