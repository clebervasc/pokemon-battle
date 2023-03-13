import React from 'react';
import ReactDOM from 'react-dom/client';
import { MyThemeProvider } from './styles/MyThemeProvider';
import App from './pages';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyThemeProvider>
      <App />
    </MyThemeProvider>
  </React.StrictMode>,
);
