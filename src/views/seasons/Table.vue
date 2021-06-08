<template>
  <div class="py-2 px-2">
    <div v-if="season" class="mx-auto bg-gradient-to-b from-gray-900 to-gray-300 via-gray-600 p-5 rounded-lg shadow xl:w-1/2 lg:w-3/4 md:w-3/4 sm:w-11/12 container hover:from-gray-800 hover:to-gray-200 hover:via-gray-500">
      <h2 class="text-center text-md md:text-2xl font-bold">Season {{season.name}}</h2>
      <div class="">
        <table class="mx-auto text-xs md:text-base table-fixed">
          <thead>
            <tr>
              <th class="border-b-2 text-left px-1 md:px-6 py-4">
                Pos ({{playersCount}})
              </th>
              <th class="border-b-2 text-left px-1 md:px-6 py-4">
                Player
              </th>
              <th class="border-b-2 text-left px-1 md:px-6 py-4 hover:underline" v-bind:class="{ underline: sortPoints }" @click="fetchSeasonStats('pointsRatio')">
                Points
              </th>
              <th class="border-b-2 text-left px-1 md:px-6 py-4 hover:underline" v-bind:class="{ underline: sortWins }" @click="fetchSeasonStats('wins')">
                Wins
              </th>
              <th class="border-b-2 text-left px-1 md:px-6 py-4 hover:underline" v-bind:class="{ underline: sortGames }" @click="fetchSeasonStats('games')">
                Games ({{season.games.length}})
              </th>
              <th class="border-b-2 text-left px-1 md:px-6 py-4">
                Games Ratio
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in playerStats" :key="player.name">
              <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.position}}</td>
              <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.name}}</td>
              <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.pointsRatio}}</td>
              <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.wins}}</td>
              <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.games}}</td>
              <td class="border-b-2 text-left px-1 md:px-6 py-2">{{gamesRatio(player.games)}}</td>
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
  sortPoints = true
  sortWins = false
  sortGames = false

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

  fetchSeasonStats(sort?: string): void {
    SeasonsService.getSeasonsTable(sort)
      .then((response: SeasonsTableResponse) => {
        this.highlightSortRows(sort)

        this.season = response.season
        this.playerStats = response.playerStats
      })
  }

  highlightSortRows(sort?: string): void {
    this.sortPoints = this.sortWins = this.sortGames = false

    switch (sort) {
      case 'wins':
        this.sortWins = true
        break
      case 'games':
        this.sortGames = true
        break
      case 'pointsRatio':
      default:
        this.sortPoints = true
    }
  }
}
</script>