<script setup lang="ts">
const { player } = defineProps(['player']);
</script>

<template>
  <p :class="player.id">Player {{ player.id }} ({{ player.name }}'s)  <span>score : </span>{{ player.score }}</p>
</template>

<style scoped lang="scss">
span {
    color: white;
}
</style>
