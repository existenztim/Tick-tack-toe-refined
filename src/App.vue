<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import * as data from './models/data';
import { checkPlayers, checkGameState, updateLocalstorage, removeLocalstorage } from './services/handleLocalStorage';
import AddName from './components/AddName.vue';
import ScoreTracker from './components/ScoreTracker.vue';
import ResetContainer from './components/ResetContainer.vue';
import GameBoard from './components/GameBoard.vue';
import UserFeedback from './components/UserFeedback.vue';
import { IgameState } from './models/IgameState';

const gameState = ref<IgameState>({
  onGoingGame: checkPlayers,
  players: data.players,
  turn: Math.random() < 0.5 ? data.players[0].id : data.players[1].id,
  playerCount: 0,
  filledCount: 0,
  winMsg: null,
  drawMsg: '',
  board: JSON.parse(JSON.stringify(data.initBoard)),
});

if (checkGameState) {
  const storedgameState: IgameState = JSON.parse(checkGameState);
  gameState.value = storedgameState;
}

watch(gameState.value, (newValue: IgameState) => {
  updateLocalstorage(newValue);
});

const incrementplayerCount = () => {
  gameState.value.playerCount++;
};

const CalculateWinner = (board: string[]) => {
  const winCombos = data.winCombos;
  for (const combo of winCombos) {
    const [firstCell, secondCell, thirdCell] = combo;
    if (board[firstCell] && board[firstCell] === board[secondCell] && board[firstCell] === board[thirdCell]) {
      gameState.value.winMsg = board[firstCell];
      return board[firstCell];
    }
  }
  return null;
};

const hardReset = () => {
  removeLocalstorage(['players', 'gameState']);
  gameState.value.onGoingGame = null;
  gameState.value.players.forEach((player) => {
    player.score = 0;
  });
  gameState.value.board = JSON.parse(JSON.stringify(data.initBoard));
  gameState.value.playerCount = 0;
  gameState.value.filledCount = 0;
  gameState.value.drawMsg = '';
  gameState.value.winMsg = null;
};

const softReset = () => {
  gameState.value.board = JSON.parse(JSON.stringify(data.initBoard));
  gameState.value.winMsg = null;
  gameState.value.filledCount = 0;
  gameState.value.drawMsg = '';
};

const winner = computed(() => {
  return CalculateWinner(gameState.value.board.flat());
});

const controlMove = (x: string, y: string) => {
  if (winner.value) {
    return;
  }
  if (gameState.value.board[Number(x)][Number(y)]) {
    return;
  }
  if (gameState.value.filledCount >= 8) {
    gameState.value.board[Number(x)][Number(y)] = gameState.value.turn;
    gameState.value.drawMsg = 'draw';
    return;
  }
  makeMove(x, y);
};

const makeMove = (x: string, y: string) => {
  gameState.value.board[Number(x)][Number(y)] = gameState.value.turn;
  let currentWinner = CalculateWinner(gameState.value.board.flat());
  if (currentWinner) {
    const playerIndex = currentWinner.toString() === gameState.value.players[0].id ? 0 : 1;
    gameState.value.players[playerIndex].score += 1;
  }
  gameState.value.filledCount++;
  gameState.value.turn =
    gameState.value.turn === gameState.value.players[0].id
      ? gameState.value.players[1].id
      : gameState.value.players[0].id;
};
</script>

<template>
  <h1>tick tack toe</h1>
  <div class="game-container" v-if="gameState.playerCount >= 2 || gameState.onGoingGame">
    <div v-for="player in gameState.players">
      <ScoreTracker :player="player" />
    </div>
    <UserFeedback :winMsg="gameState.winMsg" :drawMsg="gameState.drawMsg" :turn="gameState.turn" />
    <GameBoard :board="gameState.board" @fillCell="controlMove" />
    <ResetContainer @newGame="hardReset" @newRound="softReset" />
  </div>
  <div v-else>
    <AddName :playerCount="gameState.playerCount" :players="gameState.players" @increment="incrementplayerCount" />
  </div>
</template>

<style lang="scss">
.X {
  color: #1b85b8;
}
.O {
  color: #e66c37;
}
</style>
