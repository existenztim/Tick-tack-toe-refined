<script setup lang="ts">
import { ref } from 'vue';
import AddName from './components/AddName.vue';
import ScoreTracker from './components/ScoreTracker.vue';
import * as data from './models/data';
import ResetContainer from './components/ResetContainer.vue';
import { checkPlayers } from './services/handleLocalStorage';

const onGoingGame = ref(checkPlayers);
const players = ref(data.players);
const turn = ref(Math.random() < 0.5 ? data.players[0].id : data.players[1].id); //random start order between x/o
localStorage.getItem('players');
let playerCount = ref(0);
const incrementplayerCount = () => {
  playerCount.value++;
};

const board = ref(data.initBoard);

const hardReset = () => {
  localStorage.removeItem('players');
  onGoingGame.value = null;
  playerCount.value = 0;
  board.value = data.initBoard;
};

const makeMove = (x:number,y:number) => {
  console.log("x:", x, "y:", y)
  console.log(turn.value)
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
    <h2>Player {{ players[0].name }}'s turn!</h2>
    <div class="game-board">
      <div v-for="(row, x) in board" :key="x">
        <div @click="makeMove(x,y)" class="cell" v-for="(cell, y) in row" 
        :key="y" 
        :id="`cordinate-${x}-${y}`">{{ cell }}
        </div>
      </div>
    </div>
    <ResetContainer @newGame="hardReset" />
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
    width: 50px;
    height: 50px;
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
