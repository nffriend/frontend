import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Root from "@/app/root";
import { getLibrary } from "@/utils";
import Web3ReactManager from "./web3Manager";
import theme from "./theme";

const Web3ProviderNetwork = dynamic(() => import("./web3Provider"), {
  ssr: false,
});

const Provider = ({ children }: any) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ProviderNetwork getLibrary={getLibrary}>
      <Web3ReactManager>
        <ThemeProvider theme={theme}>
          <Root>
            <CssBaseline />
            {children}
          </Root>
        </ThemeProvider>
      </Web3ReactManager>
    </Web3ProviderNetwork>
  </Web3ReactProvider>
);

export default Provider;
