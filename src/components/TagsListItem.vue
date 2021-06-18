<template>
  <li :class="{ active: tagname === this.$route.params.word }">
    <router-link :to="`/hashtag/${tagname}`">
      {{ tag }}
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['tag'],
  computed: {
    tagname() {
      return this.tag.slice(1);
    },
  },
};
</script>

<style></style>
