import { useEffect } from "react";
import { createPortal } from "react-dom";

import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { SUPPORTED_WALLETS } from "@/utils";
import cs from "./index.module.scss";
import classNames from "classnames";
import { isMobile } from "react-device-detect";
import useWallet from "@/hooks/useWallet";
import useAccount from "@/hooks/useAccount";

export default function Wallet() {
  const { isWalletShow, setWalletShow } = useWallet();
  const { connector, activate } = useWeb3React();
  const { account } = useAccount();

  const handleConnectWallet = (connector_: AbstractConnector) => {
    if (connector !== connector_) {
      tryActivation(connector_);
      return;
    }
    localStorage.setItem("isLogout", "0");
  };

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }

    let name;
    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });

    const providerETH: any = await connector?.getProvider();
    if (providerETH) {
      let provider;
      if (name === "MetaMask") {
        provider = window.ethereum?.providers?.find(({ isMetaMask }: { isMetaMask: any }) => isMetaMask);
      } else if (name === "Coinbase Wallet") {
        provider = window.ethereum?.providers?.find(({ isCoinbaseWallet }: { isCoinbaseWallet: any }) => isCoinbaseWallet);
      }
      if (provider) {
        window.ethereum?.setSelectedProvider(provider);
      }
    }

    connector &&
      activate(connector, undefined, true).catch(error => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
        }
      });
    connector && localStorage.setItem("isLogout", "0");
  };

  useEffect(() => {
    if (isWalletShow) {
      document.body.classList.add("body-overhide");
    } else {
      document.body.classList.remove("body-overhide");
    }
  }, [isWalletShow]);

  // 一切正常情况关闭弹窗
  function onClose() {
    setWalletShow(false);
  }

  useEffect(() => {
    if (account) {
      onClose();
    }
  }, [account]);

  return createPortal(
    <div className={classNames(cs.root, { [cs.show]: isWalletShow })}>
      <div className={cs.body}>
        {/** 钱包列表 **/}

        {/* <i className={classNames("iconfont icon-close", cs.close)} onClick={onClose} /> */}
        <div className={cs.title}>
          Welcome to NFF Space!
          <br />
          You have successfully created your space.
        </div>
        <div className={cs.list}>
          {!isMobile && (
            <div className={cs.wallet} onClick={() => handleConnectWallet(SUPPORTED_WALLETS["METAMASK"].connector)}>
              <img src="/static/wallet/Metamask@2x.png" alt="Metamask" />
              Metamask
            </div>
          )}

          <div className={cs.wallet} onClick={() => handleConnectWallet(SUPPORTED_WALLETS["WALLET_CONNECT"].connector)}>
            <img src="/static/wallet/WalletConnect@2x.png" alt="WalletConnect" />
            WalletConnect
          </div>
          {!isMobile && (
            <div className={cs.wallet} onClick={() => handleConnectWallet(SUPPORTED_WALLETS["COINBASE"].connector)}>
              <img src="/static/wallet/CoinbaseWallet@2x.png" alt="CoinbaseWallet" />
              Coinbase
            </div>
          )}
        </div>
        <div className={cs.close} onClick={onClose}>
          Give up and leave
        </div>
      </div>
    </div>,
    document.body,
  );
}
