<script lang="ts">
  import type { PlayerStats } from '$app';
  import PlayerStatsTable from './PlayerStatsTable.svelte';
  import { PUBLIC_FSKICK_API_ENDPOINT } from '$env/static/public';

  export let player: PlayerStats;

  let fellowPlayers: PlayerStats[] = [];
  let sort: string = 'pointsRatio';

  $: fetchFellowPlayers(player, sort);

  const fetchFellowPlayers = async (player: PlayerStats, sort: string) => {
    const fellowPlayersResponse = await fetch(`${PUBLIC_FSKICK_API_ENDPOINT}/api/players/${player.uuid}/team?sort=${sort}`);
    if (!fellowPlayersResponse.ok) {
      return;
    }

    fellowPlayers = (await fellowPlayersResponse.json()).playerStats.slice(0, 5);
  };
</script>

<div class="my-5">
  <h3 class="text-left text-sm md:text-xl font-bold">Favorite Team</h3>

  <PlayerStatsTable playerStats={fellowPlayers} gamesCount={player?.games} bind:sort={sort} />
</div>
