<script setup lang="ts">
const { player } = defineProps(['player']);
</script>

<template>
  <p>Player {{ player.id }} ({{ player.name }}'s) score : {{ player.score }}</p>
</template>

<style></style>
