export async function getTags() {
  const response = await fetch('http://127.0.0.1:8000/api/v1/tags/')
  const data = await response.json()

  return data
}
