import React from "react";
import { isBrowser } from "@/env";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { WalletInfo } from "./types";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { Decimal } from 'decimal.js'
import { baseWeb } from "./config";

/** web3 config**/
export const NetworkContextName = "NETWORK";
export enum ChainId {
  ETH = 1,
  KOVAN = 42,
  RINKEBY = 4,
  BSC = 56,
  BSCTEST = 97,
  POLYGON = 137,
  MUMBAI = 80001,
}
export const supportedChainIds = [
  ChainId.ETH,
  ChainId.RINKEBY,
  ChainId.KOVAN,
  ChainId.BSC,
  ChainId.BSCTEST,
  ChainId.POLYGON,
  ChainId.MUMBAI,
];

export const ChainUrls = {
  [ChainId.ETH]:
    "https://mainnet.infura.io/v3/1b61fbc7b71c4452a1d0a6ae072c673d",
  [ChainId.KOVAN]:
    "https://kovan.infura.io/v3/1b61fbc7b71c4452a1d0a6ae072c673d",
  [ChainId.RINKEBY]: "https://rinkeby.infura.io/v3/1b61fbc7b71c4452a1d0a6ae072c673d",
  [ChainId.POLYGON]: "https://rpc-mainnet.maticvigil.com/",
  [ChainId.BSCTEST]: "https://data-seed-prebsc-1-s3.binance.org:8545",
  [ChainId.BSC]: "https://bsc-dataseed.binance.org",
  [ChainId.MUMBAI]: "https://rpc-mumbai.maticvigil.com/",
};
export const defaultChainId = ChainId.ETH;

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const NFT_ADDRESS = "0x8903a3cD631DDcaADb0746229152732F5DbcACD1";
export const BLIND_ADDRESS = "0x8728F73B2b90C43D506750A5fcc1213Fe58f9Ab7";

export const NFT_PA_ADDRESS = "0x8577FA4CFF7567Ff95D5D27fE332512a58A8a476";
export const BLIND_PA_ADDRESS = "0xfd94909007f55700bcf1601d12f1924c86f67ee8";

export const network = new NetworkConnector({
  urls: ChainUrls,
  defaultChainId: defaultChainId,
});

export const metamask_injected = new InjectedConnector({
  supportedChainIds,
});

export const coinbase_injected = new InjectedConnector({
  supportedChainIds,
});

export const walletconnect = new WalletConnectConnector({
  rpc: ChainUrls,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  supportedChainIds,
  chainId: defaultChainId,
});

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: metamask_injected,
    name: "MetaMask",
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
  },
  COINBASE: {
    connector: coinbase_injected,
    name: "Coinbase Wallet",
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: "WalletConnect",
    description: "Connect to Trust Wallet, Rainbow Wallet and more...",
    href: null,
    color: "#4196FC",
    mobile: true,
  },
};

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider, "any");
  library.pollingInterval = 15000;
  return library;
};

export const signMessage = async (msg: string, account: string) => {
  const ethResult = await window.ethereum?.request({
    method: "personal_sign",
    params: [msg, account],
  });
  return ethResult;
};

/** other func**/
export function setCookie(name: string, value: string) {
  if (!isBrowser) return;
  const Days = 30;
  const exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toUTCString() + ";path=/";
}

export const getSigner = (
  library: Web3Provider,
  account: string
): JsonRpcSigner => {
  return library.getSigner(account).connectUnchecked();
};

export const getProviderOrSigner = (
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner => {
  return account ? getSigner(library, account) : library;
};

export const useActiveWeb3React =
  (): Web3ReactContextInterface<Web3Provider> & { chainId?: ChainId } => {
    const context = useWeb3ReactCore<Web3Provider>();
    const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName);
    return context.active ? context : contextNetwork;
  };

export const useContract = (address: string, ABI: any): Contract | null => {
  const { chainId, library, account } = useActiveWeb3React();
  return React.useMemo(() => {
    if (!chainId || !account || !library) return null;
    if (address === ZERO_ADDRESS) return null;
    try {
      return new Contract(
        address,
        ABI,
        getProviderOrSigner(library, account) as any
      );
    } catch (error) {
      return null;
    }
  }, [chainId, library, account]);
};

export const getProofList = (list: string[], caller: string): string[] => {
  const tree = new MerkleTree(list, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });
  const leaf = keccak256(caller);
  const proof = tree.getHexProof(leaf);
  return proof;
};

export const switchChainId = (id: number) => {
  return window?.ethereum?.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: `0x${id.toString(16)}` }],
  });
};

export function dec(number: number | string) {
  if (!number) return new Decimal(0)
  return new Decimal(number)
}

export function formatDecimals(number: number | string | undefined, decimals: number = 18) {
  if (!number) return 0
  const decNumber = dec(number)
  const rate = dec(10).toPower(decimals)
  return decNumber.div(rate).toFixed()
}

export function ipfsTransferUrl(hash: string) {
  return hash.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/")
    .replace('/ipfs/ipfs/', '/ipfs/');
}

export const shareTwitter = (account: string) => {
  const twitter = "https://twitter.com/intent/tweet?text=";
  let url = baseWeb;
  if (account) {
    url = `${url}${account}?type=invite`;
  }
  const txtTop = '🔥Check out this unique space I created on Non-Fungible Friend @NonFFriend,\n👆\n';
  const txtBottom = '\n➡️Visit my space and collect some NFF points to boost your level!';
  const noticeTxt = '\n#space #web3 #NFTs\n';
  const shareUrl = 'https://twitter.com/NonFFriend/status/1555452718977716224';
  const share = twitter + encodeURIComponent(`${txtTop}${url}${txtBottom}${noticeTxt}${shareUrl}`);
  window.open(share)
}