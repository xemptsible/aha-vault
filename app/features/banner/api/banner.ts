import { DB_URL } from '~/lib/const'

export async function getBanners(query?: string) {
  const response = await fetch(
    `${DB_URL}/banners${query && query.length > 0 ? `/?${query}` : '/'}`,
  )
  const data = await response.json()

  return data
}
