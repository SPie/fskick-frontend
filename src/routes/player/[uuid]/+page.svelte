<script lang="ts">
  import type { PlayerStats } from '$app';
  import { page } from '$app/stores';
  import FavoriteTeam from '$components/FavoriteTeam.svelte';
  import PlayerStatsTable from '$components/PlayerStatsTable.svelte';
  import Streak from '$components/Streak.svelte';
  import { PUBLIC_FSKICK_API_ENDPOINT } from '$env/static/public';
  import { onMount } from 'svelte';

  let player: PlayerStats|undefined;
  let sort: string = 'pointsRatio';
  let gamesCount: number|undefined;

  onMount(async () => {
    const gamesCountResponse = await fetch(`${PUBLIC_FSKICK_API_ENDPOINT}/api/games/count`);
    if (!gamesCountResponse.ok) {
      return;
    }

    gamesCount = (await gamesCountResponse.json()).gamesCount;
  });

  $: fetchPlayer($page.params.uuid, sort);

  const fetchPlayer = async (uuid: string, sort: string) => {
    const playerResponse = await fetch(`${PUBLIC_FSKICK_API_ENDPOINT}/api/players/${uuid}?sort=${sort}`);
    if (!playerResponse.ok) {
      return;
    }

    const playerJson = await playerResponse.json();
    if (playerJson.playerStats.length) {
      player = playerJson.playerStats[0];
    }
  };

</script>

{#if player}
  <div>
    <h2 class="text-center text-md md:text-2xl font-bold">
      {player.name}
    </h2>

    <div class="mx-auto w-4/5">
      <div class="my-5">
        <h3 class="text-left text-sm md:text-xl font-bold">Stats</h3>

        <PlayerStatsTable playerStats={[player]} gamesCount={gamesCount} bind:sort={sort} />
      </div>

      <Streak player={player} />

      <FavoriteTeam player={player} />
    </div>
  </div>
{/if}
