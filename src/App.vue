<script setup lang="ts">
import { ref } from 'vue';
import AddName from './components/AddName.vue';

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
const incrementNameCount = () => {
  nameCount.value++;
};
</script>

<template>
  <h1>tick tack toe</h1>
  <AddName :nameCount="nameCount" :players="players" @increment="incrementNameCount" />
</template>

<style scoped></style>
