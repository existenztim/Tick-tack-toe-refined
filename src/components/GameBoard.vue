<script setup lang="ts">

const {board} = defineProps(["board"])
const emits = defineEmits(['fillCell']);

const fillCell = (x:number, y:number) => {
    emits('fillCell', x, y);
}
</script>

<template>
    <div class="game-board">
      <div v-for="(row, x) in board" :key="x">
        <div @click="fillCell(x,y)" class="cell" v-for="(cell, y) in row" 
        :key="y" 
        :id="`cordinate-${x}-${y}-player-${cell}`">{{ cell }}
        </div>
      </div>
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
  div[id$="X"] {
  color:#1b85b8
}

div[id$="O"] {
  color:#e66c37
}
}
</style>


