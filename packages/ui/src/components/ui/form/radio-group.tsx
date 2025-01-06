import * as React from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/utils/class-names';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export type RadioOption = {
  label: React.ReactNode;
  value: string | number;
};

const RadioGroupFormField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  options,
  control,
  label,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
  options: RadioOption[];
  control: Control<TFieldValues>;
  name: TName;
  label: string;
}) => {
  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
              {...props}
            >
              {options.map(({ value, label: optLabel }) => (
                <FormItem className="flex items-center space-x-3 space-y-0" key={value}>
                  <FormControl>
                    <RadioGroupItem value={`${value}`} />
                  </FormControl>
                  <FormLabel className="font-normal">{optLabel}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

RadioGroupFormField.displayName = 'RadioGroupFormField';

export { RadioGroup, RadioGroupItem, RadioGroupFormField };
