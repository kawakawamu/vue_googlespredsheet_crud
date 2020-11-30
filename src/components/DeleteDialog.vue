<template>
  <v-dialog v-model="show" persistent width="450">
    <v-card>
      <v-card-title>
        <v-card-text class="black--text">
          「{{ item.title }}」を削除しますか？
        </v-card-text>
      </v-card-title>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
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
