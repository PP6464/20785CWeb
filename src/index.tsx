import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Splash from './splash/splash';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Splash />
  </React.StrictMode>
);