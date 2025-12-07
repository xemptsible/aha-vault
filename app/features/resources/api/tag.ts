import { DB_URL } from '~/lib/const'

export async function getTags() {
  const response = await fetch(`${DB_URL}/tags/`)
  const data = await response.json()

  return data
}
