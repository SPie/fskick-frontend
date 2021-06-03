<template>
  <div id="app" class="bg-black text-gray-100">
    <div class="min-h-screen ">
      <h1 class="text-6xl font-black px-5 pt-5"><router-link to="/">FSKick</router-link></h1>
      <router-view/>
    </div>
    <footer class="text-center text-xs"><router-link to="/impressum">Impressum</router-link></footer>
  </div>
</template>
