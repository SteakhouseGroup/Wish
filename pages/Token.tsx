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
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Token: NextPage = () => {
  const [showItems, setShowItems] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleBoxClick = () => {
    setIsPressed(true);
  };

  useEffect(() => {
    setShowItems(true);
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="85vh" // Ensure the parent Box takes the full viewport height
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        maxW={1200}
        margin="auto"
        spacing={4}
      >
        <motion.a
          href="/mint"
          rel="noopener noreferrer"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleBoxClick}
        >
          <motion.div
            whileHover={{ translateY: -4, boxShadow: "2xl" }}
            whileTap={{ scale: 0.95 }}
            style={isPressed ? { transform: "scale(0.95)" } : {}}
          >
            <Box bg="white" borderRadius="md" boxShadow="xl" p={4}>
              <VStack spacing={2} textAlign="center">
                <Image
                  src="https://cdn.discordapp.com/attachments/1126876974179172424/1129817552692981832/Skin_Noise.png"
                  alt="Placeholder preview of starter"
                  width={200}
                  height={200}
                  borderRadius={"md"}
                  boxShadow="xl"
                />
              </VStack>
            </Box>
          </motion.div>
        </motion.a>
        <motion.a
          href="/mint"
          rel="noopener noreferrer"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleBoxClick}
        >
          <motion.div
            whileHover={{ translateY: -4, boxShadow: "2xl" }}
            whileTap={{ scale: 0.95 }}
            style={isPressed ? { transform: "scale(0.95)" } : {}}
          >
            <Box bg="white" borderRadius="md" boxShadow="xl" p={4}>
              <VStack spacing={2} textAlign="center">
                <Image
                  src="https://cdn.discordapp.com/attachments/1126876974179172424/1129817554332942437/IMG_4034.png"
                  alt="Placeholder preview of starter"
                  width={200}
                  height={200}
                  borderRadius={"md"}
                  boxShadow="xl"
                />
              </VStack>
            </Box>
          </motion.div>
        </motion.a>
        <motion.a
          href="/mint"
          rel="noopener noreferrer"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleBoxClick}
        >
          <motion.div
            whileHover={{ translateY: -4, boxShadow: "2xl" }}
            whileTap={{ scale: 0.95 }}
            style={isPressed ? { transform: "scale(0.95)" } : {}}
          >
            <Box bg="white" borderRadius="md" boxShadow="xl" p={4}>
              <VStack spacing={2} textAlign="center">
                <Image
                  width={200}
                  height={200}
                  borderRadius={"md"}
                  boxShadow="xl"
                  src="/images/Logo.jpeg"
                />
              </VStack>
            </Box>
          </motion.div>
        </motion.a>
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

        <motion.a
          href="/mint"
          rel="noopener noreferrer"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleBoxClick}
        >
          <motion.div
            whileHover={{ translateY: -4, boxShadow: "2xl" }}
            whileTap={{ scale: 0.95 }}
            style={isPressed ? { transform: "scale(0.95)" } : {}}
          >
            <Box bg="white" borderRadius="md" boxShadow="xl" p={4}>
              <VStack spacing={2} textAlign="center">
                <Image
                  src="https://cdn.discordapp.com/attachments/1126876974179172424/1129817555045986466/Skin_Caramel.png"
                  alt="Placeholder preview of starter"
                  width={200}
                  height={200}
                  borderRadius={"md"}
                  boxShadow="xl"
                />
              </VStack>
            </Box>
          </motion.div>
        </motion.a>
        <motion.a
          href="/mint"
          rel="noopener noreferrer"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleBoxClick}
        >
          <motion.div
            whileHover={{ translateY: -4, boxShadow: "2xl" }}
            whileTap={{ scale: 0.95 }}
            style={isPressed ? { transform: "scale(0.95)" } : {}}
          >
            <Box bg="white" borderRadius="md" boxShadow="xl" p={4}>
              <VStack spacing={2} textAlign="center">
                <Image
                  src="https://cdn.discordapp.com/attachments/1126876974179172424/1129817559919755375/Skin_White_Peach.png"
                  alt="Placeholder preview of starter"
                  width={200}
                  height={200}
                  borderRadius={"md"}
                  boxShadow="xl"
                />
              </VStack>
            </Box>
          </motion.div>
        </motion.a>
      </SimpleGrid>
    </Box>
  );
};

export default Token;
