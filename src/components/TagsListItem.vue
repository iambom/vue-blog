<template>
  <li :class="{ active: tagname === selectedTag }">
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
    selectedTag() {
      return this.$route.params.word;
    },
  },
};
</script>
