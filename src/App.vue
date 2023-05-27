<script setup lang="ts">
import { ref } from 'vue';
import AddName from './components/AddName.vue';
import ScoreTracker from './components/ScoreTracker.vue';
import * as data from './models/data';
import ResetContainer from './components/ResetContainer.vue';
import { checkPlayers } from './services/handleLocalStorage';
import GameBoard from './components/GameBoard.vue';

const onGoingGame = ref(checkPlayers);
const players = ref(data.players);
const turn = ref(Math.random() < 0.5 ? data.players[0].id : data.players[1].id); //random start order between x/o
localStorage.getItem('players');
let playerCount = ref(0);
const board = ref(JSON.parse(JSON.stringify(data.initBoard)));

const incrementplayerCount = () => {
  playerCount.value++;
};

const hardReset = () => {
  localStorage.removeItem('players');
  onGoingGame.value = null;
  playerCount.value = 0;
  console.log("value",board.value)
  console.log("start value",data.initBoard)
  board.value = data.initBoard;
};

 const softReset = () => {
  console.log("soft reset not implemented yet!");
 }

const makeMove = (x:number,y:number) => {
  //check if cell already has a value
  if (board.value[x][y]) {
    return;
  }
  board.value[x][y] = turn.value;
  turn.value = turn.value === data.players[0].id ? data.players[1].id : data.players[0].id;
};
</script>

<template>
  <h1>tick tack toe</h1>
    <div class="game-container" v-if="playerCount >= 2 || onGoingGame">
    <div v-for="player in players">
      <ScoreTracker :player="player" />
    </div>
    <h2>Player {{ turn }}'s turn!</h2>
    <GameBoard :board="board" @fillCell="makeMove"/>
    <ResetContainer @newGame="hardReset" @newRound="softReset"/>
  </div>
  <div v-else>
    <AddName :playerCount="playerCount" :players="players" @increment="incrementplayerCount" />
  </div>
</template>

<style scoped lang="scss">
.reset-container {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
