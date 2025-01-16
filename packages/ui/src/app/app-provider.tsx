import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LocalizationProvider } from '@/i18n';
import { queryConfig } from '@/lib/react-query';

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
