<template>
  <div class="text-center">{{text}}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Impressum extends Vue {
  text: string = process.env.VUE_APP_IMPRESSUM_TEXT
}
</script>