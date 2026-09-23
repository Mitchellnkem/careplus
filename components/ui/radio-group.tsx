"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RadioContextValue = {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

const RadioContext = React.createContext<RadioContextValue | null>(null);

type RadioGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, defaultValue, value, onValueChange, ...props }, ref) => {
    const name = React.useId();
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;

    const changeValue = (nextValue: string) => {
      setInternalValue(nextValue);
      onValueChange?.(nextValue);
    };

    return (
      <RadioContext.Provider value={{ name, value: currentValue, onValueChange: changeValue }}>
        <div ref={ref} role="radiogroup" className={cn("grid gap-2", className)} {...props} />
      </RadioContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange">
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(RadioContext);
  const stringValue = String(value ?? "");

  return (
    <input
      ref={ref}
      type="radio"
      name={context?.name}
      value={stringValue}
      checked={context?.value === stringValue}
      onChange={() => context?.onValueChange?.(stringValue)}
      className={cn("size-4 accent-green-500", className)}
      {...props}
    />
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
