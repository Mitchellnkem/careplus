"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "checked" | "onChange"
> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked = false, className, onCheckedChange, ...props }, ref) => (
    <span className="relative inline-flex size-4 shrink-0">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange?.(event.target.checked)}
        className={cn(
          "peer size-4 appearance-none rounded border border-dark-500 bg-dark-400 outline-none checked:border-green-500 checked:bg-green-500 focus-visible:ring-2 focus-visible:ring-green-500",
          className
        )}
        {...props}
      />
      <Check className="pointer-events-none absolute inset-0 hidden size-4 p-0.5 text-white peer-checked:block" />
    </span>
  )
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
