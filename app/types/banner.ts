export interface Banner {
  character_id: number
  character_name: string
  image: string
  type: 'permanant' | 'limited' | 'anniversary'
  has_free_pulls: boolean
  rarity: 1 | 2 | 3
  start_at: Date
  end_at: Date
}
