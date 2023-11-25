import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TileProvider } from "./store/tile-context/TileContext.tsx";
import { TimerProvider } from "./store/timer-context/TimerContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <TimerProvider>
            <TileProvider>
                <App />
            </TileProvider>
        </TimerProvider>
    </React.StrictMode>
);
