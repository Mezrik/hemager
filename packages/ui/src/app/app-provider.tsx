import { FC, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { TooltipProvider } from '@/components/ui/tooltip';
import { queryConfig } from '@/lib/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { LocalizationProvider } from '@/i18n';

export const AppProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <LocalizationProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </LocalizationProvider>
  );
};
