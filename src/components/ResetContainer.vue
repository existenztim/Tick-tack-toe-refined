<script setup lang="ts">
const emits = defineEmits(['newGame']);
const newGame = () => {
  emits('newGame');
};
</script>

<template>
  <div class="reset-container">
    <button>New Game (same players)</button>
    <button @click="newGame">New Game (new players)</button>
  </div>
</template>
