import type { Resource } from "./resource"

export interface Tag {
  id: number
  name: string
  related_resources: Array<Resource>
}

export interface Tags {
  data: Array<Tag>
  count: number
}
