<script setup lang="ts">
import { ref } from 'vue';
import { Iplayer } from '../models/Iplayer';
import { addUser } from '../services/handleLocalStorage';
const emits = defineEmits(['increment']);
const { players, playerCount } = defineProps(['players', 'playerCount']);
const newName = ref('');

const addName = (playerToUpdate: Iplayer) => {
  emits('increment');
  playerToUpdate.name = newName.value;
  console.log(playerToUpdate);
  newName.value = '';
  addUser(players, playerToUpdate);
};
</script>

<template>
  <div>
    <p>Let's start a new game!</p>
    <input v-model="newName" type="text" :placeholder="`Name for player ${players[playerCount].id}`" />
    <button @click="addName(players[playerCount])">Add name</button>
  </div>
</template>
<style scoped>
input {
  margin: 1rem;
}
</style>
