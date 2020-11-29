<template>
  <v-dialog v-model="show"> </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      item: {},
    };
  },

  computed: mapState({
    loading: (state) => state.loading.delete,
  }),
};
</script>
