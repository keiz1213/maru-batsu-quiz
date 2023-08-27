<script setup lang="ts">
  import { getGame } from '~/utils/api/services/game'
  import Announce from '~/utils/class/Announce'
  import Chat from '~/utils/class/Chat'
  import OwnerAvatar from '~/utils/class/OwnerAvatar'
  import PlayerAvatar from '~/utils/class/PlayerAvatar'
  import Referee from '~/utils/class/Referee'
  import SkywayChannel from '~/utils/class/SkywayChannel'
  import SkywayDataStream from '~/utils/class/SkywayDataStream'
  import SyncDraggable from '~/utils/class/SyncDraggable'
  import Timer from '~/utils/class/Timer'
  import VenueActivity from '~/utils/class/VenueActivity'

  const { currentUser, isOwner } = useCurrentUser()
  const route = useRoute()
  const gameId = route.params.id as string
  const game = await getGame(gameId)
  const skywayChannel = new SkywayChannel(currentUser.value, game)
  await skywayChannel.joinChannel()
  const skywayDataStream = new SkywayDataStream(skywayChannel)
  const venueActivity = new VenueActivity(
    new Referee(game, new SyncDraggable()),
    new Chat(),
    new Announce(),
    new Timer()
  )
  const avatarInstanceProps = [
    currentUser.value,
    skywayChannel,
    skywayDataStream,
    venueActivity
  ] as const

  const avatar = isOwner(game)
    ? new OwnerAvatar(...avatarInstanceProps)
    : new PlayerAvatar(...avatarInstanceProps)
</script>

<template>
  <VenueTemplate :avatar="avatar" :game="game"/>
</template>
