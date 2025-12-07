import type { Resource } from './resource'

export interface Author {
  id: number
  name: string
  personal_site: string
  credited_resources: Array<Resource>
}

