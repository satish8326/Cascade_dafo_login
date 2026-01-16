import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import { msalInstance } from './auth/msalInstance';
import { MsalProvider } from '@azure/msal-react';

async function bootstrap() {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </MsalProvider>
    </React.StrictMode>
  );
}
bootstrap();
