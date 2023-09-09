<template>
  <a :title="title" :href="href" rel="nofollow noreferrer" target="_blank">
    <img :src="light ? mghImg120Light : mghImg120" :width="size" />
  </a>
</template>
<script setup lang="ts">
import mghImg120 from './GitHub-Mark-120px-plus.png';
import mghImg120Light from './GitHub-Mark-Light-120px-plus.png';

defineProps({
  size: {
    type: Number,
    default: 32,
  },
  light: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Fork me on Github',
  },
});

const href: string = 'https://github.com/JamaisMagic/namie.cc-web-service';
</script>
