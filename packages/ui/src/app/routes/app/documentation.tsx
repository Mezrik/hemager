import { msg, t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { QueryClient } from '@tanstack/react-query';

import { BasicPageLayout } from '@/components/layouts';

export const docsLoader = (queryClient: QueryClient) => async () => {};

export const DocumentationRoute = () => {
  const { _ } = useLingui();
  return <BasicPageLayout title={_(msg`Documentation`)}>Something</BasicPageLayout>;
};
