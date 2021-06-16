<template>
  <div>
    <table class="mx-auto text-xs md:text-base table-fixed">
      <thead>
      <tr>
        <th class="border-b-2 text-left px-1 md:px-6 py-4">
          Pos ({{playersCount}})
        </th>
        <th class="border-b-2 text-left px-1 md:px-6 py-4">
          Player
        </th>
        <th class="border-b-2 text-left px-1 md:px-6 py-4 hover:underline" :class="{ underline: isSortPoints }" @click="sortTable('pointsRatio')">
          Points
        </th>
        <th class="border-b-2 text-left px-1 md:px-6 py-4 hover:underline" :class="{ underline: isSortWins }" @click="sortTable('wins')">
          Wins
        </th>
        <th class="border-b-2 text-left px-1 md:px-6 py-4 hover:underline" :class="{ underline: isSortGames }" @click="sortTable('games')">
          Games ({{gamesCount}})
        </th>
        <th class="border-b-2 text-left px-1 md:px-6 py-4 hover:underline" :class="{ underline: isSortWinRatio }" @click="sortTable('winRatio')">
          Win Ratio
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="player in playerStats" :key="player.uuid">
        <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.position}}</td>
        <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.name}}</td>
        <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.pointsRatio.toFixed(2)}}</td>
        <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.wins}}</td>
        <td class="border-b-2 text-left px-1 md:px-6 py-2">{{player.games}} ({{getGamesRatio(player.games)}}%)</td>
        <td class="border-b-2 text-left px-1 md:px-6 py-2">{{getWinRatio(player.wins, player.games)}}%</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {PlayerStats} from '@/models/players'

@Component
export default class Table extends Vue {
  @Prop()
  playerStats: PlayerStats[] = []

  @Prop()
  gamesCount = 0

  sort = 'pointsRatio'

  get playersCount(): number {
    return this.playerStats.length
  }

  get isSortPoints(): boolean {
    return this.sort == 'pointsRatio'
  }

  get isSortWins(): boolean {
    return this.sort == 'wins'
  }

  get isSortWinRatio(): boolean {
    return this.sort == 'winRatio'
  }

  get isSortGames(): boolean {
    return this.sort == 'games'
  }

  getGamesRatio(playersGames: number): string {
    if (this.gamesCount === 0) {
      return '0'
    }
    return (playersGames / this.gamesCount * 100).toFixed(2)
  }

  getWinRatio(playersWins: number, playersGames: number): string {
    return (playersWins / playersGames * 100).toFixed(2)
  }

  sortTable(sort: string): void {
    this.sort = sort
    this.$emit('sort', this.sort)
  }
}
</script>