import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/class-names';
import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

export type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    className?: string;
  };

export type InputProps = BaseInputProps & {
  registration: Partial<UseFormRegisterReturn>;
};

export const InputBase = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, type, label, ...props }, ref) => (
    <input
      {...props}
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
    />
  ),
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <FieldWrapper label={label} error={error} className={className}>
        <InputBase {...props} ref={ref} {...props.registration} />
      </FieldWrapper>
    );
  },
);
Input.displayName = 'Input';

export { Input };
