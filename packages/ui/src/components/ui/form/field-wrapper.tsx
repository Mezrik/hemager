import { FC } from 'react';
import { type FieldError } from 'react-hook-form';

import { Error } from './error';
import { Label } from './label';

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>;

export const FieldWrapper: FC<FieldWrapperProps> = (props) => {
  const { label, error, children, className } = props;
  return (
    <div className={className}>
      <Label>
        {label}
        <div className="mt-1">{children}</div>
      </Label>
      <Error errorMessage={error?.message} />
    </div>
  );
};
