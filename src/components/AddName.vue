<script setup lang="ts">
import { ref } from 'vue';
import { Iplayer } from '../models/Iplayer';
import { addUser, checkPlayers } from '../services/handleLocalStorage';
const emits = defineEmits(['increment']);
const { players, nameCount } = defineProps(['players', 'nameCount']);
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
  <div v-if="nameCount < 2 && checkPlayers == null">
    <!--lägg in localstorage check här med senare-->
    <input v-model="newName" type="text" :placeholder="`Name for player ${players[nameCount].id}`" />
    <button @click="addName(players[nameCount])">Add name</button>
  </div>
</template>
<style scoped></style>
