import Image from "next/image";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubmitButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }
>;

const SubmitButton = ({
  children,
  className,
  disabled,
  isLoading = false,
  ...props
}: SubmitButtonProps) => (
  <Button
    type="submit"
    disabled={disabled || isLoading}
    className={cn("shad-primary-btn w-full", className)}
    {...props}
  >
    {isLoading && (
      <Image
        src="/assets/icons/loader.svg"
        alt="Loading"
        width={20}
        height={20}
        className="animate-spin"
      />
    )}
    {isLoading ? "Please wait..." : children}
  </Button>
);

export default SubmitButton;
