import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/stylesheets/index.css";
import App from "./App.tsx";
import { AppProvider } from "./providers/AppProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
