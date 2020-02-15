import React from 'react';
import { render } from "react-dom";

import App from './App';

const renderApp = () => {
  const rootDiv = document.getElementById('app');
  if(rootDiv) {
    render(<App />, rootDiv);
  }
}

renderApp();