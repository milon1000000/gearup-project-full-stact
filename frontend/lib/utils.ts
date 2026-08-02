import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Robustly validates that a value is a usable http(s) image URL.
 * Rejects malformed values like "https://jpg/" (no real hostname),
 * empty strings, and non-string values.
 */
export function isValidImageUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }
    // A real hostname must contain a dot (e.g. example.com, images.unsplash.com).
    // This rejects garbage like "https://jpg/" where the hostname is just "jpg".
    return parsed.hostname.includes(".");
  } catch {
    return false;
  }
}

export function formatDate(dateValue: string | Date) {
  const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue

  if (Number.isNaN(date.getTime())) {
    return ""
  }

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
