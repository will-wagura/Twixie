import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // This should contain the Tailwind directives
import App from './App';

const root = document.getElementById('root');

// Use createRoot for React 18
const renderMethod = root?.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;

renderMethod(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);