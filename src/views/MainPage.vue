<template>
  <h2>Main Page</h2>
</template>

<script>
export default {
  name: 'AuthMain',
  created() {
    console.log(this.$route.params.uid);
  },
};
</script>

<style></style>
