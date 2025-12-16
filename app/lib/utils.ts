import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractSearchParams(request: Request) {
  return new URL(request.url).searchParams.toString()
}

export function validateImageUrl(imageUrl: string) {
  return URL.canParse(imageUrl)
}
