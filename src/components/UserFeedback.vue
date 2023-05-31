<script setup lang="ts">
const msg = defineProps(["winMsg","drawMsg", "turn"])

</script>

<template>
    <h2 v-if="winMsg">Player {{ winMsg }}'s wins!</h2>
    <h2 v-else-if="drawMsg">There was a draw!</h2>
    <h2 v-else> Player {{ turn }}'s turn!</h2>
</template>