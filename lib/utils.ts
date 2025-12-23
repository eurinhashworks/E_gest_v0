import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * @function cn
 * @description A utility function to merge Tailwind CSS classes with clsx.
 * It conditionally joins class names together and then merges them with Tailwind CSS classes,
 * resolving any conflicts.
 * @param {...ClassValue[]} inputs - A list of class values to be merged.
 * These can be strings, objects, or arrays.
 * @returns {string} The merged and optimized class name string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
