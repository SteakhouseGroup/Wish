import {
  Box,
  Center,
  HStack,
  Text,
  VStack,
  Image,
  Grid,
  SimpleGrid,
  Container,
  Heading,
  Button,
} from "@chakra-ui/react";
import { NextPage } from "next";

const Token: NextPage = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh" // Ensure the parent Box takes the full viewport height
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        maxW={1200}
        margin="auto"
        spacing={4}
      >
        <Box
          margin="auto"
          alignItems="center"
          justifyContent="center"
          textAlign={"center"}
        >
          <Image h={250} w={250} src="/images/Logo.jpeg" />
        </Box>
        <VStack>
          <Box
            margin="auto"
            alignItems="center"
            justifyContent="center"
            textAlign={"center"}
          >
            {" "}
            <Heading maxWidth={"600px"}>Contract address:</Heading>
            <Text maxWidth={"350px"}>
              0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23
            </Text>
            <Button
              as={"a"}
              href="https://swap.crodex.app/#/swap?outputCurrency=0xbe8b87a81d9c1d954d5ab35b7df476b6587e8d92"
            >
              {" "}
              Buy Now On Crodex
            </Button>
          </Box>
          <iframe
            src="https://dexscreener.com/cronos/0x4B26c59Cd2Ca9184F701d7ad26B31F81702B52Ce?embed=1&trades=0"
            frameBorder="0"
            allowFullScreen
            style={{ width: "80%", height: "80vh" }}
          ></iframe>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default Token;
