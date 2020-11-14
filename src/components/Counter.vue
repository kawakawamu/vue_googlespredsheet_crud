<template>
  <div id="counter">
    <p>Counter: {{ count }}</p>
  </div>
</template>

<script>
const Counter = {
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
};

export default Counter;
</script>
