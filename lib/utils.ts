import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(dateString: string | Date) {
  const date = new Date(dateString);
  return {
    dateTime: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(date),
    dateOnly: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date),
    timeOnly: new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date),
  };
}

export const encryptKey = (value: string) => typeof window === "undefined" ? value : window.btoa(value);

export const decryptKey = (value: string) => {
  if (typeof window === "undefined") return value;
  try { return window.atob(value); } catch { return ""; }
};
