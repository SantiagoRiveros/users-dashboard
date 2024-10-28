import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/* import "./index.css"; */
import App from "./App.jsx";

//theme
import "primereact/resources/themes/lara-light-cyan/theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);