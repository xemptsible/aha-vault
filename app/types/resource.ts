export interface Resource {
  id: number
  title: string
  description: string
  url: string
  authors: Array<{ name: string; personal_site: string; id: number }>
  tags: Array<{ id: number; name: string }>
  image: { name: string; url: string; alt_text: string } | null
}

