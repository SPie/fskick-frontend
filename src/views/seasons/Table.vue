<template>
  <div class="py-2 px-2">
    <div v-if="seasonLoaded" class="mx-auto bg-gradient-to-b from-gray-900 to-gray-300 via-gray-600 p-5 rounded-lg shadow xl:w-1/2 lg:w-3/4 md:w-3/4 sm:w-11/12 container hover:from-gray-800 hover:to-gray-200 hover:via-gray-500">
      <h2 class="text-center text-md md:text-2xl font-bold">
        Season
        <select class="bg-gray-900" v-model="selectedSeasonUuid" @change="selectSeason($event)">
          <option v-for="[uuid, season] in seasons" :value="uuid" :key="uuid">{{season.name}}</option>
        </select>
      </h2>
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
              <th class="border-b-2 text-left px-1 md:px-6 py-4 hover:underline" :class="{ underline: isSortPoints() }" @click="sortTable('pointsRatio')">
                Points
              </th>
              <th class="border-b-2 text-left px-1 md:px-6 py-4 hover:underline" :class="{ underline: isSortWins() }" @click="sortTable('wins')">
                Wins
              </th>
              <th class="border-b-2 text-left px-1 md:px-6 py-4 hover:underline" :class="{ underline: isSortWinRatio() }" @click="sortTable('winRatio')">
                Win Ratio
              </th>
              <th class="border-b-2 text-left px-1 md:px-6 py-4 hover:underline" :class="{ underline: isSortGames() }" @click="sortTable('games')">
                Games ({{season.games.length}})
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in playerStats" :key="player.uuid">
              <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.position}}</td>
              <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.name}}</td>
              <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.pointsRatio.toFixed(2)}}</td>
              <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.wins}}</td>
              <td class="border-b-2 text-left px-1 md:px-6 py-2">{{getWinRatio(player.wins, player.games)}}</td>
              <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.games}} ({{getGamesRatio(player.games)}})</td>
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
import {SeasonsResponse, SeasonsTableResponse} from "@/api/responses/games";

@Component
export default class Table extends Vue {
  seasonLoaded = false
  season?: Season
  selectedSeasonUuid = ''
  seasons: Map<string, Season> = new Map()
  playerStats: PlayerStats[] = []
  sort = 'pointsRatio'

  get playersCount(): number {
    return this.playerStats.length
  }

  getGamesRatio(playersGames: number): string {
    if (!this.season) {
      return '0'
    }
    return (playersGames / this.season.games.length).toFixed(2)
  }

  getWinRatio(playersWins: number, playersGames: number): string {
    return (playersWins / playersGames).toFixed(2)
  }

  isSortPoints(): boolean {
    return this.sort == 'pointsRatio'
  }

  isSortWins(): boolean {
    return this.sort == 'wins'
  }

  isSortWinRatio(): boolean {
    return this.sort == 'winRatio'
  }

  isSortGames(): boolean {
    return this.sort == 'games'
  }

  mounted(): void {
    this
      .fetchSeasons()
      .fetchSeasonStats()
  }

  fetchSeasons(): Table {
    SeasonsService.getSeasons().then((response: SeasonsResponse) => {
      response.seasons.forEach((season: Season) => {
        if (season.active) {
          this.season = season
          this.seasonLoaded = true
          this.selectedSeasonUuid = this.season.uuid
        }

        this.seasons.set(season.uuid, season)
      })
    })

    return this
  }

  fetchSeasonStats(): Table {
    SeasonsService.getSeasonsTable(this.season ? this.season.uuid : undefined, this.sort)
      .then((response: SeasonsTableResponse) => {
        this.playerStats = response.playerStats
      })

    return this
  }

  sortTable(sort: string): void {
    this.sort = sort
    this.fetchSeasonStats()
  }

  selectSeason(event: any): void {
    this.selectedSeasonUuid = event.target.value
    this.season = this.seasons.get(this.selectedSeasonUuid)

    this.fetchSeasonStats()
  }
}
</script>