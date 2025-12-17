import type { Character } from './character'

export interface Banner {
  id: number
  start_at: Date
  end_at: Date
  characters: Array<Character>
}
