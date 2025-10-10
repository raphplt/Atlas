import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex cursor-pointer items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:opacity-50 disabled:pointer-events-none active:scale-[.97]",
	{
		variants: {
			variant: {
				default:
					"bg-[var(--color-accent)] text-white shadow-[0_8px_24px_rgba(var(--color-accent-rgb),0.35)] hover:bg-[var(--color-accent)]/90 hover:shadow-[0_12px_32px_rgba(var(--color-accent-rgb),0.5)] hover:scale-[1.02] border-none font-bold",
				ghost:
					"bg-transparent border-2 border-[var(--color-border)] hover:bg-[var(--color-bg-alt)]/60 hover:border-[var(--color-accent)]/50 hover:scale-[1.01]",
				subtle:
					"bg-[var(--color-bg-alt)]/70 hover:bg-[var(--color-bg-alt)] text-[var(--color-fg)] hover:scale-[1.01]",
			},
			size: {
				default: "h-12 px-6 py-3",
				sm: "h-10 px-4",
				lg: "h-14 px-8",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
