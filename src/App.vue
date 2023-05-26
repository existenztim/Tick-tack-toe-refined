<script setup lang="ts">
import { ref } from 'vue';
import AddName from './components/AddName.vue';
import ScoreTracker from './components/ScoreTracker.vue';
import * as data from './models/data';
const players = ref(data.players);

let nameCount = ref(0);
const incrementNameCount = () => {
  nameCount.value++;
};
</script>

<template>
  <h1>tick tack toe</h1>
  <AddName :nameCount="nameCount" :players="players" @increment="incrementNameCount" />
  <div class="game-container" v-if="nameCount >= 2">
    <div v-for="player in players">
      <ScoreTracker :player="player" />
    </div>
    <h2>Player {{ players[0].name }}'s turn!</h2>
  </div>
</template>

<style scoped></style>
