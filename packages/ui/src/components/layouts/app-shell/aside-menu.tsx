import { Book, LifeBuoy, Settings2, SquareUser, Swords, Circle, Users } from 'lucide-react';
import { I18n } from '@lingui/core';
import { ComponentProps, ComponentType, FC } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { msg, t } from '@lingui/macro';
import { pathnames } from '@/app/pathnames';
import { cn } from '@/utils/class-names';
import { NavLink } from 'react-router-dom';
import { useLingui } from '@lingui/react';

type AsideMenuItemProps = {
  name: string;
  to: string;
  icon: ComponentType<ComponentProps<'svg'>>;
};

const getMenuItems = (_: I18n['_']): AsideMenuItemProps[] => [
  {
    name: _(msg`Competitions`),
    to: pathnames.competitionsPath,
    icon: Swords,
  },
  {
    name: _(msg`Competitors`),
    to: pathnames.competitorsPath,
    icon: Users,
  },
  {
    name: _(msg`Documentation`),
    to: pathnames.docsPath,
    icon: Book,
  },
  {
    name: _(msg`Settings`),
    to: pathnames.settingsPath,
    icon: Settings2,
  },
];

const AsideMenuItem: FC<AsideMenuItemProps> = ({ name, to, icon }) => {
  const Icon = icon;
  return (
    <Tooltip key={name}>
      <TooltipTrigger asChild>
        <NavLink to={to}>
          {({ isActive }) => (
            <Button
              variant="ghost"
              size="icon"
              className={cn('rounded-lg', isActive && 'bg-muted')}
              aria-label={name}
            >
              <Icon className="size-5" />
            </Button>
          )}
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        {name}
      </TooltipContent>
    </Tooltip>
  );
};

export const AsideMenu: FC<{ children?: React.ReactNode }> = () => {
  const { _ } = useLingui();
  const menuItems = getMenuItems(_);

  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Circle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        {menuItems.map((props) => (
          <AsideMenuItem key={props.name} {...props} />
        ))}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <AsideMenuItem to="" name={_(msg`Help`)} icon={LifeBuoy} />
        <AsideMenuItem to="" name={_(msg`Account`)} icon={SquareUser} />
      </nav>
    </aside>
  );
};
