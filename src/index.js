import React from "react";
import ReactDOM from "react-dom/client";
import { Commerce7AdminUI } from "@commerce7/admin-ui";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Commerce7AdminUI>
      <App />
    </Commerce7AdminUI>
  </React.StrictMode>
);
