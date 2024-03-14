<script lang="ts">
  import type { PlayerStats } from '$app';
  import PlayerStatsCell from './PlayerStatsCell.svelte';

  export let player: PlayerStats;
  export let gamesCount: number|undefined;
</script>

<tr>
  <PlayerStatsCell>{player.position}</PlayerStatsCell>
  <PlayerStatsCell><a href={`/player/${player.uuid}`} class="underline">{player.name}</a></PlayerStatsCell>
  <PlayerStatsCell>{player.pointsRatio.toFixed(2)}</PlayerStatsCell>
  <PlayerStatsCell>{player.wins}</PlayerStatsCell>
  <PlayerStatsCell>{player.games} ({gamesCount ? (player.games / gamesCount * 100).toFixed(2) : 0} %)</PlayerStatsCell>
  <PlayerStatsCell>{(player.wins / player.games * 100).toFixed(2)} %</PlayerStatsCell>
</tr>
