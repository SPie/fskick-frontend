<script lang="ts">
  import type { Season, SeasonTable } from '$app';
  import { onMount } from 'svelte';
  import { PUBLIC_FSKICK_API_ENDPOINT } from '$env/static/public';
  import PlayerStatsTable from '$components/PlayerStatsTable.svelte';

  let selectedSeason: string|undefined;
  let seasons: Season[] = [];
  let seasonTable: SeasonTable|undefined;
  let sort: string = 'pointsRatio';

  onMount(async () => {
    const seasonsResponse = await fetch(`${PUBLIC_FSKICK_API_ENDPOINT}/api/seasons`);
    if (!seasonsResponse.ok) {
      return;
    }

    seasons = (await seasonsResponse.json()).seasons;

    selectedSeason = seasons.find(season => season.active)?.uuid;
  });

  $: fetchSeasonTable(selectedSeason, sort);

  const fetchSeasonTable = async (seasonId?: string, sort?: string) => {
    const seasonTableResponse = await fetch(`${PUBLIC_FSKICK_API_ENDPOINT}/api/seasons/table${seasonId ? `/${seasonId}` : ''}?sort=${sort}`);
    if (!seasonTableResponse.ok) {
      return;
    }

    seasonTable = await seasonTableResponse.json()
  };
</script>

<h2 class="text-center text-md md:text-2xl font-bold">
  {#if seasons.length > 0}
    Season
    <select class="bg-gray-900" bind:value={selectedSeason}>
      {#each seasons as season}
          <option value={season.uuid}>{season.name}</option>
      {/each}
    </select>
  {/if}
</h2>

<div>
  {#if seasonTable}
    <PlayerStatsTable playerStats={seasonTable.playerStats} gamesCount={seasonTable.season.games.length} bind:sort={sort} />
  {/if}
</div>
