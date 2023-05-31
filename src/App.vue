<script setup lang="ts">
import { computed, ref } from 'vue';
import * as data from './models/data';
import { checkPlayers, checkGameState, updateLocalstorage } from './services/handleLocalStorage';
import AddName from './components/AddName.vue';
import ScoreTracker from './components/ScoreTracker.vue';
import ResetContainer from './components/ResetContainer.vue';
import GameBoard from './components/GameBoard.vue';
import UserFeedback from './components/UserFeedback.vue';
import { IgameState } from './models/IgameState';

const gameData = ref<IgameState>({
  onGoingGame: checkPlayers,
  players: data.players,
  turn: Math.random() < 0.5 ? data.players[0].id : data.players[1].id,
  playerCount: 0,
  filledCount: 0,
  winMsg: null,
  drawMsg: "",
  board: JSON.parse(JSON.stringify(data.initBoard))
});

if(checkGameState) {
  console.log("Exists in local storage:", checkGameState);
  const storedGameData: IgameState = JSON.parse(checkGameState);
  console.log(storedGameData)
  gameData.value = storedGameData;
} 

updateLocalstorage(gameData.value);

const incrementplayerCount = () => {
  gameData.value.playerCount++;
};

const CalculateWinner = (board:string[]) => {
  const winCombos = data.winCombos;
  for (const combo of winCombos) {
    const [firstCell, secondCell, thirdCell] = combo;
    if (
      board[firstCell] &&
      board[firstCell] === board[secondCell] &&
      board[firstCell] === board[thirdCell]
    ) {
      gameData.value.winMsg = board[firstCell];
      return board[firstCell];
    }
  }
  return null;
};

const hardReset = () => {
  localStorage.removeItem('players');
  localStorage.removeItem('gameState');
  gameData.value.onGoingGame = null;
  gameData.value.players.forEach(player => {
    player.score = 0;
  });
  gameData.value.board = JSON.parse(JSON.stringify(data.initBoard));
  gameData.value.playerCount = 0;
  gameData.value.filledCount = 0;
  gameData.value.drawMsg = "";
  gameData.value.winMsg = null;
};

 const softReset = () => {
  gameData.value.board = JSON.parse(JSON.stringify(data.initBoard));
  gameData.value.winMsg = null;
  gameData.value.filledCount = 0;
  gameData.value.drawMsg = "";
 }

 const winner = computed(() => {
  return CalculateWinner(gameData.value.board.flat());
});

const controlMove = (x: string, y: string) => {
  if (winner.value) {
    return;
  }
  if (gameData.value.board[Number(x)][Number(y)]) {
    return;
  }
  if (gameData.value.filledCount >= 8) {
    gameData.value.board[Number(x)][Number(y)] = gameData.value.turn;
    gameData.value.drawMsg = "nobody";
    return;
  }
  makeMove(x,y);
};

const makeMove = (x: string, y: string) => {
  console.log("gameData",gameData.value);
  gameData.value.board[Number(x)][Number(y)] = gameData.value.turn;
  let currentWinner = CalculateWinner(gameData.value.board.flat())
  if (currentWinner) {
  const playerIndex = currentWinner.toString() === gameData.value.players[0].id ? 0 : 1;
  gameData.value.players[playerIndex].score += 1;
}
  gameData.value.filledCount++; 
  gameData.value.turn = gameData.value.turn === gameData.value.players[0].id ? gameData.value.players[1].id : gameData.value.players[0].id;
  updateLocalstorage(gameData.value);
}
</script>

<template>
  <h1>tick tack toe</h1>
  <div class="game-container" v-if="gameData.playerCount >= 2 || gameData.onGoingGame">
    <div v-for="player in gameData.players">
      <ScoreTracker :player="player" />
    </div>
    <UserFeedback :winMsg="gameData.winMsg" :drawMsg="gameData.drawMsg" :turn="gameData.turn"/>
    <GameBoard :board="gameData.board" @fillCell="controlMove"/>
    <ResetContainer @newGame="hardReset" @newRound="softReset"/>
  </div>
  <div v-else>
    <AddName :playerCount="gameData.playerCount" :players="gameData.players" @increment="incrementplayerCount" />
  </div>
</template>

<style lang="scss">
.X {
  color:#1b85b8
}
.O {
  color:#e66c37
}
</style>
