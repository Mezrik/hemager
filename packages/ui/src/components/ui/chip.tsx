import { ComponentProps, ComponentType, FC } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

export const Chip: FC<{
  Icon?: ComponentType<ComponentProps<'svg'>>;
  label: string;
  text: string;
}> = ({ Icon, label, text }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="shrink-1 flex items-center gap-2 rounded bg-primary/20 p-2 text-xs text-primary">
          {Icon && <Icon className="size-4 text-primary-foreground" />}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-primary-foreground">{text}</span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};
