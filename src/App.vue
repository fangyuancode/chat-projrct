<template>
  <RouterView />
  <tabbar v-if="route.meta.hideTabbar"></tabbar>
</template>
<script setup>
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<style scoped>
</style>
