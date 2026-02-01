import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-pastel-pink hover:bg-pastel-pink/80 text-ink shadow-sm border border-pastel-pink/20",
      secondary: "bg-pastel-blue hover:bg-pastel-blue/80 text-white shadow-sm",
      outline: "border-2 border-pastel-purple text-pastel-purple hover:bg-pastel-purple/10",
      ghost: "hover:bg-black/5 text-ink",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-lg",
      md: "px-6 py-2.5 text-xl",
      lg: "px-8 py-4 text-2xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-hand transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
