<template>
  <div class="py-10 px-10">
    <div v-if="season" class="table-card xl:w-1/2 lg:w-3/4 md:w-3/4 sm:w-11/12 container hover:from-gray-800 hover:to-gray-200 hover:via-gray-500">
      <h2 class="text-center text-2xl font-bold">Season {{season.name}}</h2>
      <div class="px-10">
        <table>
          <thead>
            <tr>
              <th>Position ({{playersCount}})</th>
              <th>Player</th>
              <th>Points Ratio</th>
              <th>Points</th>
              <th>Wins</th>
              <th>Games ({{season.games.length}})</th>
              <th>Games Ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in playerStats" :key="player.name">
              <td>{{player.position}}</td>
              <td>{{player.name}}</td>
              <td>{{player.pointsRatio}}</td>
              <td>{{player.points}}</td>
              <td>{{player.wins}}</td>
              <td>{{player.games}}</td>
              <td>{{gamesRatio(player.games)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { PlayerStats } from '@/models/players'
import { Season } from'@/models/games'
import SeasonsService from '@/api/SeasonsService'
import {SeasonsTableResponse} from "@/api/responses/games";

@Component
export default class Table extends Vue {
  season: Season|null = null
  playerStats: PlayerStats[] = []

  get playersCount(): number {
    return this.playerStats.length
  }

  gamesRatio(playersGames: number): number {
    if (!this.season) {
      return 0
    }
    return playersGames / this.season.games.length
  }

  mounted(): void {
    this.fetchSeasonStats()
  }

  fetchSeasonStats(): void {
    SeasonsService.getSeasonsTable()
      .then((response: SeasonsTableResponse) => {
        this.season = response.season
        this.playerStats = response.playerStats
      })

  }
}
</script>

<style>
th {
  @apply border-b-2 text-left px-4 py-4
}

td {
  @apply border-b-2 text-left px-4 py-2
}

.table-card {
  @apply mx-auto bg-gradient-to-b from-gray-900 to-gray-300 via-gray-600 p-10 rounded-lg shadow
}

</style>