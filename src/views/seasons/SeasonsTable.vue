<template>
  <div class="py-2 px-2">
    <div v-if="seasonLoaded" class="mx-auto bg-gradient-to-b from-gray-900 to-gray-300 via-gray-600 p-5 rounded-lg shadow xl:w-1/2 lg:w-3/4 md:w-3/4 sm:w-11/12 container hover:from-gray-800 hover:to-gray-200 hover:via-gray-500">

      <h2 class="text-center text-md md:text-2xl font-bold">
        Season
        <select class="bg-gray-900" v-model="selectedSeasonUuid" @change="selectSeason($event)">
          <option v-for="[uuid, season] in seasons" :value="uuid" :key="uuid">{{season.name}}</option>
        </select>
      </h2>

      <Table :games-count="season.games.length" :player-stats="playerStats" v-on:sort="sort"/>

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
import Table from '@/components/Table.vue'

@Component({
  components: {
    Table
  }
})
export default class SeasonsTable extends Vue {
  seasonLoaded = false
  season?: Season
  selectedSeasonUuid = ''
  seasons: Map<string, Season> = new Map()
  playerStats: PlayerStats[] = []
  sortName = 'pointsRatio'

  mounted(): void {
    this
      .fetchSeasons()
      .fetchSeasonStats()
  }

  fetchSeasons(): SeasonsTable {
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

  fetchSeasonStats(): SeasonsTable {
    SeasonsService.getSeasonsTable(this.season ? this.season.uuid : undefined, this.sortName)
      .then((response: SeasonsTableResponse) => {
        this.playerStats = response.playerStats
      })

    return this
  }

  selectSeason(event: any): void {
    this.selectedSeasonUuid = event.target.value
    this.season = this.seasons.get(this.selectedSeasonUuid)

    this.fetchSeasonStats()
  }

  sort(sortName: string): void {
    this.sortName = sortName
    this.fetchSeasonStats()
  }
}
</script>