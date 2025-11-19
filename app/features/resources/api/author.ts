import { db_url } from '~/lib/const'

export async function getAuthors() {
  const response = await fetch(`${db_url}/authors/`)
  const data = await response.json()

  return data
}
