import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Allroutes from "./Allroutes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
      <Allroutes/>
    </Router>
  </StrictMode>
);
