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
