<script lang="ts">
  import type { PlayerStats } from '$app';
  import PlayerStatsTable from '$components/PlayerStatsTable.svelte';
  import { PUBLIC_FSKICK_API_ENDPOINT } from '$env/static/public';
  import { onMount } from 'svelte';

  let playerStats: PlayerStats[] = [];
  let sort: string = 'pointsRatio';
  let gamesCount: number|undefined;

  onMount(async () => {
    const gamesCountResponse = await fetch(`${PUBLIC_FSKICK_API_ENDPOINT}/api/games/count`);
    if (!gamesCountResponse.ok) {
      return;
    }

    gamesCount = (await gamesCountResponse.json()).gamesCount;
  });

  $: fetchPlayersTable(sort);

  const fetchPlayersTable = async (sort?: string) => {
    const playersTableResponse = await fetch(`${PUBLIC_FSKICK_API_ENDPOINT}/api/players?sort=${sort}`);
    if (!playersTableResponse.ok) {
      return;
    }

    playerStats = (await playersTableResponse.json()).playerStats;
  };
</script>

<h2 class="text-center text-md md:text-2xl font-bold">
  Players
</h2>

<div>
  <PlayerStatsTable playerStats={playerStats} gamesCount={gamesCount} bind:sort={sort} />
</div>
