import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Changed from .tsx to .jsx
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
