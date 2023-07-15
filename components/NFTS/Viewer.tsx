import { Box, Text, Grid, Container, Heading } from "@chakra-ui/react";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { contractConst } from "../../cost/parameters";
import styles from "../../styles/NFT.module.css";

export default function Viewer() {
  const address = useAddress();
  const { contract: NFTContract, isLoading: isLoadingNFTContract } =
    useContract(contractConst, "edition-drop");
  const { data: ownedNFTS, isLoading: isLoadingownedNFTS } = useOwnedNFTs(
    NFTContract,
    address
  );

  if (!ownedNFTS) {
    return null; // or render a loading state or an error message
  }

  return (
    <Container
      alignContent="center"
      justifyContent="center"
      maxW={1200}
      margin="auto"
    >
      <Heading> View your NFT's</Heading>
      <Grid
        margin="auto"
        alignContent="center"
        justifyContent="center"
        p={2}
        gap={8}
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
      >
        {ownedNFTS?.map((nft) => (
          <Box
            bg="gray"
            borderRadius="lg"
            boxShadow="xl"
            p={4}
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "2xl",
            }}
            key={nft?.metadata.id.toString()}
            maxHeight={200}
            maxWidth={150}
            alignContent="center"
            justifyContent="center"
          >
            <ThirdwebNftMedia
              metadata={nft?.metadata}
              className={styles.nftMediaBull}
            />
            <Text fontSize="md" fontWeight="bold" textAlign={"center"}>
              {nft?.metadata.name}
            </Text>
          </Box>
        ))}
      </Grid>
    </Container>
  );
}
