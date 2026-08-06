import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {RouteProvider} from 'react-router-dom';

import {AppProvider} from './app/providers';
import {router} from './app/router';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouteProvider router={router} />
    </AppProvider>
  </StrictMode>,
);
