export async function getAuthors() {
  const response = await fetch('http://127.0.0.1:8000/api/v1/authors/')
  const data = await response.json()

  return data
}
