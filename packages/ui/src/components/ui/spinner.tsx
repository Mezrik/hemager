import * as React from 'react';
import { cn } from '@/utils/class-names';

const spinnerVariants =
  'w-16 h-16 border-4 border-t-4 border-gray-200 border-t-gray-600 rounded-full animate-spin';

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Spinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>((props, ref) => {
  const { className, ...rest } = props;
  return <div ref={ref} className={cn(spinnerVariants, className)} {...rest} />;
});

Spinner.displayName = 'Spinner';

export { Spinner };
