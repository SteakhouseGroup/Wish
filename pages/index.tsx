import { Box, Text, VStack, Image, SimpleGrid } from "@chakra-ui/react";
import { NextPage } from "next";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useContract } from "@thirdweb-dev/react";
import { contractConst } from "../cost/parameters";

const Home: NextPage = () => {
  const [showItems, setShowItems] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleBoxClick = () => {
    setIsPressed(true);
  };

  useEffect(() => {
    setShowItems(true);
  }, []);

  const currentDate = new Date();
  const targetDate = new Date("2023-07-15T23:00:00Z");

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      h={700}
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        maxW={1200}
        margin="auto"
        spacing={4}
      >
        {showItems && (
          <motion.a
            href="/mint"
            rel="noopener noreferrer"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={handleBoxClick}
          >
            <motion.div
              whileHover={{ translateY: -4, boxShadow: "2xl" }}
              whileTap={{ scale: 0.95 }}
              style={isPressed ? { transform: "scale(0.95)" } : {}}
            >
              <Box
                bg="white"
                borderRadius="md"
                boxShadow="xl"
                p={4}
                bgGradient="linear(to-r, #6B46C1, #FFD700)"
              >
                <VStack spacing={2} textAlign="center">
                  <Image
                    src="/images/lamp.jpeg"
                    alt="Placeholder preview of starter"
                    width={200}
                    height={200}
                    borderRadius={"md"}
                    boxShadow="xl"
                  />
                  <Text fontSize="2xl" fontWeight="bold">
                    Mint
                  </Text>
                  <Text maxW={600}>
                    Make your dreams come true with the Wish Lamps NFT Mint.{" "}
                    <br /> Public mint
                    started 7pm EST July 18th <br /> Mint price = 250 CRO
                  </Text>
                </VStack>
              </Box>
            </motion.div>
          </motion.a>
        )}

        {showItems && (
          <motion.a
            href="/View"
            rel="noopener noreferrer"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            onClick={handleBoxClick}
          >
            <motion.div
              whileHover={{ translateY: -4, boxShadow: "2xl" }}
              whileTap={{ scale: 0.95 }}
              style={isPressed ? { transform: "scale(0.95)" } : {}}
            >
              <Box
                bg="white"
                borderRadius="md"
                boxShadow="xl"
                p={4}
                bgGradient="linear(to-t, #6B46C1, #FFD700)"
              >
                <VStack spacing={2} textAlign="center">
                  <Image
                    src="/images/logo.jpeg"
                    alt="Placeholder preview of starter"
                    width={200}
                    height={200}
                    borderRadius={"md"}
                    boxShadow="xl"
                  />
                  <Text fontSize="2xl" fontWeight="bold">
                    View
                  </Text>
                  <Text maxW={600}>
                    View all your newly minted NFT's in one location.
                  </Text>
                </VStack>
              </Box>
            </motion.div>
          </motion.a>
        )}

        {showItems && (
          <motion.a
            href="/Token"
            rel="noopener noreferrer"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            onClick={handleBoxClick}
          >
            <motion.div
              whileHover={{ translateY: -4, boxShadow: "2xl" }}
              whileTap={{ scale: 0.95 }}
              style={isPressed ? { transform: "scale(0.95)" } : {}}
            >
              <Box
                bg="white"
                borderRadius="md"
                boxShadow="xl"
                p={4}
                bgGradient="linear(to-l, #6B46C1, #FFD700)"
              >
                <VStack spacing={2} textAlign="center">
                  <Image
                    src="/images/logo.jpeg"
                    alt="Placeholder preview of starter"
                    width={200}
                    height={200}
                    borderRadius={"md"}
                    boxShadow="xl"
                  />
                  <Text fontSize="2xl" fontWeight="bold">
                    Token
                  </Text>
                  <Text maxW={600}>
                    Launching with great magnitude in May of 2023, Wish token
                    stormed onto the Cronos Scene and made a name for itself.
                    Now releasing an NFT mint who knows what the future holds
                    for the token. To learn more about wish token click here.
                  </Text>
                </VStack>
              </Box>
            </motion.div>
          </motion.a>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
