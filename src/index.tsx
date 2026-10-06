import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/fonts/fonts.module.css";
import "./app/global.css";
import App from "./app/App.tsx";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </HashRouter>,
);
