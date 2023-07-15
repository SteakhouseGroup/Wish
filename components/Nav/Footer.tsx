import React from "react";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { Flex, Box, Text, Link, Spacer } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      background="transparent"
      color="black"
      p={4}
    >
      <Flex align="center">
        <Text>&copy; {new Date().getFullYear()} Wish CRO</Text>
        <Spacer />
        <Link
          href="https://discord.gg/bQ8z8sDHw8"
          target="_blank"
          rel="noopener noreferrer"
          mr={2}
        >
          <FaDiscord size={24} color="black" />
        </Link>
        <Link
          href="https://twitter.com/WishCRO"
          target="_blank"
          rel="noopener noreferrer"
          mr={2}
        >
          <FaTwitter size={24} color="black" />
        </Link>
        <Link
          href="https://cronossteakhouse.com/dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={24} color="black" />
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
