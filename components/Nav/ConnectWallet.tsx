import { Box, Text, Icon, IconButton, } from "@chakra-ui/react";
import {
  ConnectWallet,
  NATIVE_TOKEN_ADDRESS,
  useAddress,
  useBalance,
useConnectedWallet
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi'; 

export default function ConnectWallet2() {
  const address = useAddress();
  const { data: nativeTokenData, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const MotionBox = motion(Box);
    const connectedWallet = useConnectedWallet();

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

const provider = new ethers.providers.JsonRpcProvider('https://node.croswap.com/rpc', {
  chainId: 25,
  name: 'cronos-mainnet',
  ensAddress: '0x7F4C61116729d5b27E5f180062Fdfbf32E9283E5'
});

// State to store the name
const [name, setName] = useState('');

// Fetch the name once the component is mounted
useEffect(() => {
  async function resolveNameAndLookupAddress() {
    try {
      if (address !== undefined) {
        const resolvedName = await provider.lookupAddress(address);
        setName(resolvedName || truncatedAddress);
      } else {
        console.error("Address is undefined.");
      }
    } catch (error) {
      console.error("Error fetching name:", error);
    }
  }
  resolveNameAndLookupAddress();
}, [address, provider]);


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
      modalTitle={"Welcome to Wish Cro. Please Connect."}
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
                color="white"
                fontWeight="bold"
                fontSize={{ base: "sm", md: "sm" }}
                position="relative"
              >
                {name ? name : truncatedAddress}
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
