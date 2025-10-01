import { createContext, useCallback, useState } from "react";
import type { ExchangeRates } from "../types";
import { getExchangeRates } from "../services/currency";

// FIXME: don't show false information before we fetched rates
const defaultRates: ExchangeRates = {
  USD: 1,
  EUR: 0,
};

type ExchangeRateContext = {
  rates: ExchangeRates;
  refreshRates: () => void;
};

const defaultContext: ExchangeRateContext = {
  rates: defaultRates,
  refreshRates: () => {},
};

// FIXME: make custom hook that throws error if no context
// eslint-disable-next-line react-refresh/only-export-components
export const ExchangeRateContext =
  createContext<ExchangeRateContext>(defaultContext);

interface ExchangeRateProviderProps {
  children: React.ReactNode;
}

export const ExchangeRateProvider = ({
  children,
}: ExchangeRateProviderProps) => {
  const [rates, setRates] = useState(defaultRates);

  const refreshRates = async () => {
    try {
      const latestRates = await getExchangeRates();
      console.log(latestRates);
      setRates(latestRates);
    } catch (error) {
      console.log(error);
    }
  };

  const memoizedRefreshRates = useCallback(refreshRates, []);

  return (
    <ExchangeRateContext.Provider
      value={{ rates, refreshRates: memoizedRefreshRates }}
    >
      {children}
    </ExchangeRateContext.Provider>
  );
};
