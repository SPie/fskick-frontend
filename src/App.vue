<template>
  <div id="app" class="bg-black text-gray-100">
    <div class="min-h-screen ">
      <nav class="bg-gradient-to-b from-gray-900 to-gray-300 via-gray-600">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div>
              <h1 class="lg:text-5xl text-2xl font-bold px-3 md:px-5 md:py-5"><router-link to="/">FSKick</router-link></h1>
            </div>
            <div class="ml-10 flex items-baseline md:space-x-4 text-sm md:text-xl font-medium">
              <router-link to="/" class="pr-3 py-2 rounded-md">Seasons</router-link>
              <router-link to="/players" class="px-3 py-2 rounded-md">Players</router-link>
            </div>
          </div>
        </div>
      </nav>
      <router-view/>
    </div>
    <footer class="text-center text-xs"><router-link to="/impressum">Impressum</router-link></footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {

}
</script>