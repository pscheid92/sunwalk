import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./app.css";

// biome-ignore lint/style/noNonNullAssertion: element guaranteed by index.html
createRoot(document.getElementById("app")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
