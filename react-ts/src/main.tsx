import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './AppRouter.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AppRouter/>    
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>,
)
