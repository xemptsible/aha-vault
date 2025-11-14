export async function getResources(query?: string) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/resources${query && query.length > 0 ? `/?${query}` : '/'}`,
  )
  const data = await response.json()

  return data
}
