import { User } from '~/types/user'
import { Game } from '~/types/game'
import SkywayChannel from "./SkywayChannel"
import DataStream from "./DataStream"

class CommunicationActivity {
  skywayChannel: SkywayChannel
  dataStream: DataStream

  constructor(user: User, game: Game) {
    this.skywayChannel = new SkywayChannel(user, game)
    this.dataStream = new DataStream(this.skywayChannel)
  }
}

export default CommunicationActivity
