import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkContextName, network, supportedChainIds, setCookie, walletconnect } from "@/utils";
import { isBrowser } from "@/env";
import { isMobile } from "react-device-detect";

/**web3 func**/
export const injected = new InjectedConnector({
  supportedChainIds,
});

const useEagerConnect = () => {
  const { activate, active } = useWeb3React(); // specifically using useWeb3React because of what this hook does
  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      }
    });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
};

const useInactiveListener = (suppress = false) => {
  const { error, activate } = useWeb3React(); // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const ethereum = isBrowser ? window.ethereum : undefined;

    if (ethereum && ethereum.on && !error && !suppress) {
      const handleNetworkChanged = (chainId: string) => {
        setCookie("chain_id", chainId);
        // eat errors
        activate(injected, undefined, true).catch(error => {
          console.error("Failed to activate after chain changed", error);
        });

        if (isBrowser) {
          window.location.reload();
        }
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch(error => {
            console.error("Failed to activate after accounts changed", error);
          });
        }
      };

      ethereum.on("networkChanged", handleNetworkChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("networkChanged", handleNetworkChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [error, suppress, activate]);
};

const rewrite = () => {
  const orignalSetItem = localStorage.setItem;
    localStorage.setItem = function(key,newValue){
      //@ts-ignore
      orignalSetItem.apply(this,arguments);
      const setItemEvent: any = new Event("localStorageEvent");
      setItemEvent.key = key;
      setItemEvent.newValue = newValue;
      setItemEvent.oldValue = localStorage.getItem(key);
      window.dispatchEvent(setItemEvent);
    }
}

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  const { active, activate, connector, account } = useWeb3React();
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName);
  const triedEager = useEagerConnect();
  rewrite();

  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      if (localStorage.isWalletConnect == 1) {
        activate(walletconnect, undefined, true);
      } else {
        activateNetwork(network, undefined, true);
      }
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active]);

  useEffect(() => {
    if (active) {
      //@ts-ignore
      if (!!connector.walletConnectProvider) {
        localStorage.isWalletConnect = 1;
      } else {
        localStorage.isWalletConnect = 0;
        localStorage.walletconnect = undefined;
      }
    }
  }, [connector, active]);

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true);
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  /***** ignore  error*/
  // if (!isBrowser) {
  //   return children;
  // }
  // on page load, do nothing until we've tried to connect to the injected connector
  // if (!triedEager) {
  //   return null;
  // }
  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  // if (!active && networkError) {
  //   return (
  //     <div>
  //       <h1>unknownError</h1>
  //     </div>
  //   );
  // }
  // if neither context is active, spin
  // if (!active && !networkActive) {
  //   return showLoader ? <div>Loading...</div> : null;
  // }

  return children;
}
