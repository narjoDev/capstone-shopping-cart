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

export const AppProvider = ({ children }: AppProviderProps) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };
  const handleCurrencyChange = (newCurrency: Currency) => {
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
