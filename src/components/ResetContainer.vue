<script setup lang="ts">
const emits = defineEmits(['newGame', 'newRound']);
const newGame = () => {
  emits('newGame');
};

const newRound = () => {
  emits('newGame');
};
</script>

<template>
  <div class="reset-container">
    <button @click="newRound">New Round (same players)</button>
    <button @click="newGame">New Game (new players)</button>
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
