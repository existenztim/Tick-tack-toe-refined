<script setup lang="ts">
import { computed, ref } from 'vue';
import * as data from './models/data';
import { checkPlayers } from './services/handleLocalStorage';
import AddName from './components/AddName.vue';
import ScoreTracker from './components/ScoreTracker.vue';
import ResetContainer from './components/ResetContainer.vue';
import GameBoard from './components/GameBoard.vue';

localStorage.getItem('players');
const onGoingGame = ref(checkPlayers);
const players = ref(data.players);
const turn = ref(Math.random() < 0.5 ? data.players[0].id : data.players[1].id); //random start order between x/o
let playerCount = ref(0);
let filledCount = ref(0);
const board = ref(JSON.parse(JSON.stringify(data.initBoard)));

const incrementplayerCount = () => {
  playerCount.value++;
};

const CalculateWinner = (value:string[][]) => {
  const winCombos = data.winCombos;
  console.log(winCombos);
  return 0; //placeholder
}

const hardReset = () => {
  localStorage.removeItem('players');
  onGoingGame.value = null;
  playerCount.value = 0;
  board.value = data.initBoard;
};

 const softReset = () => {
  console.log("soft reset not implemented yet!");
 }

 const winner = computed(() => {
  return CalculateWinner(board.value.flat());
});

const makeMove = (x:number,y:number) => {
  if (winner.value) {
    return;
  }

  if (board.value[x][y]) {
    return;
  }
  board.value[x][y] = turn.value;
  turn.value = turn.value === data.players[0].id ? data.players[1].id : data.players[0].id;
  filledCount.value++;
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

</style>
