import { QueryClient, useQueryClient } from '@tanstack/react-query';
import {
  createBrowserRouter,
  createHashRouter,
  LoaderFunctionArgs,
  RouterProvider,
} from 'react-router-dom';
import { AppRoot } from './routes/app/root';
import { useMemo } from 'react';
import { pathnames } from './pathnames';

const createRouter = import.meta.env.MODE === 'desktop' ? createHashRouter : createBrowserRouter;

export const createAppRouter = (queryClient: QueryClient) => {
  return createRouter([
    {
      path: '/',
      element: <AppRoot />,
      children: [
        {
          path: pathnames.competitionsPath,
          lazy: async () => {
            const { CompetitionsRoute } = await import('./routes/app/competitions/competitions');
            return { Component: CompetitionsRoute };
          },
        },
        {
          path: pathnames.competitionPath,
          lazy: async () => {
            const { CompetitionRoute } = await import('./routes/app/competitions/competition');
            return { Component: CompetitionRoute };
          },
          loader: async (args: LoaderFunctionArgs) => {
            const { competitionLoader } = await import('./routes/app/competitions/competition');
            return competitionLoader(queryClient)(args);
          },
        },
        {
          path: pathnames.competitionGroupPath,
          lazy: async () => {
            const { GroupRoute } = await import('./routes/app/competitions/group');
            return { Component: GroupRoute };
          },
          loader: async (args: LoaderFunctionArgs) => {
            const { groupLoader } = await import('./routes/app/competitions/group');
            return groupLoader(queryClient)(args);
          },
        },
        {
          path: pathnames.matchPath,
          lazy: async () => {
            const { MatchEditRoute } = await import('./routes/app/competitions/match-edit');
            return { Component: MatchEditRoute };
          },
          loader: async (args: LoaderFunctionArgs) => {
            const { matchEditLoader } = await import('./routes/app/competitions/match-edit');
            return matchEditLoader(queryClient)(args);
          },
        },
        {
          path: pathnames.dashboardPath,
          lazy: async () => {
            const { DashboardRoute } = await import('./routes/app/dashboard');
            return { Component: DashboardRoute };
          },
          loader: async () => {
            const { dashboardLoader } = await import('./routes/app/dashboard');
            return dashboardLoader(queryClient)();
          },
        },
        {
          path: pathnames.competitorsPath,
          lazy: async () => {
            const { CompetitorsRoute } = await import('./routes/app/competitors/competitors');
            return { Component: CompetitorsRoute };
          },
          loader: async () => {
            const { competitorsLoader } = await import('./routes/app/competitors/competitors');
            return competitorsLoader(queryClient)();
          },
        },
        {
          path: pathnames.settingsPath,
          lazy: async () => {
            const { SettingsRoute } = await import('./routes/app/settings');
            return { Component: SettingsRoute };
          },
        },
        {
          path: pathnames.docsPath,
          lazy: async () => {
            const { DocumentationRoute } = await import('./routes/app/documentation');
            return { Component: DocumentationRoute };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./routes/not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);
};

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
