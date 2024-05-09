import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const handleError = (error: unknown) => {
  console.error("An error occurred:", error);
  if (error instanceof Error) {
    console.error("Error message:", error.message);
    console.error("Stack trace:", error.stack);
  }
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};
