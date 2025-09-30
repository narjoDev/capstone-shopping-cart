import React, { createContext, useState } from "react";

type Theme = "light" | "dark";
interface AppContext {
  theme: Theme;
  handleThemeChange: (newTheme: Theme) => void;
}

const defaultContext: AppContext = {
  theme: "light",
  handleThemeChange: () => {},
};

export const AppContext = createContext<AppContext>(defaultContext);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [theme, setTheme] = useState<Theme>("light");

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <AppContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </AppContext.Provider>
  );
};
