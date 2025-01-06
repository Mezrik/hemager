import { FC } from 'react';

export const InfoList: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ul className="flex flex-col gap-4">{children}</ul>;
};

export const InfoListItem: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <li className="flex flex-col">
      <span className="text-sm font-normal text-muted-foreground">{title}</span>
      <span className="font-medium">{description}</span>
    </li>
  );
};
