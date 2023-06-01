import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app/app";
import './index.css';
import {GlobalState} from "./global-state/global-state";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <GlobalState>
            <App/>
        </GlobalState>
    </React.StrictMode>
);