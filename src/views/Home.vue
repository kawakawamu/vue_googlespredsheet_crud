<template>
  <div>
    <v-card>
      <v-card-title>
        <!-- 検索フォーム -->
        <v-col cols="12">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-col>
        <v-col class="text-right" cols="4">
          <v-btn dark color="green" @click="onClickAdd">
            <v-icon>mdi-plus</v-icon>
            {{ loading }}
          </v-btn>
        </v-col>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",

  components: {},

  data() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);

    return {
      /** 月選択メニューの状態 */
      menu: false,
      /** 検索文字 */
      search: "",
      /** 選択年月 */
      yearMonth: `${year}-${month}`,
      /** テーブルに表示させるデータ */
      tableData: [],
    };
  },
  computed: {
    ...mapState({
      /** 家計簿データ */
      abData: (state) => state.abData,
      /** ローディング状態 */
      loading: (state) => state.loading.fetch,
    }),
    /** テーブルのヘッダー設定 */
    tableHeaders() {
      return [
        { text: "日付", value: "date", align: "end" },
        { text: "タイトル", value: "title", sortable: false },
        { text: "カテゴリ", value: "category", sortable: false },
        { text: "タグ", value: "tags", sortable: false },
        { text: "収入", value: "income", align: "end" },
        { text: "支出", value: "outgo", align: "end" },
        { text: "メモ", value: "memo", sortable: false },
        { text: "操作", value: "actions", sortable: false },
      ];
    },

    /** テーブルのフッター設定 */
    footerProps() {
      return { itemsPerPageText: "", itemsPerPageOptions: [] };
    },
  },
  methods: {
    ...mapActions([
      // storeデータを取得する
      "fetchAbData",
    ]),

    async updateTable() {
      const yearMonth = this.yearMonth;
      const list = this.abData[yearMonth];
      console.log("....list");
      if (list) {
        this.tableData = list;
      } else {
        await this.fetchAbData({ yearMonth });
        this.tableData = this.abData[yearMonth];
      }
    },
    /**
     * 数字を3桁区切りにして返します。
     * 受け取った数が null のときは null を返します。
     */
    separate(num) {
      return num !== null
        ? num.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
        : null;
    },
    onClickAdd() {
      this.$refs.ItemDialog.open("add");
    },
    onClickEdit(item) {
      this.$refs.ItemDialog.open("edit", item);
    },
    onClickDelete(item) {
      this.$refs.DeleteDialog.open(item);
    },
    onSelectMonth() {
      this.$refs.menu.save(this.yearMonth);
      // this.updateTable()
    },
  },

  created() {
    this.updateTable;
  },
};
</script>
