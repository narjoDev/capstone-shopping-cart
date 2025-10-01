import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/stylesheets/index.css";
import App from "./App.tsx";
import { AppProvider } from "./providers/AppProvider.tsx";
import { ExchangeRateProvider } from "./providers/ExchangeRateProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <ExchangeRateProvider>
        <App />
      </ExchangeRateProvider>
    </AppProvider>
  </StrictMode>
);
