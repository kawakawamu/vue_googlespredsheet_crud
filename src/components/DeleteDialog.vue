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
import { mapActions, mapState } from "vuex";

export default {
  name: "DeleteDialog",

  data() {
    return {
      show: false,
      item: {},
    };
  },
  computed: mapState({
    loading: (state) => state.loading.delete,
  }),
  methods: {
    ...mapActions([
      //data
      "deleteAbData",
    ]),
    open(item) {
      this.show = true;
      this.item = item;
    },
    /** キャンセルがクリックされたとき */
    onClickClose() {
      this.show = false;
    },
    async onClickDelete() {
      await this.deleteAbData({ item: this.item });
      this.shiw = false;
    },
  },
};
</script>
