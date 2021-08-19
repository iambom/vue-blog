<template>
  <ul class="tags-container">
    <tags-list-item
      v-for="(tag, index) in tags"
      :key="index"
      :tag="tag"
    ></tags-list-item>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import TagsListItem from '@/components/TagsListItem.vue';
export default {
  components: {
    TagsListItem,
  },
  computed: {
    ...mapGetters('postStore', ['tags']),
  },
};
</script>
