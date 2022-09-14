import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

export default function useAccount() {
  const { account } = useWeb3React();
  const [address, setAddress] = useState<string | null | undefined>(null);
  const [logout, setLogout] = useState("");
  useEffect(() => {
    const logoutFunc = () => {
      const isLogout = localStorage.getItem("isLogout");
      setLogout(isLogout ?? "1");
    };
    window.addEventListener("localStorageEvent", logoutFunc);
    return () => {
      window.removeEventListener("localStorageEvent", logoutFunc);
    };
  }, []);

  useEffect(() => {
    const isLogout = localStorage.getItem("isLogout");

    if (logout === "" && isLogout === null) {
      setAddress(null);
      return;
    }

    if (isLogout === "1") {
      setAddress(null);
      return;
    }

    setAddress(account);
  }, [logout, account]);

  const testAddress = localStorage.getItem("testAddress");
  return { account: testAddress ?? address };
  // return { account: address };
}
