<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue';

const players = ref([
  {
    id: 'X',
    name: '',
    score: 0,
  },
  {
    id: 'O',
    name: '',
    score: 0,
  },
]);

let nameCount = ref(0);
const newName = ref('');

const addName = (playerToUpdate) => {
  nameCount.value++;
  playerToUpdate.name = newName.value;
  console.log(playerToUpdate);
  newName.value = '';
};
</script>

<template>
  <h1>tick tack toe</h1>
  <div v-if="nameCount < 2">
    <input v-model="newName" type="text" :placeholder="`Name for player ${players[nameCount].id}`" />
    <button @click="addName(players[nameCount])">Add name</button>
  </div>
  <div v-else>
    <p>Alla har fått sina namn {{ players[0].name }} och {{ players[1].name }}</p>
  </div>
</template>

<style scoped></style>
