import { DB_URL } from '~/lib/const'

export async function getAuthors() {
  const response = await fetch(`${DB_URL}/authors/`)
  const data = await response.json()

  return data
}
