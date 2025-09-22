import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/fonts/fonts.module.css";
import "./app/global.css";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
);
