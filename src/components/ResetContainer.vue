<script setup lang="ts">
import { ref } from 'vue';

const checkPlayers = ref(localStorage.getItem('players'));
console.log('när appen laddas:', checkPlayers.value);

const newPlayersReset = () => {
  console.log('när funktion callas', checkPlayers.value);
  localStorage.removeItem('players');
  console.log('efter localstorage tömts', checkPlayers.value);
  console.log(checkPlayers.value);
};
</script>

<template>
  <div class="reset-container">
    <button>New Game (same players)</button>
    <button @click="newPlayersReset">New Game (new players)</button>
  </div>
</template>
