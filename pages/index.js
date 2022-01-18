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
} from "@chakra-ui/react";
import "../store";

const Create = ({ onClose, isOpen }) => {
  const createRoom = () => {
    fetch("/api/room", {
      method: "POST",
    });
  };
  return (
    <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>Login now</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="Title of the Room" />
          <Button onClick={() => createRoom}>Create</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h1>Home</h1>
      <Button onClick={() => setIsOpen(true)}>Hola</Button>
      <Create isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Home;
