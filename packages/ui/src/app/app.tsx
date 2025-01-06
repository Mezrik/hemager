import { AppRouter } from './router';
import { AppProvider } from './app-provider';

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
