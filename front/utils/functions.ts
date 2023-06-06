import { User } from '@/types/User'
import { Member } from '@/types/Member'
import {
  SkyWayRoom,
  SkyWayContext,
  SkyWayStreamFactory,
  P2PRoom
} from '@skyway-sdk/room'

function createTestUser(numberOfMembers: number): User {
  let addForId: number
  let subtractForUrl: number
  addForId = numberOfMembers <= 3 ? 0 : 1
  subtractForUrl = 1
  const testUser = {
    id: numberOfMembers + addForId,
    uid: `testUid${numberOfMembers}`,
    name: `testUserName${numberOfMembers}`,
    avatar_url: new URL(
      `../assets/images/${numberOfMembers - subtractForUrl}.svg`,
      import.meta.url
    ).href,
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

export async function createTestMember(channel: P2PRoom): Promise<Member> {
  const data = await SkyWayStreamFactory.createDataStream()
  const memberCertificates = await channel.join()
  const myPublication = await memberCertificates.publish(data)
  const numberOfMembers = channel.members.length
  let member: Member
  let indexAndData = {
    myIndex: numberOfMembers - 2,
    myData: data,
    memberCertificates: memberCertificates,
    myPublication: myPublication
  }
  const testUser = createTestUser(numberOfMembers)
  member = Object.assign({}, testUser, indexAndData)

  return member
}
