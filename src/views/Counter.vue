<template>
  <div>
    <h5>Counter</h5>
  </div>
</template>

<script>
export default {
  name: "Counter",
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
};
</script>
