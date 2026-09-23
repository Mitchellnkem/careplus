"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type SelectContextValue = {
  open: boolean;
  value?: string;
  displayValue?: React.ReactNode;
  setOpen: (open: boolean) => void;
  select: (value: string, displayValue: React.ReactNode) => void;
};

const SelectContext = React.createContext<SelectContextValue | null>(null);

type SelectProps = {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

const Select = ({ children, defaultValue, value, onValueChange }: SelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [displayValue, setDisplayValue] = React.useState<React.ReactNode>();
  const currentValue = value ?? internalValue;

  const select = (nextValue: string, nextDisplayValue: React.ReactNode) => {
    setInternalValue(nextValue);
    setDisplayValue(nextDisplayValue);
    setOpen(false);
    onValueChange?.(nextValue);
  };

  return (
    <SelectContext.Provider
      value={{ open, value: currentValue, displayValue, setOpen, select }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  return (
    <button
      ref={ref}
      type="button"
      aria-haspopup="listbox"
      aria-expanded={context?.open}
      onClick={() => context?.setOpen(!context.open)}
      className={cn(
        "flex h-11 w-full items-center justify-between rounded-md border border-dark-500 bg-dark-400 px-3 text-left text-sm text-white outline-none focus:ring-1 focus:ring-green-500",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 text-dark-600" />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const context = React.useContext(SelectContext);
  return (
    <span className={cn(!context?.value && "text-dark-600")}>
      {context?.displayValue ?? context?.value ?? placeholder}
    </span>
  );
};

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  if (!context?.open) return null;
  return (
    <div
      ref={ref}
      role="listbox"
      className={cn(
        "absolute z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-dark-500 bg-dark-400 p-1 shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, children, value, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  const selected = context?.value === value;
  return (
    <button
      ref={ref}
      type="button"
      role="option"
      aria-selected={selected}
      onClick={() => context?.select(value, children)}
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-white hover:bg-dark-500",
        className
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      {selected && <Check className="size-4 text-green-500" />}
    </button>
  );
});
SelectItem.displayName = "SelectItem";

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
