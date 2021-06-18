<template>
  <li :class="{ active: index === isActiveItem }" @click="toggleTag">
    <router-link :to="`/hashtag/${tag.slice(1)}`">
      {{ tag }}
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['tag', 'index', 'isActiveItem'],
  methods: {
    toggleTag() {
      this.$emit('tag', this.index);
    },
  },
};
</script>

<style></style>
