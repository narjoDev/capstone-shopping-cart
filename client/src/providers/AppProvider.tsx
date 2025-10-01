import React, { createContext, useState } from "react";
import type { Theme, Currency } from "../types";

const DEFAULT_THEME: Theme = "light";
const DEFAULT_CURRENCY: Currency = "USD";

interface AppContext {
  theme: Theme;
  handleThemeChange: (newTheme: Theme) => void;
  currency: Currency;
  handleCurrencyChange: (newCurrency: Currency) => void;
}

const defaultContext: AppContext = {
  theme: DEFAULT_THEME,
  handleThemeChange: () => {},
  currency: DEFAULT_CURRENCY,
  handleCurrencyChange: () => {},
};

// FIXME: make custom hook that throws error if no context
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContext>(defaultContext);

interface AppProviderProps {
  children: React.ReactNode;
}

const lazyInitialTheme = (): Theme => {
  const storedValue = localStorage.getItem("theme");
  if (storedValue === "light" || storedValue === "dark") {
    return storedValue;
  }
  return DEFAULT_THEME;
};

const lazyInitialCurrency = (): Currency => {
  const storedValue = localStorage.getItem("currency");
  if (storedValue === "USD" || storedValue === "EUR") {
    return storedValue;
  }
  return DEFAULT_CURRENCY;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [theme, setTheme] = useState<Theme>(lazyInitialTheme);
  const [currency, setCurrency] = useState<Currency>(lazyInitialCurrency);

  const handleThemeChange = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };
  const handleCurrencyChange = (newCurrency: Currency) => {
    localStorage.setItem("currency", newCurrency);
    setCurrency(newCurrency);
  };

  return (
    <AppContext.Provider
      value={{ theme, handleThemeChange, currency, handleCurrencyChange }}
    >
      {children}
    </AppContext.Provider>
  );
};
