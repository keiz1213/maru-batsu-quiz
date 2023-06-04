import { Game } from './Game'

export interface User {
  id: number
  uid: string
  name: string
  avatar_url: string
  games: Array<Game> | null
  token: string
}
