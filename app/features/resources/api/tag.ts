import { db_url } from '~/lib/const'

export async function getTags() {
  const response = await fetch(`${db_url}/tags/`)
  const data = await response.json()

  return data
}
