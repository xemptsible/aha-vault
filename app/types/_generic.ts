export interface ApiGetAll<T> {
  data: Array<T>
  count: number
}

export interface Image {
  name: string
  url: string
  alt_text: string
}
