<script setup lang="ts">
import { ref } from "vue";

const font = ref("Roboto");
</script>

<template>
  <div class="mt-10">This is a fucking test with vue {{ font }}</div>
  <button type="button" @click.prevent="font = 'Verdana'">
    Update Vue Font
  </button>
</template>
