import { NextPage } from "next";
import { Box, Heading, Text } from "@chakra-ui/react";


const Custom404: NextPage = () => {
  return (
    <Box textAlign="center" mt={8}>
      <Heading as="h1" size="2xl" mb={4}>
        How in the 404 did you get here?
      </Heading>
      <Text fontSize="xl" color="gray.600">
        The genie you're looking for is not in this lamp
      </Text>
    </Box>

  );
};

export default Custom404;
