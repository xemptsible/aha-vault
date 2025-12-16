import type { Image } from './_generic'

export interface Resource {
  id: number
  title: string
  description: string
  url: string
  authors: Array<{ name: string; personal_site: string; id: number }>
  tags: Array<{ id: number; name: string }>
  image?: Image
  created_at: Date
  updated_at: Date
}
