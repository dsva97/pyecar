import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Image,
  Grid,
  Heading,
  HStack,
} from "@chakra-ui/react";
import dbConnect from "../channel/connect";
import { Channel } from "../channel";
import { useRouter } from "next/router";
import "../store";
import { Card } from "../components/Card";

const Create = ({ onClose, isOpen }) => {
  const [enabled, setEnabled] = useState(true);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();

  const createRoom = () => {
    const body = JSON.stringify({ title, url, image });
    setEnabled(false);

    fetch("/api/room", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setEnabled(true);
        console.log(res);
        router.push("/room/" + url);
      })
      .catch((error) => {
        setEnabled(true);
        console.error(error);
      });
  };
  return (
    <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>Create Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            my={2}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of the Room"
          />
          <Input
            my={2}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL of the Room"
          />
          <Input
            my={2}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image of the Room"
          />
          <Image src={image} alt={title} />
          <Button my={2} disabled={!enabled} onClick={() => createRoom()}>
            Create
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Home = ({ channels }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <HStack justify="space-between">
        <Heading>PYECar</Heading>
        <Button onClick={() => setIsOpen(true)}>Create Room</Button>
      </HStack>
      <Create isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Grid gridTemplateColumns={"repeat(auto-fit, minmax(200px, 1fr))"}>
        {channels.map((channel) => (
          <Card key={channel._id} {...channel} />
        ))}
      </Grid>
    </div>
  );
};

export const getServerSideProps = async () => {
  await dbConnect();
  const channels = JSON.parse(JSON.stringify(await Channel.find()));
  return {
    props: {
      channels,
    },
  };
};

export default Home;
