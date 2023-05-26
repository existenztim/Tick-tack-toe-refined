<script setup lang="ts">
import { ref } from 'vue';
import AddName from './components/AddName.vue';
import ScoreTracker from './components/ScoreTracker.vue';
import * as data from './models/data';

const players = ref(data.players);
let playerCount = ref(0);
const incrementplayerCount = () => {
  playerCount.value++;
};

const board = ref([
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]);
const checkPlayers = ref(true);

const hardReset = () => {
  localStorage.removeItem('players');
  checkPlayers.value = false;
  playerCount.value = 0;
};
</script>

<template>
  <h1>tick tack toe</h1>
  <div class="game-container" v-if="playerCount >= 2 || checkPlayers">
    <div v-for="player in players">
      <ScoreTracker :player="player" />
    </div>
    <h2>Player {{ players[0].name }}'s turn!</h2>
    <div class="game-board">
      <div v-for="(row, x) in board" :key="x">
        <div class="cell" v-for="(cell, y) in row" :key="y" :id="`cordinate-${x}-${y}`">{{ players[0].id }}</div>
      </div>
    </div>
    <button @click="hardReset">New Game (new players)</button>
  </div>
  <div v-else>
    <AddName :playerCount="playerCount" :players="players" @increment="incrementplayerCount" />
  </div>
</template>

<style scoped lang="scss">
.game-board {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  .cell {
    border: 1px solid black;
    color: black;
    padding: 2rem;
    background-color: aliceblue;

    &:hover {
      background-color: beige;
    }
  }
}
.reset-container {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
