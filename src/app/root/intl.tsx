import React from "react";
import {
  createIntl,
  createIntlCache,
  RawIntlProvider,
  IntlConfig,
} from "react-intl";

type localeType = IntlConfig["locale"];
type messagesType = IntlConfig["messages"];
interface ContextProps {
  setLocale: (locale: localeType) => void;
  locale: localeType;
  messages: messagesType;
}
const LocalContext = React.createContext<any>({});
export const useLocale = () => React.useContext<ContextProps>(LocalContext);
const cache = createIntlCache();

export const IntlProvider: React.FC<
  Pick<ContextProps, "locale" | "messages">
> = ({ children, locale, messages }: any) => {
  const [intl, setIntl] = React.useState(
    createIntl({ locale, messages }, cache)
  );

  const setLocale = async (nextLocale: localeType) => {
    // only triggered by used in this case go and fetch new locale data
    const nextMessages = getMessage(nextLocale);
    setIntl(createIntl({ locale: nextLocale, messages: nextMessages }, cache));
    localStorage.setItem("i18n", nextLocale);
  };

  React.useEffect(() => {
    setIntl(createIntl({ locale, messages }, cache));
  }, [locale, messages]);

  return (
    <LocalContext.Provider value={{ setLocale }}>
      <RawIntlProvider value={intl}>{children}</RawIntlProvider>
    </LocalContext.Provider>
  );
};

const locales = ["en", "zh"];
const defaultLocale = locales[0];
const chrome = typeof window !== "undefined";

export const getLocale = () => {
  try {
    const storageLocale = chrome ? localStorage.i18n : "en";
    let locale = defaultLocale;
    if (storageLocale) {
      locale = locales.includes(storageLocale) ? storageLocale : defaultLocale;
    } else {
      chrome && localStorage.setItem("i18n", defaultLocale);
    }
    return locale;
  } catch (error) {
    console.error(error);
    return defaultLocale;
  }
};

export const getMessage = (locale: string) => {
  try {
    return require(`../../local/${locale}.json`);
  } catch (error) {
    return require(`../../local/en.json`);
  }
};
