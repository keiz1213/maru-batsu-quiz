import { Game } from '~/types/game'
import Referee from "./Referee"
import Chat2 from "./Chat2"
import Announce2 from "./Announce2"
import Timer2 from './Timer2'

class VenueActivity {
  referee: Referee
  chat: Chat2
  announce: Announce2
  timer: Timer2

  constructor(game: Game) {
    this.referee = new Referee(game)
    this.chat = new Chat2()
    this.announce = new Announce2()
    this.timer = new Timer2()
  }
}

export default VenueActivity
