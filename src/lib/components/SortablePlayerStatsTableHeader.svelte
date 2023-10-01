<script lang="ts">
  export let sort: string;
  export let sortName: string;
</script>

<th class="border-b-2 text-left px-1 md:px-6 py-4" class:underline={sort == sortName} on:click={() => sort = sortName}><slot /></th>
