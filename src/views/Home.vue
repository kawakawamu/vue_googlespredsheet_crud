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
          </v-btn>
        </v-col>
      </v-card-title>
      <!-- テーブル -->
      <v-data-table
        class="text-no-wrap"
        :headers="tableHeaders"
        :items="tableData"
        :search="search"
        :footer-props="footerProps"
        :loading="loading"
        :sort-by="'date'"
        :sort-desc="true"
        :items-per-page="30"
        mobile-breakpoint="0"
      >
        <!-- 日付列 -->
        <template v-slot:[`item.date`]="{ item }">
          {{ parseInt(item.date.slice(-2)) + "日" }}
        </template>
        <!-- タグ列 -->
        <template v-slot:[`item.tags`]="{ item }">
          <div v-if="item.tags">
            <v-chip
              class="mr-2"
              v-for="(tag, i) in item.tags.split(',')"
              :key="i"
            >
              {{ tag }}
            </v-chip>
          </div>
        </template>
        <!-- 収入列 -->
        <template [`item.income`]="{ item }">
          {{ separate(item.income) }}
        </template>
        <!-- タグ列 -->
        <template [`item.outgo`]="{ item }">
          {{ separate(item.outgo) }}
        </template>
        <!-- 操作列 -->
        <template [`item.actions`]="{ item }">
          <v-icon class="mr-2" @click="onClickEdit(item)">mdi-pencil</v-icon>
          <v-icon @click="onClickDelete(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <ItemDialog ref="itemDialog" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ItemDialog from "../components/ItemDialog.vue";

export default {
  name: "Home",
  components: {
    ItemDialog,
  },

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
      abData: (state) => state.abData,
      loadong: (state) => state.loading.fetch,
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

    /**
     * 数字を3桁区切りにして返します。
     * 受け取った数が null のときは null を返します。
     */
    separate(num) {
      return num !== null
        ? num.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
        : null;
    },
    async updateTable() {
      const yearMonth = this.yearMonth;
      const list = this.abData[yearMonth];

      if (list) {
        this.tableData = list;
      } else {
        await this.fetchAbData({ yearMonth });
        this.tableData = this.abData[yearMonth];
      }
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
