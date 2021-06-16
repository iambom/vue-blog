<template>
  <li
    @click="toggleTag(index)"
    :class="{ active: this.isActiveItem === index }"
  >
    <router-link :to="`/hashtag/${tag.slice(1)}`">
      {{ tag }}
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['tag', 'index'],
  data() {
    return {
      isActiveItem: '',
    };
  },
  methods: {
    toggleTag(itemIndex) {
      this.isActiveItem = itemIndex;
    },
  },
};
</script>

<style></style>
