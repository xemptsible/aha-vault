export const BA_STYLE = {
  default: '-skew-x-[11deg] *:skew-x-[11deg]',
  element: '-skew-x-[11deg]',
  text: 'skew-x-[11deg]',
  color: 'bg-secondary',
}

export const db_url =
  process.env.NODE_ENV && process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_DB_URL
    : 'http://127.0.0.1:8000/api/v1'
