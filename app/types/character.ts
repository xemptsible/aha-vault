import type { Image } from './_generic'

export const BANNER_TYPE = ['permanant', 'limited', 'anniversary'] as const
export type BannerType = (typeof BANNER_TYPE)[number]

export interface Character {
  id: number
  character_id: number
  character_name: string
  type: BannerType
  has_free_pulls: boolean
  rarity: 1 | 2 | 3
  image_id?: number
  image?: Image
}
