import {
  Flex,
  Spacer,
  Image,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import ConnectWallet2 from "./ConnectWallet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py={4}
      px={4}
      color="Black"
    >
      <Flex align="center">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Menu"
            icon={
              <Image
                src="https://cdn.discordapp.com/attachments/1126876974179172424/1128657268704030850/IMG_4036.jpg"
                alt="Logo"
                h={"60px"}
                w={"60px"}
                borderRadius={"lg"}
              />
            }
            transition="all 0.2s"
            borderWidth="1px"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
            onClick={handleToggle}
          />
          <MenuList>
            <MenuItem as="a" href="/">
              Home
            </MenuItem>
            <MenuItem as="a" href="/mint">
              Mint an NFT
            </MenuItem>
            <MenuItem as="a" href="/View">
              View your NFT's
            </MenuItem>
            <MenuItem as="a" href="/Token">
              Token Information
            </MenuItem>
          </MenuList>
        </Menu>
        <Heading ml={2} fontSize="2xl" textAlign={"center"}>
          Wish Cro
        </Heading>
      </Flex>

      <Spacer />

      <Flex align="center">
        <ConnectWallet2 />
      </Flex>
    </Flex>
  );
};

export default Header;
