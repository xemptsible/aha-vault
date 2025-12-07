export const BA_STYLE = {
  default: '-skew-x-[11deg] *:skew-x-[11deg]',
  element: '-skew-x-[11deg]',
  text: 'skew-x-[11deg]',
  color: 'bg-secondary',
}

export const DB_URL =
  process.env.NODE_ENV && process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_DB_URL
    : import.meta.env.VITE_DEV_DB_URL
