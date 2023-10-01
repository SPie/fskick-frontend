<script lang="ts">
  import type { PlayerStats } from '$app';

  export let player: PlayerStats|undefined;
</script>

<div class="my-5">
  <h3 class="text-left text-sm md:text-xl font-bold">Streak</h3>

  <div class="my-5 flex space-x-4">
    <div class="my-5 flex space-x-4 mx-auto">
      {#if player}
        {#each player.attendances.slice(-5) as attendance}
          <span class="border-1 inline-block rounded-full w-8 h-8 {attendance.win ? 'border-green bg-green' : 'border-red bg-red'}"></span>
        {/each}
      {/if}
    </div>
  </div>
</div>
