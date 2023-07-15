import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  SimpleGrid,
  ButtonGroup,
  Stack,
  useToast,
  Heading,
} from "@chakra-ui/react";

import { FaPlus, FaMinus } from "react-icons/fa";
import {
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimConditions,
  useClaimerProofs,
  useClaimIneligibilityReasons,
  useContract,
  useContractMetadata,
  useTotalCirculatingSupply,
  useUnclaimedNFTSupply,
  Web3Button,
} from "@thirdweb-dev/react";
import { useMemo, useState } from "react";
import { BigNumber, ethers, utils } from "ethers";
import { parseIneligibility } from "../../utils/parseIneligibility";
import { contractConst } from "../../cost/parameters";

export default function WishMint() {
  const address = useAddress();
  const tokenId = "5";
  const toast = useToast();
  const [ADLoading, setADLoading] = useState(false);

  const handleSuccess = () => {
    toast({
      title: "NFT Mint successful",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleError = () => {
    toast({
      title:
        "Something went wrong whilst trying to mint your NFT, if this wasnt you please try again. If the error persists contact us on discord.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const contractAddress = contractConst;
  const contractQuery = useContract(contractAddress);
  const contractMetadata = useContractMetadata(contractQuery.contract);

  const [quantity, setQuantity] = useState(1);
  const claimConditions = useClaimConditions(contractQuery.contract);
  const activeClaimCondition = useActiveClaimConditionForWallet(
    contractQuery.contract,
    address,
    tokenId
  );
  const claimerProofs = useClaimerProofs(
    contractQuery.contract,
    address || "",
    tokenId
  );
  const claimIneligibilityReasons = useClaimIneligibilityReasons(
    contractQuery.contract,
    {
      quantity,
      walletAddress: address || "",
    },
    tokenId
  );

  const unclaimedSupply = useUnclaimedNFTSupply(contractQuery.contract);
  const claimedSupply2 = useTotalCirculatingSupply(
    contractQuery.contract,
    tokenId
  );

  const totalAvailableSupply = useMemo(() => {
    try {
      return BigNumber.from(activeClaimCondition.data?.availableSupply || 0);
    } catch {
      return BigNumber.from(1_000_000);
    }
  }, [activeClaimCondition.data?.availableSupply]);

  const numberClaimed = useMemo(() => {
    return BigNumber.from(claimedSupply2.data || 0).toString();
  }, [claimedSupply2]);

  const numberTotal = useMemo(() => {
    const n = totalAvailableSupply.add(
      BigNumber.from(claimedSupply2.data || 0)
    );
    if (n.gte(1_000_000)) {
      return "";
    }
    return n.toString();
  }, [totalAvailableSupply, claimedSupply2]);

  const priceToMint = useMemo(() => {
    const bnPrice = BigNumber.from(
      activeClaimCondition.data?.currencyMetadata.value || 0
    );
    return `${utils.formatUnits(
      bnPrice.mul(quantity).toString(),
      activeClaimCondition.data?.currencyMetadata.decimals || 18
    )} ${activeClaimCondition.data?.currencyMetadata.symbol}`;
  }, [
    activeClaimCondition.data?.currencyMetadata.decimals,
    activeClaimCondition.data?.currencyMetadata.symbol,
    activeClaimCondition.data?.currencyMetadata.value,
    quantity,
  ]);

  const maxClaimable = useMemo(() => {
    let bnMaxClaimable;
    try {
      bnMaxClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimableSupply || 0
      );
    } catch (e) {
      bnMaxClaimable = BigNumber.from(1_000_000);
    }

    let perTransactionClaimable;
    try {
      perTransactionClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimablePerWallet || 0
      );
    } catch (e) {
      perTransactionClaimable = BigNumber.from(1_000_000);
    }

    if (perTransactionClaimable.lte(bnMaxClaimable)) {
      bnMaxClaimable = perTransactionClaimable;
    }

    const snapshotClaimable = claimerProofs.data?.maxClaimable;

    if (snapshotClaimable) {
      if (snapshotClaimable === "0") {
        // allowed unlimited for the snapshot
        bnMaxClaimable = BigNumber.from(1_000_000);
      } else {
        try {
          bnMaxClaimable = BigNumber.from(snapshotClaimable);
        } catch (e) {
          // fall back to default case
        }
      }
    }

    let max;
    if (totalAvailableSupply.lt(bnMaxClaimable)) {
      max = totalAvailableSupply;
    } else {
      max = bnMaxClaimable;
    }

    if (max.gte(1_000_000)) {
      return 1_000_000;
    }
    return max.toNumber();
  }, [
    claimerProofs.data?.maxClaimable,
    totalAvailableSupply,
    activeClaimCondition.data?.maxClaimableSupply,
    activeClaimCondition.data?.maxClaimablePerWallet,
  ]);

  const isSoldOut = useMemo(() => {
    try {
      return (
        (activeClaimCondition.isSuccess &&
          BigNumber.from(activeClaimCondition.data?.availableSupply || 0).lte(
            0
          )) ||
        numberClaimed === numberTotal
      );
    } catch (e) {
      return false;
    }
  }, [
    activeClaimCondition.data?.availableSupply,
    activeClaimCondition.isSuccess,
    numberClaimed,
    numberTotal,
  ]);

  const canClaim = useMemo(() => {
    return (
      activeClaimCondition.isSuccess &&
      claimIneligibilityReasons.isSuccess &&
      claimIneligibilityReasons.data?.length === 0 &&
      !isSoldOut
    );
  }, [
    activeClaimCondition.isSuccess,
    claimIneligibilityReasons.data?.length,
    claimIneligibilityReasons.isSuccess,
    isSoldOut,
  ]);

  const isLoading = useMemo(() => {
    return (
      activeClaimCondition.isLoading ||
      claimedSupply2.isLoading ||
      !contractQuery.contract
    );
  }, [
    activeClaimCondition.isLoading,
    contractQuery.contract,
    claimedSupply2.isLoading,
  ]);

  const buttonLoading = useMemo(
    () => isLoading || claimIneligibilityReasons.isLoading,
    [claimIneligibilityReasons.isLoading, isLoading]
  );

  const buttonText = useMemo(() => {
    if (isSoldOut) {
      return "Not Available To Mint";
    }

    if (canClaim) {
      const pricePerToken = BigNumber.from(
        activeClaimCondition.data?.currencyMetadata.value || 0
      );
      if (pricePerToken.eq(0)) {
        return "Mint (Free)";
      }
      return `Mint ${quantity} NFT's for (${priceToMint})`;
    }
    if (claimIneligibilityReasons.data?.length) {
      return parseIneligibility(claimIneligibilityReasons.data, quantity);
    }
    if (buttonLoading) {
      return "Checking eligibility...";
    }

    return "Minting not available";
  }, [
    isSoldOut,
    canClaim,
    claimIneligibilityReasons.data,
    buttonLoading,
    activeClaimCondition.data?.currencyMetadata.value,
    priceToMint,
    quantity,
  ]);

  const dropNotReady = useMemo(
    () =>
      claimConditions.data?.length === 0 ||
      claimConditions.data?.every((cc) => cc.maxClaimableSupply === "0"),
    [claimConditions.data]
  );

  const dropStartingSoon = useMemo(
    () =>
      (claimConditions.data &&
        claimConditions.data.length > 0 &&
        activeClaimCondition.isError) ||
      (activeClaimCondition.data &&
        activeClaimCondition.data.startTime > new Date()),
    [
      activeClaimCondition.data,
      activeClaimCondition.isError,
      claimConditions.data,
    ]
  );

  const currentDate = new Date();
  const targetDate = new Date("2023-07-15T23:00:00Z");

  return (
    <div>
      <Flex
        minHeight="80vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <SimpleGrid h={5} />

        <Box
          width={360}
          height={360}
          p={6}
          bg="white"
          borderRadius="lg"
          boxShadow="xl"
        >
          <Image src={contractMetadata.data?.image} borderRadius={"2xl"} />
        </Box>
        <SimpleGrid w={20} h={10} />
        <Box>
          <Box
            width={{ base: 360, md: 800 }}
            p={6}
            borderRadius="lg"
            boxShadow="xl"
            position="relative"
            overflow="hidden"
            bgImage={"gold"}
          >
            <Text
              fontSize="5xl"
              mb={4}
              textAlign={{ base: "center", md: "left" }}
              textColor={"Black"}
              fontWeight={"bold"}
            >
              {contractMetadata.data?.name}
            </Text>
            <Text
              fontSize="xl"
              mb={4}
              textAlign={{ base: "center", md: "left" }}
              fontWeight={"bold"}
            ></Text>
            <Text
              fontSize="xl"
              mb={4}
              textAlign={{ base: "center", md: "left" }}
              fontWeight={"bold"}
            ></Text>
            {currentDate.getTime() < targetDate.getTime() ? (
              <Heading fontSize={"md"} mb="4">
                This drop is not ready to be minted yet. <br /> Allowlist starts
                at 7pm EST on the 15th of July.
              </Heading>
            ) : (
              <Text
                fontSize="2xl"
                mb={4}
                textAlign={{ base: "center", md: "left" }}
                fontWeight={"bold"}
                textColor={"blackAlpha.700"}
              >
                Price: {priceToMint}
              </Text>
            )}
            <Text
              mb={4}
              textAlign={{ base: "center", md: "left" }}
              fontWeight={"bold"}
            >
              {contractMetadata.data?.description}
            </Text>
            <Flex
              direction={{ base: "column", md: "column" }}
              align={{ base: "center", md: "flex-start" }}
              justify={{ base: "center", md: "flex-start" }}
              textColor={"Black"}
            >
              <Box textColor={"Black"}>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={4}
                  mt={4}
                >
                  <Button
                    as={Web3Button}
                    color="Black"
                    size="lg"
                    contractAddress={contractQuery.contract?.getAddress() || ""}
                    action={(cntr: {
                      erc1155: { claim: (arg0: any, arg1: number) => any };
                    }) => cntr.erc1155.claim(0, quantity)}
                    isDisabled={!canClaim || buttonLoading}
                    onError={(err) => {
                      handleError();
                    }}
                    onSuccess={() => {
                      handleSuccess();
                    }}
                  >
                    {buttonLoading ? <Text>Loading</Text> : buttonText}
                  </Button>
                  <Button color="Black" size="lg">
                    {numberClaimed} / 3600
                  </Button>
                </Stack>
              </Box>
              <Box mt={{ base: 2, md: 4 }}>
                <ButtonGroup>
                  <Button
                    color="Black"
                    size="lg"
                    onClick={() => {
                      const value = quantity - 1;
                      if (value > maxClaimable) {
                        setQuantity(maxClaimable);
                      } else if (value < 1) {
                        setQuantity(1);
                      } else {
                        setQuantity(value);
                      }
                    }}
                    disabled={isSoldOut || quantity - 1 < 1}
                  >
                    <FaMinus />
                  </Button>

                  <Button color="Black" size="lg">
                    {quantity}
                  </Button>

                  <Button
                    color="Black"
                    size="lg"
                    onClick={() => {
                      const value = quantity + 1;
                      if (value > maxClaimable) {
                        setQuantity(maxClaimable);
                      } else if (value < 1) {
                        setQuantity(1);
                      } else {
                        setQuantity(value);
                      }
                    }}
                    disabled={isSoldOut || quantity + 1 > maxClaimable}
                  >
                    <FaPlus />
                  </Button>
                </ButtonGroup>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>

      <SimpleGrid h={5} />
    </div>
  );
}
