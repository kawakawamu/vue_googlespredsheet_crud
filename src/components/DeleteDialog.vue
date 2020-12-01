<template>
  <v-dialog v-model="show" persistent width="450">
    <v-card>
      <v-card-title>
        <v-card-text class="black--text">
          「{{ item.title }}」を削除しますか？
        </v-card-text>
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" text :disabled="loading" @click="onClickClose"
          >キャンセル</v-btn
        >
        <v-btn color="red" text :loading="loading" @click="onClickDelete"
          >削除</v-btn
        >
      </v-card-actions>
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
  methods: {
    /** キャンセルがクリックされたとき */
    onClickClose() {
      this.show = false;
    },
  },
  computed: mapState({
    loading: (state) => state.loading.delete,
  }),
};
</script>
