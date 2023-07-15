import { Box, Text } from "@chakra-ui/react";
import {
  ConnectWallet,
  NATIVE_TOKEN_ADDRESS,
  useAddress,
  useBalance,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { motion } from "framer-motion";

export default function ConnectWallet2() {
  const address = useAddress();
  const { data: nativeTokenData, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const MotionBox = motion(Box);

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  let truncatedValue = "";
  if (nativeTokenData?.value) {
    const formattedValue = ethers.utils.formatUnits(nativeTokenData.value, 18);
    truncatedValue = `${formattedValue.split(".")[0]} ${
      nativeTokenData.symbol
    }`; // Add symbol after truncated value
  }

  return (
    <Box
      h="60px"
      w="180px"
      p={2}
      display="inline-block"
      borderRadius="md"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.05)" }}
      _active={{ transform: "scale(0.95)" }}
      position="relative"
      color={"black"}
      textAlign={"center"}
      as={ConnectWallet}
      btnTitle="Connect To WishCro"
      modalTitle={"Welcome to Steakhouse Dapps."}
      detailsBtn={() => {
        return (
          <Box
            h="60px"
            w="180px"
            p={2}
            display="inline-block"
            borderRadius="md"
            boxShadow="md"
            transition="all 0.3s"
            _hover={{ transform: "scale(1.05)" }}
            _active={{ transform: "scale(0.95)" }}
            position="relative"
            color={"black"}
          >
            <Text
              textAlign="center"
              color="black"
              fontWeight="bold"
              fontSize={{ base: "sm", md: "md" }}
              position="relative"
            >
              {truncatedAddress}
            </Text>
            <Text textAlign="center" color="black" position="relative">
              {truncatedValue}
            </Text>
          </Box>
        );
      }}
    />
  );
}
