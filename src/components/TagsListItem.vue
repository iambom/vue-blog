<template>
  <li>
    <router-link :to="`/post`">
      {{ tag }}
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['tag'],
};
</script>

<style></style>
