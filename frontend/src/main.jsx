import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./i18n";
import i18n from "./i18n";
import App from "./App.jsx";

const initialLang = i18n.language || "en";
document.documentElement.lang = initialLang;
document.documentElement.dir = initialLang === "ar" ? "rtl" : "ltr";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
