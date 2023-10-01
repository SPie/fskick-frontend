<script lang="ts">
  import type { PlayerStats } from '$app';
  import PlayerStatsRow from './PlayerStatsRow.svelte';
  import PlayerStatsTableHeader from './PlayerStatsTableHeader.svelte';
  import SortablePlayerStatsTableHeader from './SortablePlayerStatsTableHeader.svelte';

  export let playerStats: PlayerStats[];
  export let gamesCount: number|undefined;
  export let sort: string = 'pointsRatio';
</script>

<table class="mx-auto text-xs md:text-base table-fixed">
  <thead>
  <tr>
    <PlayerStatsTableHeader>Pos ({playerStats.length})</PlayerStatsTableHeader>
    <PlayerStatsTableHeader>Player</PlayerStatsTableHeader>
    <SortablePlayerStatsTableHeader bind:sort={sort} sortName={'pointsRatio'}>Points</SortablePlayerStatsTableHeader>
    <SortablePlayerStatsTableHeader bind:sort={sort} sortName={'wins'}>Wins</SortablePlayerStatsTableHeader>
    <SortablePlayerStatsTableHeader bind:sort={sort} sortName={'games'}>Games ({gamesCount})</SortablePlayerStatsTableHeader>
    <SortablePlayerStatsTableHeader bind:sort={sort} sortName={'winRatio'}>Win Ratio</SortablePlayerStatsTableHeader>
  </tr>
  </thead>
  <tbody>
    {#each playerStats as player}
      <PlayerStatsRow player={player} gamesCount={gamesCount} />
    {/each}
  </tbody>
</table>
