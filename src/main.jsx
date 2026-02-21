import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalContext from "./component/CreateContext/GlobalContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalContext>
      <App />
    </GlobalContext>
  </BrowserRouter>
);