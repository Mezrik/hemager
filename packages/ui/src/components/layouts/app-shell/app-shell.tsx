import { FC } from 'react';
import { AsideMenu } from './aside-menu';

export const AppShell: FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col pl-[53px]">
      <AsideMenu />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">{children}</main>
    </div>
  );
};
