<script setup lang="ts">
const { board } = defineProps(['board']);
const emits = defineEmits(['fillCell']);

const fillCell = (x: number, y: number) => {
  emits('fillCell', x, y);
};
</script>

<template>
  <div class="game-board">
    <div v-for="(row, x) in board" :key="x">
      <div
        @click="fillCell(x, y)"
        class="cell"
        v-for="(cell, y) in row"
        :key="y"
        :id="`cordinate-${x}-${y}-player-${cell}`"
      >
        {{ cell }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-board {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  animation: highlightDiv 0.7s;
  .cell {
    border: 1px solid black;
    color: black;
    padding: 2rem;
    margin: 0.3rem;
    border-radius: 5px;
    background-color: aliceblue;
    width: 50px;
    height: 50px;
    cursor: pointer;
    &:hover {
      background-color: beige;
    }
  }

  div[id$='X'] {
    color: #1b85b8;
    outline: 2px solid #1b85b8;
    animation: highlightDiv 0.7s;
  }

  div[id$='O'] {
    color: #e66c37;
    outline: 2px solid #e66c37;
    animation: highlightDiv 0.7s;
  }

  @keyframes highlightDiv {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    .cell {
      max-width: 32px;
    }
  }
}
</style>
