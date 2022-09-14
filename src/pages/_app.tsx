import React from "react";
import Head from "next/head";
import NextApp, { AppContext, AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../styles/createEmotionCache";
import { notification } from "antd";
import store from "@/models/store";
import { Provider as ProviderRedux } from "react-redux";
import Provider from "@/components/provider";
import { IntlProvider, getLocale, getMessage } from "@/app/root/intl";

import "antd/dist/antd.css";
import "../styles/global.scss";
import "../styles/react-grid-layout.css";
import "../styles/react-resizable.css";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  locale: string;
  messages: any;
}

notification.config({
  top: 100,
  maxCount: 3,
  duration: 2,
});

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: MyAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    locale,
    messages,
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src="https://analytics.twitter.com/i/adsct?p_id=Twitter&p_user_id=0&txn_id=o9l0f&events=%5B%5B%22pageview%22%2Cnull%5D%5D&tw_sale_amount=0&tw_order_quantity=0&type=image&version=2.0.4"
      />
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src="//t.co/i/adsct?p_id=Twitter&p_user_id=0&txn_id=o9l0f&events=%5B%5B%22pageview%22%2Cnull%5D%5D&tw_sale_amount=0&tw_order_quantity=0&type=image&version=2.0.4"
      />
      <Head>
        <title>Non-Fungible Friend: Create your unique space.</title>
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="NFT,space,integrable space,web3,community,on-chain"
        />
        <meta
          name="description"
          content="The first composable, integrable, interactive space built on Web3."
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="renderer" content="webkit" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui"
        />
        <meta name="full-screen" content="yes" />
        <meta name="x5-fullscreen" content="true" />
        <meta content="telephone=no" name="format-detection" />
        <meta content="email=no" name="format-detection" />
        <link rel="manifest" href={"/manifest.json"} />
        <link rel="icon" type="image/x-icon" href={`/favicon.ico`} />
      </Head>
      <ProviderRedux store={store}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </ProviderRedux>
      {/* </IntlProvider> */}
    </CacheProvider>
  );
};

export default MyApp;

MyApp.getInitialProps = async (ctx: AppContext) => {
  const initialProps = await NextApp.getInitialProps(ctx);

  const locale = getLocale();
  const messages = getMessage(locale);

  return {
    ...initialProps,
    locale,
    messages,
  };
};
