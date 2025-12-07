export enum BANNER_TYPE {
  Permanant = 'permanant',
  Limited = 'limited',
  Anniversary = 'anniversary',
}

export interface Banner {
  character_id: number
  character_name: string
  image: string
  type: BANNER_TYPE
  has_free_pulls: boolean
  rarity: 1 | 2 | 3
  start_at: Date
  end_at: Date
}
