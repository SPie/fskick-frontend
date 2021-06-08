<template>
  <div class="py-2 px-2">
    <div v-if="season" class="mx-auto bg-gradient-to-b from-gray-900 to-gray-300 via-gray-600 p-5 rounded-lg shadow xl:w-1/2 lg:w-3/4 md:w-3/4 sm:w-11/12 container hover:from-gray-800 hover:to-gray-200 hover:via-gray-500">
      <h2 class="text-center text-md md:text-2xl font-bold">Season {{season.name}}</h2>
      <div class="">
        <table class="mx-auto text-xs md:text-sm table-fixed">
          <thead>
            <tr>
              <th class="border-b-2 text-left px-1 md:px-4 py-4">Pos ({{playersCount}})</th>
              <th class="border-b-2 text-left px-1 md:px-4 py-4">Player</th>
              <th class="border-b-2 text-left px-1 md:px-4 py-4">Points</th>
              <th class="border-b-2 text-left px-1 md:px-4 py-4">Wins</th>
              <th class="border-b-2 text-left px-1 md:px-4 py-4">Games ({{season.games.length}})</th>
              <th class="border-b-2 text-left px-1 md:px-4 py-4">Games Ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in playerStats" :key="player.name">
              <td class="border-b-2 text-left px-1 md:px-4 py-2">{{player.position}}</td>
              <td class="border-b-2 text-left px-1 md:px-4 py-2">{{player.name}}</td>
              <td class="border-b-2 text-left px-1 md:px-4 py-2">{{player.pointsRatio}}</td>
              <td class="border-b-2 text-left px-1 md:px-4 py-2">{{player.wins}}</td>
              <td class="border-b-2 text-left px-1 md:px-4 py-2">{{player.games}}</td>
              <td class="border-b-2 text-left px-1 md:px-4 py-2">{{gamesRatio(player.games)}}</td>
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

  gamesRatio(playersGames: number): string {
    if (!this.season) {
      return '0'
    }
    return (playersGames / this.season.games.length).toFixed(2)
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