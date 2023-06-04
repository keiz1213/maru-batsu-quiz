import { Quiz } from './Quiz'

export interface Game {
  user_id: number | null
  id: number | null
  channel_name: string
  title: string
  description: string
  quizzes: Quiz[]
  number_of_winner: number
  created_at: string
  updated_at: string
}
