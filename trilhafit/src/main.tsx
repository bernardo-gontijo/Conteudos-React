import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { queryClient } from './api/queryClient';
import { TemaProvider } from './contexts/TemaContext';
import { MetaSemanalProvider } from './contexts/MetaSemanalContext';
import { router } from './routes/router';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TemaProvider>
        <MetaSemanalProvider>
          <RouterProvider router={router} />
        </MetaSemanalProvider>
      </TemaProvider>
    </QueryClientProvider>
  </StrictMode>
);
