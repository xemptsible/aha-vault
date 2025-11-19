import { db_url } from '~/lib/const'

export async function getResources(query?: string) {
  const response = await fetch(
    `${db_url}/resources${query && query.length > 0 ? `/?${query}` : '/'}`,
  )
  const data = await response.json()

  return data
}
