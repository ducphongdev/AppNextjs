import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import React from 'react';

const buttonVariants = cva(
  'group flex items-center justify-center text-sm font-medium cursor-pointer ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-[#A6C5E299] ml-2 rounded-full',
        box: ' ml-2 rounded-sm bg-slate-200 px-4 py-1.5',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        primary: 'bg-sky-700 text-primary-foreground hover:bg-sky-700/90',
        transparent: 'bg-transparent text-white hover:bg-white/20',
        gray: 'bg-neutral-200 text-secondary-foreground hover:bg-neutral-300',
      },
      size: {
        default: 'w-8 h-8',
        sm: 'w-9 h-9 rounded-md px-3',
        lg: 'w-6 h-6',
        icon: 'h-10 w-10',
        inline: 'h-auto px-2 text-sm',
        full: 'w-full h-full px-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({ className, variant, size, asChild = false, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
};
export default Button;
