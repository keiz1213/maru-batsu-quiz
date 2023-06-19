import { User } from '@/types/User'
import { Member } from '@/types/Member'
import {
  SkyWayRoom,
  SkyWayContext,
  SkyWayStreamFactory,
  P2PRoom
} from '@skyway-sdk/room'

function createTestUser(): User {
  const testUser = {
    id: 0,
    uid: '',
    name: '',
    avatar_url: '',
    games: null,
    token: 'test'
  }
  return testUser
}

export async function createSkyWayContext(
  skywayToken: string
): Promise<SkyWayContext> {
  const context = await SkyWayContext.Create(skywayToken)
  return context
}

export async function findOrCreateChannel(
  context: SkyWayContext,
  channelName: string
): Promise<P2PRoom> {
  const channel = await SkyWayRoom.FindOrCreate(context, {
    type: 'p2p',
    name: channelName
  })
  return channel
}

export async function createMember(
  currentUser: User,
  channel: P2PRoom
): Promise<Member> {
  const data = await SkyWayStreamFactory.createDataStream()
  const memberCertificates = await channel.join()
  const myPublication = await memberCertificates.publish(data)
  const numberOfMembers = channel.members.length
  let member: Member
  let indexAndData = {
    myIndex: numberOfMembers - 1,
    myData: data,
    memberCertificates: memberCertificates,
    myPublication: myPublication
  }
  member = Object.assign({}, currentUser, indexAndData)

  return member
}

const generateUniqueName = () => {
  const adjectives = ['Happy', 'Silly', 'Brave', 'Crazy', 'Lucky', 'Wise']
  const nouns = ['Cat', 'Dog', 'Monkey', 'Tiger', 'Elephant', 'Lion']

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  const randomNum = Math.floor(Math.random() * 1001)
  return `${randomAdjective}-${randomNoun}-${randomNum}`
}

export async function createTestMember(channel: P2PRoom): Promise<Member> {
  const data = await SkyWayStreamFactory.createDataStream()
  const uniqueName = generateUniqueName()
  const memberCertificates = await channel.join({
    name: uniqueName,
    metadata: 'unsubscribe'
  })
  const myPublication = await memberCertificates.publish(data)
  const numberOfMembers = channel.members.length
  let member: Member
  let indexAndData = {
    myIndex: null,
    myData: data,
    memberCertificates: memberCertificates,
    myPublication: myPublication
  }
  console.log(`私が入室したときの部屋の人数${numberOfMembers}`)
  const testUser = createTestUser()
  member = Object.assign({}, testUser, indexAndData)

  return member
}
