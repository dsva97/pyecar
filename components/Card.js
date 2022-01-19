import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export function Card({ title, url, image }) {
  const router = useRouter();
  return (
    <Center
      py={12}
      cursor="pointer"
      onClick={() => router.push("/room/" + url)}
    >
      <Box
        role={"group"}
        p={6}
        maxW={"200px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image rounded={"lg"} objectFit={"cover"} src={image} />
        </Box>
        <Heading
          pt={10}
          align={"center"}
          fontSize={"2xl"}
          fontFamily={"body"}
          fontWeight={500}
        >
          {title}
        </Heading>
      </Box>
    </Center>
  );
}
