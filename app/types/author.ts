export interface Author {
  id: number
  name: string
  personal_site: string
}

export interface Authors {
  data: Array<Author>
  count: number
}
