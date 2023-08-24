import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  metamaskWallet,
  SelectUIProps,
  magicLink,
  ConnectUIProps,
  WalletConfig,
  trustWallet,
  walletConnect,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { CronosBeta } from "@thirdweb-dev/chains";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/Nav/Header";
import Head from "next/head";
import { InjectedWallet } from "@thirdweb-dev/wallets";
import Footer from "../components/Nav/Footer";

const injectedWalletConfig: WalletConfig<InjectedWallet> = {
  id: "injected-wallet",
  meta: {
    name: "DeFi Wallet",
    iconURL: "/images/Defi.png",
  },
  create: () => new InjectedWallet(),
  isInstalled: () => true,
};

const metamaskConfig = metamaskWallet();
const trustwalletConfig = trustWallet();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      supportedWallets={[
        injectedWalletConfig,
        metamaskConfig,
        trustwalletConfig,
      ]}
      activeChain={{
        // === Required information for connecting to the network === \\
        chainId: 25,

        // Array of RPC URLs to use
        rpc: [
          "https://rpc.vvs.finance/",
          "https://rpc.crodex.app/",
        ],

        // === Information for adding the network to your wallet (how it will appear for first time users) === \\
        // Information about the chains native currency (i.e. the currency that is used to pay for gas)
        nativeCurrency: {
          decimals: 18,
          name: "Cronos",
          symbol: "CRO",
        },
        shortName: "CRO",
        slug: "Cronos",
        testnet: false,
        chain: "Cronos Mainnet",
        name: "Cronos Mainnet", // Name of the network
      }}
      dAppMeta={{
        name: "Wish Cro Dapp",
        description: "With Cro Dapp",
        logoUrl: "/images/Logo.jpeg",
        url: "https://www.cronossteakhouse.com",
        isDarkMode: true,
      }}
      sdkOptions={{
        gatewayUrls: [
          "https://cloudflare-ipfs.com/ipfs/",
          "https://ipfs-2.thirdwebcdn.com/ipfs",
        ],
      }}
    >
      <Head>
        <title>Wish CRO Dapp</title>
        {/* Add other meta tags, links, etc. if needed */}
      </Head>
      <ChakraProvider>
        <Header />

        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
