<template>
  <ul class="tags-container">
    <tags-list-item
      v-for="(tag, index) in tags"
      :key="index"
      :tag="tag"
      :index="index"
      :isActiveItem="isActiveItem"
      @tag="toggleTag"
    ></tags-list-item>
  </ul>
</template>

<script>
import TagsListItem from '@/components/TagsListItem.vue';
export default {
  components: {
    TagsListItem,
  },
  data() {
    return {
      tags: this.$store.state.tags,
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
