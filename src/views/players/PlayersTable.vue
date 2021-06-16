<template>
  <div class="py-2 px-2">
    <div class="mx-auto bg-gradient-to-b from-gray-900 to-gray-300 via-gray-600 p-5 rounded-lg shadow xl:w-1/2 lg:w-3/4 md:w-3/4 sm:w-11/12 container hover:from-gray-800 hover:to-gray-200 hover:via-gray-500">

      <h2 class="text-center text-md md:text-2xl font-bold">Players</h2>

      <Table :games-count="gamesCount" :player-stats="playerStats" v-on:sort="sort"/>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {GamesCountResponse} from '@/api/responses/games'
import GamesService from '@/api/GamesService'
import {PlayerStats} from '@/models/players'
import {PlayersResponse} from '@/api/responses/players'
import PlayersService from '@/api/PlayersService'
import Table from '@/components/Table.vue'

@Component({
  components: {
    Table
  }
})
export default class PlayersTable extends Vue {
  gamesCount = 0
  playerStats: PlayerStats[] = []
  sortName = 'pointsRatio'

  mounted(): void {
    this.fetchGamesCount()
    this.fetchPlayers()
  }

  fetchGamesCount(): void {
    GamesService.getGamesCount().then((response: GamesCountResponse) => {
      this.gamesCount = response.gamesCount
    })
  }

  fetchPlayers(): void {
    PlayersService.getPlayers(this.sortName).then((response: PlayersResponse) => {
      this.playerStats = response.playerStats
    })
  }

  sort(sortName: string): void {
    this.sortName = sortName
    this.fetchPlayers()
  }
}
</script>