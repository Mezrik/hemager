import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import { AppShell } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';

export const AppRoot = () => {
  const location = useLocation();

  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <ErrorBoundary key={location.pathname} fallback={<div>Something went wrong!</div>}>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </AppShell>
  );
};
